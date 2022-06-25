const User = require("../models/user");

//report help functions
module.exports = {
    getMonth: async function  (userId){
        let user = null;
        var numeric = { year: 'numeric', month: 'numeric' };
        const obj = [];
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
        dictionary.forEach((key,value)=>{
            obj.push({date:value})
        })
        return obj;
    },
    getYears: async function (userId){
        let user = null;
        var numeric = { year: 'numeric' };
        let map = new Map();
        const obj = [];
        try {
            user = await User.findOne({ _id: userId }).lean();
        }catch (err){
            console.log(err);
        }
        if(user){
            let dates = user.cost_livings["records"].map(a=>a.date.toLocaleDateString('en-GB', numeric));
            for (const date of dates){
                map.set(date,date);
            }
        }
        map.forEach((key,value)=>{
            obj.push({day:"01",year:value})
        })

        // let keys = Array.from( map.keys() );
        return obj;
    }}