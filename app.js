(function(angular){

    angular
    .module('app',['translate'])
    .factory('getVariables',['$http',function($http){
        return $http.get('bower_components/cui-i18n/dist/cui-i18n/angular-translate/locale-en_US.json')
    }])
    .config(['$translateProvider',function($translateProvider){
        $translateProvider.useLoader('LocaleLoader',{
            url:'bower_components/cui-i18n/dist/cui-i18n/angular-translate/',
            prefix:'locale-'
        });
    }])
    .run(['LocaleService',function(LocaleService){
        LocaleService.setLocales('en_US','English (United States)');
        LocaleService.setLocales('pl_PL','Polish (Poland)');
        LocaleService.setLocales('zh_CN', 'Chinese (Simplified)');
        LocaleService.setLocales('pt_PT','Portuguese (Portugal)');
    }])
    .controller('appCtrl',['LocaleService','$timeout','getVariables',function(LocaleService,$timeout,getVariables){
        var app=this;
        app.init = function(){
            app.data={
                name: 'Ricardo Marques'
            }
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