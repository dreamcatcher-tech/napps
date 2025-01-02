export interface Config {
  /** The MoneyWorks server to connect to */
  moneyworks: {
    url: string
    username: string
    password: string
  }
  /** The list of tables to poll for changes on, as well as the last modified
   * time of the latest item we received from the table, or -1 if nothing has
   * been received yet */
  tables: {
    Name: -1
    Transaction: -1
  }
  /** The interval to poll the tables at */
  pollInterval: number
}
