const express = require("express");
const { newEnquiry, getAllEnquiries, updateEnquiry, deleteEnquiry, } = require("../controllers/enquiryController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");



router.route("/enquiry/new").post(newEnquiry);

//Admin Routes
router.route("/admin/enquiries").get(isAuthenticatedUser,authorizeRoles("admin"),getAllEnquiries);

router.route("/admin/enquiry/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateEnquiry).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteEnquiry);







module.exports = router;