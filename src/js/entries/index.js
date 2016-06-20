require('../../css/Main.css');
require('../../css/Grid.css');
require('../../css/Animated.css');
require('../../css/atvImg.css');

require('../../Components/ContactForm/form.scss');

require('../Actions.js')();
require('../atvImg.js')();


require('../../Components/ContactForm/form.js')({
	emailField: '.js-email-field',
	emailBtn: '.js-email-next',
	nameField: '.js-name-field',
	nameBtn: '.js-name-next',
	messageField: '.js-message-field',
	messageBtn: '.js-message-next',
});

$('.js-work-select').on('click', function() {
	$('.work-modal--title').text($(this).data('work-title'));
	$('.work-modal--title--desc').text($(this).data('work-desc') + '...');
	$('.work-modal-button').attr('href', $(this).data('work-link'));

	$('.work-modal').addClass('work-modal-visible');

	setTimeout(function(){
		$('.work-modal-box').addClass('work-modal-box-visible')
	}, 20);

});

$('.work-modal').on('click', function() {
	$('.work-modal-box').removeClass('work-modal-box-visible');
	$('.work-modal').removeClass('work-modal-visible');
});

$('.work-link').hover(function() {
	$(this).addClass('work-link_dark');
	$(this).find('img').addClass('work-img_invert');
}, function() {
	$(this).removeClass('work-link_dark');
	$(this).find('img').removeClass('work-img_invert');
});