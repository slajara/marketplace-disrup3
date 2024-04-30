## This is a server that will listen to contract events and call the main api

- save contract last processed blockNumber
- in appjs create a callback func that executes the logic every n amount of secs
- coul use contract.on bc we are only listening to one event

## Functionallity of the server

- reset db to test
- once contract deployed add it to constants folder
- localhost test enviroment | goerli enviroment | production env
- auth for being able to call main server
