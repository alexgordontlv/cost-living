const mongoose  = require('mongoose');
const User = require('../models/user');
const passportCustom = require('passport-custom');
const CustomStrategy = passportCustom.Strategy;

module.exports = function(passport) {
    passport.use('strategy-name', new CustomStrategy(
        async (req,done) =>{
            try {
                // Test whether is a login using email and password
                if (req.body.email && req.body.password) {
                    const user = await User.findOne({ email: req.body.email});
                    const validPassword = req.body.password.localeCompare(user.password)
                    if (!user) {
                        done(null, false);
                    }
                    if(validPassword){
                        done(null, false);
                    }

                    done(null, user);
                    // TODO - check password
                } else {
                    done(null, false);
                }
            } catch (error) {
                done(error);}
        }
    ));

    passport.serializeUser(function(user,done){
        done(null,user.id);
    });

    passport.deserializeUser(function(id,done){
        User.findById(id,function(err,user){
            done(err,user);
        })
    });
}