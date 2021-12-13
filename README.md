# MisiónTIC2021 Ciclo4 Team7 P65_C4_DW
:octocat: unal-team7_P65_C4_DW

TEAM7 | Bank :copyright: is our final project based on MisiónTIC2021 Ciclo4 by Team7 P65_C4_DW  
How does it look? Take a look at:
* [Heroku Deploy - Auth MicroService](https://authp65c4dw.herokuapp.com/)
* [Heroku Deploy - Account Microservice](https://accountp65c4dw.herokuapp.com/)
* [Heroku Deploy - API Gateway](https://apigatewayp65c4dw.herokuapp.com/)
* [Heroku Deploy - User Interface](https://uip65c4dw.herokuapp.com/)

## Stack
* JavaScript
  - Nodejs
  - Reactjs
* PostgreSQL

### Directories
:open_file_folder: backend/accountMS  
:open_file_folder: backend/apiGateway  
:open_file_folder: backend/authMS  
:open_file_folder: frontend

### Manual Installation (Node + PostgreSQL)
To get started you will first need the following installed on your machine.
* [PostgreSQL](https://www.postgresql.org)
* [Nodejs](https://nodejs.org)

Then you must make sure you have two PostgreSQL databases running locally called
* authDB
* accountDB

### Running with Nodejs locally
Then you can download this repository, open four terminals window and navigate
to the folder in each terminal, and then type the following.
#### Terminal 1
##### Auth - First microservice
Type the following in your first terminal
```
cd backend/authMS
npm i
npm start
```
#### Terminal 2
##### Account - Second microservice
Type the following in your second terminal
```
cd backend/accountMS
npm i
npm start
```
#### Terminal 3
##### API Gateway
Type the following in your third terminal
```
cd backend/apiGateway
npm i
npm start
```
#### Terminal 4
##### User Interface
Type the following in your fourth terminal
```
cd frontend
npm i
npm start
```

### Use
#### First - Create an admin role account to create clients into app
Go to the following URL on your browser to create an admin account
```
http://localhost:3000/first
```
#### Login
Go to the following URL on your browser
```
http://localhost:3000
```
Done!  

If you are an admin, you can handle client accounts (CRUD)  
If you are a client, you can handle you bank account (Transfer, History)

## TEAM
[Maribel Franco]()  
[Sergio Novoa]()  
[Julián Nieto]()  
[Julián Púlido]()  
[Javier Andrés Garzón Patarroyo](https://www.javierandresgp.com)
