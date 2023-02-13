const express = require("express");
const { newContact, getAllContacts, deleteContact } = require("../controllers/contactController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");



router.route("/contact/new").post(newContact);

//Admin Routes
router.route("/admin/contacts").get(isAuthenticatedUser,authorizeRoles("admin"),getAllContacts);

router.route("/admin/contact/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteContact);



module.exports = router;