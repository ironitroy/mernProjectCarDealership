const app = require("./app");

const dotenv = require("dotenv");
const cloudinary = require("cloudinary")
const connectDatabase = require("./config/database")


const multer = require("multer");



//Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
})



//Config
dotenv.config({path:"backend/config/config.env"});


//Connect to Database
connectDatabase()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const server = app.listen(process.env.PORT,()=>{

    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})






//Unhandled Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    });

});



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


