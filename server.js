const express = require("express");
const app = express();
const oracledb = require("oracledb");
const PORT = 5000;
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5001");

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
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.get("/nhan-vien-nghi-viec", (req, res) => {
  async function fetchDataCustomer() {
    try {
      const connection = await oracledb.getConnection({
        user: "sale_owner",
        password: "saleowner01122015",
        connectString: "10.25.8.30/DB01",
      });
      const result = await connection.execute(
        "SELECT * FROM sale_owner.NHAN_VIEN_NGHI_VIEC"
      );
      return result.rows;
    } catch (error) {
      console.log(error);
    }
  }
  fetchDataCustomer()
    .then((dbRes) => res.send(dbRes))
    .catch((err) => {
      res.send(err);
    });
});

app.get("/customers", (req, res) => {
  async function fetchDataCustomer() {
    try {
      const connection = await oracledb.getConnection({
        user: "sale_owner",
        password: "saleowner01122015",
        connectString: "10.25.8.30/DB01",
      });
      const result = await connection.execute(
        "SELECT * FROM sale_owner.NHAN_VIEN_NGHI_VIEC"
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  fetchDataCustomer()
    .then((dbRes) => res.send(dbRes))
    .catch((err) => {
      res.send(err);
    });
});
app.listen(PORT, () => {
  console.log(`listen to post ${PORT}`);
});
