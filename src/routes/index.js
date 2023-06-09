const DbConnection = require("../DbConnection");
const employeeOffRouter = require("./EmployeeOff");
function route(app) {
  app.use("/nhan-vien-nghi-viec", employeeOffRouter);
}
module.exports = route;
