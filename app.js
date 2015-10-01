(function(angular){
    'use strict';

    angular
    .module('app',['translate'])
    .factory('getVariables',['$http','$q',getVariables])
    .controller('appCtrl',['$timeout','getVariables',appCtrl]);
    
    function getVariables($http){
        return $http.get('dist/cui-i18n/angular-translate/locale-en_US.json')
    }

    function appCtrl($timeout,getVariables){
        var app=this;
        app.init = function(){
            app.key=[];
            app.getVariables();
            app.ammount=0;
            app.increase();
            app.date=new Date();
            app.tick();
        }

        app.getVariables = function(){
            getVariables.then(function(res){
                var i=0;
                for(var key in res.data){
                    app.key[i]=key;
                    i++;
                }
            })
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