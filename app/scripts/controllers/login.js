'use strict';

/**
 * @ngdoc function
 * @name MetronicApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the ocoApp
 */
angular.module('MetronicApp')
	.controller('LoginCtrl', [
		'$scope', '$rootScope', '$timeout', 'Auth', 'AUTH_EVENTS', function ($scope, $rootScope, $timeout, Auth, AUTH_EVENTS) {
			
			var vm          = this;
			vm.loginForm    = {};
			vm.credenciales = {
				email: 'luismacias.angulo@gmail.com',
				pass : 'qwerty'
			};
			
			vm.submit = function () {
				Auth.$signInWithEmailAndPassword(vm.credenciales.email, vm.credenciales.pass).then(function (user) {
					$rootScope.$usuario = user;
					$rootScope.$emit(AUTH_EVENTS.loginSuccess);
				}).catch(function (error) {
					$rootScope.$emit(AUTH_EVENTS.loginFailed, error);
				});
			};
			
			$scope.$on('$viewContentLoaded', function () {
				App.initComponents(); // init core components
				Login.init();
				
				$timeout(function () {
					$rootScope.$settings.layout.pageOnLoad = false;
					console.log('pageOnLoad false desde loginctrl');
				}, 500);
			});
		}
	]);
