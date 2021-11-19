
exports.roomlist = function(req, res) {
      
    rooms.find({hotel:req.session.userId},(err, data) => {
        if (!err) {
            res.render("roomlist", {
                title: "roomlist",
                isloggedin: req.session.username,
                data: data,
                role:req.session.role
            });
        } else {
            console.log('Error: ' + err);
        }
    });
 
}



exports.profile = (req, res) => {
    res.render('profile',{title: 'profile', isloggedin: req.session.userId, username: req.session.username, role:req.session.role});
}

