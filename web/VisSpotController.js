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
        console.log(typeof($scope.data));
        $scope.id = data[0].name;
        
       
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
    $scope.spot.id = 0;
    $scope.spot.toilet = false;
    $scope.spot.bad = false;
    $scope.spot.mad = false;
    $scope.spot.seng = false;
    $scope.spot.tank = false;
    $scope.spot.ab = false;
    $scope.spot.vogntog = false; 
    
    $scope.forslag = [];
    
    var iterate = function(item){
        return item.adressebetegnelse;
    };
    
    $scope.getAdress = function(val) {
        console.log("getADr er kaldt");
        return $http.get('http://dawa.aws.dk/adresser?q='+val, {   
 
        }).then(function(response){
            return iterate(response.data);  
        });
    };
    
   
    
    
    // console.log(response.data[0].adressebetegnelse);    
       
    
  
    //response.data.adressebetegnelse;
  
    
    
    //    function getAdress(){
    //        console.log("Getadress kaldt");
    //        $http({
    //            method  : 'GET',
    //            url     : 'http://dawa.aws.dk/adresser?q=' + $scope.adresse
    //        }).then(function succesCallback(svar){
    // 
    //           $scope.adr = svar.data;
    //          
    //           angular.forEach($scope.adr, function(item){
    //               console.log(item.adgangsbetegnelse);
    //            });
    //            
    //            for(var i = 0; i < $scope.adr.length; i++) {
    //                $scope.object = $scope.adr[i];
    //                $scope.forslag.push($scope.object.adressebetegnelse);
    //                }
    //            
    //Sti til koordinater:
    //$scope.object.adgangsadresse.adgangspunkt.koordinater
           
           
    //           $scope.adgangspunkt = svar.data[0].adgangsadresse.adgangspunkt.koordinater;
    //            console.log($scope.adgangspunkt);            
    //            console.log(typeof($scope.adr));
    //        }, function errorCallback(svar) {   
    //            console.log("kan ikke hente adresser");
    //        });
        
        
    //}

    


  
    //Efter submit overskrives form med tomme værdier 
    var tomForm = {
        adresse: "",
        stednavn: "",
        toilet : false,
        bad : false,
        mad : false,
        seng : false,
        tank : false,
        ab : false,
        vogntog : false
    };
   
    //Skal laves om 
    var jsonSpot = JSON.stringify($scope.spot);
   
    console.log(jsonSpot);
   
    $scope.submitData = function() {
       
        console.log($scope.spot);
        $scope.adresse = $scope.spot.adresse; 
        console.log($scope.adresse);
        $scope.getAdress();
        
        $http({
            method  : 'POST',
            url     : 'http://jsonplaceholder.typicode.com/posts',
            data    :  jsonSpot
        })
                .success(function(data) {
                    window.alert("Spot er oprettet!");
            console.log($scope.test.spotForm.$pristine);
            $scope.test.spotForm.$setPristine();    
            $scope.spot = angular.copy(tomForm);
            console.log($scope.test.spotForm.$pristine); 
            
          
                    
            if (!data.success) {
                console.log("Fejl ved gemning af data");
            }
        });
    };

}); 


