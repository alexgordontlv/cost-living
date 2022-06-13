const router = require("express").Router();
const User = require("../models/user");
const bodyParser = require("body-parser");
const path = require("path");
let alert = require('alert');


// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.post("/register", urlencodedParser,async (req, res) => {
    const isEmailExist = await User.findOne({ email: req.body.email });
    // throw error when email already registered
    if (isEmailExist)
        return alert("Email already exists")
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    try {
        const savedUser = await user.save();
        user_id = savedUser._id;
        res.redirect("/home");
        // res.json({  error: null, data: { userId: savedUser._id } });

    } catch (error) {
        res.status(400).json({ error });
    }
});

// login route
router.post("/login", urlencodedParser,async (req, res) => {
    // validate the user
    const user = await User.findOne({ email: req.body.email });
    // throw error when email is wrong
    if (!user) {
        return alert("Email or Password is wrong ")
        // return res.status(400).json({error: "Email or Password is wrong " + {user} + " " + req.body.email + " " + req.body.password});
    }
    // check for password correctness
    const validPassword = req.body.password.localeCompare(user.password)//bcrypt.compare(req.body.password, user.password);
    if (validPassword!=0) {
        return alert("Email or Password is wrong ")
        // return res.status(400).json({error: "Email or Password is wrong"});
    }
    user_id = user._id;
    res.redirect("/home");
    // res.json({  error: null, data: { userId: user._id } });
});


module.exports = router;