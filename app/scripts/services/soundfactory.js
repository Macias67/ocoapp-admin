'use strict';

/**
 * @ngdoc service
 * @name SoundFactory.SoundFactory
 * @description
 * # SoundFactory
 * Factory in the ocoApp.
 */
angular.module('ocoApp')
	.factory('SoundFactory', [
		'ngAudio', function (ngAudio) {
			
			var soundFactory = {};
			
			ngAudio.setUnlock(false);
			
			soundFactory.successPlay = function () {
				ngAudio.load('sounds/chord.mp3').play();
			};
			
			soundFactory.infoPlay = function () {
				ngAudio.load('sounds/beep.mp3').play();
			};
			
			soundFactory.warningPlay = function () {
				ngAudio.load('sounds/ping.mp3').play();
			};
			
			soundFactory.errorPlay = function () {
				ngAudio.load('sounds/cool.mp3').play();
			};
			
			soundFactory.welcomePlay = function () {
				ngAudio.load('sounds/intro.mp3').play();
			};
			
			// Public API here
			return soundFactory;
		}
	]);
