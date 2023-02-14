const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path")



const errorMiddleware = require("./middleware/error");


if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


//Route Imports
const car = require("./routes/carRoute");
const user = require("./routes/userRoute");
const enquiry = require("./routes/enquiryRoute");
const contact = require("./routes/contactRoute");
const career = require("./routes/careerRoute");



app.use("/api/v1",car);
app.use("/api/v1",user);
app.use("/api/v1",enquiry);
app.use("/api/v1",contact);
app.use("/api/v1",career);
app.use("/public/pdfs", express.static("public"));

app.use(express.static(path.join(__dirname,'build')));

app.get("*",(req, res) => {
    res.sendFile(path.resolve(__dirname, 'build','index.html'));
  });




app.get("/public/pdfs/:filename", (req, res) => {
    res.download(`public/pdfs/${req.params.filename}`);
  });

//Middleware for Errors
app.use(errorMiddleware);

module.exports = app