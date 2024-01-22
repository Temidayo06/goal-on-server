require("dotenv").config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const cors = require('cors')
const goalRouter = require('./routes/goalRouter')

// middleware
app.use(express.json())
app.use(cors())
// routes
app.get("/",(req,res) =>{
    res.status(200).json({message : 'Welcome to Goals API'});
}),

app.use("/api/goals", goalRouter)
// errror route
app.use((req,res) =>{
    res.status(404).json({message : "Resource Not Found"})
})


// server listening 


const startServer = async () =>{
    try{
        await mongoose.connect(process.env.mongo_url, {dbName: "goalServer"})
        app.listen(PORT, ()=> {
            console.log(`Server running on port: ${PORT}`);
        })
    }catch(error) { 
        console.log("message not found: ");
    }
}

startServer();