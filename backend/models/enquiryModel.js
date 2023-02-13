const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        phone: {
          type: Number,
          required: true,
        },
        message: {
          type: String,
          required: false,
        },
        enquiryFor: {
          type: String,
          required: false,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        resolvedAt: {
          type: Date,
          default: Date.now,
         },
    },
    
);



module.exports = mongoose.model("Enquiry", enquirySchema);