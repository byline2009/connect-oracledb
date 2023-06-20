const DbConnection = require("../../DbConnection");

class ThaySim4GController {
  index(req, res) {
    // Define the home page route
    const skip = req.query.skip;
    const limit = req.query.limit;
    const type = req.query.type;
    const month = req.query.month;
    const year = req.query.year;
    let total = 0;
    if (skip && limit && month && year) {
      const monthFix = month < 10 ? "0" + month : month;
      const selectMonthYear = "01/" + monthFix + "/" + year;
      const query = `SELECT * FROM sale_owner.CP_THAYSIM4G WHERE THANG_TT = TO_DATE(:selectMonthYear,'dd/mm/rrrr') 
            AND ISSUE_DATETIME >= TO_DATE(:selectMonthYear,'dd/mm/rrrr')
             AND DAT_DK = 'DU DK' AND shop_type IN ( :type) offset :offsetbv rows fetch next :nrowsbv rows only`;
      const queryCount = `SELECT COUNT(*) FROM sale_owner.CP_THAYSIM4G WHERE THANG_TT = TO_DATE(:selectMonthYear,'dd/mm/rrrr') 
            AND ISSUE_DATETIME >= TO_DATE(:selectMonthYear,'dd/mm/rrrr')
             AND DAT_DK = 'DU DK' AND shop_type IN ( :type) `;
      DbConnection.getConnected(
        queryCount,
        {
          type: type.toUpperCase(),
          selectMonthYear: selectMonthYear,
        },
        function (result) {
          console.log("result[0][0]", result[0][0]);
          total = result[0][0];

          DbConnection.getConnected(
            query,
            {
              nrowsbv: limit,
              offsetbv: skip,
              type: type.toUpperCase(),
              selectMonthYear: selectMonthYear,
            },
            function (data) {
              if (data) {
                data.map((item, index) => {});
              }
              console.log("data", data);
              res.send({ data: data, totalCount: total });
            }
          );
        }
      );
    } else {
      DbConnection.getConnected(
        "SELECT * FROM sale_owner.CP_THAYSIM4G2 offset 0 rows fetch next 5 rows only",
        {},
        function (data) {
          res.send({ data: data, totalCount: total });
        }
      );
    }
  }
  show(req, res) {
    console.log("check");
    res.send("detail");
  }
}
module.exports = new ThaySim4GController();
