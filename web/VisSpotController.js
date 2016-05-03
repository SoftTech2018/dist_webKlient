/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var app = angular.module('jsonapp', ['ngRoute', 'booleanFilter','ngAnimate','ui.bootstrap']);

app.config(function ($routeProvider) {
    $routeProvider
            .when('/', {
                templateUrl: 'sider/VisSpots.html',
        controller: 'jsonController'
    }).when('/Opret', {
        templateUrl: 'sider/OpretSpots.html',
        controller: 'spotController'
    }).otherwise ({
        redirectTo: 'sider/VisSpots.html'
    });
});






app.controller('jsonController', function($http,$scope){
    $http({
        method: 'GET',
        url: 'http://localhost:8080/ConvoyServer/webresources/convoy/get_all'
    }).success(function(data){
        $scope.data = data;    
        console.log($scope.data);
        
       
        console.log(typeof($scope.id));
        console.log($scope.id);
    });
});



angular.module('booleanFilter', []).filter('checkmark', function() {
    return function(input) {
        var output;
 
        if(input === true || input === false){
            output = input ? '\u2713' : '\u2718';
            return output;
        }
        else { return input;
        }
    };
});




app.controller('spotController', function($scope, $http){
   
    $scope.test = {};
    $scope.spot = {};
    
    //Default værdier til objekt. Overskrives når form submittes. 
   
    $scope.spot.wc = false;
    $scope.spot.bath = false;
    $scope.spot.food = false;
    $scope.spot.bed = false;
    $scope.spot.fuel = false;
    $scope.spot.addBlue = false;
    $scope.spot.roadtrain = false; 
    $scope.spot.longitude = "";
    $scope.spot.latitude = "";
    
    
    $scope.getAdress = function(val) {
        console.log("getADr er kaldt");
        return $http.get('http://localhost:8080/ConvoyServer/webresources/convoy/get_dawa/'+val, {   
        }).then(function(response){
            $scope.adresser = response.data;
            return $scope.adresser;
        });
    };
    
    
    $scope.setkoord = function(adresse){
        $scope.spot.longitude = adresse.adgangsadresse.adgangspunkt.koordinater[0];
        console.log($scope.longitude);
        $scope.spot.latitude = adresse.adgangsadresse.adgangspunkt.koordinater[1];
        console.log($scope.latitude);
    };
 
    //Efter submit overskrives form med tomme værdier 
    var tomForm = {
        adresser: "",
        stednavn: "",
        toilet : false,
        bad : false,
        mad : false,
        seng : false,
        tank : false,
        ab : false,
        vogntog : false
    };
    
   
    $scope.submitData = function() {
        var jsonSpot = JSON.stringify($scope.spot);
        
        console.log($scope.spot);
     
        
        $http({
            method  : 'POST',
            url     : 'http://localhost:8080/ConvoyServer/webresources/convoy/create/spot',
            data    :  jsonSpot
        }).success(function(data) {
            window.alert("Spot er oprettet!");
            console.log("Spot er oprettet!: "+ jsonSpot);
     
            console.log($scope.test.spotForm.$pristine);
            $scope.test.spotForm.$setPristine();   
            $scope.test.spotForm.adresser = "";
                    
                
            
            $scope.spot = angular.copy(tomForm);
            
            
             
            
            console.log($scope.test.spotForm.$pristine); 
            
          
                    
            if (!data.success) {
                //console.log("Fejl ved gemning af data");
            }
        });
    };

}); 


