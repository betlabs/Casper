require('./mobile.js');
var layout = require('./Anim.js');

var actions = function() {
		$(window).ready(function(){
		var wLab = $('.b-lab').outerWidth();
		var wAuth = $('.auth-form__form').outerWidth();
		$('.auth-forms-container').css({
			"transform": "translate3d("+-wAuth+"px, 0, 0)"
		});
		window.onresize = resizeReact;
		window.onscroll = scrollReact;
		function resizeReact() {
			if (!jQuery.browser.mobile) {
				layout.resizeWindow();
			}
			wLab = $('.b-lab').outerWidth();
			if ($('.js-option-up').hasClass('active')) {
				$('.auth-forms-container').css({
					"transform": "translate3d(0px, 0px, 0px)"
				});
			} else {
				wAuth = $('.auth-form__form').outerWidth();
				$('.auth-forms-container').css({
					"transform": "translate3d("+-wAuth+"px, 0, 0)"
				});
			}
			
			var shift = -wLab * +$('.labs-menu-item_active').data('level');
			$('.labs-full').css({
				"transform": "translate3d("+shift+"px, 0, 0)"
			});
		};
		function scrollReact() {
			if ($(window).scrollTop() >= 50 ) {
					$('.b-navigation').addClass('b-navigation_scroll');
					$('.manifold').attr('class', 'manifold manifold_grey');
				} else {
					$('.b-navigation').removeClass('b-navigation_scroll');
					$('.manifold').attr('class', 'manifold');
				}
			if (!jQuery.browser.mobile) {
				layout.parallaxMovement($('.introduction'), $(".intro-svg circle:nth-child(2n+1)"), $('.intro-buttons'));
				layout.parallaxMovement($('.introduction'), $('.btn_start'));
				layout.parallaxMovement($('.introduction'), $('.js-left-action-btn'));
			}
		};
		$('.labs-menu-item').on('click', function() {
			$('.labs-menu-item').each(function(){
				$(this).removeClass('labs-menu-item_active');
			});
			$(this).addClass('labs-menu-item_active');
			
			var shift = -wLab * +$(this).data('level');
			$('.labs-full').css({
				"transform": "translate3d("+shift+"px, 0, 0)"
			});
		});
		
		$('.cross-btn').on('click', function() {
			$(this).children('.cross-line').toggleClass('open');
			$(this).siblings('.exp-list-item-content').toggle();
		});
		
		$('.js-mobile-menu').on('click', function() {
			$('.mobile-menu').slideToggle();
			$(this).toggleClass('active');
			$(this).find('*').each(function() {
				$(this).toggleClass('active');
			});
			$('.navigation-content').toggleClass('active');
			$('.navigation').toggleClass('active');
			$('.mobile-navigations-items').toggleClass('active');
		});
		
		$('.js-option-up').on('click', function() {
			$('.auth-slider__choose').removeClass('auth-slider__choose-right');
			$(this).addClass('active');
			$('.js-option-in').removeClass('active');
			$('.auth-forms-container').css({
				"transform": "translate3d(0px, 0px, 0px)"
			});
		});
		
		$('.js-option-in').on('click', function() {
			$('.auth-slider__choose').addClass('auth-slider__choose-right');
			$(this).addClass('active');
			$('.js-option-up').removeClass('active');
			
			$('.auth-forms-container').css({
				"transform": "translate3d("+-wAuth+"px, 0, 0)"
			});
		});

		var menuVals = ["menu","about", "labs", "portfolio", "contacts"];
		$(".navigation-item").on("click", function() {
			var menuIndex = parseInt($(this).data("level"));
			$("body, html").animate({
				scrollTop: $('.section-'+menuVals[menuIndex]).offset().top
			}, 600);
		});
		$(".m-menu-item").on("click", function() {
			$('.mobile-menu').slideToggle();
			$('.js-mobile-menu').toggleClass('active');
			$('.js-mobile-menu').find('*').each(function() {
				$(this).toggleClass('active');
			});
			$('.navigation-content').toggleClass('active');
			$('.navigation').toggleClass('active');
			$('.mobile-navigations-items').toggleClass('active');

			var menuIndex = parseInt($(this).data("level"));
			$("body, html").animate({
				scrollTop: $('.section-'+menuVals[menuIndex]).offset().top
			}, 600);
		});
		$(".js-start-btn").on("click", function() {
			$("body, html").animate({
				scrollTop: $('.section-contacts').offset().top
			}, 600);
		});
		$(".js-labs-btn").on("click", function() {
			$("body, html").animate({
				scrollTop: $('.section-labs').offset().top
			}, 600);
		});
		
	});
};
module.exports = actions;
