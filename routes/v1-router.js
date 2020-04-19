const express = require("express");
const db = require("../db-operations/db-operations");

const router = express.Router();

router.get("/ufos", (req, res) => {
  // UFOs by City
  // if (req.query && req.query.city) {}

  // All UFOs
  db.getAllUfos().then((result) => {
    const { statusCode, error } = result;
    if (statusCode !== 200) {
      console.error(
        `Error ${statusCode}, Error fetching all UFOs, ${error.message}.`
      );

      return res
        .status(statusCode)
        .send(`Error ${statusCode}, fetching all UFOs.`);
    }

    const ufos = result.body.Items;

    return res.json(ufos);
  });
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
