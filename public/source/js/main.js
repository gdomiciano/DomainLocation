var app = angular.module('geolocation', ['ngMap']);

app.factory('getLocation', function(){return 'http://ip-api.com/json/';});

app.controller('Location', function ($scope, $http, NgMap, getLocation) {
    'use strict';

    $scope.locations = [{
        query: "0.0.0.0"
    }];
    $scope.now;
    $scope.errorMsg = '';

    //getting my current location
    $scope.getMyLocation = function () {
        $http.get(getLocation).then(function (response) {
            if(response.data.status == 'success'){
                response.data.from = 'Yours';
                response.data.icon = 'user.png';
                if($scope.locations[0].query ===  "0.0.0.0"){
                    $scope.locations[0] = response.data;
                }else if($scope.locations.length !== 0){
                    for(var i=0;i<$scope.locations.length;i++){
                        if($scope.locations[i].from == 'Yours'){
                            $scope.locations[i] = response.data;
                        }
                    }
                }else{
                    $scope.setNewResult(response.data);
                }
            }else{
                $scope.errorMsg = 'Your location isn\'t available, please try again';
            }
            $scope.now = new Date();
        });
    };

    //getting the location by website
    $scope.getWebsiteLocation = function (site) {
        console.log($scope.f.url);
        var regex = /^(www\.)?(([a-zA-Z]{1})|([a-zA-Z]{1}[a-zA-Z]{1})|([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z0-9][a-zA-Z0-9]{1,61}[a-zA-Z0-9]))\.([a-zA-Z]{2,6}|[a-zA-Z0-9]{2,30}\.[a-zA-Z]{2,3})$/;
        if($scope.f.$valid && regex.test(site)){
            $http.get(getLocation + site).then(function (response) {
                if(response.data.status == 'success'){
                    response.data.from = 'Web site';
                    response.data.icon = 'server.png';
                    console.log($scope.locations);
                    if($scope.locations.length  > 1 ){
                        for(var i = 0; i < $scope.locations.length; i++){
                            if($scope.locations[i].from == 'Web site'){
                                $scope.locations[i] = response.data;
                            }
                        }
                    }else{
                        $scope.setNewResult(response.data);
                    }
                }else{
                    $scope.errorMsg = 'Domain ' + response.data.query + ' is invalid, please try again';
                    $scope.locations.splice(1,1);
                };
                $scope.now = new Date();
            });
        };
    };

    //reseting my location
    $scope.resetLocation = function () {
        $scope.locations[0] = {
            query: "0.0.0.0",
            country: "",
            regionName: "",
            city: "",
            timezone: "",
            lat: "",
            lon: "",
            from: ""
        };
    };

    //help button
    $scope.clickHelp = function(fieldName,location){
        console.log(location);
        $scope.msg = "This is your " + fieldName + " from ISP " + location.isp + " at " + $scope.now;
    }

    //Set data for the first time
    $scope.setNewResult = function(data){
        var currentLocation = $scope.locations;
        var newLocation = currentLocation.concat(data);
        $scope.locations = newLocation;
    }
});

