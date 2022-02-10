const VehicleController = require("../controllers/vehicle.controller");
const {authenticate} = require("../config/jwt.config");

module.exports = (app) => {
    app.get("/api/vehicles", VehicleController.findAllVehicles);
    app.post("/api/vehicles", authenticate, VehicleController.createNewVehicle);
    app.get("/api/vehiclesByUser/:username", authenticate, VehicleController.findAllVehiclesByUser);
    app.get("/api/vehicles/:id", VehicleController.findOneVehicle); 
    app.delete("/api/vehicles/:id", VehicleController.deleteVehicle);
    app.put("/api/vehicles/:id", VehicleController.updateVehicle);
}