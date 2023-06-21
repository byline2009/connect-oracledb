const DbConnection = require("../../DbConnection");

class PTM_NVBH_NVBH_TBTT_Controller {
  index(req, res) {
    const skip = req.query.skip;
    const limit = req.query.limit;
    const month = req.query.month;
    const year = req.query.year;
    let total = 0;
    if (skip && limit && month && year) {
      const monthFix = month < 10 ? "0" + month : month;
      const selectMonthYear = "01/" + monthFix + "/" + year;

      const query = `SELECT b.tinh,aa.* FROM TH_CP_PTM_TBTT_CHECK_FN_T0523 aa
                    left join (
                    select   tinh, shop_code from  sale_owner.shop_cty7
                    union all
                    select   tinh, shop_code from  sale_owner.shop_cty7_vung
                    ) b on b.shop_code =  aa.shop_code
                    WHERE aa.pay_month = TO_DATE(:selectMonthYear,'dd/mm/rrrr')
                    AND aa.emp_code IN (SELECT STAFF_CODE FROM STAFF_SALARY_MONTHLY
                    WHERE MONTH =  TO_DATE(:selectMonthYear,'dd/mm/rrrr') AND STAFF_CODE LIKE '7MBP%' AND STATUS = 1) offset :offsetbv rows fetch next :nrowsbv rows only`;
      const queryCount = `SELECT count(*) FROM TH_CP_PTM_TBTT_CHECK_FN_T0523 aa
                    left join (
                    select   tinh, shop_code from  sale_owner.shop_cty7
                    union all
                    select   tinh, shop_code from  sale_owner.shop_cty7_vung
                    ) b on b.shop_code =  aa.shop_code
                    WHERE aa.pay_month = TO_DATE(:selectMonthYear,'dd/mm/rrrr')
                    AND aa.emp_code IN (SELECT STAFF_CODE FROM STAFF_SALARY_MONTHLY
                    WHERE MONTH =  TO_DATE(:selectMonthYear,'dd/mm/rrrr') AND STAFF_CODE LIKE '7MBP%' AND STATUS = 1) `;
      DbConnection.getConnected(
        queryCount,
        { selectMonthYear: selectMonthYear },
        function (result) {
          total = result[0][0];
          DbConnection.getConnected(
            query,
            {
              offsetbv: skip,
              nrowsbv: limit,
              selectMonthYear: selectMonthYear,
            },
            function (data) {
              if (data) {
                data.map((item, index) => {});
              }
              res.send({ data: data, totalCount: total });
            }
          );
        }
      );
    } else {
      res.send({ data: [], totalCount: 0 });
    }
  }
  show(req, res) {
    res.send("detail");
  }
}
module.exports = new PTM_NVBH_NVBH_TBTT_Controller();
