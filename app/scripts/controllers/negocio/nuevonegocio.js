'use strict';

/**
 * @ngdoc function
 * @name ocoApp.controller:NegocioNuevonegocioCtrl
 * @description
 * # NegocioNuevonegocioCtrl
 * Controller of the ocoApp
 */
angular.module('ocoApp')
	.controller('NuevoNegocioCtrl', [
		'$rootScope', '$scope', 'Negocio', function ($rootScope, $scope, Negocio) {
			
			var vm = this;
			
			vm.porletNuevoNegocio = {
				form  : null,
				data  : Negocio(),
				guarda: function () {
					vm.porletNuevoNegocio.data.$save().then(function () {
						console.log('guardado');
					});
				}
			};
			
			
			$scope.$on('$viewContentLoaded', function () {
				// initialize core components
				App.initAjax();
				
				$rootScope.$settings.layout.pageOnLoad = false;
				
				// set default layout mode
				$rootScope.$settings.layout.pageContentWhite  = true;
				$rootScope.$settings.layout.pageBodySolid     = false;
				$rootScope.$settings.layout.pageSidebarClosed = false;
			});
		}
	]);
