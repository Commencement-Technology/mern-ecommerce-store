const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, quantity, brand, image } = req.fields;
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !image:
        return res.json({ error: "Image is required" });
    }
    const product = new Product({ ...req.fields });
    await product.save();
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});

const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, quantity, brand, image } = req.fields;
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !image:
        return res.json({ error: "Image is required" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );
    await updatedProduct.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const getProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Product not found" });
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    // keyword to be passed in req url
    // the options enforces the case insensitive search
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};
    // it finds the products whose names match with the keyword provided and if not provided then it returns all the products
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);
    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      // it specifies whether the more products are available or not
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const removeProduct = asyncHandler(async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product has been deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Server error" });
  }
});

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      // if the user id in the product is same as the user provided in the req
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }
      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      // adding the reviews into the array on the existing product
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      // calculating average rating
      // sum_of_all_ratings / num_of_reviews
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const fetchTopProducts = asyncHandler(async (_, res) => {
  try {
    // fetching the top 4 products in descending order according to rating
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.json(products);
  } catch (error) {
    console.error(error.message);
    res.status(400).json(error.message);
  }
});

const fetchNewProducts = asyncHandler(async (_, res) => {
  try {
    // fetching the most recent created documents or products
    const products = await Product.find({}).sort({ _id: -1 }).limit(4);
    res.json(products);
  } catch (error) {
    console.error(error.message);
    res.status(400).json(error.message);
  }
});



module.exports = {
  addProduct,
  updateProductDetails,
  getProduct,
  getAllProducts,
  removeProduct,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
};
