var express = require("express");
const router = express.Router();
/* GET home page. */

router.get("/", function (req, res) {
  res.send("We are IN !~~~~~");
});

module.exports = router;
