var app = angular.module('myApp', []);
    apiKey = 'MDAxOTcxNzAyMDEyOTc4NzE4NTdkNDI2Mg001',
    nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';

app.factory('audio', ['$document', function($document) {
  var audio = $document[0].createElement('audio');
  return audio;
}]);

app.factory('player', ['audio', function(audio) {
  var player = {
    playing: false,
    current: null,
    ready: false,

    play: function(program) {
      if (player.playing) player.stop();
      var url = program.audio[0].format.mp4.$text;
      player.current = program;
      audio.src = url;
      audio.play();
      player.playing = true
    },

    stop: function() {
      if (player.playing) {
        audio.pause();
        player.ready = player.playing = false;
        player.current = null;
      }
    }
  };
  return player;
}]);

app.directive('nprLink', function() {
  return {
    restrict: 'EA',
    require: ['^ngModel'],
    replace: true,
    scope: {
      ngModel: '=',
      play: '&'
    },
    templateUrl: 'views/nprListItem.html',
    link: function(scope, ele, attr) {
      scope.duration = scope.ngModel.audio[0].duration.$text;
    }
  }
});

app.controller('PlayerController', ['$scope', '$http', 'audio',
  function($scope, $http, audio) {
  $scope.audio = audio;


  audio.src = 'http://pd.npr.org/npr-mp4/npr/sf/2013/07/20130726_sf_05.mp4?orgId=1&topicId=1032&ft=3&f=61';
  audio.play();

  $scope.play = function(program) {
    if ($scope.playing) $scope.audio.pause();
    var url = program.audio[0].format.mp4.$text;
    audio.src = url;
    audio.play();
    $scope.playing = true;
  }

  $http({
    method: 'JSONP',
    url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
  }).success(function(data, status) {
    $scope.programs = data.list.story;
  }).error(function(data, status) {
    // Some error occurred
  });

}]);

app.controller('RelatedController', ['$scope', function($scope) {
}]);
