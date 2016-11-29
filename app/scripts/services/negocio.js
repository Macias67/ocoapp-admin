'use strict';

/**
 * @ngdoc service
 * @name ocoApp.Negocio
 * @description
 * # Negocio
 * Factory in the ocoApp.
 */
angular.module('ocoApp')
	.factory('Negocio', [
		'$firebaseObject',
		function ($firebaseObject) {
			var negocio = {};
			
			negocio.push = function () {
				return $firebaseObject(firebase.database().ref('negocios').push());
			};
			
			negocio.get = function (uid) {
				return $firebaseObject(firebase.database().ref('negocios').child(uid));
			};
			
			return negocio;
		}
	]);
