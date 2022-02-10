const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const vehicleRoutes = require("../routes/vehicle.routes");

const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, "First name is required!"],
        minlength: [3, "Length must be at least 3 characters!"] 
    },

    lastName: {
        type: String,
        required: [true, "Last name is required!"],
        minlength: [3, "Length must be at least 3 characters!"] 
    },
    username: {
        type: String,
        required: [true, "Username is required"]
    },

    email: {
        type: String,
        required: [true, "Email address is required"]
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Password MUST be at least 8 characters"]
    },
}, {timestamps: true})

UserSchema.virtual("confirmPassword")//setting a virtual field for confirm field
.get(() => this._confirmPassword)
.set((value)=> this._confirmPassword = value)

UserSchema.pre("validate", function(next){

    if(this.password !== this.confirmPassword){
        this.invalidate("confirmPassword", "Passwords must match!")
        console.log("Passwords dont' match")
    }

    next()//if passwords do match, then the next "pre" will be called
})

UserSchema.pre("save", function(next){
    console.log("Message 5: pre save section")
    bcrypt.hash(this.password, 10)
        .then((hashedPassword) => {
        this.password = hashedPassword; //pretty mauch setting the password to the shashed password
        next()
        })
})

const User = mongoose.model("User", UserSchema);

module.exports = User;