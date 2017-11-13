// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'agendas'
angular.module('agendas').controller('AgendasController', ['$scope', 'SharedDataService', '$routeParams', '$location','MedicosResource', 'AgendasResource', '$localStorage',
    function($scope,SharedDataService, $routeParams, $location, MedicosResource, AgendasResource, $localStorage) {
        // Exponer el service Authentication
        // $scope.authentication = Authentication;
        $scope.$storage = $localStorage;
        $scope.buttonVisibility = false;
        $scope.PacienteData = SharedDataService;
        //guardo al storage el medio seleccionado
        // ##################################### AGENDA DIARIA########################
        //elegir medico de lista de medicos
        $scope.setMedico = function(index){
            $scope.$storage.medicoAgenda = $scope.medicos[index];
        };

        $scope.momentDate = moment().add(1,'days').format('YYYY-MM-DD');
        $scope.$storage.fechaAgenda = $scope.momentDate;
        $scope.hoy = moment().format('YYYY-MM-DD');


        $scope.agenda = function() {
            $scope.$storage.fechaAgenda = moment(this.momentDate,"YYYY-MM-DD").format("YYYY-MM-DD");
            $scope.$horasFiltro = $scope.findHoras_byFechaMedico($scope.$storage.fechaAgenda,$scope.$storage.medicoAgenda._id).$promise.then(function(resp){
              var jsarray = [];

              // console.log('resp es:');
              // console.log(resp);

              for(let value of resp) {
                // console.log(value);
                jsarray.push(value);
              };

              $scope.$storage.jsarray = jsarray;


            }).then(function(){
              $scope.$storage.fileName = "Dr. " + $scope.$storage.medicoAgenda.nombre + "_" + $scope.$storage.fechaAgenda + ".pdf";
              $location.url('/agendas/ver');
            });


        };
        //consulta bd por fecha y medico
        $scope.findHoras_byFechaMedico = function(_fecha, _id_medico) {
            return AgendasResource.query({
              buscarFecha: _fecha,
              nombreMedico: _id_medico
            });
        };

        // lista de medicos
        $scope.find = function() {
            $scope.medicos = MedicosResource.query();
        };



       // ############################## REPORTE GENERAL ######################
        moment.locale('es');
        // $scope.fecharep = $scope.$storage.fechaReporte;
        $scope.momentMesDate = moment().format('YYYY-MM');
        $scope.$storage.fechaReporte = $scope.momentMesDate;
        $scope.esteMes = moment().format('MMMM');

          // $scope.$storage.fechaAgenda = $scope.momentDate;
          $scope.$storage.fechaReporte = $scope.momentMesDate
          $scope.formatted = moment($scope.fecharep, 'YYYY-MM').format('MMMM YYYY');
          $scope.findHorasbyFecha = function(){
            // console.log('va a buscar por');
            // console.log($scope.$storage.fechaReporte);
            $scope.reservasResponse = $scope.findHoras_byFecha($scope.$storage.fechaReporte);
            console.log('encontro en by fecha');
            console.log($scope.reservasResponse);
        };
        $scope.findHoras_byFecha = function(_fecha) {
            return AgendasResource.query({
              buscarFecha: _fecha
            });
        };

        $scope.reporte = function() {
            $scope.$storage.fechaReporte = moment(this.momentMesDate,"YYYY-MM").format("YYYY-MM");
            console.log('el mes es ');
            console.log($scope.$storage.fechaReporte);
            $scope.reservasResponse = $scope.findHoras_byFecha($scope.$storage.fechaReporte).$promise.then(function(resp){

              // $scope.$storage.fileNameRep = "Reporte_mensual:"+$scope.formatted + ".pdf";
            $scope.$storage.jsArrayReporte = resp[0];
            $scope.$storage.jsDinamic = resp.slice(1);
          }).then(function(){
            $scope.$storage.fileNameRep = "Reporte_mensual:"+$scope.formatted + ".pdf";
            $location.url('/reportes/ver');
          });


        };

      }
]);
