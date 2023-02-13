const Enquiry = require("../models/enquiryModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


//Create new Enquiry
exports.newEnquiry = catchAsyncErrors(async (req, res, next) => {


    const enquiry = await Enquiry.create(req.body);

    res.status(201).json({
        success:true,
        enquiry,
    });
});


// get all Enquries -- Admin
exports.getAllEnquiries = catchAsyncErrors(async (req, res, next) => {
    const enquiries = await Enquiry.find();

  
    res.status(200).json({
      success: true,
      enquiries,
    });
  });



// Update Enquiry Status -- Admin
exports.updateEnquiry = catchAsyncErrors(async (req, res, next) => {
    const enquiry = await Enquiry.findById(req.params.id);
  
    if (!enquiry) {
      return next(new ErrorHandler("No Enquiry found with this Id", 404));
    }
  
    if (enquiry.enquiryItem.enquiryStatus === "Resolved") {
      return next(new ErrorHandler("You have already resolved this enquiry", 400));
    }
  
    enquiry.enquiryItem.enquiryStatus = req.body.status;
  
    if (req.body.status === "Resolved") {
        enquiry.enquiryItem.resolvedAt = Date.now();
    }
  
    await enquiry.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  });


// Delete Enquiry -- Admin
exports.deleteEnquiry = catchAsyncErrors(async (req, res, next) => {
    const enquiry = await Enquiry.findById(req.params.id);
  
    if (!enquiry) {
      return next(new ErrorHandler("Enquiry not found with this Id", 404));
    }
  
    await enquiry.remove();
  
    res.status(200).json({
      success: true,
    });
  });





