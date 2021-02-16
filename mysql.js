const config = require("./config");
const mysql = require("mysql");

var con = mysql.createConnection({
    host: config.db,
    user: config.db_user,
    password: config.db_password,
    port: config.db_port,
    insecureAuth: true
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  module.exports = con;