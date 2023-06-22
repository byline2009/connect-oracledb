const DbConnection = require("../DbConnection");
const employeeOffRouter = require("./EmployeeOff");
const dashboardRouter = require("./DashBoard");
const thaySim4GRouter = require("./Thaysim4G");
const ptm_nvbh_tbtt_Router = require("./PTM_NVBH_TBTT");
const bhtt_ptm_Router = require("./BHTT");
const db01_ptm_Router = require("./DB01-PTM");

function route(app) {
  app.use("/nhan-vien-nghi-viec", employeeOffRouter);
  app.use("/thay-sim-4g", thaySim4GRouter);
  app.use("/ptm-nvbh-tbtt", ptm_nvbh_tbtt_Router);
  app.use("/bhtt-ptm", bhtt_ptm_Router);
  app.use("/db01-ptm", db01_ptm_Router);

  app.use("/", dashboardRouter);
}
module.exports = route;
