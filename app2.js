(function(angular){

    angular
    .module('app2',['translate'])
    .factory('getVariables',['$http',function($http){
        return $http.get('dist/cui-i18n/messaging/json/en.json')
    }])
    .config(['$translateProvider',function($translateProvider){
        $translateProvider.useLoader('LocaleLoader',{
            url:'dist/cui-i18n/messaging/json/',
            prefix:'',
            suffix:'.json'
        })
        .preferredLanguage('en');
    }])
    .run(['LocaleService',function(LocaleService){
        LocaleService.setLocales('en','English (United States)');
        LocaleService.setLocales('pl','Polish (Poland)');
        LocaleService.setLocales('zh', 'Chinese (Simplified)');
        LocaleService.setLocales('pt','Portuguese (Portugal)');
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
