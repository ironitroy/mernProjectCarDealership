const Career = require("../models/careerModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const path = require('path');
const fs = require('fs');

const multer = require("multer");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/pdfs");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PDF is allowed."), false);
  }
};
const upload = multer({
  storage,
  fileFilter,
});



//Create new Career
exports.newCareer = catchAsyncErrors(async (req, res, next) => {
  const pdf = upload.single("pdf");
  pdf(req, res, async (error) => {
    if (error) {
      return next(new ErrorHandler(error.message, 400));
    }

    const pdfLink = req.file.path;
    const career = await Career.create({
      ...req.body,
      pdf: pdfLink,
    });

    res.status(201).json({
      success: true,
      career,
    });
  });
});


// get all Career -- Admin
exports.getAllCareers = catchAsyncErrors(async (req, res, next) => {
    const careers = await Career.find();

  
    res.status(200).json({
      success: true,
      careers,
    });
  });


// Delete Career -- Admin
exports.deleteCareer = catchAsyncErrors(async (req, res, next) => {
    const career = await Career.findById(req.params.id);
  
    if (!career) {
      return next(new ErrorHandler("Contact not found with this Id", 404));
    }

    // Delete the PDF file
  const filePath = path.join(`${career.pdf}`);
  fs.unlink(filePath, (err) => {
    if (err) {
      return next(new ErrorHandler(`Error deleting file: ${err}`, 500));
    }
  });
  
    await career.remove();
  
    res.status(200).json({
      success: true,
    });
  });
  