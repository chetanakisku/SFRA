'use strict';

var server = require('server');
var URLUtils = require('dw/web/URLUtils');

var page = module.superModule;
server.extend(page);

server.append('Show', function (req, res, next) {
	var viewData = res.getViewData();
	viewData.actionUrl = URLUtils.url('Product-NotifyTemplate');
	var isLoggedInUser = req.currentCustomer.raw.authenticated;
	var currentCustomerEmail = isLoggedInUser && req.currentCustomer.profile.email;
	viewData.customer = {
		type: isLoggedInUser,
		email: currentCustomerEmail
	}
    res.setViewData(viewData);
 
	next();	
});

server.post('NotifyTemplate', function (req, res, next){
	//Fetch data from request
	var notifyMeForm = server.forms.getForm('notifyMe');
	var customerType = req.form.customerType;
	var email = req.form.email;
	var productId = req.form.productId;
	
	var CustomerMgr = require('dw/customer/CustomerMgr');
	var CustomObjectMgr = require('dw/object/CustomObjectMgr');
	var Transaction = require('dw/system/Transaction');
	var ArrayList = require('dw/util/ArrayList');
    
    var notifyMeProducts, _productArr;
    Transaction.wrap(function(){
    	var isRegisteredNotifyEmail = CustomObjectMgr.getCustomObject('NotifyMeEmails', email);
        if(isRegisteredNotifyEmail) {
        	notifyMeProducts = isRegisteredNotifyEmail.custom.product_id;
        	_productArr = new ArrayList(notifyMeProducts) || [];
        	_productArr.push(productId);
        	isRegisteredNotifyEmail.custom.product_id = _productArr;
        } else {
			var newCustomObj = CustomObjectMgr.createCustomObject('NotifyMeEmails', email);
			_productArr = [];
			_productArr.push(productId);
			newCustomObj.custom.product_id = _productArr;
        }
    });
    
    notifyMeForm.clear();
    
	res.json({
		notifyEmail: email,
		customerType: customerType,
		notifyMeProducts: _productArr
	})

	return next();
});

module.exports = server.exports();