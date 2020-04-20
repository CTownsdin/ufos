const AWS = require("aws-sdk");
const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");

const v1Router = require("./routes/v1-router");

AWS.config.region = process.env.REGION;

const app = express();
app.set("port", config.port);
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/v1", v1Router);

// TODO: Try this setup to access dynamoDB in ElasticBeanstalk.
// Or switch to cloud formation template.
const ddb = new AWS.DynamoDB();
const ddbTable = process.env.STARTUP_SIGNUP_TABLE;
// TODO: Try this.
app.post("/signup", (req, res) => {
  const item = {
    email: { S: req.body.email },
    name: { S: req.body.name },
    preview: { S: req.body.previewAccess },
    theme: { S: req.body.theme },
  };

  ddb.putItem(
    {
      TableName: ddbTable,
      Item: item,
      Expected: { email: { Exists: false } },
    },
    (err, data) => {
      if (err) {
        let returnStatus = 500;

        if (err.code === "ConditionalCheckFailedException") {
          returnStatus = 409;
        }

        res.status(returnStatus).end();
        console.log(`DDB Error: ${err}`);
      } else {
        // TODO: Do something.
      }
    }
  );
});

app.get("/", (req, res) => {
  // EJS render index.ejs
  res.render("index", {
    static_path: "static",
    theme: process.env.THEME || "flatly",
    flask_debug: process.env.FLASK_DEBUG || "false",
  });
});

app.listen(config.port, () => {
  console.log(`Server running at http://127.0.0.1:${config.port}/`);
});
