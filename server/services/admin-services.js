// ALL "ADMIN 2 OTHER USER" SERVICES 

// 5 routes for each user
// render create user form
// create user
// user list
// render update user form
// update user
// delete user (redirect to user list)

const cloudinary = require("../util/cloudinary");

//model declarations
const hotel_managers = require('../models/hotel-manager');
const field_agents = require('../models/field-agent');
const guides = require('../models/guide');
const rental_managers = require('../models/rental-manager');
const admins = require('../models/admin');
const rooms = require('../models/room');
const vehicles = require('../models/vehicle');
const bookings = require('../models/booking');

//hotel manager
exports.add_hotel_manager_view =  (req, res) => {
    res.render("add-hotel-manager", {title: "Add a hotel manager",isloggedin: req.session.userId, role:req.session.role});
}



exports.add_hotel_manager_create = async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
  
      // Create new user
      let user = new hotel_managers({
        username: req.body.username,
        password: req.body.password,
        hotelname: req.body.hotelname,
        location: req.body.location,
        img: result.secure_url,
      });
      // Save user
      await user.save();
      res.redirect('/add-hotel-manager');
    } catch (err) {
      res.send(err)
    }
  }



exports.hotel_manager_list = function(req, res) {
      
    hotel_managers.find((err, data) => {
        if (!err) {
            res.render("hotel-manager-list", {title: "Hotel manager list",isloggedin: req.session.username, role:req.session.role, data: data});
        } else {
            console.log('Error: ' + err);
        }
    });
 
}

exports.update_hotel_manager_form = (req, res)=>{

    const id = req.params.id;

    hotel_managers.findById(id)
        .then(data =>{
            if(!data){
                res.status(404).send({ message : "Not found user with id "+ id})
            }else{

                res.render('update-hotel-manager',{ user: data,title:'update hotel manager info', isloggedin: req.session.userId, role:req.session.role})
            }
        })
        .catch(err =>{
            res.status(500).send({ message: "Error retrieving user with id " + id})
        })
    }


exports.update_hotel_manager = (req, res) => {
    const id = req.params.id

    hotel_managers.findById(id, function (err, user) {
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
        if(!req.body.hotelname){
            user.hotelname = user.hotelname
        }
        else{
            user.hotelname = req.body.hotelname
        }
        if(!req.body.location){
            user.location = user.location
        }
        else{
            user.location= req.body.location
        }




        user.save(function (err) {
            if (!err) {
                return res.redirect('/hotel-manager-list');
            } else {
                return res.json({
                    error: 'Something went wrong'
                });
            }
        });
    })
}



exports.delete_hotel_manager = (req, res) => {          
    var deleteId= req.params.id;
    
    hotel_managers.findByIdAndDelete(deleteId,function(data){
       res.redirect('/hotel-manager-list')
    });
  }



//field agent
exports.add_field_agent_view =  (req, res) => {
    res.render("add-field-agent", {title: "Add a field agent",isloggedin: req.session.userId, role:req.session.role});
}

exports.add_field_agent_create = (req, res) => {
    req.body['role']='field_agent';
    field_agents.create(req.body, (error, post) => {
        res.redirect("add-field-agent")
    })
}

exports.field_agent_list = function(req, res) {
      
    field_agents.find((err, data) => {
        if (!err) {
            res.render("field-agent-list", {title: "Field agent list",isloggedin: req.session.username, role:req.session.role, data: data});
        } else {
            console.log('Error: ' + err);
        }
    });
 
}

exports.update_field_agent_form = (req, res)=>{

    const id = req.params.id;

    field_agents.findById(id)
        .then(data =>{
            if(!data){
                res.status(404).send({ message : "Not found user with id "+ id})
            }else{

                res.render('update-field-agent',{ user: data,title:'update field agent info', isloggedin: req.session.userId, role:req.session.role})
            }
        })
        .catch(err =>{
            res.status(500).send({ message: "Error retrieving user with id " + id})
        })
    }

    exports.update_field_agent = (req, res) => {
        const id = req.params.id
    
        field_agents.findById(id, function (err, user) {
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
            user.save(function (err) {
                if (!err) {
                    return res.redirect('/field-agent-list');
                } else {
                    return res.json({
                        error: 'Something went wrong'
                    });
                }
            });
        })
    }
    

    exports.delete_field_agent = (req, res) => {          
        var deleteId= req.params.id;
        
        field_agents.findByIdAndDelete(deleteId,function(data){
           res.redirect('/field-agent-list')
        });
      }
    


