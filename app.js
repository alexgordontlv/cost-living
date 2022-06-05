const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRouter = require('./routes/product');

const app = express();

const mongoDB = process.env.MONGODB_URI;

mongoose.connect('mongodb+srv://hitstudent:Test123@cluster0.gnu5o.mongodb.net/?retryWrites=true&w=majority');
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/product', productRouter);

const port = 3001;

db.once('open', () => {
	console.log('Connected!');
	app.listen(port, () => {
		console.log('Server is up and running on port numner ' + port);
	});
});
