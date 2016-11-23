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
			
			var vm = this;
			
			vm.login = {
				loginForm    : {},
				credenciales : {
					email: 'luismacias.angulo@gmail.com',
					pass : 'qwerty'
				},
				submit       : function () {
					App.blockUI({animate: true});
					AuthService.login(vm.login.credenciales).then(function (user) {
						App.unblockUI();
						$rootScope.$emit(AUTH_EVENTS.loginSuccess, user);
					}).catch(function (error) {
						App.unblockUI();
						$rootScope.$emit(AUTH_EVENTS.loginFailed, error);
					})
				},
				loginFacebook: function () {
					AuthService.loginFacebook().then(function (response) {
						$rootScope.$emit(AUTH_EVENTS.loginSuccess, response.user);
					}).catch(function (error) {
						$rootScope.$emit(AUTH_EVENTS.loginFailed, error);
					});
				}
			};
			
			vm.signUp = {
				form  : {},
				data  : {},
				submit: function () {
					App.blockUI({message: '<b>Creando usuario...</b>', boxed: true});
					AuthService.createUserWithEmailAndPassword(vm.signUp.data).then(function (user) {
						AuthService.login({email: vm.signUp.data.email, pass: vm.signUp.data.password}).then(function (user) {
							App.unblockUI();
							$rootScope.$emit(AUTH_EVENTS.loginSuccess, user);
						}).catch(function (error) {
							App.unblockUI();
							$rootScope.$emit(AUTH_EVENTS.loginFailed, error);
						})
					}).catch(function (error) {
						App.unblockUI();
						console.log(error);
					});
				}
			};
			
			$scope.$on('$viewContentLoaded', function () {
				App.initComponents(); // init core components
				Login.init();
				
				$timeout(function () {
					$rootScope.$settings.layout.pageOnLoad = false;
				}, 300);
			});
		}
	]);
