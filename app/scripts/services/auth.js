'use strict';

/**
 * @ngdoc service
 * @name ocoApp.Auth
 * @description
 * # Auth
 * Factory in the ocoApp.
 */
angular.module('ocoApp').factory('AuthService', [
	'$auth', '$firebaseAuth', function ($auth, $firebaseAuth) {
		
		var authService = {};
		
		var firebaseAuth = $firebaseAuth(firebase.auth());
		
		authService.login = function (credenciales) {
			return firebaseAuth.$signInWithEmailAndPassword(credenciales.email, credenciales.pass).then(function (user) {
				user.getToken().then(function (token) {
					$auth.setToken(token);
				});
				return user;
			});
		};
		
		authService.loginFacebook = function () {
			return firebaseAuth.$signInWithPopup('facebook').then(function (response) {
				response.user.getToken().then(function (token) {
					$auth.setToken(token);
				});
				return response;
			});
		};
		
		authService.logout = function () {
			return $auth.logout().then(function () {
				firebaseAuth.$signOut();
			});
		};
		
		authService.isAuthenticated = function () {
			if ($auth.getPayload() == undefined) {
				return false;
			}
			// Según si hay token
			return $auth.isAuthenticated();
		};
		
		authService.getExpiracionSesion = function () {
			if ($auth.getPayload() == undefined) {
				return null;
			}
			return $auth.getPayload().exp;
		};
		
		authService.getUser = function () {
			if (!$auth.isAuthenticated()) {
				return null;
			}
			return firebaseAuth.$getAuth();
		};
		
		authService.waitForSignIn = function () {
			return firebaseAuth.$waitForSignIn();
		};
		
		authService.requireSignIn = function () {
			return firebaseAuth.$requireSignIn();
		};
		
		authService.getToken = function () {
			if ((firebaseAuth.$getAuth() === null) || !$auth.isAuthenticated()) {
				return null;
			}
			return $auth.getToken();
		};
		
		authService.firebaseAuth = function () {
			return firebaseAuth;
		};
				
		// Public API here
		return authService;
	}
]);

