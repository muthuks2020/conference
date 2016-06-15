'use strict';

(function() {

function authInterceptor($rootScope, $q, $cookies, $injector, Util) {
  var state;
  var loader = document.getElementsByClassName('loader-center')
  return {
    // Add authorization token to headers
    
    request(config) {
      if($('body').hasClass('loaded'))
      {
        loader[0].style.display = 'block';
      }
      config.headers = config.headers || {};
      if ($cookies.get('token') && Util.isSameOrigin(config.url)) {
        config.headers.Authorization = 'Bearer ' + $cookies.get('token');
      }
      return config;
    },
    response(response) {
      setTimeout(function () {
        loader[0].style.display = 'none';
      }, 500);
      
      return response;
    },

    // Intercept 401s and redirect you to login
    responseError(response) {
      loader[0].style.display = 'none';
      if (response.status === 401) {
        (state || (state = $injector.get('$state'))).go('login');
        // remove any stale tokens
        $cookies.remove('token');
      }
      return $q.reject(response);
    }
  };
}

angular.module('eventsMongoApp.auth')
  .factory('authInterceptor', authInterceptor);

})();
