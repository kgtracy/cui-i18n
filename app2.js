(function(angular){

    angular
    .module('app2',['translate'])
    .factory('getVariables',['$http',function($http){
        return $http.get('bower_components/cui-i18n/dist/cui-i18n/messaging/json/en_US.json')
    }])
    .controller('appCtrl',['$timeout','getVariables',function($timeout,getVariables){
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
    }]);
})(angular);
