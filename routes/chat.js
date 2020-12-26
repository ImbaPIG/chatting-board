const express = require("express");
const router = express.Router();
const Textmessage = require("../models/message");
let userID = 2;
const userName = {
    1:"Karsten",
    2:"Maaxi",
    3:"Thomas",
    4:"Klaudia",
    5:"Leon"
};

module.exports = router;

function setUser(user){
userID = user;
}
//renders index.js (all chats)  
router.get("/", async (req,res) => {      
    try{
        setUser(req.query.user);
        const textmessages = await Textmessage.find().sort({date : -1}).limit(10);
        res.render("index", {data : {messages: [...textmessages].reverse(), user : userID}});
    }catch (err){
        res.status(500).json({message: err.message});
    }

});
//Creates new Textmessage if input != ""
router.post("/", async (req,res,) => {
    if (req.body.text == "") {
        console.log(req)
        res.redirect(`/chat?user=${userID}`);
    }else{
        const textmessages = new Textmessage({
            name: userName[userID],
            authorId: userID,
            text: req.body.text
        })
    
        try{
            const newTextmessage = await textmessages.save();
            res.redirect(`/chat?user=${userID}`);
        }catch(err){
            res.status(400).json({ message : err.message })
        }
    }    
})


//delete Texmessage only if user created the message
router.delete("/:id/:user", async (req,res) => {
    await Textmessage.findByIdAndDelete(req.params.id)
console.log("deleted: ",req.params.id);
res.redirect('/chat?user='.concat(req.params.user))
})

