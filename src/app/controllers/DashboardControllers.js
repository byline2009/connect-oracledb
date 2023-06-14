const DbConnection = require("../../DbConnection");
class DashboardController {
  index(req, res) {
    res.send("hello world");
  }
  show(req, res) {
    console.log("check");
    res.send("detail");
  }
}
module.exports = new DashboardController();
