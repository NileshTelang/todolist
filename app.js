

const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const _ = require("lodash");

const app = express();

const items =["Buy Milk","Make BreakFast","Hit The Gym"];
const workItems =[];

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//database
mongoose.connect("mongodb+srv://Nov0:nov0@nov0.klonhmq.mongodb.net/todolistDB",{useNewUrlParser : true});

//schema
const itemSchema = {
  name : String
};

//model
const Item = mongoose.model("Item",itemSchema);

//document
const item1 = new Item ({
  name : "Welcome To Your Todolist!"
});

const item2 = new Item ({
  name : "Hit + to add an item !"
});

const item3 = new Item ({
  name : "Hit <-- to delete an item !"
});

const defaultItems = [item1 , item2 , item3];

//randomroute
//listschema
const listSchema = {
  name : String,
  items : [itemSchema]
};

//listmodel
const List = mongoose.model("List",listSchema);

app.get("/",function(req,res){

  Item.find({},function(err,foundItems){
    if(foundItems.length===0){
      Item.insertMany(defaultItems , function(err){
        if(err){
          console.log(err);
        }else{
          console.log("Successfully saved items !");
        }
      });
      res.redirect("/");
    }else {
      res.render("list",{ listTitle :"Today", newListItems : foundItems});
    }
  });

});

app.get("/:random",function(req,res){
  const random = _.capitalize(req.params.random);

  List.findOne({name : random},function(err,foundList){
    if(!err){
      if(!foundList){
        const list = new List ({
          name : random ,
          items : defaultItems
        });
        list.save();
        res.redirect("/"+random);
      }else {
        res.render("list",{ listTitle :foundList.name, newListItems : foundList.items});
      }
    }
  })

});

app.post("/",function(req,res){
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name : itemName
  });
  if(listName === "Today"){
    item.save();
    res.redirect("/");
  }else {
    List.findOne({name:listName},function(err,foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/"+listName);
    })
  }

});

app.post("/delete",function(req,res){
  const checkedItem = req.body.checkbox;
  const listName = req.body.listName;

  if(listName === "Today"){
    Item.findByIdAndRemove(checkedItem,function(err){
      res.redirect("/");
    });
  }else {
    List.findOneAndUpdate({name:listName},{$pull : {items :{_id:checkedItem}}},function(err,foundList){
      if(!err){
        res.redirect("/"+ listName);
      }
    })
  }

});


app.listen(4131,function(){
  console.log("Server is up and running on port 4131 ")
});
