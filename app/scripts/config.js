/* Setup Rounting For All Pages */
MetronicApp.config([
	'$stateProvider', '$urlRouterProvider', '$authProvider', function ($stateProvider, $urlRouterProvider, $authProvider) {
		
		$authProvider.tokenName   = 'token';
		$authProvider.tokenPrefix = 'fb';
		
		// Redirect any unmatched url
		$urlRouterProvider.otherwise(function ($injector) {
			var $state = $injector.get('$state');
			$state.go('inicio');
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
							return $ocLazyLoad.load([
								'jquery-validation',
								'select2',
								'bootstrap-toastr',
								'assets/pages/css/login-2.css',
								'assets/pages/scripts/login.js',
								'scripts/controllers/login.js'
							], {insertBefore: '#ng_load_plugins_before', serie: true});
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
				resolve    : {
					deps: [
						'$ocLazyLoad', function ($ocLazyLoad) {
							return $ocLazyLoad.load([
								'bootstrap-toastr'
							], {insertBefore: '#ng_load_plugins_before', serie: true});
						}
					]
				},
				abstract   : true
			})
			// Blank Page
			.state('inicio', {
				url        : "/",
				parent     : 'tmpl',
				templateUrl: "views/blank.html",
				data       : {
					pageTitle: 'Blank Page Template'
				},
				controller : "DashboardCtrl",
				resolve    : {
					deps       : [
						'$ocLazyLoad', function ($ocLazyLoad) {
							return $ocLazyLoad.load([
								'scripts/controllers/dashboard.js'
							], {insertBefore: '#ng_load_plugins_before', serie: true});
						}
					],
					currentUser: [
						'AuthService', function (AuthService) {
							return AuthService.requireSignIn();
						}
					]
				}
			})
			.state('perfil', {
				url        : "/perfil",
				parent     : 'tmpl',
				templateUrl: "views/perfil.html",
				data       : {
					pageTitle: 'Perfil'
				},
				controller : "PerfilCtrl",
				resolve    : {
					deps       : [
						'$ocLazyLoad', function ($ocLazyLoad) {
							return $ocLazyLoad.load([
								'scripts/controllers/perfil.js'
							], {insertBefore: '#ng_load_plugins_before', serie: true});
						}
					],
					currentUser: [
						'AuthService', function (AuthService) {
							return AuthService.requireSignIn();
						}
					]
				}
			})
			.state('mi-negocio', {
				url        : "/mi-negocio",
				parent     : 'tmpl',
				templateUrl: "views/negocio/perfil.html",
				data       : {
					pageTitle: 'Mi negocio'
				},
				controller : "NegocioCtrl",
				resolve    : {
					deps       : [
						'$ocLazyLoad', function ($ocLazyLoad) {
							return $ocLazyLoad.load([
								'scripts/controllers/negocio.js'
							], {insertBefore: '#ng_load_plugins_before', serie: true});
						}
					],
					currentUser: [
						'AuthService', function (AuthService) {
							return AuthService.requireSignIn();
						}
					]
				}
			})
			.state('negocio-nuevo', {
				url        : "/negocio/nuevo",
				parent     : 'tmpl',
				templateUrl: "views/negocio/nuevo.html",
				data       : {
					pageTitle: 'Negocio Nuevo'
				},
				controller : "NuevoNegocioCtrl as nuevoNegocioCtrl",
				resolve    : {
					deps       : [
						'$ocLazyLoad', function ($ocLazyLoad) {
							return $ocLazyLoad.load([
								'scripts/services/negocio.js',
								'scripts/controllers/negocio/nuevonegocio.js'
							], {insertBefore: '#ng_load_plugins_before', serie: true});
						}
					],
					currentUser: [
						'AuthService', function (AuthService) {
							return AuthService.requireSignIn();
						}
					]
				}
			})
	}
]);
