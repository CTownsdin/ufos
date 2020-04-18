const express = require("express");

const router = express.Router();

// All ufos, paginated
router.get("/ufos", (req, res) => {
  res.send("Imagine getting all ufos, in a paginated manner.");
});

// ufos by city query parameter
// /v1/ufos?city=seattle
// router.get("/ufos", (req, res) => {
//   res.send("Imagine getting all ufos, in a paginated manner.");
// });

// /v1 home page route
router.get("/", (req, res) => {
  // EJS render index.ejs
  res.render("index", {
    static_path: "static",
    theme: process.env.THEME || "flatly",
    flask_debug: process.env.FLASK_DEBUG || "false",
  });
});

module.exports = router;
