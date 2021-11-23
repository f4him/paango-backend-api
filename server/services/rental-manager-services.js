
const vehicles = require('../models/vehicle');


exports.vehicle_list = function(req, res) {

    id = req.session.userId
      
    vehicles.find({ hotel: id},(err, data) => {
        if (!err) {
            res.render("vehicle-list", {title: "vehicle list",isloggedin: req.session.username, role:req.session.role, data: data});
        } else {
            console.log('Error: ' + err);
        }
    });
 
}