'use strict';

function getCustomProductAttribue(product) {
	var customObj = {};
	customObj.starRating= product.custom.c_starRating ? product.custom.c_starRating : 0 ;
	return customObj;
}

module.exports = function (object, product) {
    Object.defineProperty(object, 'custom', {
        enumerable: true,
        value: getCustomProductAttribue(product)
    });
};
