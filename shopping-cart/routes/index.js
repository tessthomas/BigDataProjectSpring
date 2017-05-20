var express = require('express');
var router = express.Router();
var Product = require('../models/product');

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client();

router.get('/', function(req, res, next) {
  console.log("Search Re:  "+req.query.search);
  if(req.query.search){
    const regex = new RegExp(escapeRegex(req.query.search),'gi');
    Product.find({title:regex},function(err, docs){
      var productChunks = [];
      var chunkSize = 3;
      for(var i=0; i < docs.length; i += chunkSize){
        productChunks.push(docs.slice(i, i + chunkSize));
      };
      res.render("shop/index", { products: productChunks });
    });
  }else{
    Product.find(function(err, docs){
      var productChunks = [];
      var chunkSize = 3;
      for(var i=0; i < docs.length; i += chunkSize){
        productChunks.push(docs.slice(i, i + chunkSize));
      };
      res.render('shop/index', { title: 'BigData Project', products: productChunks });
    });
  }
});

function escapeRegex(text){
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;
