const express = require("express");
const mongoose = require("mongoose");
const createError = require("http-errors");
const dotenv = require("dotenv").config();

console.log(dotenv.parsed);

const app = express();
app.use(express.json()); //for post call with application json
app.use(express.urlencoded({ extended: true })); //for post call with application x-www-form-urlencoded

//Initialize DB
require("./initDB")();

app.all('/test',(req,res)=>{
  console.log(req.body);
  res.send(req.body);
  // console.log(req.query);
  // res.send(req.query);
})

const productRoute = require("./Routes/Product.route");
app.use("/products", productRoute);

app.use((req, res, next) => {
  // const err = new Error("Not found");
  // err.status = 404;
  // next(err);
  next(createError(404, "Not found"));
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port "+PORT+"...");
});
