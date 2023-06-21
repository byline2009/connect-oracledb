const oracledb = require("oracledb");
// const DbConnection = oracledb.getConnection(
//   {
//     user: "sale_owner",
//     password: "saleowner01122015",
//     connectString: "10.25.8.30/DB01",
//   },
//   function (err, connection) {
//     if (err) {
//       console.error(err.message);
//       return;
//     }
//     console.log("Connection was successful!");
//   }
// );
// module.export = DbConnection;

var getConnected = function (sql, params, callback) {
  oracledb.getConnection(
    {
      // user: dbConfig.user,
      // password: dbConfig.password,
      // connectString: dbConfig.connectString,
      user: "sale_owner",
      password: "saleowner01122015",
      connectString: "10.25.8.30/DB01",
    },
    function (err, connection) {
      if (err) {
        console.error(err.message);
        callback(null);
        return;
      }
      connection.execute(
        sql,
        params,

        function (err, result) {
          if (err) {
            console.error(err.message);
            doRelease(connection);
            callback(null);
            return;
          }
          console.log(result.metaData);
          //console.log(result.metaData); // [ { name: 'DEPARTMENT_ID' }, { name: 'DEPARTMENT_NAME' } ]
          //console.log(result.rows);     // [ [ 180, 'Construction' ] ]
          //module.exports.rows  = result.rows;
          rows = result.rows;
          doRelease(connection);
          callback(rows);
          return;
        }
      );
    }
  );
};

function doRelease(connection) {
  connection.close(function (err) {
    if (err) {
      console.error(err.message);
    }
  });
}
module.exports.getConnected = getConnected;
