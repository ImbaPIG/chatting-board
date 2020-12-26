require("dotenv").config();

//sets environment for express, mongoose and method-override 
const express = require("express");
const mongoose = require("mongoose");
const chatRouter = require("./routes/chat");
const methodOverride = require("method-override")
const app = express();


const url = process.env.DATABASE_URL;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const client = mongoose.connection;
client.on("error", (error) => console.error(error));
client.once("open", () => console.log("Scotty we are up"));


app.set("view engine", "ejs");
app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(methodOverride("_method"));

//sends assets folder for every access
app.use("/assets" , express.static("assets"));

//handels /chat accesses with chat.js in routes folder
app.use("/chat", chatRouter);

//renders welcome.ejs file
app.get("/", (req, res) => {
    res.render("welcome" );
})

//server listens on port 5000
app.listen(5000, () => {
    console.log("Server-Started");
})  