'use strict';

/**
 * @ngdoc function
 * @name ocoApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the ocoApp
 */
angular.module('ocoApp')
	.controller('LoginCtrl', [
		'$scope', '$rootScope', '$timeout', 'AuthService', 'AUTH_EVENTS', function ($scope, $rootScope, $timeout, AuthService, AUTH_EVENTS) {
			
			var vm          = this;
			vm.loginForm    = {};
			vm.credenciales = {
				email: 'luismacias.angulo@gmail.com',
				pass : 'qwerty'
			};
			
			vm.submit = function () {
				AuthService.login(vm.credenciales).then(function (user) {
					$rootScope.$emit(AUTH_EVENTS.loginSuccess, user);
				}).catch(function (error) {
					$rootScope.$emit(AUTH_EVENTS.loginFailed, error);
				});
			};
			
			vm.loginFacebook = function () {
				AuthService.loginFacebook().then(function (response) {
					$rootScope.$emit(AUTH_EVENTS.loginSuccess, response.user);
				}).catch(function (error) {
					$rootScope.$emit(AUTH_EVENTS.loginFailed, error);
				});
			};
			
			$scope.$on('$viewContentLoaded', function () {
				App.initComponents(); // init core components
				Login.init();
				
				$timeout(function () {
					$rootScope.$settings.layout.pageOnLoad = false;
				}, 500);
			});
		}
	]);
