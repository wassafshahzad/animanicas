var express = require("express");
var router = express.Router();
const userService = require("./userService");

/* GET users listing. */
router.get("/", async function (req, res) {
  let users = await userService.getAllUsers();
  console.log(users);
  res.send(users);
});

router.post("/", async (req, res) => {
  try {
    let user = await userService.createUser(req.body);
    res.send(user.email);
  } catch (error) {
    res.status(403).send(error.message);
  }
});

module.exports = router;
