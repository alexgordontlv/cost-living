const express = require('express');
const router = express.Router();
const {ensureAuth} = require('../middleware/auth');
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const Product = require('../models/product');
const alert = require("alert");

//Show add product page
router.get('/add',ensureAuth,(req,res)=>{
    res.render('products/add')
})

//Process add product
router.post('/',ensureAuth,urlencodedParser,async (req,res)=>{
    try{
        console.log(req.body)
        await Product.create({ ...req.body, userId: req.user._id})
        await alert("Product added successfully!!")
        res.redirect('/records')
    }catch(err){
        console.error(err)
        res.render('error/500')
    }
})

//Show edit product page
router.get('/edit/:id',ensureAuth,async (req,res)=>{
    const product = await Product.findOne({_id: req.params.id}).lean()
    if(!product){
        return res.render('error/404')
    } else{
        res.render('products/edit',{product,})

    }
})

//Update product 
router.put('/:id', ensureAuth, async (req, res) => {
    try {
        let product = await Product.findById(req.params.id).lean()

        if (!product) {
            return res.render('error/404')
        } else {
            product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true,
            })
            await alert("Product Updated successfully!!")
            res.redirect('/records')
        }
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})

router.delete('/:id', ensureAuth, async (req, res) => {
    try {
        let product = await Product.findById(req.params.id).lean()

        if (!product) {
            return res.render('error/404')
        } else {
            await Product.remove({ _id: req.params.id })
            await alert("Product  deleted successfully!!")
            res.redirect('/records')
        }
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})


module.exports = router