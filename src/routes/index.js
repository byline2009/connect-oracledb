const DbConnection = require("../DbConnection");
const employeeOffRouter = require("./EmployeeOff");
const dashboardRouter = require("./DashBoard");

function route(app) {
  app.use("/nhan-vien-nghi-viec", employeeOffRouter);
  app.use("/", dashboardRouter);
}
module.exports = route;
