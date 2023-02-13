const Car = require("../models/carModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

//Create Car -- Admin
exports.createCar = catchAsyncErrors(async (req, res, next) => {

  let images = [];

  if (typeof req.body.images === "string") {
  images.push(req.body.images);
  }
  else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "cars",
    });
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    })
  }

  req.body.images = imagesLinks;

  req.body.user = req.user.id;
  const car = await Car.create(req.body);

  res.status(201).json({
    success: true,
    car,
  });
});


//Get All Cars ADMIN
exports.getAdminCars = catchAsyncErrors(async (req, res,) => {
  const cars = await Car.find();
  
  res.status(200).json({
    success: true,
    cars,
  });
});



//Get All Cars
exports.getAllCars = catchAsyncErrors(async (req, res,) => {

  const resultPerPage = 9; //Pagination feature: No. of Car Listings to display in one page

  const carsCount = await Car.countDocuments(); //No. of Cars

  const apiFeature = new ApiFeatures(Car.find(), req.query)
    .search()
    .filter()
    


    let cars = await apiFeature.query;

    let filteredCarsCount = cars.length;

    apiFeature.pagination(resultPerPage);

  cars = await apiFeature.query;
  res.status(200).json({
    success: true,
    cars,
    carsCount,
    resultPerPage,
    filteredCarsCount,
  });
});




//Get Car Details
exports.getCarDetails = catchAsyncErrors(async (req, res, next) => {
  const car = await Car.findById(req.params.id);

  if (!car) {
    return next(new ErrorHandler("Car Listing not found!", 404));
  }

  res.status(200).json({
    success: true,
    car,
  });
});

//Update Car -- Admin

exports.updateCar = catchAsyncErrors(async (req, res, next) => {
  let car = await Car.findById(req.params.id);

  if (!car) {
    return next(new ErrorHandler("Car Listing not found!", 404));
  }

  //Images start here
  let images = [];

  if (typeof req.body.images === "string") {
  images.push(req.body.images);
  }
  else {
    images = req.body.images;
  }
  if (images !== undefined){

    //Delete images from cloudinary
  for (let i = 0; i < car.images.length; i++) {
    await cloudinary.v2.uploader.destroy(car.images[i].public_id);
  };
  
  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "cars",
    });
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    })
    }

  req.body.images = imagesLinks;

  }

  car = await Car.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    car,
  });
});

//Delete Car -- Admin

exports.deleteCar = catchAsyncErrors(async (req, res, next) => {
  const car = await Car.findById(req.params.id);

  if (!car) {
    return next(new ErrorHandler("Car Listing not found!", 404));
  }

  //Delete images from cloudinary
  for (let i = 0; i < car.images.length; i++) {
    await cloudinary.v2.uploader.destroy(car.images[i].public_id);
  };


  await car.remove();

  res.status(200).json({
    success: true,
    message: "Car Listing Deleted Successfully!",
  });
});
