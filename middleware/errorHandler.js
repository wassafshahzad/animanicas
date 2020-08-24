module.exports = (err, res, req, next) => {
  console.log(err);
  res.status(500).send("Here I am");
};
