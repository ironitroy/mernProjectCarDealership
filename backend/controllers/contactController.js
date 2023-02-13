const Contact = require("../models/contactModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//Create new Contact
exports.newContact = catchAsyncErrors(async (req, res, next) => {


    const contact = await Contact.create(req.body);

    res.status(201).json({
        success:true,
        contact,
    });
});


// get all Contacts -- Admin
exports.getAllContacts = catchAsyncErrors(async (req, res, next) => {
    const contacts = await Contact.find();

  
    res.status(200).json({
      success: true,
      contacts,
    });
  });


// Delete Contact -- Admin
exports.deleteContact = catchAsyncErrors(async (req, res, next) => {
    const contact = await Contact.findById(req.params.id);
  
    if (!contact) {
      return next(new ErrorHandler("Contact not found with this Id", 404));
    }
  
    await contact.remove();
  
    res.status(200).json({
      success: true,
    });
  });
  