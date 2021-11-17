const express = require('express');
const route = express.Router()
const users = require('../models/users');

const services = require('../services/render');
// const controller = require('../controller/controller'); //TODO
const util =  require('../util/util');
const granted = require('../util/permission');


// ADMIN ROUTES **************************************

//user info route
route.get('/adduser' , services.adduser);
route.post('/adduser', services.createuser);
route.get('/userlist', services.userlist);

route.get('/user/:id', services.updateuserform);
route.post('/user/:id', services.updateuser);

route.get('/delete/user/:id', services.deleteuser);





//hotel routes
route.get('/addhotel', services.addhotel);
route.post('/addhotel', services.createhotel);


//room routes
route.get('/addroom', services.addroom);
route.post('/addroom', services.createroom);




// MANAGER ROUTES ************************************
//get own room list
route.get('/roomlist',granted.formanager, services.roomlist);



//auth routes
route.get('/login', util.redirectifauth, services.login);
route.post('/login', services.loggingin);
route.get('/logout', services.logout);


//default routes TODO
route.get('/', (req, res) => {
    res.redirect('profile');
});
route.get('/profile', services.profile);



module.exports = route