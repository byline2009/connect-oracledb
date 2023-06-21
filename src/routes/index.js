const DbConnection = require("../DbConnection");
const employeeOffRouter = require("./EmployeeOff");
const dashboardRouter = require("./DashBoard");
const thaySim4GRouter = require("./Thaysim4G");
const ptm_nvbh_tbtt_Router = require("./PTM_NVBH_TBTT");

function route(app) {
  app.use("/nhan-vien-nghi-viec", employeeOffRouter);
  app.use("/thay-sim-4g", thaySim4GRouter);
  app.use("/ptm-nvbh-tbtt", ptm_nvbh_tbtt_Router);
  app.use("/", dashboardRouter);
}
module.exports = route;
