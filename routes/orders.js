const express = require('express');
const router = express.Router();
const {database} = require('../config/helper');
/* GET users listing. */
router.get('/', function (req, res, next) {
   database.table('orders_details as od')
       .join([
          {
             table: 'orders as o',
             on: 'o.id = od.order_id'
          },
          {
             table: 'products as p',
             on: 'p.id = od.product_id'
          },
          {
             table: 'users as u',
             on: 'u.id = o.user_id'
          }
       ])
       .withFields(['o.id', 'p.title  as name', 'p.description', 'p.price', 'u.username'])
       // .sort({id:1})
       .getAll()
       .then(orders => {
          if (orders.length > 0) {
             res.status(200).json({
                orders
             })
          } else {
             res.status(404).json({
                message: 'No order found'
             })
          }
       }).catch(err => {
      console.log(err)
   });
});

// single order
router.get('/:orderId', function (req, res) {
   const orderId = req.params.orderId;
   database.table('orders_details as od')
       .join([
          {
             table: 'orders as o',
             on: 'o.id = od.order_id'
          },
          {
             table: 'products as p',
             on: 'p.id = od.product_id'
          },
          {
             table: 'users as u',
             on: 'u.id = o.user_id'
          }
       ]).withFields(['o.id', 'p.title  as name', 'p.description', 'p.price', 'u.username'])
       .filter({'o.id': orderId})
       .get().then(order => {
          if (order) {
             res.status(200).json({
                order
             })
          }else
          {
          res.status(404).json({
             message: 'No order found'
          });
          }
       }).catch(err=> {console.log(err)});
})

module.exports = router;
