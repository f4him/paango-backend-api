
const rooms = require('../models/room');
const bookings = require('../models/booking');


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


exports.add_booking_create = async (req, res) => {
          
  
    let booking = new bookings({
      from: req.body.from,
      to: req.body.to,
      room: req.params.id
    });

    await booking.save();

    res.redirect("/room-list")
 }