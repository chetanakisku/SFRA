'use strict';

var base = module.superModule;
var customAttribute = require('*/cartridge/models/product/decorators/customAttribute');

module.exports = function fullProduct(product, apiProduct, options) {
	base.call(this, product, apiProduct, options);
	customAttribute(product, apiProduct);
	
	return product;	
};