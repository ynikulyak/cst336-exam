const express = require('express');
const app = express();
const tools = require('./tools.js');
const request = require('request');
const session = require('express-session');
const mysql = require('mysql');

const isLocal = true;
var port = isLocal ? '8081' : process.env.PORT;
var ip = isLocal ? '0.0.0.0' : process.env.IP;

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get("/", function(req, res){
  res.render('index');
});

//COULDN"T FIND THE ERROR WHY sqlParams won't work with ? mark instead of qId = 2
app.get('/nextQuestion', function(req, res){
  let sql = "SELECT question, choice1, choice2, choice3, choice4, answer FROM calquiz_questions WHERE qId = 2 ";
  //let sqlParams = [req.query.qId];
  const conn = tools.createConnection();
  //code for the connection
	conn.connect(function(err){
		if(err) throw err;

		conn.query(sql, function(err, rows, field){
			if(err) {
				conn.end();
				throw err
			}
			//pass records to the view 'favorites'
      console.log(rows);
			res.render("nextQuestion", {"rows": rows});
			conn.end();
		}); //query
	})
});

app.get('/report', function(req, res){
    var connection = tools.createConnection();
let sql = "SELECT email, score FROM calquiz_scores WHERE email = ?";
  let sqlParams = [req.query.email];
  conn.connect(function(err){
		if(err) throw err;

		conn.query(sql, sqlParams, function(err, rows, field){
			if(err) {
				conn.end();
				throw err
			}
			//pass records to the view 'favorites'
      console.log(rows);
			res.render("report", {"rows": rows});
			conn.end();
		}); //query
  });
});



//this api done partial

/*app.get("/api/updateDB", function(req, res){
  var connection = tools.createConnection();

  var sql = "UPDATE calquiz_scores SET score = score + 1  WHERE email = ?";

  var sqlParams = [req.query.email];

  //code for the connection
  connection.connect(function(err) {
    if (err) throw err;

    connection.query(sql, sqlParams, function(err, results) {
      if (err) {
        connection.end();
        throw err
      }
      if (results.affectedRows == 0) {
        var insertSql = "INSERT INTO calquiz_scores (sId, email, score, timestamp) VALUES  (?, ?, ?, ?)";
        var insertParams = [req.query.email, req.query.score];
        connection.query(insertSql, insertParams, function(err, insertErr, insertResult) {

          if (err) {
            connection.end();
            throw err
          }
        });
      }
    });
  });
}); */
//server listener
app.listen(port, ip, function(){
  console.log("Express Server is Running....")
});