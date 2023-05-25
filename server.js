const express = require("express");
const app = express();
const oracledb = require("oracledb");
const PORT = 5000;
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
