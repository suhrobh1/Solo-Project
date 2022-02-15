//Check the order
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const socket = require('socket.io');


app.use(express.json());
app.use(express.urlencoded({extended: true})); 


const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(cookieParser());

require("./config/mongoose.config");
require("./routes/vehicle.routes")(app);
require("./routes/order.routes")(app);
require("./routes/user.routes")(app);
require("./routes/message.routes")(app);

const server= app.listen(process.env.MY_PORT, ()=> console.log("You are connected to port " + process.env.MY_PORT))

const io = socket(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
})

io.on("connection", (socket)=>{
    console.log("socket.id", socket.id)

    socket.on("Update_chat",(data)=> {
        console.log("the Payload: ", data);
        io.emit("Update_chat_likes", data);
    }) 
})