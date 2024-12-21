// deno-lint-ignore-file no-explicit-any
// Example Tendermint-like consensus re-implemented with validRound/validValue logic,
// an explicit Commit step, and PoLC-based unlock. Uses normal function declarations.

import { assert } from '@std/assert'

export type TendermintMsgType = 'PROPOSAL' | 'PREVOTE' | 'PRECOMMIT' | 'COMMIT'

export interface TendermintMessage {
  from: string
  type: TendermintMsgType
  round: number
  data: string // Proposed string to agree on
}

export interface TendermintState {
  height: number
  round: number
  step: 'Propose' | 'Prevote' | 'Precommit' | 'Commit'
  lockedValue?: string
  lockedRound?: number
  validValue?: string
  validRound?: number
  lastAgreed?: string
  proposals: Map<number, string[]>
  prevotes: Map<number, string[]>
  precommits: Map<number, string[]>
}

export class TendermintNode {
  #state: TendermintState

  constructor() {
    this.#state = {
      height: 0,
      round: 0,
      step: 'Propose',
      proposals: new Map(),
      prevotes: new Map(),
      precommits: new Map(),
    }
  }

  receiveMessage(msg: TendermintMessage): void {
    if (msg.round > this.#state.round + 1) return // Don't skip multiple rounds
    if (msg.round < this.#state.round) return // Ignore old rounds

    switch (msg.type) {
      case 'PROPOSAL':
        this.#handlePropose(msg)
        break
      case 'PREVOTE':
        this.#handlePrevote(msg)
        break
      case 'PRECOMMIT':
        this.#handlePrecommit(msg)
        break
      case 'COMMIT':
        this.#handleCommit(msg)
        break
    }
  }

  getState(): TendermintState {
    // Return a shallow clone for inspection
    return { ...this.#state }
  }

  // --- Internal logic ---

  #handlePropose(msg: TendermintMessage): void {
    // Move to Propose step if needed
    if (this.#state.step !== 'Propose' && msg.round >= this.#state.round) {
      this.#state.round = msg.round
      this.#state.step = 'Propose'
    }

    // Record proposals
    if (!this.#state.proposals.has(msg.round)) {
      this.#state.proposals.set(msg.round, [])
    }
    this.#state.proposals.get(msg.round)?.push(msg.data)

    // If we have a lockedValue from a previous round, re-propose it
    // or use validValue if we have one from a known PoLC
    assert(this.#state.lockedRound !== undefined)
    if (
      this.#state.lockedValue && this.#state.lockedRound < this.#state.round
    ) {
      this.#state.validValue = this.#state.lockedValue
      this.#state.validRound = this.#state.lockedRound
    }

    // Next step is Prevote
    this.#state.step = 'Prevote'
  }

  #handlePrevote(msg: TendermintMessage): void {
    // Move to Prevote step if needed
    if (this.#state.step !== 'Prevote' && msg.round >= this.#state.round) {
      this.#state.round = msg.round
      this.#state.step = 'Prevote'
    }

    // Collect prevotes
    if (!this.#state.prevotes.has(msg.round)) {
      this.#state.prevotes.set(msg.round, [])
    }
    this.#state.prevotes.get(msg.round)?.push(msg.data)

    // Check for PoLC (e.g., threshold = 2 here)
    if (
      this.#countMatches(this.#state.prevotes.get(msg.round), msg.data) >= 2
    ) {
      // If it's a higher round PoLC, unlock old
      if (
        !this.#state.lockedValue ||
        msg.round > (this.#state.lockedRound ?? -1)
      ) {
        this.#state.lockedValue = msg.data
        this.#state.lockedRound = msg.round
      }
      this.#state.validValue = msg.data
      this.#state.validRound = msg.round
    }

    // Next step is Precommit
    this.#state.step = 'Precommit'
  }

  #handlePrecommit(msg: TendermintMessage): void {
    // Move to Precommit step if needed
    if (this.#state.step !== 'Precommit' && msg.round >= this.#state.round) {
      this.#state.round = msg.round
      this.#state.step = 'Precommit'
    }

    // Collect precommits
    if (!this.#state.precommits.has(msg.round)) {
      this.#state.precommits.set(msg.round, [])
    }
    this.#state.precommits.get(msg.round)?.push(msg.data)

    // If enough precommits match, go to Commit step
    if (
      this.#countMatches(this.#state.precommits.get(msg.round), msg.data) >= 2
    ) {
      this.#state.step = 'Commit'
    }
  }

  #handleCommit(msg: TendermintMessage): void {
    // Move to Commit step if needed
    if (this.#state.step !== 'Commit' && msg.round >= this.#state.round) {
      this.#state.round = msg.round
      this.#state.step = 'Commit'
    }
    // Once in Commit, finalize the block
    assert(this.#state.lockedValue !== undefined)
    this.#state.lastAgreed = this.#state.lockedValue
    this.#resetForNextHeight()
  }

  #resetForNextHeight(): void {
    this.#state.height += 1
    this.#state.round = 0
    this.#state.step = 'Propose'
    this.#state.proposals.clear()
    this.#state.prevotes.clear()
    this.#state.precommits.clear()
    // Keep lockedValue/lockedRound for re-proposal if needed
  }

  #countMatches(arr: string[] | undefined, val: string): number {
    if (!arr) return 0
    let count = 0
    for (const v of arr) {
      if (v === val) count++
    }
    return count
  }
}
