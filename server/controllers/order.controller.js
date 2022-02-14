const User = require('../models/user.model');
const Order = require('../models/order.model');
const jwt = require("jsonwebtoken");

module.exports = {

    findAllOrders: (req, res) =>{
        Order.find()
            .populate("createdBy", "username email")
            .then((allOrders)=>{
                console.log(allOrders);
                res.json(allOrders);
            })
            .catch((err)=>{
                console.log("Find All Orders failed");
                res.json({message: "Something went wrong in findAll", error: err})
            })
    },
    createNewOrder: (req, res)=>{
        const newOrderObject = new Order(req.body);
                                        
        newOrderObject.createdBy = req.jwtpayload.id; // decoding the information port, secret word,ect

        newOrderObject.save()
            .then((newOrder)=>{
                console.log(newOrder);
                res.json(newOrder)
            })
            .catch((err)=>{
                console.log("Something went wrong in createNewOrder");
                res.status(400).json(err);
            })
    },
    findOneOrder: (req, res)=>{
        Order.findOne({_id: req.params.id}) 
            .then((oneOrder)=>{
                console.log(oneOrder);
                res.json(oneOrder)
            })
            .catch((err)=>{
                console.log("Find One Order failed");
                res.json({message: "Something went wrong in findOneOrder", error: err})
            })
    },
    deleteOrder: (req, res)=>{
        Order.deleteOne({_id: req.params.id})
            .then((deletedOrder)=>{
                console.log(deletedOrder);
                res.json(deletedOrder)
            })
            .catch((err)=>{
                console.log("Delete One Order failed");
                res.json({message: "Something went wrong in deleteOne", error: err})
            })
    },
    updateOrder: (req, res)=>{
        Order.findOneAndUpdate({_id: req.params.id},
            req.body,
            {new: true, runValidators: true} 
            )
            .then((updatedOrder)=>{
                console.log(updatedOrder);
                res.json(updatedOrder)
            })
            .catch((err)=>{
                console.log("Something went wrong in updateOrder");
                res.status(400).json(err); 
            })
    }, 
    findAllOrdersByUser: (req, res) => {
        if(req.jwtpayload.username !== req.params.username){
            User.findOne({username: req.params.username})
                .then((userNotLoggedIn)=>{
                    Order.find({createdBy: userNotLoggedIn._id})
                        .populate("createdBy", "username")
                        .then((allOrdersFromUser) =>{
                            console.log("Message 3:", allOrdersFromUser);
                            res.json(allOrdersFromUser);
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
            Order.find({createdBy: req.jwtpayload.id})
                .populate("createdBy", "username")
                .then((allOrdersFromLoggedInUser) => {
                    console.log(allOrdersFromLoggedInUser);
                    res.json(allOrdersFromLoggedInUser);
                })
                .catch((err) =>{
                    console.log(err);
                    res.status(400).json(err);
                })
        }
    }
}