//guide
exports.add_guide_view =  (req, res) => {
    res.render("add-guide", {title: "Add a guide",isloggedin: req.session.userId, role:req.session.role});
}

exports.add_guide_create = (req, res) => {
    req.body['role']='guide';
    guides.create(req.body, (error, post) => {
        res.redirect("add-guide")
    })
}

exports.guide_list = function(req, res) {
      
    guides.find((err, data) => {
        if (!err) {
            res.render("guide-list", {title: "Guide list",isloggedin: req.session.username, role:req.session.role, data: data});
        } else {
            console.log('Error: ' + err);
        }
    });
 
}

exports.update_guide_form = (req, res)=>{

    const id = req.params.id;

    guides.findById(id)
        .then(data =>{
            if(!data){
                res.status(404).send({ message : "Not found user with id "+ id})
            }else{

                res.render('update-guide',{ user: data,title:'update guide info', isloggedin: req.session.userId, role:req.session.role})
            }
        })
        .catch(err =>{
            res.status(500).send({ message: "Error retrieving user with id " + id})
        })
}

exports.update_guide = (req, res) => {
    const id = req.params.id

    guides.findById(id, function (err, user) {
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

        if(!req.body.availability){
            user.availability = user.availability
        }
        else{
            user.availability= req.body.availability
        }


        if(!req.body.location){
            user.location = user.location
        }
        else{
            user.location = req.body.location
        }


        if(!req.body.base_price){
            user.base_price = user.base_price
        }
        else{
            user.base_price = req.body.base_price
        }

        if(!req.body.site_list){
            user.site_list = user.site_list
        }
        else{
            user.site_list = req.body.site_list
        }


        user.save(function (err) {
            if (!err) {
                return res.redirect('/guide-list');
            } else {
                return res.json({
                    error: 'Something went wrong'
                });
            }
        });
    })
}


exports.delete_guide = (req, res) => {          
    var deleteId= req.params.id;
    
    guides.findByIdAndDelete(deleteId,function(data){
       res.redirect('/guide-list')
    });
  }





//rental manager
exports.add_rental_manager_view =  (req, res) => {
    res.render("add-rental-manager", {title: "Add a rental manager",isloggedin: req.session.userId, role:req.session.role});
}

exports.add_rental_manager_create = (req, res) => {
    req.body['role']='rental_manager';
    rental_managers.create(req.body, (error, post) => {
        res.redirect("add-rental-manager")
    })
}

exports.rental_manager_list = function(req, res) {
      
    rental_managers.find((err, data) => {
        if (!err) {
            res.render("rental-manager-list", {title: "Rental manager list",isloggedin: req.session.username, role:req.session.role, data: data});
        } else {
            console.log('Error: ' + err);
        }
    });
 
}

exports.update_rental_manager_form = (req, res)=>{

    const id = req.params.id;

    rental_managers.findById(id)
        .then(data =>{
            if(!data){
                res.status(404).send({ message : "Not found user with id "+ id})
            }else{

                res.render('update-rental-manager',{ user: data,title:'update rental manager info', isloggedin: req.session.userId, role:req.session.role})
            }
        })
        .catch(err =>{
            res.status(500).send({ message: "Error retrieving user with id " + id})
        })
    }

    exports.update_rental_manager = (req, res) => {
        const id = req.params.id
    
        rental_managers.findById(id, function (err, user) {
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
            user.save(function (err) {
                if (!err) {
                    return res.redirect('/rental-manager-list');
                } else {
                    return res.json({
                        error: 'Something went wrong'
                    });
                }
            });
        })
    }
    


    exports.delete_rental_manager = (req, res) => {          
        var deleteId= req.params.id;
        
        rental_managers.findByIdAndDelete(deleteId,function(data){
           res.redirect('/rental-manager-list')
        });
      }
    


//admin

exports.add_admin_view =  (req, res) => {
    res.render("add-admin", {title: "Add an admin",isloggedin: req.session.userId, role:req.session.role});
}

exports.add_admin_create = (req, res) => {
    req.body['role']='admin';
    admins.create(req.body, (error, post) => {
        res.redirect("add-admin")
    })
}

exports.admin_list = function(req, res) {
      
    admins.find((err, data) => {
        if (!err) {
            res.render("admin-list", {title: "Admin list",isloggedin: req.session.username, role:req.session.role, data: data});
        } else {
            console.log('Error: ' + err);
        }
    });
 
}

