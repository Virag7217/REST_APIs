const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");


const feedRoutes = require("./routes/feed");
const app = express();

app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

mongoose
  .connect(
    "mongodb+srv://virag:mongodbforvirag7217@node.fq8v4eo.mongodb.net/messages"
  )
  .then((result) => {
    const port = 3080;
    app.listen(port, () => {
      console.log(`Server is running : Port =  ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
