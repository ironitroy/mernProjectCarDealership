const express = require("express");
const { getAllCars,createCar, updateCar, deleteCar, getCarDetails, getAdminCars } = require("../controllers/carController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");
const { route } = require("./userRoute");

const router=express.Router();

//Route to GET ALL CARS LISTING
router.route("/cars").get(getAllCars);  

//Route to GET ALL ADMIN CARS LISTING
router.route("/admin/cars").get(isAuthenticatedUser,authorizeRoles("admin"), getAdminCars); 


//Route to ADD NEW CAR LISTING
router.route("/admin/cars/new").post(isAuthenticatedUser,authorizeRoles("admin"),createCar);  //Remove isAuthenticatedUser from this line of code to allow non registered users to add new car.

//Route to UPDATE CAR LISTING & DELETE CAR LISTING
router
.route("/admin/car/:id")
.put(isAuthenticatedUser,authorizeRoles("admin"),updateCar)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteCar);


router.route("/car/:id").get(getCarDetails);

module.exports = router;