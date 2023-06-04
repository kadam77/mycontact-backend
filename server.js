const express = require("express");
const errorhandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
connectDb();
const app = express();
const port = process.env.PORT || 5000;



app.use(express.json()); //this is used to accept the body from http client


//this is middleware
app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/users",require("./routes/userRoutes"));

//to handle the expection of the input body we will use middleware
app.use(errorhandler)

app.listen(port,()=>{
    console.log(`${port}`)
})




