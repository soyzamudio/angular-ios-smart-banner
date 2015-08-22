angular.module('smartBanner', [])
.directive('iosSmartBanner', [ 'appStoreData', function(appStoreData) {
  return {
    restrict: 'E',
    // replace: true,
    scope: {
      appId: '=appId'
    },
    templateUrl: 'vendor/angular-ios-smart-banner/dist/ios-smart-banner.html',
    link: function(scope, element, attr) {
      scope.app = {};

      scope.isMobile = {
          iOS: function() {
              return /iPhone|iPad|iPod/i.test(navigator.userAgent);
          }
      };

      appStoreData.getData(314673827)
      .then(function(response) {
        scope.app.image = response.data.results[0].artworkUrl60;
        scope.app.appName = response.data.results[0].trackCensoredName;
        scope.app.sellerName = response.data.results[0].sellerName;
        scope.app.appUrl = response.data.results[0].trackViewUrl;
      });

      scope.dismiss = function() {
        console.log('dismissed');
      }
    }
  }
}])
.factory('appStoreData', ['$http', function($http) {
  var storeData = {}

  storeData.getData = function(appId) {
    return $http.jsonp('http://itunes.apple.com/lookup?id=' + appId, {
      params: { "callback": "JSON_CALLBACK" }
    });
  }

  return storeData;
}]);
