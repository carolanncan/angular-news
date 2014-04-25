var app = angular.module('myApp', []);

app.controller('MyController', function($scope) {
  $scope.person = { name: "Ari Lerner" };
  var updateClock = function() {
    $scope.clock = new Date();
  };
  var timer = setInterval(function() {
    $scope.$apply(updateClock);
  }, 1000);
  updateClock();
});

var apiKey = 'MDAxOTcxNzAyMDEyOTc4NzE4NTdkNDI2Mg001',
    nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';

app.controller('PlayerController', ['$scope', '$http', function($scope, $http) {
  var audio = document.createElement('audio');
  $scope.audio = audio;

  audio.src = 'http://pd.npr.org/npr-mp4/npr/sf/2013/07/20130726_sf_05.mp4?orgId=1&topicId=1032&ft=3&f=61';
  audio.play();

  $http({
    method: 'JSONP',
    url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
  }).success(function(data, status) {
    // Now we have a list of the stories (data.list.story)
    // in the data object that the NPR API 
    // returns in JSON that looks like:
    // data: { "list": {
    //   "title": ...
    //   "story": [
    //     { "id": ...
    //       "title": ...
    $scope.programs = data.list.story;
  }).error(function(data, status) {
    // Some error occurred
  });

}]);

// app.controller('PlayerController', ['$scope', function($scope) {
//   $scope.playing = false;
//   $scope.audio = document.createElement('audio');
//   $scope.audio.src = 'media/airplane.mp3';
//   $scope.play = function() {
//     $scope.audio.play();
//     $scope.playing = true;
//   };
//   $scope.stop = function() {
//     $scope.audio.pause();
//     $scope.playing = false;
//   };
//   $scope.audio.addEventListener('ended', function() {
//     $scope.$apply(function() {
//       $scope.stop()
//     });
//   });
// }]);

app.controller('DemoController', function($scope) {
  $scope.counter = 0;
  $scope.add = function(amount) { $scope.counter += amount; };
  $scope.subtract = function(amount) { $scope.counter -= amount; };
});

app.controller('RelatedController', ['$scope', function($scope) {
}]);
