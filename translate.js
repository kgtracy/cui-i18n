(function(angular){
	'use strict';

	angular
	.module('translate',[
		'ngSanitize',
		'ngCookies',
		'pascalprecht.translate',// angular-translate
		'tmh.dynamicLocale'// angular-dynamic-locale
		])
	// .constant('LOCALES', {
	//     'locales': {
	//     	//add more locales here
	//         'pt_PT': 'Português (Portugal)',
	//         'en_US': 'English (United States)',
	//         'zh_CN': 'Chinese (China)',
	//         'pl_PL': 'Polish (Poland)'
	//     },
	//     'preferredLocale': 'en_US'
	// })
	.config(['$translateProvider','tmhDynamicLocaleProvider', function ($translateProvider,tmhDynamicLocaleProvider) {
		//get warning in console regarding forgotten ID's. Comment out when not needed.
	    $translateProvider.useMissingTranslationHandlerLog();

	    //Asynchronously load translations
	    // $translateProvider.useStaticFilesLoader({
	    //     prefix: 'bower_components/cui-i18n/dist/cui-i18n/angular-translate/locale-',// path to translations files
	    //     suffix: '.json'// suffix, currently- extension of the translations
	    // });

	    $translateProvider.preferredLanguage('en_US');// is applied on first load
	    $translateProvider.useSanitizeValueStrategy('escape');
	 

	    //Where the $locale settings are (for currency,dates and number formats)
	    tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');

	}])
	.factory('LocaleLoader',['$http','$q',function($http,$q){
		return function(options){
			var deferred=$q.defer();
			$http({
				method:'GET',
				url:options.url + (options.prefix || '') + options.key + '.json'
			})
			.success(function(data){
				deferred.resolve(data);
			})
			.error(function(){
				deferred.reject(options.key);
			})

			return deferred.promise;
		};
	}])
	.service('LocaleService', ['$translate', '$rootScope', 'tmhDynamicLocale',
	 function ($translate,  $rootScope, tmhDynamicLocale) {
	    // PREPARING LOCALES INFO
	    var localesObj = {};

	    // locales and locales display names
	    // var _LOCALES = Object.keys(localesObj);
	    // if (!_LOCALES || _LOCALES.length === 0) {
	    //   console.error('There are no _LOCALES provided');
	    // }
	    // var _LOCALES_DISPLAY_NAMES = [];
	    // _LOCALES.forEach(function (locale) {
	    //   _LOCALES_DISPLAY_NAMES.push(localesObj[locale]);
	    // });
	    
	    // STORING CURRENT LOCALE
	    var currentLocale = $translate.proposedLanguage();// because of async loading
	    
	    // METHODS
	    var checkLocaleIsValid = function (locale) {
	      return Object.keys(localesObj).indexOf(locale)!== -1;
	    };
	    
	    var setLocale = function (locale) {
    	  var i;
    	  var keys=Object.keys(localesObj);
	      for(i=0; i<keys.length; i++){
	      	console.log(keys[i]);
	      	if(localesObj[keys[i]]==locale){
	      		var localeCode=keys[i];
	      		break;
	      	}
	      }
	      if (!checkLocaleIsValid(localeCode)) {
	        console.error('Locale name "' + locale + '" is invalid');
	        return;
	      }
	      currentLocale = localeCode;// updating current locale
	    
	      // asking angular-translate to load and apply proper translations
	      $translate.use(localeCode);
	      $rootScope.$broadcast('languageChange');
	    };
	    

	    var setLocales = function(locale,localeDisplayName){
	    	localesObj[locale]=localeDisplayName;
	    }

	    var getLocales = function(){
	    	return Object.keys(localesObj);
	    }

	    // EVENTS
	    // on successful applying translations by angular-translate
	    $rootScope.$on('$translateChangeSuccess', function (event, data) {
	      document.documentElement.setAttribute('lang', data.language);// sets "lang" attribute to html
	    
	       // asking angular-dynamic-locale to load and apply proper AngularJS $locale setting
	      tmhDynamicLocale.set(data.language.toLowerCase().replace(/_/g, '-'));
	    });


	    return {
	      getLocaleDisplayName: function () {
	        return localesObj[currentLocale];
	      },
	      setLocaleByDisplayName: function (locale) {
	        setLocale(locale);
	      },
	      getLocalesDisplayNames: function () {
	        var localesDisplayNames=[];
	        var locales = getLocales();
	        locales.forEach(function (locale) {
		    	localesDisplayNames.push(localesObj[locale]);
		    });
		    return localesDisplayNames;
	      },
	      setLocales : setLocales,
	      getLocales : getLocales
	    };
	}])
	//language dropdown directive
	.directive('ngTranslateLanguageSelect',['LocaleService',function (LocaleService) { 'use strict';
		return {
            restrict: 'A',
            replace: true,
            template: ''+
            '<div class="language-select" ng-if="visible">'+
                '<select ng-model="currentLocaleDisplayName"'+
                    'ng-options="localesDisplayName for localesDisplayName in localesDisplayNames"'+
                    'ng-change="changeLanguage(currentLocaleDisplayName)">'+
                '</select>'+
            '</div>'+
            '',
            controller: function ($scope) {
                $scope.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();
                $scope.localesDisplayNames = LocaleService.getLocalesDisplayNames();

               

                $scope.visible = $scope.localesDisplayNames &&
                $scope.localesDisplayNames.length > 1;
    
                $scope.changeLanguage = function (locale) {
                    LocaleService.setLocaleByDisplayName(locale);
                };
            }
        };
    }]);


})(angular)
