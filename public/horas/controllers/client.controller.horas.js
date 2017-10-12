// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'horas'
angular.module('horas').controller('HorasController', ['$scope','SharedDataService', '$routeParams', '$location','MedicosResource', 'HorasResource', '$localStorage',
    function($scope,SharedDataService, $routeParams, $location,MedicosResource, HorasResource, $localStorage) {
        // Exponer el service Authentication
        // $scope.authentication = Authentication;
        $scope.$storage = $localStorage;
        $scope.buttonVisibility = false;
        $scope.PacienteData = SharedDataService;
        $scope.pacienteSelec = $scope.$storage.pacienteSelec ;
        $scope.fechafiltro = $scope.$storage.test;
        //guardo al storage el medio seleccionado
        $scope.setMedico = function(index){
            $scope.$storage.medicoinforme = $scope.medicos[index];
            // $scope.buttonVisibility = true;
        };
        $scope.medicoSelec = $scope.$storage.medicoinforme;
        $scope.medicoTest = $scope.$storage.medicoAgenda;
//         // Crear un nuevo método controller para crear nuevos horas


        // retorna lista de horas segun fecha y id_medico
        $scope.findHoras = function(){
            $scope.horasFiltro = $scope.findHoras_byFechaMedico($scope.$storage.fechaAgenda,$scope.$storage.medicoAgenda._id);
        };
        $scope.findHoras_byFechaMedico = function(_fecha, _id_medico) {
            return HorasResource.query({
              buscarFecha: _fecha,
              nombreMedico: _id_medico
            });
        };




        //lista de medicos usando ssu resource
        $scope.findMedicos = function() {
            // Usar el método 'query' de paciente para enviar una petición GET apropiada
            $scope.medicos = MedicosResource.query();
        };

        $scope.generatePDF = function() {
          kendo.drawing.drawDOM($("#formConfirmation")).then(function(group) {
            kendo.drawing.pdf.saveAs(group, "Converted PDF.pdf");
          });
        }



      }
]);
