var express = require('express');
var router = express.Router();

const {database} = require('../config/helper')

/* GET products. */
router.get('/', function (req, res, next) {
   let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;
   const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10;

   let startValue;
   let endValue;

   if (page > 0) {
      startValue = (page * limit) - limit;
      endValue = page * limit;
   } else {
      startValue = 0;
      endValue = 10;
   }

   database.table('products as p')
       .join([{
          table: 'categories as c',
          on: 'c.id = p.cat_id'
       }])
       .withFields([
          'c.title as category',
          'p.title as name',
          'p.price',
          'p.quantity',
          'p.image',
          'p.id'
       ])
       .slice(startValue, endValue).sort({id: .1}).getAll().then(prods => {
      if (prods.length > 0) {
         res.status(200).json({
            count: prods.length,
            products: prods
         })
      } else {
         res.json({message: 'No products found!'});
      }
   }).catch(err => console.log(err));

});

router.get('/:productId', function (req, res) {
   let productId = req.params.productId;
   database.table('products as p')
       .join([{
          table: 'categories as c',
          on: 'c.id = p.cat_id'
       }])
       .withFields([
          'c.title as category',
          'p.title as name',
          'p.price',
          'p.quantity',
          'p.image',
          'p.images',
          'p.id'
       ]).filter({'p.id': productId}).get().then(prod => {
      if (prod) {
         res.status(200).json({
            products: prod
         })
      } else {
         res.json({message: 'No products found!'});
      }
   }).catch(err => console.log(err));
})

router.get('/category/:catName', function (req, res) {

   let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;
   const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10;

   let startValue;
   let endValue;

   if (page > 0) {
      startValue = (page * limit) - limit;
      endValue = page * limit;
   } else {
      startValue = 0;
      endValue = 10;
   }


   const catName = req.params.catName;

   database.table('products as p')
       .join([{
          table: 'categories as c',
          on: `c.id = p.cat_id WHERE c.title LIKE '%${catName}%'`
       }]).withFields([
      'p.title as name',
       'p.price',
       'p.quantity',
       'p.image',
       'p.id',
   ]).slice(startValue,endValue).sort({id: .1}).getAll().then(prods =>{
      if (prods.length > 0){
         res.status(200).json({
            count: prods.length,
            products: prods,
         })
      }else {
         res.status(404).json({
            message: `No product found from ${catName} category`
         })
      }
   }).catch(err=>console.log(err))

});

module.exports = router;
