const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/productDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Product Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price cannot be negative"]
  },
  category: {
    type: String,
    required: true
  },
  inStock: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Custom instance method
productSchema.methods.applyDiscount = function(discountPercent) {
  this.price = this.price - (this.price * discountPercent / 100);
  return this.price;
};

const Product = mongoose.model("Product", productSchema);


// CREATE
app.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ (All)
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// READ (Single)
app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: "Product not found" });
  }
});

// UPDATE
app.put("/products/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE
app.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));