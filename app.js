const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

var RDS_HOSTNAME = process.env.RDS_HOSTNAME
var RDS_USERNAME = process.env.RDS_USERNAME 
var RDS_PASSWORD = process.env.RDS_PASSWORD 
// parse application/json
app.use(bodyParser.json());

//create database connection
const conn = mysql.createConnection({
  host: RDS_HOSTNAME,
  user: RDS_USERNAME,
  password: RDS_PASSWORD,
  database: 'quantum',
  ssl: true
});

//connect to database
conn.connect((err) => {
  if (err) throw err;
  console.log('Mysql Connected...');
});


app.get('/_healthcheck', (req, res) => {
  res.send(JSON.stringify({
    "status": 200,
    "error": null,
    "response": "{'status': 'OK'} "
  }));
});
//show all products
app.get('/api/flightschedule', (req, res) => {
  let sql = "SELECT * FROM test1";
  conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({
      "status": 200,
      "error": null,
      "response": results
    }));
  });
});

//show single product
app.get('/api/flightschedule/:id', (req, res) => {
  let sql = "SELECT * FROM test1 WHERE sno=" + req.params.id;
  conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({
      "status": 200,
      "error": null,
      "response": results
    }));
  });
});


module.exports = app
