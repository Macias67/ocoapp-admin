'use strict';

describe('Controller: NegocioNuevonegocioCtrl', function () {
	
	// load the controller's module
	beforeEach(module('ocoApp'));
	
	var NegocioNuevonegocioCtrl,
	    scope;
	
	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope                   = $rootScope.$new();
		NegocioNuevonegocioCtrl = $controller('NegocioNuevonegocioCtrl', {
			$scope: scope
			// place here mocked dependencies
		});
	}));
	
	it('should attach a list of awesomeThings to the scope', function () {
		expect(NegocioNuevonegocioCtrl.awesomeThings.length).toBe(3);
	});
});
