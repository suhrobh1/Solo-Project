const Vehicle = require('../models/vehicle.model');
const Message = require('../models/message.model');

module.exports = {

    findAllMessages: (req, res) =>{
        Message.find()
            .then((allMessages)=>{
                console.log(allMessages);
                res.json(allMessages);
            })
            .catch((err)=>{
                console.log("Find All Messages failed");
                res.json({message: "Something went wrong in findAll", error: err})
            })
    },

    createNewMessage: (req, res)=>{
        Message.create(req.body)
            .then((messagePosted)=>{
              console.log(messagePosted);
              console.log("req.body.associatedVehicle", req.body.associatedVehicle);
              
              Vehicle.findOneAndUpdate(req.body.associatedVehicle, 
                {
                    $addToSet: {messages: messagePosted._id}
                },{
                    new: true,
                    useFindAndModify: true
                })           
                .populate("messages", "content author _id ")
                .then((vehicleToUpdate) =>{
                  console.log(vehicleToUpdate)
                  res.json(messagePosted)
                })
                .catch((err) =>{
                  console.log(err);
                })
            .catch((err) =>{
                  console.log(err);
                })
            })
    },

    likeMessage: (req, res) => {
        Message.findOneAndUpdate({_id: req.params.id},
            req.body,
            {new:true, runValidators: true}
            )
            .populate("associatedVehicle", "make model")
            .then((likeAdded)=> {
                res.json(likeAdded)
            })
            .catch((err) =>{
                  console.log(err);
                  res.status(400).json(err);
                })
    },

    deleteMessage: (req, res)=>{
        Message.deleteOne({_id: req.params.id})
            .then((deletedMessage)=>{
                console.log(deletedMessage);
                res.json(deletedMessage)
            })
            .catch((err)=>{
                console.log("Delete One Message failed");
                res.json({message: "Something went wrong in deleteOne", error: err})
            })
}

}