'use strict';

/**
 * @ngdoc service
 * @name ocoApp.Auth
 * @description
 * # Auth
 * Factory in the ocoApp.
 */
angular.module('MetronicApp')
	.factory('Auth', ['$firebaseAuth', function ($firebaseAuth) {
		// Public API here
		return $firebaseAuth(firebase.auth());
	}]);
