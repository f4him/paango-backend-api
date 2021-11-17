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
// route.post('/user/:id', services.updateuser);


route.post('/user/:id', function (req, res) {
    var id = req.params.id;

    users.findById(id, function (err, user) {
        if (!user) {
            res.statusCode = 404;
            return res.json({
                error: 'Not found'
            });
        }
        if(!req.body.username){
            user.username = user.username
        }
        else{
            user.username = req.body.username
        }
        if(!req.body.password){
            user.password = user.password
        }
        else{
            user.password = req.body.password
        }
        // user.username = req.body.username;
        user.save(function (err) {
            if (!err) {
                return res.redirect('/userlist');
            } else {
                if (err.name === 'ValidationError') {
                    res.statusCode = 400;
                    return res.json({
                        error: 'Validation error'
                    });
                } else {
                    res.statusCode = 500;

                    return res.json({
                        error: 'Server error'
                    });
                }
            }
        });
    });
});






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
    res.redirect('dashboard');
});
route.get('/dashboard', services.dashboard);



module.exports = route