const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./config/mongoose');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');

const app = express();

dotenv.config({ path: './.env' });
//Passport config
require('./config/passport')(passport);
connectDB();

//pars request to body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Method override
app.use(
	methodOverride(function (req, res) {
		if (req.body && typeof req.body === 'object' && '_method' in req.body) {
			// look in urlencoded POST bodies and delete it
			let method = req.body._method;
			delete req.body._method;
			return method;
		}
	})
);

//handlebars helper
const { formatDate, select } = require('./helpers/hbs');

//handlebars
app.engine(
	'.hbs',
	exphbs.engine({
		helpers: {
			formatDate,
			select,
		},
		defaultLayout: 'main',
		extname: '.hbs',
	})
);
app.set('view engine', '.hbs');

//Sessions
app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
		// store: new MongoStore({mongooseConnection: mongoose.connection})
	})
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Static folder
app.use(express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 8080;

//Routes
app.use('/', require('./routes/'));
app.use('/auth', require('./routes/auth'));
app.use('/products', require('./routes/costLivings'));

//log requests
app.use(morgan('tiny'));

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
