var express=require("express");
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
const { Date } = require("mongoose");
var app=express();

app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true,useUnifiedTopology:true});
const itemSchema={
    name:String,
    date: Date,
    isCompleted: Boolean,
    assignedTo: String,
}
const Items=mongoose.model("Items",itemSchema);
const currDate= new Date();
const item1=new Items({
    name:"Demo Item",
    isCompleted: false,
    assignedTo: "Me",
});

const d=[item1];
/*
Item.insertMany(d,function(err)
{
    if(err){
        console.log(err);
    }
    else{
        console.log("Successfully saved items to DB");
    }
});
*/
app.get("/",function(req,res)
{
   // res.send("<h1>Hey guys!!</h1>");
   Items.find({},function(err,f)
   {
      // console.log(f);
      if(f.length===0)
      {
        Items.insertMany(d,function(err)
        {
            if(err){
                console.log(err);
            }
            else{
                console.log("Successfully saved items to DB");
            }
        });
      res.redirect("/");
      }
      else{
      res.render("list",{newListItems:f});
      }
   })
  ;
})
app.post("/",function(req,res)
{
     const itemName=req.body.n;
     const itemDate= req.body.date;
     const itemCompleted=false;
     console.log(req.body.isCompleted)
     if(req.body.isCompleted==true)
     itemCompleted= true;
     const assignedTo= req.body.assignedTo;
    //console.log(i);
    //i1.push(i);
    //res.render("list",{newListItem:i});
   // res.redirect("/");
   const item=new Items({
       name:itemName,
       date:itemDate,
       isCompleted: itemCompleted,
       assignedTo: assignedTo,
   });
item.save();
res.redirect("/");
});
app.post("/delete",function(req,res)
{
  const check=req.body.checkbox;
  Items.findByIdAndRemove(check,function(err)
  {
      if(!err)
      {
          console.log("Successfully deleted");
          res.redirect("/");
      }
  })
});

app.listen(3000,function()
{
    console.log("Server is listening to port 3000");
})

