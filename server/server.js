const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/mongoose');

const app = express();
app.use(cors());

dotenv.config({ path: './.env' });
connectDB();

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static('public'));
app.use(cors());
app.use(express.json());

//handlebars helper
const { formatDate, select } = require('./helpers/hbs');

//Static folder
const PORT = process.env.PORT || 8080;

//Routes
app.use('/', require('./routes/'));
app.use('/auth', require('./routes/auth'));
app.use('/report', require('./routes/report'));
app.use('/costlivings', require('./routes/costLivings'));

//load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));

app.get('/', (req, res) => {
	res.render('index');
});

app.listen(PORT, () => {
	console.log('Server is up and running on http://localhost:' + PORT);
});
