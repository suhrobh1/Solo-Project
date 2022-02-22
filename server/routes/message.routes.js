const MessageController = require("../controllers/message.controller");
// const {authenticate} = require("../config/jwt.config");

module.exports = (app) => {
    app.get("/api/messages", MessageController.findAllMessages);
    app.post("/api/messages", MessageController.createNewMessage);
    app.put("/api/messages/:id", MessageController.likeMessage);
    //     app.get("/api/messages/:id", MessageController.findOneMessage); 
    //     app.get("/api/messagesByUser/:username", authenticate, MessageController.findAllMessagesByUser);
    app.delete("/api/messages/:id", MessageController.deleteMessage);
}