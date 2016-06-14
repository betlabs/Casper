require('../../css/Company/Main.scss');
require('../../css/Grid.css');
require('../../css/Animated.css');

require('../../Components/ContactForm/form.scss');

require('../../js/companyActions.js')();


require('../../Components/ContactForm/form.js')({
	emailField: '.js-email-field',
	emailBtn: '.js-email-next',
	nameField: '.js-name-field',
	nameBtn: '.js-name-next',
	messageField: '.js-message-field',
	messageBtn: '.js-message-next',
});