'use strict';

/**
 * @ngdoc service
 * @name ocoApp.User
 * @description
 * # User
 * Service in the ocoApp.
 */
angular.module('ocoApp')
	.service('User', [
		'$rootScope', function ($rootScope) {
			this._user = {
				displayName  : null,
				email        : null,
				emailVerified: null,
				isAnonymous  : null,
				photoURL     : null,
				providerData : null,
				providerId   : null,
				refreshToken : null,
				uid          : null
			};
			
			this.setUser = function (user) {
				this._user.displayName   = (user.displayName === null) ? 'Sin nombre' : user.displayName;
				this._user.email         = user.email;
				this._user.emailVerified = user.emailVerified;
				this._user.isAnonymous   = user.isAnonymous;
				this._user.photoURL      = (user.photoURL === undefined) ? 'assets/layouts/layout4/img/avatar.png' : user.photoURL;
				this._user.providerData  = user.providerData;
				this._user.providerId    = user.providerId;
				this._user.refreshToken  = user.refreshToken;
				this._user.uid           = user.uid;
			};
			
			this.getUser = function () {
				return this._user;
			};
			
		}
	]);
