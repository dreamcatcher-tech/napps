# MoneyWorks Sync Process

## 1. Subroutine: Batched Pull

```math
\mathrm{BatchedPull}(R_{\mathrm{mw}}, L, B)\;:\;
\begin{cases}
\Delta := \mathrm{PullChanges}(S_{\mathrm{mw}}, L, B) \\
\textbf{while } \Delta \neq \varnothing: \\
\quad R_{\mathrm{mw}} := \mathrm{Commit}(R_{\mathrm{mw}}, \Delta)\\
\quad L := \max\{\,L,\;\mathrm{LastModified}(\Delta)\}\\
\quad \Delta := \mathrm{PullChanges}(S_{\mathrm{mw}}, L, B) \\
\textbf{return }(R_{\mathrm{mw}}, L)
\end{cases}
```

- **$S_{\mathrm{mw}}$**: MoneyWorks server.
- **$R_{\mathrm{mw}}$**: “moneyworks” branch.
- **$B$**: batch size.
- **$L$**: last-modified marker.
- **$\mathrm{PullChanges}(S_{\mathrm{mw}}, L, B)$**: returns up to $B$ records from $S_{\mathrm{mw}}$ with timestamps $\ge L$.
- **$\mathrm{Commit}(R_{\mathrm{mw}}, \Delta)$**: appends $\Delta$ into $R_{\mathrm{mw}}$.
- **$\mathrm{LastModified}(\Delta)$**: highest timestamp among records in $\Delta$.

---

## 2. Read Process (Polling)

This process remains idle while polling is suspended. Once resumed, it repeatedly
pulls changes at a specified interval. If suspended again, it stops and waits.

```math
\begin{aligned}
&\textbf{When resumed:}\\
&\quad \text{(1) Repeat until suspended:}\\
&\quad\quad (a)\;(R_{\mathrm{mw}}, L) \;\leftarrow\; \mathrm{BatchedPull}(R_{\mathrm{mw}}, L, B).\\
&\quad\quad (b)\;\mathrm{wait}(\mathrm{PollInterval}).\\
&\quad \text{(2) If suspended, wait until resumed again.}
\end{aligned}
```

- **Suspended**: no new pulls occur.
- **Resumed**: the loop in step (1) continues.

---

## 3. Write Process (Triggered by a New Commit in $R_{\mathrm{chg}}$)

When $R_{\mathrm{chg}}$ receives a new commit, we want to push those changes to the MoneyWorks server.

```math
\begin{aligned}
&\textbf{Trigger: New commit in }R_{\mathrm{chg}}\text{.}\\
&\quad (1)\;\mathrm{SuspendPolling}(S_{\mathrm{mw}}).\\
&\quad (2)\;(R_{\mathrm{mw}}, L) \;\leftarrow\; \mathrm{BatchedPull}(R_{\mathrm{mw}}, L, B).\\
&\quad (3)\;\Delta \;\leftarrow\; \mathrm{DeltaRecords}(R_{\mathrm{chg}}, R_{\mathrm{mw}}).\\
&\quad \textbf{if } \Delta \neq \varnothing\text{:}\\
&\qquad (4a)\;\mathrm{Import}(\Delta, S_{\mathrm{mw}})\quad\text{(halt on collision).}\\
&\qquad (4b)\;(R_{\mathrm{mw}}^\prime,\; L) \;\leftarrow\; \mathrm{BatchedPull}(R_{\mathrm{mw}}, L, B).\\
&\qquad (4c)\;\Delta^\prime \;=\; \mathrm{DeltaRecords}\bigl(R_{\mathrm{mw}}^\prime,\; R_{\mathrm{mw}}\bigr).\\
&\qquad \text{if } \Delta^\prime \neq \Delta\quad\text{then mismatch error.}\\
&\quad (5)\;\mathrm{RestartReadProcess}(S_{\mathrm{mw}})\quad\text{(resume polling).}
\end{aligned}
```

- **$\mathrm{SuspendPolling}(S_{\mathrm{mw}})$**: stops the read process if it is active.
- **$\mathrm{DeltaRecords}(R_{1}, R_{2})$**: calculates which records in $R_{1}$ differ from $R_{2}$.
- **$\mathrm{Import}(\Delta, S_{\mathrm{mw}})$**: pushes the file-record changes $\Delta$ to $S_{\mathrm{mw}}$.
- After importing, another $\mathrm{BatchedPull}$ obtains $R_{\mathrm{mw}}^\prime$. We compare $\Delta^\prime$ against $\Delta$.
- Finally, **$\mathrm{RestartReadProcess}(S_{\mathrm{mw}})$** resumes the polling.
