'use strict';

var Locale = require('dw/util/Locale');
var Cookie = require('dw/web/Cookie');

function setLocaleCookie(req, res, next) {
	var currentLocale = Locale.getLocale(req.locale.id);
	var cookie = new Cookie ('CurrentLocale', currentLocale);
	response.addHttpCookie(cookie);
    next();
}
module.exports = {
    setLocaleCookie: setLocaleCookie
};
