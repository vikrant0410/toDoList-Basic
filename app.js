const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


app.use(express.static("public"));

app.set('view engine', "ejs")

app.use(bodyParser.urlencoded({ extended: true }));

// mongoose
mongoose.connect("mongodb+srv://tinku123:tinku123@cluster0.igsjh.mongodb.net/todolistDB", { useNewUrlParser: true, useUnifiedTopology: true });

// schema
const itemSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    }
})
// model / collection
const Items = mongoose.model("Item",itemSchema);


// 
app.get("/", (req, res) => {
    // res.sendFile(__dirname + "");
  Items.find({},(err,foundItems)=>{
      if(err){
          console.log(err)
      }else{
           res.render("list",{
               myListItems : foundItems
           })
      }
  })
 
})

app.post("/", (req, res) => {
    var listItem = req.body.newItem;
   var item = new Items({
       item:listItem
   })
   item.save();
res.redirect("/");
});




app.listen(process.env.PORT || 3000, () => {
    console.log("server started on port : 3000");
})