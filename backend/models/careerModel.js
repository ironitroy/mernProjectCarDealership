const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema({
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        message: {
          type: String,
          required: false,
        },
        pdf: {
          type: String,
          required: false
      },
        createdAt: {
          type: Date,
          default: Date.now,
        },
    },
    
);



module.exports = mongoose.model("Career", careerSchema);