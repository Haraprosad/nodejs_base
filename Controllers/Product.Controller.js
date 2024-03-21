const createError = require('http-errors');
const mongoose = require('mongoose');

const Product = require("../Models/Product.model");

module.exports = {
    createProduct: async (req, res, next) => {
        try {
          const product = new Product(req.body);
          const result = await product.save();
          res.send(result);
        } catch (error) {
          console.log(error.message);
          if(error.name === 'ValidationError'){
            next(createError(422, error.message));
            return;
          }
          next(error);
        }
      },
    getAllProducts:  async (req, res, next) => {
        try {
          // const result = await Product.find({},{__v:0,name:1,price:1, _id:0});
          const result = await Product.find({}, { __v: 0 });
          res.send(result);
        } catch (error) {
          console.log(error.message);
          next(error);
        }
      },
    findProductById: async (req, res, next) => {
        try {
          const product = await Product.findById(req.params.id);
          if(!product){
            throw createError(404, 'Product does not exist');
          }
          res.send(product);
        } catch (error) {
          console.log(error.message);
          if(error instanceof mongoose.CastError){
            next(createError(400, 'Invalid product id'));
            return;
          }
          next(error);
        }
      },
    updateAProduct: async (req, res, next) => {
        try {
          const id = req.params.id;
          const update = req.body;
          const options = { new: true };
          const result = await Product.findByIdAndUpdate(id, update, options);
          if(!result){
            throw createError(404, 'Product does not exist');
          }
          res.send(result);
        } catch (error) {
          console.log(error.message);
          if(error instanceof mongoose.CastError){
            next(createError(400, 'Invalid product id'));
            return;
          }
          next(error);
        }
      },
      deleteAProduct:  async (req, res, next) => {
        const id = req.params.id;
        try {
          const product = await Product.findByIdAndDelete(id);
          if(!product){
            throw createError(404, 'Product does not exist');
          }
          res.send(product);
        } catch (error) {
          console.log(error.message);
          if(error instanceof mongoose.CastError){
            next(createError(400, 'Invalid product id'));
            return;
          }
          next(error);
        }
      }
}