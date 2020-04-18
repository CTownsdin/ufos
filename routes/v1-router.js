const express = require("express");

const router = express.Router();

// define the home page route
router.get("/", function (req, res) {
  // EJS render index.ejs
  res.render("index", {
    static_path: "static",
    theme: process.env.THEME || "flatly",
    flask_debug: process.env.FLASK_DEBUG || "false",
  });
});

module.exports = router;
