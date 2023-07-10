const express = require("express");
const mongoose =require("mongoose");
const cors =require("cors");
const bodyParser=require("body-parser");
const createError =require("http-errors");
async function mongoDbconnection(){
    await mongoose.connect(
        "mongodb://127.0.0.1:27017/restapi",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        },
        6000,
    );
}

mongoDbconnection().then(()=>{
    console.log("MongoDB successfully connected");

}),

  (err)=>{
    console.log("Could not connected to database :"+err);
 
  };

const userRoute = require("./routes/student.route");
const app = express();
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
    bodyParser.json()
);

//CORS

app.use(cors());

app.use("/endpoint",userRoute);

const port = process.env.PORT || 8080;

app.listen(port,()=>{
    console.log("PORT Connected on:"+ port);
});

app.use((req,res,next)=>{
    next(createError(404));
});
app.use(function(err,req,res,next){
    console.error(err.message);
    if(!err.ststusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});