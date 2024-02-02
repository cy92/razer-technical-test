# razer-technical-test

## Table of Contents

- [Description](#description)
- [Installation](#Installation)
- [Start Application](#StartApplication)
- [API Usage](#APIUsage)

## Description

An expressJs application with mongo database created for razer technical test.
This application allow user

- To login and generate jwt token
- Perform Create, Update, Read and Soft delete profile information via api call

** JWT token will required to add into HTTP header Authroization for all profile related api call, token current expireation is 1 hours **

### Additional Library Use and Purpose

- express.js: express server
- crypto: AES encryption
- express-validator: request validation
- jimp: base64 image validation
- jsonwebtoken: jwt generation and validation
- mongoose: mongodb usage
- nodemon: auto refresh when code change use

** For request validation, rule will be locate in the validation folder inside both profile (profile.request.js) and login (login.request.js) folder **

### API Source Design

All api source are located inside /api folder. Below describe on the usage base on the source code extenstion:

- xxx.service : contain reusable function like database crud related
- xxx.controller : perform requst and response handling, calling xxx.service to perform data crud
- xxx.model : schema on the database
- xxx.request : contain request rule, to be use by express-validator

All utily source will be located in util and below is their usage:

- crypto: jwt generation and aes encryption
- messageFormat: standardize success and fail message format upon response
- mongo: connect mongodb function
- validation: not in use

## Installation

Clone the repo into your local

### Database (MongoDB)

MongoDb data are all located in databaseData folder.

#### Using mongorestore

Execute command below to restore data into mongodb

```
mongorestore -d razer /<source code directory>/databaseData/mongoDump/razer
```

#### Using MongoDB Compass

    1. Create a new Database -> razer
    2. Import razer.logins.json & razer.profiles.json in the /databaseData/mongoCompass folder into the new created database

### Application (ExpressJs)

    1. In the source code folder, execute command below to install the package dependency
        npm install

    2. Copy and rename .env.txt to .env file
    3. Open .env and paste configuration below with only MONGODB changes required base on the database you going to access to

    __________________________________________________________________
    PORT=3000
    MONGODB=mongodb://<database ip>:<database port>/<database name eg: razer>
    JWT_SECRET=ce592b3dd47b95f97f0f81e84ce1a171d0c44ae31031a1cc4e5fb841dd1a2fef
    ENC_KEY=j3Bhl0BhVlQ7CgUbeYCtItvJDCeAv1cq
    ________________________________________________________________
    4. Save and close .env file

## Start Application

Execute command below to start the application, server port will base on ** PORT ** setup in .env file

`npm run start`

## API Usage

Kindly refer to [Razer_api_doc.pdf](https://drive.google.com/file/d/1ppK2UijiwvZBTER-whnhJuoaTj2IxLbx/view?usp=sharing) for further api usage details
