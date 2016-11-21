'use strict';

/**
 * @ngdoc service
 * @name MetronicApp.authevents
 * @description
 * # authevents
 * Constant in the MetronicApp.
 */
angular.module('ocoApp')
	.constant('AUTH_EVENTS', {
		loginSuccess    : 'auth-login-success',
		loginFailed     : 'auth-login-failed',
		logoutSuccess   : 'auth-logout-success',
		sessionTimeout  : 'auth-session-timeout',
		notAuthenticated: 'auth-not-authenticated',
		notAuthorized   : 'auth-not-authorized'
	});
