const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>{
        console.log(`You are connected to the  ${process.env.DB_NAME} database!`)
    })
    .catch((err)=>{
        console.log(`Problem connecting to the ${process.env.DB_NAME} database. Error:`, err)
    })
