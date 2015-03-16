var app = angular.module('app', ['ngResource']);

app.factory('resources', function($resource) {
  var factory = {};

  factory.routes = {
    comicAPI: $resource('/characters/:action', {}, {
      fetch: {method: 'GET', params: {title: '@title', action: 'search'}, isArray: false }
    })
  };
  return factory;
});

app.controller('comicController', function($scope, resources) {

  $scope.comic = null;

  $scope.searchComics = function() {

    resources.routes.comicAPI.fetch({title: $scope.title}, function done(response) {
      $scope.noresult = 'No results found';
      if(response.name!=null) {
        $scope.comic = response;
        // var div = document.getElementById("descriptions");
        // div.innerHTML = response.description;
        // var div = document.createElement("div");
        // div.innerHTML = response.description;
        // $scope.description = div.textContent || div.innerText || "";
        $scope.comicImg = response.image.screen_url;
        $scope.gender = (response.gender == 1) ? 'Male' : 'Female';
        $scope.noresult = '';
      }
      else {
        $scope.comic = null;
        $scope.comicImg = null;
        $scope.gender = null;
        $scope.noresult = 'No results found';
      }

    });

  };


});



