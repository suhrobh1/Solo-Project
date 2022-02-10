const User = require('../models/user.model');
const Vehicle = require('../models/vehicle.model');
const jwt = require("jsonwebtoken");

module.exports = {

    findAllVehicles: (req, res) =>{
        Vehicle.find()
            .populate("createdBy", "username email")
            .then((allVehicles)=>{
                console.log(allVehicles);
                res.json(allVehicles);
            })
            .catch((err)=>{
                console.log("Find All Vehicles failed");
                res.json({message: "Something went wrong in findAll", error: err})
            })
    },
    createNewVehicle: (req, res)=>{
        const newVehicleObject = new Vehicle(req.body);
                                        
        newVehicleObject.createdBy = req.jwtpayload.id; // decoding the information port, secret word,ect

        newVehicleObject.save()
            .then((newVehicle)=>{
                console.log(newVehicle);
                res.json(newVehicle)
            })
            .catch((err)=>{
                console.log("Something went wrong in createNewVehicle");
                res.status(400).json(err);
            })
    },
    findOneVehicle: (req, res)=>{
        Vehicle.findOne({_id: req.params.id}) 
            .then((oneVehicle)=>{
                console.log(oneVehicle);
                res.json(oneVehicle)
            })
            .catch((err)=>{
                console.log("Find One Vehicle failed");
                res.json({message: "Something went wrong in findOneVehicle", error: err})
            })
    },
    deleteVehicle: (req, res)=>{
        Vehicle.deleteOne({_id: req.params.id})
            .then((deletedVehicle)=>{
                console.log(deletedVehicle);
                res.json(deletedVehicle)
            })
            .catch((err)=>{
                console.log("Delete One Vehicle failed");
                res.json({message: "Something went wrong in deleteOne", error: err})
            })
    },
    updateVehicle: (req, res)=>{
        Vehicle.findOneAndUpdate({_id: req.params.id},
            req.body,
            {new: true, runValidators: true} 
            )
            .then((updatedVehicle)=>{
                console.log(updatedVehicle);
                res.json(updatedVehicle)
            })
            .catch((err)=>{
                console.log("Something went wrong in updateVehicle");
                res.status(400).json(err); 
            })
    }, 
    findAllVehiclesByUser: (req, res) => {
        if(req.jwtpayload.username !== req.params.username){
            User.findOne({username: req.params.username})
                .then((userNotLoggedIn)=>{
                    Vehicle.find({createdBy: userNotLoggedIn._id})
                        .populate("createdBy", "username")
                        .then((allVehiclesFromUser) =>{
                            console.log("Message 3:", allVehiclesFromUser);
                            res.json(allVehiclesFromUser);
                        })
                        .catch((err) => {
                            console.log("Message 4:", err);
                            res.status(400).json(err);
                        })
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json(err);
                })
        }else{
            Vehicle.find({createdBy: req.jwtpayload.id})
                .populate("createdBy", "username")
                .then((allVehiclesFromLoggedInUser) => {
                    console.log(allVehiclesFromLoggedInUser);
                    res.json(allVehiclesFromLoggedInUser);
                })
                .catch((err) =>{
                    console.log(err);
                    res.status(400).json(err);
                })
        }
    }
}