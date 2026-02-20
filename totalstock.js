const stockData = await Product.aggregate([
  { $unwind: "$variants" },
  {
    $group: {
      _id: "$name",
      totalStock: { $sum: "$variants.stock" }
    }
  }
]);