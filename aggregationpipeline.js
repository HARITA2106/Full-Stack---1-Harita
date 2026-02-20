const products = await Product.aggregate([
  { $unwind: "$reviews" },
  {
    $group: {
      _id: "$_id",
      name: { $first: "$name" },
      category: { $first: "$category" },
      avgRating: { $avg: "$reviews.rating" }
    }
  }
]);