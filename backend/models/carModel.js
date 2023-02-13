const mongoose = require( "mongoose");

const carSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter Car Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please enter Car Description"]
    },
    price:{
        type:Number,
        required:[true,"Please enter Car Price"],
        maxLength:[8,"Price cannot exceed 8 characters"]
    },
    make:{
        type:String,
        required:[true,"Please enter Car Make, eg: Hyundai, Toyota,etc."]
    },
    model:{
        type:String,
        required:[true,"Please enter Car Model"]
    },
    bodyType:{
        type:String,
        required:[true,"Please enter Car Body Type, eg: SUV, Sports"]

    },
    transmission:{
        type:String,
        required:[true,"Please enter Car Transmission, eg: Automatic, Manual"]
    },
    engine:{
        type:String,
        required:[true,"Please enter Car Cylinders/Engine"]
    },
    fuelType:{
        type:String,
        required:[true,"Please enter Car Fuel Type, eg: Gas, Diesel, Hybrid"]
    },
    year:{
        type:Number,
        required:[true,"Please enter Car Year, eg: 2022"]
    },
    exteriorColor:{
        type:String,
        required:[true,"Please enter Car Exterior Color, eg: Black, Blue, Gray,etc."]
    },
    interiorColor:{
        type:String,
        required:[true,"Please enter Car Interior Color, eg: Beige, Amber, Black,etc."]
    },
    mileage:{
        type: Number,
        required: false,
    },
    vin:{
        type: String,
        required: false,
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
    createdAt:{
        type:Date,
        default:Date.now
    }    
})


module.exports = mongoose.model("Car",carSchema)