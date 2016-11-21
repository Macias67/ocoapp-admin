/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config([
	'$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
		$ocLazyLoadProvider.config({
			serie:true,
			modules: [
				{
					name : 'select2',
					files: [
						'assets/global/plugins/select2/css/select2.min.css',
						'assets/global/plugins/select2/css/select2-bootstrap.min.css',
						'assets/global/plugins/select2/js/select2.full.min.js',
						'assets/global/plugins/select2/js/i18n/es.js'
					]
				},
				{
					name : 'jquery-validation',
					files: [
						'assets/global/plugins/jquery-validation/js/jquery.validate.min.js',
						'assets/global/plugins/jquery-validation/js/additional-methods.min.js',
						'assets/global/plugins/jquery-validation/js/localization/messages_es.min.js'
					],
					serie: true
				},
				{
					name : 'bootstrap-toastr',
					files: [
						'assets/global/plugins/bootstrap-toastr/toastr.min.css',
						'assets/global/plugins/bootstrap-toastr/toastr.min.js'
					]
				}
			]
		});
	}
]);
