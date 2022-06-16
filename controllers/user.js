var User = require('../models/user');

exports.test = (req, res) => {
    res.send('Greetings from the Test controller!');
};

exports.user_create = (req, res) => {
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    User.save((err) => {
        if (err) {
            return next(err);
        }
        res.send('User Created successfully');
    });
};

exports.user_details = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) return next(err);
        res.send(user);
    });
};

exports.user_update = (req, res) => {
    User.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, product) => {
        if (err) return next(err);
        res.send('User updated.');
    });
};

exports.user_delete = (req, res) => {
    User.findByIdAndRemove(req.params.id, (err) => {
        if (err) return next(err);
        res.send('Deleted successfully!');
    });
};
