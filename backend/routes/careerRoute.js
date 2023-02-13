const express = require("express");
const { newCareer, getAllCareers, deleteCareer } = require("../controllers/careerController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");



router.route("/career/new").post(newCareer);    

//Admin Routes
router.route("/admin/careers").get(isAuthenticatedUser,authorizeRoles("admin"),getAllCareers);

router.route("/admin/career/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteCareer);




module.exports = router;