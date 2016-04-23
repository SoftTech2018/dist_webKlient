/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var app = angular.module('jsonapp', ['ngRoute', 'booleanFilter']);

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
        }
    });



 








