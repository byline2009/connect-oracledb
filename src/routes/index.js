const DbConnection = require("../DbConnection");
const employeeOffRouter = require("./EmployeeOff");
const dashboardRouter = require("./DashBoard");
const thaySim4GRouter = require("./Thaysim4G");

function route(app) {
  app.use("/nhan-vien-nghi-viec", employeeOffRouter);
  app.use("/thay-sim-4g", thaySim4GRouter);
  app.use("/", dashboardRouter);
}
module.exports = route;
