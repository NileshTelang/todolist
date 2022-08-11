

const express = require('express');

const bodyParser = require('body-parser');

const date = require(__dirname + '/date.js');

const app = express();

const items =["Buy Milk","Make BreakFast","Hit The Gym"];
const workItems =[];

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",function(req,res){

  // const day = date() ; //line 7
  const day = date.getDate();
  // const day = date.getDayYear();

  res.render("list",{ listTitle : day , newListItems : items});

});

app.post("/",function(req,res){
  const item = req.body.newItem;

  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  }
  else {
    items.push(item);
    // res.render("list",{newListItem : item}); first list rendered
    res.redirect("/");
  };

});

app.get("/work",function(req,res){
  res.render("list",{listTitle : "Work List " ,newListItems : workItems});
})

app.post("/work",function(req,res){
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})

app.listen(4131,function(){
  console.log("Server is up and running on port 4131 ")
});
