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
			return function () {
				var ref = firebase.database().ref("negocios").push();
				return $firebaseObject(ref);
			}
		}
	]);
