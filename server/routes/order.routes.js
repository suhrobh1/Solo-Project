const OrderController = require("../controllers/order.controller");
const {authenticate} = require("../config/jwt.config");

module.exports = (app) => {
    app.get("/api/orders", OrderController.findAllOrders);
    app.post("/api/orders", authenticate, OrderController.createNewOrder);
    app.get("/api/ordersByUser/:username", authenticate, OrderController.findAllOrdersByUser);
    app.get("/api/orders/:id", OrderController.findOneOrder); 
    app.delete("/api/orders/:id", OrderController.deleteOrder);
    app.put("/api/orders/:id", OrderController.updateOrder);
}