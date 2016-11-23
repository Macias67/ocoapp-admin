'use strict';

describe('Controller: NegocioCtrl', function () {
	
	// load the controller's module
	beforeEach(module('ocoApp'));
	
	var NegocioCtrl,
	    scope;
	
	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope       = $rootScope.$new();
		NegocioCtrl = $controller('NegocioCtrl', {
			$scope: scope
			// place here mocked dependencies
		});
	}));
	
	it('should attach a list of awesomeThings to the scope', function () {
		expect(NegocioCtrl.awesomeThings.length).toBe(3);
	});
});
