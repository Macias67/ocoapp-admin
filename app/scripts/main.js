/***
 Metronic AngularJS App Main Script
 ***/

/* Metronic App */
var MetronicApp = angular.module('ocoApp', [
	"ui.router",
	"ui.bootstrap",
	"oc.lazyLoad",
	"ngSanitize",
	"firebase",
	"satellizer",
	"ngAudio",
	"ngMap"
]);

/* Setup global settings */
MetronicApp.factory('settings', [
	'$rootScope', function ($rootScope) {
		// supported languages
		var settings = {
			layout          : {
				pageSidebarClosed   : false, // sidebar menu state
				pageContentWhite    : true, // set page content layout
				pageBodySolid       : false, // solid body color state
				pageAutoScrollOnLoad: 500, // auto scroll to top on page load
				pageOnLoad          : false
			},
			assetsPath      : 'assets',
			globalPath      : 'assets/global',
			layoutGlobalPath: 'assets/layouts/global',
			layoutPath      : 'assets/layouts/layout4',
			pageOnLoad      : false
		};
		
		$rootScope.$settings = settings;
		
		return settings;
	}
]);

/* Setup App Main Controller */
MetronicApp.controller('AppController', [
	'$scope', '$rootScope', '$state', 'Notification', 'AUTH_EVENTS', '$timeout', function ($scope, $rootScope, $state, Notification, AUTH_EVENTS, $timeout) {
		
		$rootScope.$on(AUTH_EVENTS.loginSuccess, function (e, data) {
			$timeout(function () {
				e.preventDefault();
				$state.go('inicio');
				Notification.success(null, 'Bienvenido ' + $rootScope.$usuario.displayName);
			}, 1000);
		});
		
		$rootScope.$on(AUTH_EVENTS.loginFailed, function (e, data) {
			e.preventDefault();
			console.log(data);
			var msj = '';
			switch (data) {
				case 'auth/account-exists-with-different-credential':
					break;
				case 'auth/invalid-credential':
					break;
				case 'auth/operation-not-allowed':
					break;
				case 'auth/user-disabled':
					break;
				case 'auth/user-not-found':
					break;
				case 'auth/wrong-password':
					break;
			}
			
			Notification.error(null, data.message);
		});
		
		$rootScope.$on(AUTH_EVENTS.logoutSuccess, function (e, data) {
			e.preventDefault();
			$state.go('login');
		});
		
		$scope.$on('$viewContentLoaded', function () {
			App.initComponents(); // init core components
			//Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive
		});
	}
]);

/***
 Layout Partials.
 By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial
 initialization can be disabled and Layout.init() should be called on page load complete as explained above.
 ***/

/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', [
	'$scope', '$rootScope', 'AuthService', 'AUTH_EVENTS', function ($scope, $rootScope, AuthService, AUTH_EVENTS) {
		
		var vm    = this;
		vm.logout = function () {
			AuthService.logout().then(function () {
				$rootScope.$emit(AUTH_EVENTS.logoutSuccess);
			});
		};
		
		$scope.$on('$includeContentLoaded', function () {
			Layout.initHeader(); // init header
			QuickNav.init();
		});
	}
]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller('SidebarController', [
	'$state', '$scope', function ($state, $scope) {
		$scope.$on('$includeContentLoaded', function () {
			Layout.initSidebar($state); // init sidebar
		});
	}
]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller('PageHeadController', [
	'$scope', function ($scope) {
		$scope.$on('$includeContentLoaded', function () {
			Demo.init(); // init theme panel
		});
	}
]);

/* Setup Layout Part - Quick Sidebar */
MetronicApp.controller('QuickSidebarController', [
	'$scope', function ($scope) {
		$scope.$on('$includeContentLoaded', function () {
			setTimeout(function () {
				QuickSidebar.init(); // init quick sidebar
			}, 2000)
		});
	}
]);

/* Setup Layout Part - Theme Panel */
MetronicApp.controller('ThemePanelController', [
	'$scope', function ($scope) {
		$scope.$on('$includeContentLoaded', function () {
			Demo.init(); // init theme panel
		});
	}
]);

/* Setup Layout Part - Footer */
MetronicApp.controller('FooterController', [
	'$scope', function ($scope) {
		$scope.$on('$includeContentLoaded', function () {
			Layout.initFooter(); // init footer
		});
	}
]);

/* Init global settings and run the app */
MetronicApp.run([
	"$rootScope", "settings", "$state", "AuthService", "User", function ($rootScope, settings, $state, AuthService, User) {
		$rootScope.$state    = $state; // state to be accessed from view
		$rootScope.$settings = settings; // state to be accessed from view
		
		AuthService.firebaseAuth().$onAuthStateChanged(function (user) {
			if (user) {
				User.setUser(user);
				$rootScope.$usuario = User.getUser();
			}
		});
		
		// Cuando el usuario no esta autentificado
		$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
			if (error === "AUTH_REQUIRED") {
				event.preventDefault();
				$state.go('login');
			}
		});
	}
]);