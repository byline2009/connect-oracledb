const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const PORT = 5000;
app.use(cors());
app.use(morgan("combined"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

const route = require("./src/routes");
route(app);

app.listen(PORT, () => {
  console.log(`listen to post ${PORT}`);
});
