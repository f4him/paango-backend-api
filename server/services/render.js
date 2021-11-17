const bcrypt = require('bcrypt');
const users = require('../models/users');
const rooms = require('../models/rooms');

exports.adduser = (req, res) => {
    
    res.render('adduser',{title:'Add user', isloggedin: req.session.userId});
}


exports.createuser = (req, res) => {
    users.create(req.body, (error, post) => {
        console.log('User added')
        res.redirect('/adduser')
    })
}

exports.addhotel =  (req, res) => {
    res.render("addhotel", {title: "Add a hotel",isloggedin: req.session.userId});
}



exports.createhotel = (req, res) => {

    req.body['role']='manager';
    users.create(req.body, (error, post) => {
        res.redirect('/addhotel')
    })
}



exports.addroom =  (req, res) => {


    users.find({role:'manager'},(err, data) => {
        if (!err) {
            res.render("addroom", {
                title: "Add a hotel",
                data: data,
                isloggedin: req.session.userId
            });
        } else {
            console.log('Error: ' + err);
        }
    });
}




exports.createroom = (req, res) => {
    rooms.create(req.body, (error, post) => {
        res.redirect('/addroom')
    })
}


exports.login = (req, res) => {
    res.render('login', {title:'Login', isloggedin: req.session.userId});
}


exports.loggingin = (req, res) => {
    const {
        username,
        password
    } = req.body;
    // try to find the user
    users.findOne({
        username
    }, (error, user) => {
        if (user) {
            // compare passwords.
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    // store user session.
                    req.session.userId = user._id
                    req.session.username = user.username
                    req.session.role = user.role

                    
                    res.redirect('/profile')
                } else {
                    res.send("password error")
                }
            })
        } else {
            return res.send('username not found')
        }
    })
}



exports.logout =   (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
}



exports.userlist = function(req, res) {
      
    users.find((err, data) => {
        if (!err) {
            res.render("userlist", {
                title: "userlist",
                isloggedin: req.session.username,
                data: data
            });
        } else {
            console.log('Error: ' + err);
        }
    });
 
}



exports.roomlist = function(req, res) {
      
    rooms.find({hotel:req.session.userId},(err, data) => {
        if (!err) {
            res.render("roomlist", {
                title: "roomlist",
                isloggedin: req.session.username,
                data: data
            });
        } else {
            console.log('Error: ' + err);
        }
    });
 
}



exports.profile = (req, res) => {
    console.log(req.user);  
    console.log(req.session.role)
    res.render('profile',{title: 'profile', isloggedin: req.session.userId, username: req.session.username, role:req.session.role});
}


exports.updateuserform = (req, res)=>{

    const id = req.params.id;

    users.findById(id)
        .then(data =>{
            if(!data){
                res.status(404).send({ message : "Not found user with id "+ id})
            }else{
                // res.send(data)
                // console.log(data)
                res.render('updateuser',{ user: data,title:'update user', isloggedin: req.session.userId})
            }
        })
        .catch(err =>{
            res.status(500).send({ message: "Erro retrieving user with id " + id})
        })
    }


exports.updateuser = (req, res) => {
        const id = req.params.id
    
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
        })
    }



    exports.deleteuser = (req, res) => {          
          var deleteId= req.params.id;
          var user = users.findById(deleteId)





          users.findByIdAndDelete(deleteId,function(data){
             res.redirect('/userlist')
          });
        }