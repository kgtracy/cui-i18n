(function(angular){
	'use strict';

	angular
	.module('app',['translate'])
	.controller('appCtrl',['$timeout',appCtrl]);

	function appCtrl($timeout){
		var app=this;
		app.init = function(){
			app.test='test';
			app.ammount=0;
			app.increase();
			app.date=new Date();
			app.tick();
		}

		app.increase = function(){
			if(app.ammount<1000000){
				app.ammount+=0.01;
				$timeout(app.increase,1);
			}
		}

		app.tick = function(){
			app.date=new Date();
			$timeout(app.tick,1000);
		}

		app.init();

	}


})(angular)