exports.update_admin_form = (req, res)=>{

    const id = req.params.id;

    admins.findById(id)
        .then(data =>{
            if(!data){
                res.status(404).send({ message : "Not found user with id "+ id})
            }else{

                res.render('update-admin',{ user: data,title:'update admin info', isloggedin: req.session.userId, role:req.session.role})
            }
        })
        .catch(err =>{
            res.status(500).send({ message: "Error retrieving user with id " + id})
        })
    }

    exports.update_admin = (req, res) => {
        const id = req.params.id
    
        admins.findById(id, function (err, user) {
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
            user.save(function (err) {
                if (!err) {
                    return res.redirect('/admin-list');
                } else {
                    return res.json({
                        error: 'Something went wrong'
                    });
                }
            });
        })
    }
    

    exports.delete_admin = (req, res) => {          
        var deleteId= req.params.id;
        
        admins.findByIdAndDelete(deleteIadminsd,function(data){
           res.redirect('/admin-list')
        });
      }
    





      exports.add_room_view = (req, res) => {       
        id = req.params.id
        hotel_managers.findById(id)
        .then(data =>{
            if(!data){
                res.status(404).send({ message : "Not found user with id "+ id})
            }else{

                res.render('add-room',{user: data,title:'Add a room', isloggedin: req.session.userId, role:req.session.role})
            }
        })
        .catch(err =>{
            res.status(500).send({ message: "Error retrieving user with id " + id})
        })
      
    }
  

    exports.add_room_create = async (req, res) => {
          const urls = [];
          const files = req.files;
          for (const file of files) {
            const { path } = file;
            const result = await cloudinary.uploader.upload(path);
          //   const newPath = await cloudinaryImageUploadMethod(path);
            urls.push(result.secure_url);
          }
  
          let room = new rooms({
            roomid: req.body.roomid,
            type: req.body.type,
            hotel: req.params.id,
            price: req.body.price,
            capacity: req.body.capacity,
            facilities: req.body.facilities,
            amenities:req.body.amenities,
            img: urls
          });
          // console.log(room)
          await room.save();

          res.redirect("#")
       }
  
  

       exports.room_list = function(req, res) {

          id = req.params.id
            
          rooms.find({ hotel: id},(err, data) => {
              if (!err) {
                  res.render("room-list", {title: "Room list",isloggedin: req.session.username, role:req.session.role, data: data});
              } else {
                  console.log('Error: ' + err);
              }
          });
       
      }


      exports.delete_room = (req, res) => {          
          var deleteId= req.params.id;
          
          rooms.findByIdAndDelete(deleteId,function(data){
             res.redirect('/hotel-manager-list')
          });
        }
      
  





      exports.add_vehicle_view = (req, res) => {       
        id = req.params.id
        rental_managers.findById(id)
        .then(data =>{
            if(!data){
                res.status(404).send({ message : "Not found user with id "+ id})
            }else{

                res.render('add-vehicle',{user: data,title:'Add a vehicle', isloggedin: req.session.userId, role:req.session.role})
            }
        })
        .catch(err =>{
            res.status(500).send({ message: "Error retrieving user with id " + id})
        })
      
    }
  

    exports.add_vehicle_create = async (req, res) => {
          
  
          let vehicle = new vehicles({
            vehicled: req.body.vehicleid,
            type: req.body.type,
            rental: req.params.id,
            cost: req.body.cost,
            capacity: req.body.capacity,
            facilities: req.body.facilities,
          });

          await vehicle.save();

          res.redirect("#")
       }
  
  

       exports.vehicle_list = function(req, res) {

          id = req.params.id
            
          vehicles.find({ rental: id},(err, data) => {
              if (!err) {
                  res.render("vehicle-list", {title: "Vehicle list",isloggedin: req.session.username, role:req.session.role, data: data});
              } else {
                  console.log('Error: ' + err);
              }
          });
       
      }


      exports.delete_vehicle = (req, res) => {          
          var deleteId= req.params.id;
          
          vehicles.findByIdAndDelete(deleteId,function(data){
             res.redirect('/rental-manager-list')
          });
        }
      
  

        exports.view_booking = function(req, res) {

            id = req.params.id
              
            bookings.find({ room: id},(err, data) => {
                if (!err) {
                    res.render("booking-list", {title: "booking list",isloggedin: req.session.username, role:req.session.role, data: data});
                } else {
                    console.log('Error: ' + err);
                }
            });
         
        }
  