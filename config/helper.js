const mysqli = require('mysqli');

 let  conn  =  new  mysqli ( {
   host : 'localhost' ,  // IP/domain name
   post : 3306 ,  //port, default 3306
   user : 'root' ,  //user name
   passwd : '' ,  //password
   db : 'mega_shop'  // You can specify the database or not [optional]
} )
let db = conn.emit(false,'');
 module.exports = {
   database : db,
 };