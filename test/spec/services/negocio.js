'use strict';

describe('Service: Negocio', function () {
	
	// load the service's module
	beforeEach(module('ocoApp'));
	
	// instantiate service
	var Negocio;
	beforeEach(inject(function (_Negocio_) {
		Negocio = _Negocio_;
	}));
	
	it('should do something', function () {
		expect(!!Negocio).toBe(true);
	});
	
});
