const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const authRoutes = require("./routes/auth");
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');
// create application/json parser
var jsonParser = bodyParser.json()
const productRouter = require('./routes/product');
mongoose.connect(
	process.env.DB_CONNECT,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	() => console.log("connected to db")
);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
global.user_id = "";
app.use('/' , authRoutes);
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));
app.get('/',function(req,res) {
	res.sendFile(path.join(__dirname+'/login.html'));
});
app.get("/registration",function (req,res){
	res.sendFile(path.join(__dirname+'/registration.html'));
});
app.get("/home",isLoggedIn,function (req,res){
	res.sendFile(path.join(__dirname+'/home.html'));
});
const port = 3001;

function isLoggedIn(req, res, next) {
	if (user_id.length!==0) return next();
	res.sendFile(path.join(__dirname+'/login.html'));
}
db.once('open', () => {
	console.log('Connected!');
	app.listen(port, () => {
		console.log('Server is up and running on port number ' + port);
	});
});
