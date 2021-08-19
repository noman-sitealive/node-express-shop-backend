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
       .getAll().then(order => {
          if (order) {
             res.status(200).json({
                order
             })
          }else
          {
          res.status(404).json({
             message: `No order found with ${orderId} order`
          });
          }
       }).catch(err=> {console.log(err)});
})
// Place a new order

router.post('/new/', (req, res) => {
   // let {userId,product} = req._body

   console.log(req.jsonParser)

   // if (userId!=null && userId>0 && !isNaN(userId)){
   //    database.table('orders').insert({
   //       user_id: userId
   //    }).then(newOrderId => {
   //       if (newOrderId > 0 ){
   //          products.forEach(async(p) =>{
   //           let data = await database.table('products').filter({id:p.id}).withFields(['quantity']).get();
   //           let  inCart = p.inCart;
   //           //Deduct the number of pieces ordered from quantity to column in database
   //             if (data.quantity > 0){
   //                data.quantity = data.quantity - inCart;
   //                if (data.quantity < 0){
   //                   data.quantity = 0;
   //                }
   //             }else {
   //                data.quantity = 0;
   //             }
   //             // Insert order details  W.R.T the newly generated order ID
   //             database.table('orders_details').insert({
   //                order_id: newOrderId,
   //                product_id: p.id,
   //                products: products,
   //                quantity: inCart
   //             }).then(newId => {
   //                database.table('products').filter({id: p.id}).update({
   //                   quantity: data.quantity,
   //                }).then(successNum => ({})).catch(err => {console.log(err)})
   //             }).then(err => console.log(err));
   //          });
   //       }else {
   //          res.json({message: 'New order failed while adding the order description'});
   //       }
   //       res.json({
   //          message: `New order placed successfully with order id ${newOrderId}`,
   //          success: true,
   //          order_id: newOrderId,
   //          products: products,
   //       });
   //    }).catch(err=>console.log(err));
   // }else {
   //    res.json({
   //       message: 'New order placement failed',
   //       success: false,
   //    })
   // }
});

router.post('/payment',((req, res) =>{
 setTimeout( ()=> {
    res.status(200).json({
       message: 'Payment successful',
       success: true
    },300);
 })
}));

module.exports = router;
