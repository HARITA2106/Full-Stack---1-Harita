await Product.create({
  name: "Premium Headphones",
  category: "Electronics",
  variants: [
    {
      sku: "HP-BL-001",
      color: "Black",
      price: 199.99,
      stock: 15
    },
    {
      sku: "HP-WH-001",
      color: "White",
      price: 209.99,
      stock: 8
    }
  ],
  reviews: [
    {
      userId: new mongoose.Types.ObjectId(),
      rating: 5,
      comment: "Excellent sound quality"
    }
  ]
});