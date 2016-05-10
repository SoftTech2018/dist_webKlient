
var app = angular.module('jsonapp', ['ngRoute', 'booleanFilter','ngAnimate','ui.bootstrap']);

app.config(function ($routeProvider, $httpProvider) {
    
    $httpProvider.defaults.useXDomain = true;
  
   
    
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
        url: 'http://default-environment.xyik5z2rn3.eu-central-1.elasticbeanstalk.com/webresources/convoy/get_all',
        
    }).success(function(data1){
        
        
        $scope.all = data1; 
        console.log(data1); 
        $scope.data = [];
        angular.forEach($scope.all, function(item){
            if(item.deleted === false){
                $scope.data.push(item);
                return $scope.data;
            }
        });
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
$scope.spot.longitude = -1;
$scope.spot.latitude = -1;
    
    
$scope.getAdress = function(val) {
    return $http.get('http://default-environment.m2ypbqk78s.us-west-2.elasticbeanstalk.com/webresources/convoy/get_dawa/'+val, {   
    }).then(function(response){
        $scope.adresser = response.data;
        return $scope.adresser;
    });
};
    
    
    
$scope.setkoord = function(adresse){
    $scope.spot.longitude = adresse.adgangsadresse.adgangspunkt.koordinater[0];
    $scope.spot.latitude = adresse.adgangsadresse.adgangspunkt.koordinater[1];
       
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
   
    
//    var jsonSpot = JSON.stringify($scope.spot);
//        
    if($scope.spot.longitude === -1 || $scope.spot.latitude === -1){
        window.alert("Fejl i adresse - vælg fra dropdown");
    }
    else{
        $http({
            method  : 'POST',
            url     : 'http://default-environment.xyik5z2rn3.eu-central-1.elasticbeanstalk.com/webresources/convoy/create/spot',
            data    :  jsonSpot,
            crossDomain : true
        }).then(function successCallback(data){
            window.alert("Spot er oprettet!");
            console.log("Spot er oprettet!: "+ jsonSpot);

            $scope.test.spotForm.$setPristine();   
            $scope.test.spotForm.adresser = "";         
            $scope.spot = angular.copy(tomForm);
        }, function errorCallback(data) {
            window.alert("Fejl i oprettelse af spot. Prøv igen!");
        
        });
    }
};

    
}); 
