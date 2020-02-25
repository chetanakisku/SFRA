'use strict';

var server = require('server');
var URLUtils = require('dw/web/URLUtils');
var Logger = require('dw/system/Logger');

// ASSIGNMENT 3 - Write a new MIDDLEWARE
var setCookie = require('*/cartridge/scripts/middleware/setCookie');

var page = module.superModule;
server.extend(page);

server.append('Show', setCookie.setLocaleCookie, function (req, res, next) {
// ASSIGNMENT 5 - Pdict use, setViewData
	var viewData = res.getViewData();
	viewData.testing = 'TESTING';
	//res.setViewData(viewData);
	//res.json({value:'Hello world'})
	viewData.actionUrls = {
        	notifyMeEmail: URLUtils.url('Product-NotifyMeEmail').toString()
    };
    res.setViewData(viewData);
	next();
		
});

server.post('NotifyMeEmail', function (req, res, next){
//	res.json({
//        redirectUrl: URLUtils.url('Product-Show').toString()
//    });
	this.on('route:BeforeComplete', function (req, res) {
		var CustomerMgr = require('dw/customer/CustomerMgr');
		var viewData = res.getViewData();
		var email = req.form.notifyEmail;
		
		var authenticateCustomerResult = CustomerMgr.getCustomerByLogin(email);
		if(authenticateCustomerResult) {
			viewData.msg = 'Email has been sent to your registered email';
		} else {
			viewData.msg = 'Email not found';
		}
		res.setViewData(viewData);
		res.render('product/notifyModal');
	});
	next();
});
//server.prepend('Show', function(req, res,next) {
//	res.render('home/homePage');
//	this.emit('route:Complete', req, res);
//});

module.exports = server.exports();