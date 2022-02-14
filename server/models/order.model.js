const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({

    startDate: {
        type: Date,
        required: [true, "Please select start date!"],
    },

    endDate: {
        type: Date,
        required: [true, "Please select end date!"],
    },

    rentalDuration: {
        type: Number,
    },
   

    totalCost: {
        type: Number,
    },

    model: {
        type: String,
    },

    image: {
        type: String
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" //Same collection name that is in user.model
    }
}, {timestamps: true})

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;