const express = require('express');
const route = express.Router()

const services = require('../services/services');
const authservices = require('../services/auth-services');
// const controller = require('../controller/controller'); //TODO
const util =  require('../util/util');
const granted = require('../util/permission');


const upload = require("../util/multer");

// ADMIN ROUTES **************************************

const admin_services = require('../services/admin-services');

route.get('/add-hotel-manager' , admin_services.add_hotel_manager_view);
route.post("/add-hotel-manager", upload.single("image"), admin_services.add_hotel_manager_create);
route.get('/hotel-manager-list' , admin_services.hotel_manager_list);
route.get('/update-hotel-manager/:id', admin_services.update_hotel_manager_form);
route.post('/update-hotel-manager/:id', admin_services.update_hotel_manager);
route.get('/delete-hotel-manager/:id', admin_services.delete_hotel_manager);


route.get('/add-field-agent' , admin_services.add_field_agent_view);
route.post('/add-field-agent' , admin_services.add_field_agent_create);
route.get('/field-agent-list' , admin_services.field_agent_list);
route.get('/update-field-agent/:id', admin_services.update_field_agent_form);
route.post('/update-field-agent/:id', admin_services.update_field_agent);
route.get('/delete-field-agent/:id', admin_services.delete_field_agent);

route.get('/add-guide' , admin_services.add_guide_view);
route.post('/add-guide' , admin_services.add_guide_create);
route.get('/guide-list' , admin_services.guide_list);
route.get('/update-guide/:id', admin_services.update_guide_form);
route.post('/update-guide/:id', admin_services.update_guide);
route.get('/delete-guide/:id', admin_services.delete_guide);

route.get('/add-rental-manager' , admin_services.add_rental_manager_view);
route.post('/add-rental-manager' , admin_services.add_rental_manager_create);
route.get('/rental-manager-list' , admin_services.rental_manager_list);
route.get('/update-rental-manager/:id', admin_services.update_rental_manager_form);
route.post('/update-rental-manager/:id', admin_services.update_rental_manager);
route.get('/delete-rental-manager/:id', admin_services.delete_rental_manager);

route.get('/add-admin' , admin_services.add_admin_view);
route.post('/add-admin' , admin_services.add_admin_create);
route.get('/admin-list' , admin_services.admin_list);
route.get('/update-admin/:id', admin_services.update_admin_form);
route.post('/update-admin/:id', admin_services.update_admin);
route.get('/delete-admin/:id', admin_services.delete_admin);

route.get('/add-room/', admin_services.add_room_view);
route.post('/add-room/', admin_services.add_room_create);

// HOTEL MANAGER ROUTES **************************************


// const hotel_manager_services = require('../services/hotel-manager-services');




// auth routes

route.get('/login', util.redirectifauth, authservices.login);
route.post('/login', authservices.loggingin);



//auth routes
route.get('/logout', authservices.logout);

























// MANAGER ROUTES ************************************
//get own room list
route.get('/roomlist',granted.formanager, services.roomlist);



//default routes TODO
route.get('/', (req, res) => {
    res.redirect('profile');
});


route.get('/profile', services.profile);



module.exports = route