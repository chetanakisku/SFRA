'use strict';

var baseCartHelper = require('/app_storefront_base/cartridge/scripts/cart/cartHelpers');
var ProductMgr = require('dw/catalog/ProductMgr');
var Resource = require('dw/web/Resource');
var productHelper = require('/app_storefront_base/cartridge/scripts/helpers/productHelpers');

function addProductToCart(currentBasket, productId, quantity, childProducts, options) {
    var availableToSell;
    var defaultShipment = currentBasket.defaultShipment;
    var perpetual;
    var product = ProductMgr.getProduct(productId);
    var productInCart;
    var productLineItems = currentBasket.productLineItems;
    var productQuantityInCart;
    var quantityToSet;
    var optionModel = productHelper.getCurrentOptionModel(product.optionModel, options);
    var maxProductLimitInCart = product.custom.maxProductLimit ? product.custom.maxProductLimit : 3 ;
    var result = {
        error: false,
        message: Resource.msg('text.alert.addedtobasket', 'product', null)
    };

    var totalQtyRequested = 0;
    var canBeAdded = false;

    if (product.bundle) {
        canBeAdded = checkBundledProductCanBeAdded(childProducts, productLineItems, quantity);
    } else {
        totalQtyRequested = quantity + baseCartHelper.getQtyAlreadyInCart(productId, productLineItems);
        perpetual = product.availabilityModel.inventoryRecord.perpetual;
        canBeAdded =
            ((perpetual
            || totalQtyRequested <= product.availabilityModel.inventoryRecord.ATS.value) && maxProductLimitInCart >= totalQtyRequested );
    }

    if (!canBeAdded) {
        result.error = true;
        if(maxProductLimitInCart <= totalQtyRequested){
        	result.message = Resource.msgf(
                'error.alert.max.orderlimit.reached',
                'product',
                null,
                maxProductLimitInCart,
                product.name
            );
        }else{
        	result.message = Resource.msgf(
                'error.alert.selected.quantity.cannot.be.added.for',
                'product',
                null,
                product.availabilityModel.inventoryRecord.ATS.value,
                product.name
            );
        }
        
        return result;
    }

    productInCart = baseCartHelper.getExistingProductLineItemInCart(
        product, productId, productLineItems, childProducts, options);

    if (productInCart) {
        productQuantityInCart = productInCart.quantity.value;
        quantityToSet = quantity ? quantity + productQuantityInCart : productQuantityInCart + 1;
        availableToSell = productInCart.product.availabilityModel.inventoryRecord.ATS.value;

        if (availableToSell >= quantityToSet || perpetual) {
            productInCart.setQuantityValue(quantityToSet);
            result.uuid = productInCart.UUID;
        } else {
            result.error = true;
            result.message = availableToSell === productQuantityInCart
                ? Resource.msg('error.alert.max.quantity.in.cart', 'product', null)
                : Resource.msg('error.alert.selected.quantity.cannot.be.added', 'product', null);
        }
    } else {
        var productLineItem;
        productLineItem = baseCartHelper.addLineItem(
            currentBasket,
            product,
            quantity,
            childProducts,
            optionModel,
            defaultShipment
        );

        result.uuid = productLineItem.UUID;
    }

    return result;
}
module.exports = {
	    addProductToCart: addProductToCart,
	    checkBundledProductCanBeAdded: baseCartHelper.checkBundledProductCanBeAdded,
	    ensureAllShipmentsHaveMethods: baseCartHelper.ensureAllShipmentsHaveMethods,
	    getQtyAlreadyInCart: baseCartHelper.getQtyAlreadyInCart,
	    getNewBonusDiscountLineItem: baseCartHelper.getNewBonusDiscountLineItem,
	    getExistingProductLineItemInCart: baseCartHelper.getExistingProductLineItemInCart,
	    getExistingProductLineItemsInCart: baseCartHelper.getExistingProductLineItemsInCart,
	    getMatchingProducts: baseCartHelper.getMatchingProducts,
	    allBundleItemsSame: baseCartHelper.allBundleItemsSame,
	    hasSameOptions: baseCartHelper.hasSameOptions,
	    BONUS_PRODUCTS_PAGE_SIZE: baseCartHelper.BONUS_PRODUCTS_PAGE_SIZE,
	    updateBundleProducts: baseCartHelper.updateBundleProducts,
	    getReportingUrlAddToCart: baseCartHelper.getReportingUrlAddToCart
	};