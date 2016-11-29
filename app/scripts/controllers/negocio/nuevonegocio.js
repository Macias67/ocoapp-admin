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
		'$rootScope', '$scope', '$filter', 'Negocio', 'NavigatorGeolocation', 'NgMap', 'GeoCoder',
		function ($rootScope, $scope, $filter, Negocio, NavigatorGeolocation, NgMap, GeoCoder) {
			
			var vm = this;
			
			vm.negocio          = Negocio.push();
			vm.negocio.latitud  = 20.3417485;
			vm.negocio.longitud = -102.76523259999999;
			
			/*Obtener posicion actual*/
			NavigatorGeolocation.getCurrentPosition().then(function (position) {
				var lat                             = position.coords.latitude, lng = position.coords.longitude;
				vm.negocio.latitud                  = lat;
				vm.negocio.longitud                 = lng;
				vm.formNuevoNegocio.mapa.centroMapa = [vm.negocio.latitud, vm.negocio.longitud];
				vm.formNuevoNegocio.mapa.zoom       = 16;
			});
			
			/*Añadir eventos al marcador*/
			NgMap.getMap().then(function (map) {
				var marker = map.markers[0];
				marker.addListener('drag', function (event) {
					$scope.$apply(function () {
						vm.negocio.latitud                  = event.latLng.lat();
						vm.negocio.longitud                 = event.latLng.lng();
						vm.formNuevoNegocio.mapa.centroMapa = [
							vm.negocio.latitud,
							vm.negocio.longitud
						];
					});
					map.setCenter(marker.getPosition());
				});
				
				marker.addListener('dragend', function (event) {
					var latlng = {
						lat: vm.formNuevoNegocio.mapa.centroMapa[0],
						lng: vm.formNuevoNegocio.mapa.centroMapa[1]
					};
					GeoCoder.geocode({location: latlng}).then(function (result) {
						vm.formNuevoNegocio.mapa.direccion = result[0].formatted_address;
					});
				});
			});
			
			vm.formNuevoNegocio = {
				mapa  : {
					centroMapa: [
						vm.negocio.latitud,
						vm.negocio.longitud
					],
					zoom      : 16
				},
				guarda: function () {
					vm.negocio.activo     = true;
					vm.negocio.created_at = true;
					vm.negocio.$save().then(function (ref) {
						console.log(vm.negocio.$id);
					}).catch(function (error) {
						console.log(error);
					});
				}
			};
			
			$scope.$watch('nuevoNegocioCtrl.negocio.nombre', function () {
				vm.negocio.nombre = $filter('ucfirst')(vm.negocio.nombre);
			});
			
			$scope.$watchGroup(
				[
					'nuevoNegocioCtrl.negocio.nombre',
					'nuevoNegocioCtrl.negocio.calle',
					'nuevoNegocioCtrl.negocio.numero',
					'nuevoNegocioCtrl.negocio.colonia',
					'nuevoNegocioCtrl.negocio.cp',
					'nuevoNegocioCtrl.negocio.ciudad',
					'nuevoNegocioCtrl.negocio.estado'
				],
				function (newValues, oldValues, scope) {
					vm.negocio.nombre  = $filter('ucfirst')(newValues[0]);
					vm.negocio.calle   = $filter('ucfirst')(newValues[1]);
					vm.negocio.numero  = $filter('ucfirst')(newValues[2]);
					vm.negocio.colonia = $filter('ucfirst')(newValues[3]);
					vm.negocio.cp      = $filter('ucfirst')(newValues[4]);
					vm.negocio.ciudad      = $filter('ucfirst')(newValues[5]);
					vm.negocio.estado      = $filter('ucfirst')(newValues[6]);
				}
			);
			
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
