const bcrypt = require('bcrypt');

const hotel_managers = require('../models/hotel-manager');
const field_agents = require('../models/field-agent');
const guides = require('../models/guide');
const rental_managers = require('../models/rental-manager');
const admins = require('../models/admin');


exports.login = (req, res) => {
    res.render('login', {title:'Login', isloggedin: req.session.userId, role:req.session.role});
}


exports.loggingin = async (req, res) => {


    const {
        role,
        username,
        password
    } = req.body;

    if(role == 'admin'){
     
        // try to find the user
    const user = await admins.findOne({username})

    
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


    }


    if(role == 'hotel_manager'){
     
        // try to find the user
    const user = await hotel_managers.findOne({username})

    
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


    }



    if(role == 'rental_manager'){
     
        // try to find the user
    const user = await rental_managers.findOne({username})

    
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


    }


    

    if(role == 'field_agent'){
     
        // try to find the user
    const user = await field_agents.findOne({username})

    
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


    }



    

    if(role == 'guide'){
     
        // try to find the user
    const user = await guides.findOne({username})

    
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


    }

}



// logout
exports.logout =   (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
}
