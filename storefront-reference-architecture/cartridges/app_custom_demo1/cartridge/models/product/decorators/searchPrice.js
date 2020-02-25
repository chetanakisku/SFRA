'use strict';

var base = module.superModule;

// ASSIGNMENT 4 - Extending models
module.exports = function (object, searchHit, activePromotions, getSearchHit) {
	base.call(this, object, searchHit, activePromotions, getSearchHit);
	Object.defineProperty(object, 'points', {
        enumerable: true,
        value: object.price.sales.value * 2
    });
}