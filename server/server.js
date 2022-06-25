const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/mongoose');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');

const app = express();
app.use(cors());

dotenv.config({ path: './.env' });
//Passport config
connectDB();

//pars request to body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//handlebars helper
const { formatDate, select } = require('./helpers/hbs');

//Static folder
app.use(express.static(path.join(__dirname, 'public')));
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
