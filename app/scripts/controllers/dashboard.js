'use strict';

/**
 * @ngdoc function
 * @name MetronicApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the MetronicApp
 */
angular.module('ocoApp')
	.controller('DashboardCtrl', [
		'$rootScope', '$scope', '$timeout', 'currentUser', 'AuthService', function ($rootScope, $scope, $timeout, currentUser, AuthService) {
			
			console.log($rootScope.$usuario);
						
			$timeout(function () {
				$rootScope.$settings.layout.pageOnLoad = false;
			}, 100);
			
			$scope.$on('$viewContentLoaded', function () {
				// initialize core components
				App.initAjax();
				
				// set default layout mode
				$rootScope.$settings.layout.pageContentWhite  = true;
				$rootScope.$settings.layout.pageBodySolid     = false;
				$rootScope.$settings.layout.pageSidebarClosed = false;
			});
		}
	]);
