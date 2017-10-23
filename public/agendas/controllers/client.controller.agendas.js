// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'agendas'
angular.module('agendas').controller('AgendasController', ['$scope','SharedDataService', '$routeParams','HorasResource', '$location','MedicosResource', 'AgendasResource', '$localStorage',
    function($scope,SharedDataService, $routeParams, $location,HorasResource, MedicosResource, AgendasResource, $localStorage) {
        // Exponer el service Authentication
        // $scope.authentication = Authentication;
        $scope.$storage = $localStorage;
        $scope.buttonVisibility = false;
        $scope.PacienteData = SharedDataService;
        //guardo al storage el medio seleccionado
        $scope.setMedico = function(index){
            $scope.$storage.medicoAgenda = $scope.medicos[index];
            // $scope.whatmed = $scope.$storage.medicoAgenda;
            // $scope.buttonVisibility = true;
        };
        // $scope.$storage.test = moment(this.momentDate,"YYYY-MM-DD").format("YYYY-MM-DD");
        $scope.test = function() {
            $scope.$storage.fechaAgenda = moment(this.momentDate,"YYYY-MM-DD").format("YYYY-MM-DD");
              // $scope.whatfecha = $scope.$storage.fechaAgenda;
        };
        // $scope.medicoSelec =    $scope.$storage.medicoinforme;
//         // Crear un nuevo método controller para crear nuevos agendas
        $scope.find = function() {

            $scope.medicos = MedicosResource.query();
        };



      }
]);
