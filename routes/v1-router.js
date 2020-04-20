const router = require("express").Router();
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const config = require("../config");

const db = require("../db-operations/db-operations");

// Extended: https://swagger.io/specification/#infoObject
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "UFOs API",
      version: "0.0.1",
      description: "The Truth Is Out There",
      contact: {
        name: "Christian Townsdin",
      },
      servers: [`http://localhost:${config.port}`],
    },
  },
  apis: ["./routes/v1-router.js"],
};

const swaggerSpec = swaggerJSDoc(options);

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /v1/ufos:
 *  get:
 *    description: Use to request all UFO sightings. Warning, slow, 5000+ items.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/ufos", (req, res) => {
  // UFOs by City
  // if (req.query && req.query.city) {}
  // TODO:

  // TODO: Paginate
  db.getAllUfos().then((result) => {
    const { statusCode, error } = result;
    if (statusCode !== 200) {
      console.error(
        `Error ${statusCode}, Error fetching all UFOs ${error.message}.`
      );

      return res
        .status(statusCode)
        .send(`Error ${statusCode}, fetching all UFOs.`);
    }

    const ufos = result.body.Items;

    return res.json(ufos);
  });
});

router.get("/ufos/:date", (req, res) => {
  res.send(
    `Imagine sending the ufo sightings with the date: ${req.params.date}`
  );
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
