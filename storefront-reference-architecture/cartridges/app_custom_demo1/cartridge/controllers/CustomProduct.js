'use strict';

var server = require('server');

//ASSIGNMENT 1 - CustomProduct-Show?PID=013742003154M

server.get('Show', function (req, res, next) {
	var ProductMgr = require('dw/catalog/ProductMgr');	
	var product = ProductMgr.getProduct(req.querystring.PID);
	var productModal= product;
	res.render('customProduct', productModal);
	next();
	
//ASSIGNMENT - Access custom attribute and do write operation in custom object
//	// Access custom object value
//	var CustomObjectMgr = require('dw/object/CustomObjectMgr');
//	var customObj = CustomObjectMgr.getCustomObject('testObject', 111);
//	var c_name = customObj.custom.name;
//	
//	// Write operation on custom object in bm
//	var transaction = require('dw/system/Transaction');
//	transaction.wrap(function(){
//		var newCustomObj = CustomObjectMgr.createCustomObject('testObject', 112);
//		newCustomObj.custom.name = 'New Chetana';
//	})
//	
//	res.render('customProduct', {c_name: c_name});
//	next();
});
//TO DO: Remove next() and check behavior

//ASSIGNMENT 2 - PREPEND
//server.prepend('Show',  function (req, res, next) {
//	var productModal= {
//		c_attribute : 'testing on prepend'     
//	};
//	res.render('customProduct', productModal);
//	next();
//});

//ASSIGNMENT 2 - APPEND
//server.append('Show',  function (req, res, next) {
//	var productModal= {
//		c_attribute : 'testing on append'     
//	};
//	res.render('customProduct', productModal);
//	next();
//});

//ASSIGNMENT 2 - REPLACE
//server.replace('Show', function(req, res, next){
//    res.render('test');
//    next();
//});


module.exports = server.exports();
