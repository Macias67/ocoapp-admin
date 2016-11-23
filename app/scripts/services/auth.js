'use strict';

/**
 * @ngdoc service
 * @name ocoApp.Auth
 * @description
 * # Auth
 * Factory in the ocoApp.
 */
angular.module('ocoApp').factory('AuthService', [
	'$auth', '$firebaseAuth', '$q', 'User', function ($auth, $firebaseAuth, $q, User) {
		
		var authService = {};
		
		var firebaseAuth = $firebaseAuth(firebase.auth());
		
		authService.login = function (credenciales) {
			
			var deferred = $q.defer();
			
			return firebaseAuth.$signInWithEmailAndPassword(credenciales.email, credenciales.pass).then(function (user) {
				return firebase.database().ref('usuarios').child(user.uid).once('value').then(function (snapshot) {
					if (snapshot.val().admin) {
						user.getToken().then(function (token) {
							$auth.setToken(token);
						});
						deferred.resolve(user);
					}
					else {
						firebaseAuth.$signOut();
						deferred.reject({code: 'auth/not-admin', message: 'El usuario no es administrador de negocios.'});
					}
					return deferred.promise;
				});
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
		
		authService.createUserWithEmailAndPassword = function (signUpData) {
			var deferred = $q.defer();
			firebaseAuth.$createUserWithEmailAndPassword(signUpData.email, signUpData.password).then(function (user) {
				//user.sendEmailVerification();
				user.updateProfile({
					displayName: signUpData.nombre + ' ' + signUpData.apellido,
					photoURL   : 'https://firebasestorage.googleapis.com/v0/b/oco-app.appspot.com/o/avatar.png?alt=media&token=7ba4a7ad-eb42-4f8c-b825-aa7e32332247'
				}).then(function () {
					firebase.database().ref('usuarios').child(user.uid).set({
						direccion : signUpData.direccion,
						ciudad    : signUpData.ciudad,
						admin     : true,
						providerId: user.providerId
					}).then(function () {
						firebaseAuth.$signOut();
						deferred.resolve(user);
					}).catch(function (error) {
						deferred.reject(error);
					});
				}).catch(function (error) {
					deferred.reject(error);
				});
			}).catch(function (error) {
				deferred.reject(error);
			});
			
			return deferred.promise;
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
			var user = firebaseAuth.$getAuth();
			return firebase.database().ref('usuarios').child(user.uid).once('value').then(function (snapshot) {
				User.setUser(user, snapshot.val());
				return $q.when(User.getUser());
			});
		};
		
		authService.waitForSignIn = function () {
			return firebaseAuth.$waitForSignIn();
		};
		
		authService.requireSignIn = function () {
			var defer = $q.defer();
			return firebaseAuth.$requireSignIn().then(function (user) {
				return firebase.database().ref('usuarios').child(user.uid).once('value').then(function (snapshot) {
					if (snapshot.val().admin) {
						User.setUser(user, snapshot.val());
						defer.resolve(User.getUser());
					}
					else {
						$auth.logout();
						firebaseAuth.$signOut();
						defer.reject('AUTH_REQUIRED');
					}
					
					return defer.promise;
				});
			});
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

