'use strict';

/**
 * @ngdoc function
 * @name MetronicApp.controller:PerfilCtrl
 * @description
 * # PerfilCtrl
 * Controller of the MetronicApp
 */
angular.module('MetronicApp')
	.controller('PerfilCtrl', [
		'$rootScope', '$scope', '$timeout',function ($rootScope, $scope, $timeout) {
			$timeout(function () {
				$rootScope.$settings.layout.pageOnLoad = false;
			}, 1000);
			
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
