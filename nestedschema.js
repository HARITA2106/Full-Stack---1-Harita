const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment: String
}, { timestamps: true });

const variantSchema = new mongoose.Schema({
  sku: { type: String, required: true },
  color: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, index: true },
  variants: [variantSchema],
  reviews: [reviewSchema],
  avgRating: { type: Number, default: 0 }
}, { timestamps: true });

/* -------- INDEXES -------- */
productSchema.index({ name: "text" });
productSchema.index({ category: 1 });

/* -------- INSTANCE METHOD: Update Stock -------- */
productSchema.methods.updateStock = function(sku, quantity) {
  const variant = this.variants.find(v => v.sku === sku);
  if (!variant) throw new Error("Variant not found");

  variant.stock += quantity;
  return this.save();
};

/* -------- METHOD: Calculate Average Rating -------- */
productSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) return 0;

  const total = this.reviews.reduce((sum, r) => sum + r.rating, 0);
  this.avgRating = total / this.reviews.length;
  return this.save();
};

module.exports = mongoose.model("Product", productSchema);