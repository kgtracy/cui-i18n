(function(angular){

    angular
    .module('app',['translate'])
    .factory('getVariables',['$http',function($http){
        return $http.get('dist/cui-i18n/angular-translate/locale-en.json')
    }])
    .config(['$translateProvider',function($translateProvider){
        $translateProvider.useLoader('LocaleLoader',{
            'url':'dist/cui-i18n/angular-translate/',
            'prefix':'locale-',
            'suffix':'.json'
        })
        .preferredLanguage('en');
    }])
    .run(['LocaleService',function(LocaleService){
        LocaleService.setLocales('en','English');
        LocaleService.setLocales('pt','Portuguese');
        LocaleService.setLocales('tr','Turkish');
        LocaleService.setLocales('zh','Chinese (Simplified)');
        LocaleService.setLocales('fr','French');
        LocaleService.setLocales('es','Spanish');
        LocaleService.setLocales('it','Italian');
        LocaleService.setLocales('ru','Russian');
        LocaleService.setLocales('th','Thai');
        LocaleService.setLocales('ja','Japanese');
        LocaleService.setLocales('de','German');
    }])
    .controller('appCtrl',['LocaleService','$timeout','getVariables',function(LocaleService,$timeout,getVariables){
        var app=this;
        app.init = function(){
            app.data={
                name: 'Ricardo Marques'
            }
            app.key=[];
            app.getVariables();
            app.amount=0;
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
            if(app.amount<1000000){
                app.amount+=0.01;
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