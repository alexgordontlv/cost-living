const User = require("../models/user");
module.exports = {
    getMonth: async function  (userId){
        let user = null;
        var numeric = { year: 'numeric', month: 'numeric' };
        let dictionary = new Map();
        try {
            user = await User.findOne({ _id: userId }).lean();
        }catch (err){
            console.log(err);
        }
        if(user){
            let dates = user.cost_livings["records"].map(a=>a.date.toLocaleDateString('en-GB', numeric).replace("/", '-'));
            for (const date of dates){
                dictionary.set(date,date);
            }
        }
        let keys = Array.from( dictionary.keys() );
        return keys;
        // return dictionary
    },
    getYears: async function (userId){
        let user = null;
        var numeric = { year: 'numeric' };
        let dictionary = new Map();
        try {
            user = await User.findOne({ _id: userId }).lean();
        }catch (err){
            console.log(err);
        }
        if(user){
            let dates = user.cost_livings["records"].map(a=>a.date.toLocaleDateString('en-GB', numeric));
            for (const date of dates){
                dictionary.set(date,date);
            }
        }
        let keys = Array.from( dictionary.keys() );
        return keys;
    }}