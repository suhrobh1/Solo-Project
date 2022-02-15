const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({

    content: {
        type: String,
    },

    likes: {
        type: Number,
        default: 0
    },

    author:{
        type:String
    },
    
    associatedVehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle"
    },
}, {timestamps: true})

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;