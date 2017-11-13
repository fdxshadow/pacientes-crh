// Invocar modo JavaScript 'strict'
'use strict';

angular.module('dashboard').controller('ExamenesController', ['$scope','SharedDataService', '$routeParams', '$location', 'ExamenesResource', '$localStorage', function($scope,SharedDataService, $routeParams, $location, ExamenesResource, $localStorage) {


        $scope.$storage = $localStorage;
        $scope.ExamenData = SharedDataService;



    hora_inicio:moment(this.hora_inicio,"HH:mm").format("HH:mm");
    hora_termino:moment(this.hora_termino,"HH:mm").format("HH:mm");

    $scope.create = function() {
        var examen = new ExamenesResource({
            nombre: this.nombre,
            personal: this.personal,
            horario:{
            hora_inicio: this.hora_inicio,
            hora_termino: this.hora_termino
            }
            
        });

            examen.$save(function(response) {
            //                NuevoIngresoService.medico = response;
            $scope.$storage.examen = response;
            // Si un medico fue creado de modo correcto, redireccionar al usuario a la página del medico
            $location.path('/dashboard');
            }, function(errorResponse) {
            // En otro caso, presentar al usuario el mensaje de error
            $scope.error = errorResponse.data.message;
            });


/*
      ExamenesSrv.createExamen(newExamenData).then(function() {
            Notifier.notify('Examen Creado Exitosamente!');
            exameninfo.examen_nombre = newExamenData.nombre;
            exameninfo.examen_id = newExamenData._id;
            //exameninfo.paciente_horario = {newExamenData.horario_inicio},{newExamenData.horario_termino};
            exameninfo.personal = newExamenData.personal;
            $location.path('/dashboard');
            //$location.path('/secretaria/pacientes/crear');
        }, function(reason) {
            Notifier.error(reason);
        });
*/    



    }
}]);
