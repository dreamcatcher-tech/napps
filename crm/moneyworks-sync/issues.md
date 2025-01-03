1. moneyworks secure url should be checked to see if it is a valid url and that
   it includes username and password.

2. git repo url should be of the correct format and should include a branch name
   in the path

3. git repo key should be checked to see if it is a valid key

4. app should log out the config it is about to use before starting up

5. if a record changed in moneyworks but it is identical to the record stored,
   then we should update the last synced market, but that is all - ie: do not
   update the unchanged record in the git repo.

6. How would deletions be handled ? When the xml record is removed, what happens
   ?
