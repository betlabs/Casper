var actions = function() {
	$('.js-auth-box').on('click', function() {
		$('.auth-box').hide();
	});

	$('.js-contact').on('click', function() {
		$('.auth-box').show();
	});

	$('.logo-container').on('click', function() {
			window.location.replace('/');
	});
}

module.exports = actions;