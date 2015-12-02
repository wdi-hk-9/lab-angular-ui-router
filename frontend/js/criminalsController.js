angular.module('InfamousCriminals')
.controller('CriminalsController', CriminalsController);

CriminalsController.$inject = ['$http', '$scope'];

function CriminalsController($http, $scope){
  $scope.all = [];
  $scope.addCriminal = addCriminal;
  $scope.newCriminal = {};
  $scope.getCriminals = getCriminals;
  $scope.deleteCriminal = deleteCriminal;

  getCriminals();
  function getCriminals(){
    $http
      .get('http://localhost:3000/criminals')
      .then(function(response){
        $scope.all = response.data.criminals;
    });
  }

  function addCriminal(){
    $http
      .post('http://localhost:3000/criminals', $scope.newCriminal)
      .then(function(response){
        getCriminals();
    });
    $scope.newCriminal = {};
  }

  function deleteCriminal(criminal){
    $http
      .delete("http://localhost:3000/criminals/" + criminal._id)
      .then(function(response){
        var index = $scope.all.indexOf(criminal);
        $scope.all.splice(index, 1);
      });
  }

}