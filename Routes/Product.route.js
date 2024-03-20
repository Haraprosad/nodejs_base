const express = require("express");
const router = express.Router();
const Product = require("../Models/Product.model");

router.get("/", (req, res, next) => {
  res.send("getting a list of all products.");
});

router.post("/", (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.get("/:id", (req, res, next) => {
  res.send("getting a single product");
});

router.patch("/:id", (req, res, next) => {
  res.send("updating a product");
});

router.delete("/:id", (req, res, next) => {
  res.send("deleting a product");
});

module.exports = router;
