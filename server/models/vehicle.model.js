const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({

    make: {
        type: String,
        required: [true, "A maker is required!"],
        minlength: [3, "Length must be at least 3 characters!"] 
    },

    model: {
        type: String,
        required: [true, "A model is required!"],
        minlength: [3, "Length must be at least 3 characters!"]
    },

    year: {
        type: Number,
        required: [true, "A vehicle's release year is required!"],
        min: [ 1960, "Only vehicles made after 1960 allowed!"] 
    },

    rate: {
        type: Number,
        required: [true, "Rate is required!"],
    },

    
    image:{
        type: String,
        required: [true, "We need a picture!!!!"] //url of image from internet
    },
    
    currentCity: {
        type: String,
        required: [true, "Current location of vehicle is required!"],
    },

    currentState:{
        type: String,
        required: [true, "Current location of vehicle is required!"],
        enum: [
            "AL",
            "AK",
            "MA",
            "WA",
            "OR",
            "FL",
            "CA"
        ]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" //Same collection name that is in user.model
    }


}, {timestamps: true})

const Vehicle = mongoose.model("Vehicle", VehicleSchema);
module.exports = Vehicle;