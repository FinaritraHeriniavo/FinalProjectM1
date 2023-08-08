var express = require('express');
var path=require('path');
var fs = require('fs');
var app = express();
var session = require('express-session');
var moment = require('moment');
var bodyParser = require('body-parser');
var mysql = require('mysql');
const split = require('split-string');
const querystring = require('querystring'); 
const db = require('./config.js');
var connection = db.connection;

var dpController=require('./dpController.js');
var likedByMethod=require('./methods.js');

app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration:  10 * 1000,
  activeDuration: 10 * 1000,
  resave: true,
  saveUninitialized: true
}));

app.use(express.static(require('path').join(__dirname + '/Public')));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

users = [];
connections = [];

var urlencodedParser = bodyParser.urlencoded({ extended: false})

app.get('/',function(req,res) {
	res.render( 'start', {
		username: 'hi',
		passwordIncorrect: ' ',
		userNotRegistered: ' '
	});
})

       
app.post('/login',urlencodedParser,function(req,res){
	const email = req.body.email;
	const password = req.body.password;
	
	connection.query('SELECT * FROM users WHERE Email = ? AND password = ?',[email,password],function(error, results){
		if(error){
			console.log("error");
			res.redirect('/login');
		}
		if(email.length == 0 || password.length == 0)
		{
		    res.render( 'login', {
			passwordIncorrect: 'Insufficient Credentials',
			userNotRegistered: ' ',
			loginAgain: ' '
			});	
		}
        else{
			if(results.length > 0){
		
					
					var newUser = {
	                    Nom :results[0].Nom, 
						Prenom:results[0].Prenom, 
						Email :results[0].Email,
						Adresse:results[0].Adresse,
					};
					req.session.user=newUser;
					console.log("Login Successful");
					res.redirect('/Acceuil');
				}
				else{
					console.log("Password Incorrect");
					res.render( 'login', {
						passwordIncorrect: 'password Incorrect',
						userNotRegistered: ' ',
						loginAgain: ' '
					});
				}
			}
	
		
});



app.post('/register',urlencodedParser,function(req,res){
	var nom = req.body.nom;
	var prenom = req.body.prenom;
	var email = req.body.email; 
	var password = req.body.password;
	var adresse = req.body.adresse;

	connection.query('SELECT * FROM Utilisateur WHERE Email = ?',[email],function(error, results)
	{
		if(error){
			console.log("error at query");
			res.send({
				"code":400,
				"failed":"Error ocurred"
			});
		}
		else{
			if(results.length > 0)
			{
				console.log("USER EXISTS");
				res.render('register', {
					pnameTaken: 'Profile name taken.. choose other Profile Name!!',
					emailTaken: ' '
				});
			}
			else{
 
				connection.query("INSERT INTO Utilisateur (Nom,Prenom,Email,Password,Adresse) values ('"+nom+"','"+prenom+"','"+email+"','"+password+"','"+Adresse+"')",function(error, results)
				{
					            if(error)
								{
									console.log("error at inserting values");
									res.send({
										"code":400,
										"failed":"Error ocurred"
									});
								}
								else
								{
									console.log("Register Successful");
									console.log(pname+" "+email+" "+password);
									//res.sendFile(__dirname+"/login.html");
									res.redirect('/login');
	
								}
				});
			}
		}
	});
});


app.get('/logout', function(req, res) {
  	req.session.destroy(function(err){
  		if(err){
  			console.log(err);
  		}
  		else {
  			res.redirect('/login');
  		}
  	});
});




app.get('/Restaurant', (req, res) => {
	const query = 'SELECT * FROM Restaurant';
	connection.query(query, (err, results) => {
	  if (err) {
		console.error('Error executing query:', err);
		res.status(500).json({ error: 'Error fetching records' });
	  } else {
		res.status(200).json(results);
	  }
	});
  });
  

  app.get('/Restaurant/:province', (req, res) => {
	var province =req.params.province;
	
	connection.query("SELECT * FROM Resto_Province WHERE Nom = ?",[province], (err, results) => {
	  if (err) {
		console.error('Error executing query:', err);
		res.status(500).json({ error: 'Error fetching records' });
	  } else {
		res.status(200).send(results);
	  }
	});
  });

  app.get('/Magasin', (req, res) => {
	const query = 'SELECT * FROM Magasin';
	connection.query(query, (err, results) => {
	  if (err) {
		console.error('Error executing query:', err);
		res.status(500).json({ error: 'Error fetching records' });
	  } else {
		res.status(200).send(results);
	  }
	});
  });

  
  app.get('/Acceuil', (req, res) => {
	const query = 'SELECT * FROM Province';
	connection.query(query, (err, results) => {
	  if (err) {
		console.error('Error executing query:', err);
		res.status(500).json({ error: 'Error fetching records' });
	  } else {
		res.status(200).send(results);
	  }
	});
  });


dpController(app);
var server = app.listen(8081, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log(host+" "+port);
});