'use strict';

var processInclude = require('./util');

$(document).ready(function () {
    processInclude(require('./product/detail'));
    
});

//ASSIGNMENT 2 - NOTIFY ME
var productId = $('#productData').data('pid');
var isLoggedInUser = $('#customerData').data('customer-loggedin');

function submitNotifyEmail(email, type) {
	var form = $('form#notifyMeForm');
	event.preventDefault();
    var url = form.attr('action');
	var data = {
		productId: productId,
		customerType: type,
		email: email
	}
	
    $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        data: data,
        success: function (res) {
        	var _customerType = res.customerType === 'loggedIn' ? 'registered':'entered';
        	var _msg = 'Email has been sent to your '+ _customerType + ' email id: '+ res.notifyEmail;
        	$('.notifyMsg').text(_msg);
        }
    })
}

//Guest user scenario
$('#NotifyMeBtn').click(function (e){
	if(!isLoggedInUser){
		$('.notify-me-container').css('display','block');
	} else {
		var loggedInEmail = $('#customerData').data('customer-email');	
		submitNotifyEmail(loggedInEmail, 'loggedIn');
	}
})

//LoggedIn user scenario
$('form#notifyMeForm').submit(function (e) {	
	var notifyEmail = $('#notifyEmail').val();
	submitNotifyEmail(notifyEmail, 'guest');
})