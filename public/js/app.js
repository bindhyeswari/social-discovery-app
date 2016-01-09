/**
 * Created by administrator on 1/7/16.
 */

var app = angular.module("socialApp", ["ui.router"]);

app.config(['$stateProvider',function($stateProvider){
    $stateProvider.state('bydistance', {
        url: '/announcementsByDistance',
        templateUrl: 'html/bydistance.html',
        controller: 'ByDistanceController'
    })
}]);

app.controller("ByDistanceController", function($scope){
   console.log('in ByDistanceController...') ;
});

