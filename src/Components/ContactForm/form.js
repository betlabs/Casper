var ContactForm = function (options) {
	
	function validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}
	function validateName(name) {
		var re = /^[a-zA-Z ]+$/;
		return re.test(name);
	}
	var eField = $(options.emailField),
		btnEmail = $(options.emailBtn),
		nameField = $(options.nameField),
		btnName = $(options.nameBtn),
		msgField = $(options.messageField),
		btnMsg = $(options.messageBtn);

	eField.keyup(function(event) {
		var res = validateEmail(eField.val());
		if (event.keyCode == 13) {
			if (!res) {
				event.preventDefault();
			} else {
				var activeElem = $('.email-form-step.active');
				activeElem.addClass('animated fadeOutLeft');
				activeElem.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
					activeElem.removeClass('active');
					var stepTwo = $('.js-step-2')
					stepTwo.addClass('active');
					stepTwo.addClass('animated fadeInRight');
				});
			}
		}
		if (res) {
			btnEmail.prop('disabled', false);
			btnEmail.addClass('btn_green');
		} else {
			btnEmail.prop('disabled', true);
			if (btnEmail.hasClass('btn_gree')) {
				btnEmail.removeClass('btn_green');
			}
		}
	});
	nameField.keyup(function(event) {
		var res = validateName(nameField.val());
		var res = validateEmail(eField.val());
		if (event.keyCode == 13) {
			if (!res) {
				event.preventDefault();
			} else {
				var activeElem = $('.email-form-step.active');
				activeElem.addClass('animated fadeOutLeft');
				activeElem.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
					activeElem.removeClass('active');
					var stepThree = $('.js-step-3')
					stepThree.addClass('active');
					stepThree.addClass('animated fadeInRight');
				});
			}
		}
		if (res) {
			btnName.prop('disabled', false);
			btnName.addClass('btn_green');
		} else {
			btnName.prop('disabled', true);
			if (btnName.hasClass('btn_gree')) {
				btnName.removeClass('btn_green');
			}
		}
	});
	btnEmail.on('click', function(e) {
		e.preventDefault();
		var activeElem = $('.email-form-step.active');
		activeElem.addClass('animated fadeOutLeft');
		activeElem.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
			activeElem.removeClass('active');
			var stepTwo = $('.js-step-2')
			stepTwo.addClass('active');
			stepTwo.addClass('animated fadeInRight');
			nameField.focus();
		});
	});
	
	btnName.on('click', function(e) {
		e.preventDefault();
		var activeElem = $('.email-form-step.active');
		activeElem.addClass('animated fadeOutLeft');
		activeElem.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
			activeElem.removeClass('active');
			var stepThree = $('.js-step-3')
			stepThree.addClass('active');
			stepThree.addClass('animated fadeInRight');
			msgField.focus();
		});
	});

	btnMsg.on('click', function(e) {
		e.preventDefault();
		var data = {
			name: nameField.val(),
			email: eField.val(),
			message: msgField.val(),
		}
		$.ajax({
			   method: "POST",
			   url: "/send-request",
			   data: JSON.stringify(data),
			   success: function(){
					var activeElem = $('.email-form-step.active');
					activeElem.addClass('animated fadeOutLeft');
					activeElem.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
						activeElem.removeClass('active');
						var stepFour = $('.js-step-4')
						stepFour.addClass('active');
						stepFour.addClass('animated fadeInRight');
					});
			   }
		});
	});

}

module.exports = ContactForm;