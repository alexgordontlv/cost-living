const express = require('express');
const router = express.Router();
const {ensureAuth} = require('../middleware/auth');
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const Product = require('../models/product');

//Show add product page
router.get('/add',ensureAuth,(req,res)=>{
    res.render('products/add')
})

//Process add product
router.post('/',ensureAuth,urlencodedParser,async (req,res)=>{
    try{
        console.log(req.body)
        await Product.create({ ...req.body, userId: req.user._id})
        res.redirect('/products')
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
    }
    if(product.userId!==req.user.id){
        res.redirect('/products/')
    }else{
        res.render('products/edit',{product,})

    }
})

//Update product 
router.put('/:id', ensureAuth, async (req, res) => {
    try {
        let product = await Product.findById(req.params.id).lean()

        if (!product) {
            return res.render('error/404')
        }

        if (product.userId !== req.user.id) {
            res.redirect('/products')
        } else {
            product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true,
            })

            res.redirect('/products')
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
        }

        if (product.userId !== req.user.id) {
            res.redirect('/products')
        } else {
            await Product.remove({ _id: req.params.id })
            res.redirect('/products')
        }
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})


module.exports = router