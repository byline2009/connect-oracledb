const DbConnection = require("../../DbConnection");

class EmployeeOffController {
  index(req, res) {
    const skip = req.query.skip;
    const limit = req.query.limit;
    let total = 0;

    DbConnection.getConnected(
      "SELECT count(*) FROM sale_owner.NHAN_VIEN_NGHI_VIEC",
      {},
      function (result) {
        console.log("result[0][0]", result[0][0]);
        total = result[0][0];
        if (skip && limit) {
          DbConnection.getConnected(
            "SELECT * FROM sale_owner.NHAN_VIEN_NGHI_VIEC offset :offsetbv rows fetch next :nrowsbv rows only",
            { nrowsbv: limit, offsetbv: skip },
            function (data) {
              if (data) {
                data.map((item, index) => {});
              }
              console.log("data", data);
              res.send({ data: data, totalCount: total });
            }
          );
        } else {
          DbConnection.getConnected(
            "SELECT * FROM sale_owner.NHAN_VIEN_NGHI_VIEC offset 0 rows fetch next 5 rows only",
            {},
            function (data) {
              res.send({ data: data, totalCount: total });
            }
          );
        }
      }
    );
  }
  show(req, res) {
    console.log("check");
    res.send("detail");
  }
}
module.exports = new EmployeeOffController();
