// Invocar modo JavaScript 'strict'
'use strict';

angular.module('dashboard').controller('ExamenesController', ['$scope','SharedDataService', '$routeParams', '$location', 'ExamenesResource', '$localStorage', 'Notifier', function($scope,SharedDataService, $routeParams, $location, ExamenesResource, $localStorage, Notifier) {


        $scope.$storage = $localStorage;
        $scope.ExamenData = SharedDataService;


    //
    // hora_inicio:moment(this.hora_inicio,"HH:mm").format("HH:mm");
    // hora_termino:moment(this.hora_termino,"HH:mm").format("HH:mm");

    $scope.create = function() {
      var examen = new ExamenesResource({
          nombre: this.nombre,
          personal: this.personal,
          horario:{
          hora_inicio:moment(this.hora_inicio,"HH:mm").format("HH:mm"),
          hora_termino:moment(this.hora_termino,"HH:mm").format("HH:mm")
          }

        });

            examen.$save(function(response) {
            //                NuevoIngresoService.medico = response;
            $scope.$storage.examen = response;
            // Si un medico fue creado de modo correcto, redireccionar al usuario a la página del medico
            Notifier.notify('Examen Creado Exitosamente!');
            $location.path('/dashboard');
            }, function(errorResponse) {
            // En otro caso, presentar al usuario el mensaje de error
            $scope.error = errorResponse.data.message;
            Notifier.error('Error al crear el examen, favor revisar que no exista');
            });
    }





}]);
