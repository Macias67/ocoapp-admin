/***
 Metronic AngularJS App Main Script
 ***/

/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
	"ui.router",
	"ui.bootstrap",
	"oc.lazyLoad",
	"ngSanitize",
	"firebase"
]);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config([
	'$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
		$ocLazyLoadProvider.config({
			// global configs go here
		});
	}
]);

//AngularJS v1.3.x workaround for old style controller declarition in HTML
MetronicApp.config([
	'$controllerProvider', function ($controllerProvider) {
		// this option might be handy for migrating old apps, but please don't use it
		// in new ones!
		$controllerProvider.allowGlobals();
	}
]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
 *********************************************/

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
	'$scope', '$rootScope', '$state', 'AUTH_EVENTS', 'Auth', function ($scope, $rootScope, $state, AUTH_EVENTS, Auth) {
		
		$rootScope.$on(AUTH_EVENTS.loginSuccess, function (event, data) {
			$state.go('/');
		});
		
		$rootScope.$on(AUTH_EVENTS.loginFailed, function (event, data) {
			console.log(data);
		});
		
		$rootScope.$on(AUTH_EVENTS.logoutSuccess, function (event, data) {
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
	'$scope', '$rootScope', 'Auth', function ($scope, $rootScope, Auth) {
		
		var vm    = this;
		vm.logout = function () {
			Auth.$signOut();
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

/* Setup Rounting For All Pages */
MetronicApp.config([
	'$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
		
		// Redirect any unmatched url
		$urlRouterProvider.otherwise(function ($injector) {
			var $state = $injector.get('$state');
			$state.go('/');
		});
		
		$stateProvider
			.state('login', {
				url        : '/login',
				templateUrl: 'views/login.html',
				data       : {
					requiredLogin: false,
					pageTitle    : 'Bienvenido',
					bodyClass    : 'login'
				},
				controller : 'LoginCtrl as loginCtrl',
				resolve    : {
					deps: [
						'$ocLazyLoad', function ($ocLazyLoad) {
							return $ocLazyLoad.load({
								name        : 'MetronicApp',
								insertBefore: '#ng_load_plugins_css',
								files       : [
									'assets/global/plugins/select2/css/select2.min.css',
									'assets/global/plugins/select2/css/select2-bootstrap.min.css',
									'assets/pages/css/login-2.css',
									
									'assets/global/plugins/jquery-validation/js/jquery.validate.min.js',
									'assets/global/plugins/jquery-validation/js/additional-methods.min.js',
									'assets/global/plugins/jquery-validation/js/localization/messages_es.min.js',
									'assets/global/plugins/select2/js/select2.full.min.js',
									'assets/global/plugins/select2/js/i18n/es.js',
									
									'assets/pages/scripts/login.js',
									'scripts/controllers/login.js'
								],
								serie       : true
							});
						}
					]
				}
			})
			.state('tmpl', {
				// Template
				templateUrl: 'views/tmpl.html',
				data       : {
					requiredLogin: true,
					bodyClass    : 'page-header-fixed page-sidebar-closed-hide-logo page-container-bg-solid page-sidebar-closed-hide-logo'
				},
				abstract   : true
			})
			// Blank Page
			.state('/', {
				url        : "/",
				parent     : 'tmpl',
				templateUrl: "views/blank.html",
				data       : {
					pageTitle: 'Blank Page Template'
				},
				controller : "MainCtrl",
				resolve    : {
					deps: [
						'$ocLazyLoad', function ($ocLazyLoad) {
							return $ocLazyLoad.load({
								name        : 'MetronicApp',
								insertBefore: '#ng_load_plugins_before',
								files       : [
									'scripts/controllers/main.js'
								]
							});
						}
					]
				}
			})
			.state('perfil', {
				url        : "/perfil",
				parent     : 'tmpl',
				templateUrl: "views/perfil.html",
				data       : {
					pageTitle: 'Blank Page Template'
				},
				controller : "PerfilCtrl",
				resolve    : {
					deps: [
						'$ocLazyLoad', function ($ocLazyLoad) {
							return $ocLazyLoad.load({
								name        : 'MetronicApp',
								insertBefore: '#ng_load_plugins_before',
								files       : [
									'scripts/controllers/perfil.js'
								]
							});
						}
					]
				}
			})
	}
]);

/* Init global settings and run the app */
MetronicApp.run([
	"$rootScope", "settings", "$state", "Auth", "$timeout", function ($rootScope, settings, $state, Auth, $timeout) {
		$rootScope.$state    = $state; // state to be accessed from view
		$rootScope.$settings = settings; // state to be accessed from view
		
		Auth.$onAuthStateChanged(function (authData) {
			if (authData) {
				console.log(authData);
				//$rootScope.$usuario = authData;
			}
			else {
				$state.go('login');
			}
		});
		
		$rootScope.$on('$stateChangeStart', function (event, toState) {
			$timeout(function () {
				$rootScope.$usuario = Auth.$getAuth();
				var requiredLogin   = toState.data.requiredLogin;
				
				console.log($rootScope.$usuario);
				
				// if yes and if this user is not logged in, redirect him to login page
				if (requiredLogin && ($rootScope.$usuario === null)) {
					event.preventDefault();
					$state.go('login');
					
					console.log('lo mando a login');
				}
			});
		});
	}
]);