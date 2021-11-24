
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

const rooms = require('../models/room');
const bookings = require('../models/booking');
const hotel_managers = require('../models/hotel-manager');

exports.free_now_get = (req, res) => {
    data = {_id: 1}
    console.log(data._id)
    res.render('free-room',{data:data, title: 'free rooms', isloggedin: req.session.userId, username: req.session.username, role:req.session.role});

}

exports.free_now_post = async (req, res) => {

    const from_date = new Date(req.body.from)
    const to_date = new Date(req.body.to)
    console.log(from_date)
    console.log(to_date)


    // const all = await bookings
    //     .find({ start: { $gte: from_date, $lte: to_date } })
    
    
    
    
    const booking = await bookings
      .find({
              $or: [
                      { from: { $gte: from_date, $lte: to_date } },
                      { to: { $gte: from_date, $lte: to_date }},
                      { $and: [{ from: { $lte: from_date } }, { to: { $gte: to_date } }] },
                  ],
              })
              .select('room');
              
    const roomIds = booking ? booking.map(b => b.room) :null 
    // const availableRooms = await rooms.find({ _id: { $nin: roomIds } })


    const availableRooms = await rooms
  .find({ _id: { $nin: roomIds } })
  .populate('hotel', 'username password hotelname role location img')

            console.log(availableRooms)



            // const booking = await bookings
            // // .find({from:{ $lte:from_date}})
            //         .find({ from:  {$gte: from_date, $lte: to_date} })
            //         // .select('room');
            
            
            console.log(booking)






    res.render('free-room',{data:{}, title: 'free rooms', isloggedin: req.session.userId, username: req.session.username, role:req.session.role});

}