const express = require("express");
const connectDB = require("./config/dbConnection");
const errorhandler = require("./middleware/errorhandler");
const dotenv = require("dotenv").config()


connectDB()
const app = express()
 
const PORT = process.env.PORT || 5000

 app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"))
app.use("/api/users", require("./routes/userRoutes"))
app.use(errorhandler)

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`);
})