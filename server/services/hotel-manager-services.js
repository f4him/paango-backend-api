
const rooms = require('../models/room');


exports.room_list = function(req, res) {

    id = req.session.userId
      
    rooms.find({ hotel: id},(err, data) => {
        if (!err) {
            res.render("room-list", {title: "Room list",isloggedin: req.session.username, role:req.session.role, data: data});
        } else {
            console.log('Error: ' + err);
        }
    });
 
}