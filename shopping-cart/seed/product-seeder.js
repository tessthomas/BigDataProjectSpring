var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping');

var products = [
    new Product({
        imagepath: 'http://www.travelwhistle.com/wp-content/uploads/2016/03/Biryani1456905047.png',
        title: 'Hyderabadi Biryani2',
        description: '5/5', 
        price: 13.99
    })
];

var done = 0;
for(var i=0;i < products.length;i++){
    console.log("inside for loop");
    products[i].save(function(err, result){
        done++;
        if(done === products.length){
            exit();
        }
    });
}

function exit(){
    console.log("exiting seeder ...");
    mongoose.disconnect();
}