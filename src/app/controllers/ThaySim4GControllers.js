const DbConnection = require("../../DbConnection");

class ThaySim4GController {
  index(req, res) {
    // Define the home page route

    const skip = req.query.skip;
    const limit = req.query.limit;
    const type = req.query.type;
    const month = req.query.month;
    const year = req.query.year;
    const text = req.query.textSearch;
    let total = 0;
    if (skip && limit && month && year) {
      const monthFix = month < 10 ? "0" + month : month;
      const selectMonthYear = "01/" + monthFix + "/" + year;

      const query = `SELECT isdn,  shop_code, shop_name,
         shop_type, issue_datetime,emp_code,
         emp_name, province, district_name, reason_id,
         loai_tb, thang_tt
          FROM sale_owner.CP_THAYSIM4G WHERE THANG_TT = TO_DATE(:selectMonthYear,'dd/mm/rrrr') 
            AND ISSUE_DATETIME >= TO_DATE(:selectMonthYear,'dd/mm/rrrr')
             AND DAT_DK = 'DU DK' AND shop_type IN ( :type)  ${
               text && text.length > 0
                 ? "and (isdn like :querySearch or lower(emp_code) like lower(:querySearch) or lower(emp_name) like lower(:querySearch) or lower(shop_code) like lower(:querySearch))"
                 : ""
             } offset :offsetbv rows fetch next :nrowsbv rows only`;
      const queryCount = `SELECT COUNT(*) FROM sale_owner.CP_THAYSIM4G WHERE THANG_TT = TO_DATE(:selectMonthYear,'dd/mm/rrrr') 
            AND ISSUE_DATETIME >= TO_DATE(:selectMonthYear,'dd/mm/rrrr')
             AND DAT_DK = 'DU DK' AND shop_type IN ( :type)   ${
               text && text.length > 0
                 ? "(and isdn like :querySearch  or lower(emp_code) like lower(:querySearch) or lower(emp_name) like lower(:querySearch) or lower(shop_code) like lower(:querySearch))"
                 : ""
             }`;
      console.log("query", query);
      DbConnection.getConnected(
        queryCount,
        {
          type: type,
          selectMonthYear: selectMonthYear,
          ...(text && text.length > 0
            ? { querySearch: `%` + text + `%` }
            : null),
        },
        function (result) {
          if (result) {
            total = result[0][0];
          }
          DbConnection.getConnected(
            query,
            {
              nrowsbv: limit,
              offsetbv: skip,
              type: type,
              selectMonthYear: selectMonthYear,
              ...(text && text.length > 0
                ? { querySearch: `%` + text + `%` }
                : null),
            },
            function (data) {
              if (data) {
                data.map((item, index) => {});
              }
              // console.log("data", data);
              res.send({ data: data, totalCount: total });
            }
          );
        }
      );
    } else {
      DbConnection.getConnected(
        "SELECT * FROM sale_owner.CP_THAYSIM4G offset 0 rows fetch next 5 rows only",
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
