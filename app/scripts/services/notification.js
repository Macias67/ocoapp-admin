'use strict';

/**
 * @ngdoc service
 * @name MetronicApp.Notification
 * @description
 * # Notification
 * Factory in the ocoApp.
 */
angular.module('ocoApp')
	.factory('Notification', [
		'SoundFactory',
		function (SoundFactory) {
			var notiFactory = {};
			var _options    = {
				"closeButton"    : true,
				"debug"          : false,
				"positionClass"  : notiFactory.TR,
				"onclick"        : null,
				"showDuration"   : 1000,
				"hideDuration"   : 500,
				"timeOut"        : 5000,
				"extendedTimeOut": 1000,
				"showEasing"     : "swing",
				"hideEasing"     : "linear",
				"showMethod"     : "fadeIn",
				"hideMethod"     : "fadeOut"
			};
			
			notiFactory.TR  = 'toast-top-right';
			notiFactory.BR  = 'toast-bottom-right';
			notiFactory.BL  = 'toast-bottom-left';
			notiFactory.TL  = 'toast-top-left';
			notiFactory.TFW = 'toast-top-full-width';
			notiFactory.BFW = 'toast-bottom-full-width';
			notiFactory.TC  = 'toast-top-center';
			notiFactory.BC  = 'toast-bottom-center';
			
			notiFactory.success = function (msj, title, options) {
				options = (options == undefined) ? _options : options;
				toastr.success(msj, title, options);
				SoundFactory.successPlay();
			};
			
			notiFactory.info = function (msj, title, options) {
				options = (options == undefined) ? _options : options;
				toastr.info(msj, title, options);
				SoundFactory.infoPlay();
			};
			
			notiFactory.warning = function (msj, title, options) {
				options = (options == undefined) ? _options : options;
				toastr.warning(msj, title, options);
				SoundFactory.warningPlay();
			};
			
			notiFactory.error = function (msj, title, options) {
				options = (options == undefined) ? _options : options;
				toastr.error(msj, title, options);
				SoundFactory.errorPlay();
			};
			
			// Public API here
			return notiFactory;
		}
	]);
