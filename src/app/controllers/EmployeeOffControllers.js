const DbConnection = require("../../DbConnection");
class EmployeeOffController {
  index(req, res) {
    DbConnection.getConnected(
      "SELECT * FROM sale_owner.NHAN_VIEN_NGHI_VIEC",
      [],
      function (data) {
        console.log("data", data);
        res.send(data);
      }
    );
  }
  show(req, res) {
    console.log("check");
    res.send("detail");
  }
}
module.exports = new EmployeeOffController();
