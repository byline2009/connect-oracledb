const DbConnection = require("../../DbConnection");
class EmployeeOffController {
  index(req, res) {
    async function fetchDataCustomer() {
      try {
        const result = await DbConnection.getConnected(
          "SELECT * FROM sale_owner.NHAN_VIEN_NGHI_VIEC",
          [],
          function (data) {
            console.log("data", data);
            return data;
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetchDataCustomer()
      .then((dbRes) => res.send(dbRes))
      .catch((err) => {
        console.log(err);
        // res.send(err);
      });
  }
  show(req, res) {
    console.log("check");
    res.send("detail");
  }
}
module.exports = new EmployeeOffController();
