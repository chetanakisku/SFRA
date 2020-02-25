'use strict';

function showLog (req, res, next) {
    var reqUrl = req.host+req.path;
    var reqMethod = req.httpMethod;
    var logDate = new Date();
    var logMsg = 'Logged '+reqUrl+' '+reqMethod+'--'+logDate;

    
    res.setViewData({
    	showLog: logMsg
    });
    
    next();
}

module.exports = {
		showLog: showLog
};
