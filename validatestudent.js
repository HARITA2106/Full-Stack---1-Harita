module.exports = (req, res, next) => {
  const { name, rollNo, department } = req.body;

  if (!name || !rollNo || !department) {
    return res.status(400).send("All fields are required");
  }

  next();
};