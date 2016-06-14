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