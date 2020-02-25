'use strict';

var base = module.superModule;

module.exports = function productTile(product, apiProduct, options) {
	base.call(this, product, apiProduct, options);
	return product;
}

