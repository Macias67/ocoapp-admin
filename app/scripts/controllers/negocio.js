'use strict';

/**
 * @ngdoc function
 * @name ocoApp.controller:NegocioCtrl
 * @description
 * # NegocioCtrl
 * Controller of the ocoApp
 */
angular.module('ocoApp')
	.controller('NegocioCtrl', [
		'$rootScope', '$scope', '$timeout', function ($rootScope, $scope, $timeout) {
			$timeout(function () {
				$rootScope.$settings.layout.pageOnLoad = false;
			}, 300);
			
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