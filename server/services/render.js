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
                    
                    res.redirect('/dashboard')
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



exports.dashboard = (req, res) => {
    console.log(req.user);  
    console.log(req.session.role)
    res.render('dashboard',{title: 'dashboard', isloggedin: req.session.userId, role:req.session.role});
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


exports.updateuser = (req, res)=>{
    
    const id = req.params.id;
    console.log(id)
    users.findByIdAndUpdate(id, req.body, {new: true}, (req,res) =>{
        console.log(req.body)
    }
        
    )


    res.redirect('')



    
    
    
}
