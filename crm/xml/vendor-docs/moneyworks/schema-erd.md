```mermaid
erDiagram

    Account {
        string Code PK
        string Category
        string Group
        string TaxCode
    }

    Ledger {
        string AccountCode
        string Department
        string Category
        string Classification
        string Concat
    }

    Department {
        string Code PK
        string Classification
    }

    Link {
        string Dept
        string Group
    }

    General {
        string Code
    }

    BankRecs {
        string Account
        int SequenceNumber
        string Statement
    }

    Job {
        string Code PK
        string Client
        string WIPAccount
        string Project
    }

    JobSheet {
        string Job
        string Resource
        string CostCentre
        string Account
        int DestTransSeq
        int SourceTransSeq
        string EnteredBy
    }

    Detail {
        int ParentSeq
        string StockCode
        string TaxCode
        string Account
        string Statement
        string JobCode
        string Dept
    }

    Transaction {
        int SequenceNumber PK
        string NameCode
        string EnteredBy
        string PostedBy
        string Currency
    }

    Payments {
        int InvoiceID
        int CashTrans
    }

    Name {
        int SequenceNumber PK
        string Code
        string RecAccount
        string PayAccount
        string Currency
        string TaxCode
    }

    Memo {
        int NameSeq
    }

    OffLedger {
        string Kind
        string Name
    }

    Login {
        string Initials
    }

    Product {
        int SequenceNumber PK
        string Code
        string Supplier
        string SalesAcct
        string COGAcct
        string StockAcct
    }

    Build {
        int ProductSeq
        int PartCode
    }

    User {
        string Key
        string Data
    }

    Log {
        
    }

    AutoSplit {
        
    }

    Filter {
        
    }

    Message {
        
    }

    %% Relationships (best guess from diagram)

    Account ||--o{ Ledger : "Code -> AccountCode"
    Department ||--o{ Ledger : "Code -> Department"

    Department ||--|{ Link : "Code -> Dept"
    Account ||--|{ BankRecs : "Code -> Account"

    Job ||--|{ JobSheet : "Code -> Job"

    Transaction ||--o{ Detail : "SequenceNumber -> ParentSeq"
    Job ||--o{ Detail : "Code -> JobCode"
    Department ||--o{ Detail : "Code -> Dept"
    Account ||--o{ Detail : "Code -> Account"
    Product ||--o{ Detail : "Code -> StockCode"

    Transaction ||--o{ Payments : "SequenceNumber (?)
 → InvoiceID/CashTrans?"

    Name ||--|{ Memo : "SequenceNumber -> NameSeq"

    %% Others may need clarification
```
