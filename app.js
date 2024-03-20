const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json()); //for post call with application json
app.use(express.urlencoded({ extended: true })); //for post call with application x-www-form-urlencoded

mongoose.connect("mongodb://localhost:27017/nodejs_base").then(() => {
  console.log("Connected to database");
});

app.all('/test',(req,res)=>{
  console.log(req.body);
  res.send(req.body);
  // console.log(req.query);
  // res.send(req.query);
})

const productRoute = require("./Routes/Product.route");
app.use("/products", productRoute);

app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
