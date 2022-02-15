const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 

module.exports = {

    register: (req, res) => {
        const user = new User(req.body);  // creating an instance of the user 
        user.save()   // this is refrencing the pre save middleware in model file
            .then((newUser)=> {
                console.log("Successfully registered", newUser);
                res.json({
                    successMessage: "Thank you for registering!",
                    user: newUser
                })
            })
            .catch((err) =>{
                console.log("Registration is not successful", err)
                res.status(400)
            })
    },


    login: (req, res) => {
        User.findOne({email: req.body.email}) //searching the DB by email to see if it exists (re.body is what we get sent from fromnt end for querry)
            .then((userRecord) =>{
                if(userRecord === null){// checking whether we get anything back that matches the email, if nothing comes back, then user does not exist in DB
                    res.status(400).json({message: "Invalid Login Attempt"})
                }else{
                    bcrypt.compare(req.body.password, userRecord.password) //comparing the password in userRecord, which is in DB with users input 
                        .then((isPasswordValid)=> {
                            if(isPasswordValid) {   
                            console.log("Password is valid");
                            res.cookie( // creating a cookie
                                "usertoken",
                                jwt.sign(
                                    {
                                        id: userRecord._id,
                                        email: userRecord.email,
                                        username: userRecord.username,
                                        firstName: userRecord.firstName
                                    },
                                    process.env.JWT_SECRET
                                ),
                                {
                                    httpOnly: true,
                                    expires: new Date(Date.now()+ 900000)
                                },
                            ).json({
                                message: "Successfully Logged In",
                                userLoggedIn: userRecord.username,
                                userId: userRecord._id
                            });
                            } else{
                                res.status(400).json({
                                    message: "Login and/or Email is invalid"
                                })
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(400).json({
                                message: "Invalid Attempt"
                            })
                        })
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({
                    message: "Invalid Attempt"
                })
            })
    },

    logout: (req, res) => {
        console.log("logging out");
        res.clearCookie("usertoken");
        res.json({
            message: "You have successfully logged out!",
        });
    },

    getLoggedInUser: (req, res) => {
        User.findOne({ _id: req.jwtpayload.id })
            .then(user => res.json(user))
            .catch(err => res.json(err))
    },
    
    findAllUsers: (req, res) => {
        User.find()
            .then((allUsers) => {
                console.log(allUsers);
                res.json(allUsers);
            })
            .catch((err) => {
                console.log("Find All Users failed");
                res.json({ message: "Something went wrong in findAll", error: err })
            })
    },
}
