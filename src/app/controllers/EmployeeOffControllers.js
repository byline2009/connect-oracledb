const DbConnection = require("../../DbConnection");
class EmployeeOffController {
  index(req, res) {
    console.log("req", req.query);
    const skip = req.query.skip;
    const limit = req.query.limit;
    if (skip && limit) {
      DbConnection.getConnected(
        "SELECT * FROM sale_owner.NHAN_VIEN_NGHI_VIEC offset :offsetbv rows fetch next :nrowsbv rows only",
        { nrowsbv: limit, offsetbv: skip },
        function (data) {
          // console.log("data", data);
          res.send(data);
        }
      );
    } else {
      DbConnection.getConnected(
        "SELECT * FROM sale_owner.NHAN_VIEN_NGHI_VIEC offset 0 rows fetch next 5 rows only",

        function (data) {
          // console.log("data", data);
          res.send(data);
        }
      );
    }
    const nrows = 5;
  }
  show(req, res) {
    console.log("check");
    res.send("detail");
  }
}
module.exports = new EmployeeOffController();
