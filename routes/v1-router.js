const express = require("express");

const router = express.Router();

router.get("/ufos", (req, res) => {
  // UFOs by City
  if (res.query && res.query.city) {
    // should paginate all these API calls.
    console.log(`fetching ufos by city: ${res.query.city}`);
    res.send(`Imagine sending all ufos by city: ${res.query.city}`);
  }

  // UFO by Date_Time, which is the day of the event
  if (res.query && res.query.date) {
    res.send(`Imagine sending all ufos by date: ${res.query.date}`);
  }

  // All UFOs
  res.send("Imagine sending all ufos, in a paginated manner.");
});

// UFO by ID
router.get("/ufos/:ufoID", (req, res) => {
  res.send(`Imagine sending the ufo sighting with ID: ${req.params.ufoID}`);
});

// HomePage /v1
router.get("/", (req, res) => {
  // EJS render index.ejs
  res.render("index", {
    static_path: "static",
    theme: process.env.THEME || "flatly",
    flask_debug: process.env.FLASK_DEBUG || "false",
  });
});

module.exports = router;
