const express = require("express");
const router = express.Router();
const Product = require("../Models/Product.model");

router.get("/", async (req, res, next) => {
  try {
    // const result = await Product.find({},{__v:0,name:1,price:1, _id:0});
    const result = await Product.find({}, { __v: 0 });
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const product = new Product(req.body);
    const result = await product.save();
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.send(product);
  } catch (error) {
    console.log(error.message);
  }
});

router.patch("/:id", (req, res, next) => {
  res.send("updating a product");
});

router.delete("/:id", async(req, res, next) => {
    const id = req.params.id;
    try{
        const result = await Product.findByIdAndDelete(id);
        res.send(result);
    }
    catch(error){
        console.log(error.message);
    }
});

module.exports = router;
