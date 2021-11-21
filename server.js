//declarations
const express = require('express');
const app = express();
require('dotenv').config();
const expressSession = require('express-session');
// const path = require('path')
const MongoStore = require('connect-mongo');




app.use(expressSession(
    {
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI
        }),
        secret: 'secret',
        resave: 'false',
        saveUninitialized: 'false'
    })
  );
  

app.set("view engine", "ejs")

// load assets
app.use(express.static(__dirname + '/public'));

app.use(expressSession({
    secret: 'secret',
    resave: 'false',
    saveUninitialized: 'false'

}));

app.use(express.urlencoded({ extended : false}))

//mongo connection

const connectDB = require('./server/database/connection');
connectDB();

//load all routes
app.use('/', require('./server/routes/router'))



//start app
const PORT = process.env.PORT || 2111;
// console.log(process.env);
app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});
