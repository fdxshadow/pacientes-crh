// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'medicos'
angular.module('medicos').controller('MedicosController', ['$scope','SharedDataService', '$routeParams', '$location', 'MedicosResource', '$localStorage',
    function($scope,SharedDataService, $routeParams, $location, MedicosResource, $localStorage) {
        // Exponer el service Authentication
        // $scope.authentication = Authentication;
        $scope.$storage = $localStorage;
        $scope.buttonVisibility = false;

        $scope.visibility_medicos = true;
        $scope.toogleVisibility_medicos = function(){
            $scope.visibility_medicos = !$scope.visibility_medicos;
            $scope.closeAlert();
        };

        // var aux = [];
        // var dia = new Array();


//         // Crear un nuevo método controller para crear nuevos medicos
        $scope.create = function() {
            // $scope.dias.lunes = null;
            var dia = new Array();
            var aux = [];
            if($scope.lunes){
                 dia = {
                    dia:"lunes",
                    hora_inicio:moment(this.hora_inicio_lunes,"HH:mm").format("HH:mm"),
                    hora_termino:moment(this.hora_fin_lunes,"HH:mm").format("HH:mm")
                };
                aux.push(dia);
            }
            if($scope.martes){
                 dia = {
                    dia:"martes",
                    // moment(this.momentDate,"YYYY-MM-DD").format("YYYY-MM-DD");
                    // hora_inicio:$scope.hora_inicio_martes,
                    hora_inicio:moment(this.hora_inicio_martes,"HH:mm").format("HH:mm"),
                    hora_termino:moment(this.hora_fin_martes,"HH:mm").format("HH:mm")
                };
                aux.push(dia);
            }
            if($scope.miercoles){
                 dia = {
                    dia:"miercoles",
                    hora_inicio:moment(this.hora_inicio_miercoles,"HH:mm").format("HH:mm"),
                    hora_termino:moment(this.hora_fin_miercoles,"HH:mm").format("HH:mm")
                };
                aux.push(dia);
            }
            if($scope.jueves){
                 dia = {
                    dia:"jueves",
                    hora_inicio:moment(this.hora_inicio_jueves,"HH:mm").format("HH:mm"),
                    hora_termino:moment(this.hora_fin_jueves,"HH:mm").format("HH:mm")
                };
                aux.push(dia);
            }
            if($scope.viernes){
                 dia = {
                    dia:"viernes",
                    hora_inicio:moment(this.hora_inicio_viernes,"HH:mm").format("HH:mm"),
                    hora_termino:moment(this.hora_fin_viernes,"HH:mm").format("HH:mm")
                };
                aux.push(dia);
            }

            console.log(aux);


            var medico = new MedicosResource({
                run: this.run,
                nombre: this.nombre,
                especialidad: this.especialidad,
                email: this.email,
                disponibilidad:aux
            });

            console.log(medico);

            // Usar el método '$save' de medico para enviar una petición POST apropiada
            medico.$save(function(response) {
//                NuevoIngresoService.medico = response;
                $scope.$storage.medico = response;
                $scope.toogleVisibility_medicos();
                // Si un medico fue creado de modo correcto, redireccionar al usuario a la página del medico
                // $location.path('/tipohora');
                $location.path('/medicos');
            }, function(errorResponse) {
                // En otro caso, presentar al usuario el mensaje de error
                $scope.error = errorResponse.data.message;
                $location.path('/medicos/create');
            });
        };

        // Crear un nuevo método controller para actualizar un único Procedimiento

        $scope.update = function(index) {

          var aux = [];
          var dia = new Array();
          // $scope.dias.lunes = false;
          // $scope.dias = [];

          if($scope.lunes){
               dia = {
                  dia:"lunes",
                  hora_inicio:moment(this.hora_inicio_lunes,"HH:mm").format("HH:mm"),
                  hora_termino:moment(this.hora_fin_lunes,"HH:mm").format("HH:mm")
              };
              aux.push(dia);
          };
          if($scope.martes){
               dia = {
                  dia:"martes",
                  // moment(this.momentDate,"YYYY-MM-DD").format("YYYY-MM-DD");
                  // hora_inicio:$scope.hora_inicio_martes,
                  hora_inicio:moment(this.hora_inicio_martes,"HH:mm").format("HH:mm"),
                  hora_termino:moment(this.hora_fin_martes,"HH:mm").format("HH:mm")
              };
              aux.push(dia);
          }
          if($scope.miercoles){
               dia = {
                  dia:"miercoles",
                  hora_inicio:moment(this.hora_inicio_miercoles,"HH:mm").format("HH:mm"),
                  hora_termino:moment(this.hora_fin_miercoles,"HH:mm").format("HH:mm")
              };
              aux.push(dia);
          }
          if($scope.jueves){
               dia = {
                  dia:"jueves",
                  hora_inicio:moment(this.hora_inicio_jueves,"HH:mm").format("HH:mm"),
                  hora_termino:moment(this.hora_fin_jueves,"HH:mm").format("HH:mm")
              };
              aux.push(dia);
          }
          if($scope.viernes){
               dia = {
                  dia:"viernes",
                  hora_inicio:moment(this.hora_inicio_viernes,"HH:mm").format("HH:mm"),
                  hora_termino:moment(this.hora_fin_viernes,"HH:mm").format("HH:mm")
              };
              aux.push(dia);
          }



          $scope.medicoEdit.disponibilidad = aux;
            // $scope.medico = $scope.medicos[index];
            // Usar el método '$update' de Procedimiento para enviar una petición PUT apropiada
            $scope.medicoEdit.$update(function() {
                // Si un Procedimiento fue actualizado de modo correcto, redirigir el user a la página del Procedimiento
                // $scope.quitChangedAlert(index);
                $location.path('medicos/' + $scope.medicoEdit._id);
            }, function(errorResponse) {
                // En otro caso, presenta al user un mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };





        $scope.closeAlert = function(){
            $scope.error = null;
        };

        $scope.setChangedAlert = function(index){
            $scope.style_tr[index] = {'backgroundColor': '#ffd3d3'};
        }
        $scope.quitChangedAlert = function(index){
            $scope.style_tr[index] = {};
        };


        $scope.setMedico = function(index){
            $scope.$storage.medicoTest = $scope.medicos[index];
            $scope.buttonVisibility = true;
        };

        $scope.find = function() {
            // Usar el método 'query' de paciente para enviar una petición GET apropiada
            $scope.medicos = MedicosResource.query();
        };

        $scope.findOne = function() {
            // Usar el método 'get' de medico para enviar una petición GET apropiada
            MedicosResource.get({
                medicoId:   $scope.$storage.medicoTest._id
            }).$promise.then(function(resp){
              $scope.testing = [];
              $scope.medicoEdit =  resp;
              // if($scope.medicoEdit.disponibilidad[0].dia == 'lunes'){
              //   $scope.medicoEdit.disponibilidad[0].dia = true;
              //   $scope.dias.lunes = true;
              // }
              var diasTest = [];
              // diasTest.fill(value[, start = 0[, end = this.length]])

              function isEven(n) {
                 return n % 2 == 0;
              };

              for(var i = 0; i < 10; i++){
                console.log('holaaa');
                if(isEven(i)){
                  diasTest.push('Hora fin')
                }else{
                  diasTest.push('Hora inicio')
                }
              };
              for(var i = 0; i < $scope.medicoEdit.disponibilidad.length; i++){
                if ($scope.medicoEdit.disponibilidad[i].dia == 'lunes'){
                   diasTest[0] = $scope.medicoEdit.disponibilidad[i].hora_inicio;
                   diasTest[1] = $scope.medicoEdit.disponibilidad[i].hora_termino;
                };
                if ($scope.medicoEdit.disponibilidad[i].dia == 'martes'){
                   diasTest[2] = $scope.medicoEdit.disponibilidad[i].hora_inicio;
                   diasTest[3] = $scope.medicoEdit.disponibilidad[i].hora_termino;
                };
                if ($scope.medicoEdit.disponibilidad[i].dia == 'miercoles'){
                   diasTest[4] = $scope.medicoEdit.disponibilidad[i].hora_inicio;
                   diasTest[5] = $scope.medicoEdit.disponibilidad[i].hora_termino;
                };
                if ($scope.medicoEdit.disponibilidad[i].dia == 'jueves'){
                   diasTest[6] = $scope.medicoEdit.disponibilidad[i].hora_inicio;
                   diasTest[7] = $scope.medicoEdit.disponibilidad[i].hora_termino;
                };
                if ($scope.medicoEdit.disponibilidad[i].dia == 'viernes'){
                   diasTest[8] = $scope.medicoEdit.disponibilidad[i].hora_inicio;
                   diasTest[9] = $scope.medicoEdit.disponibilidad[i].hora_termino;
                };

                $scope.medicoEdit.disponibilidad[i].dia
              };
              $scope.diasHolder = diasTest;
              console.log(diasTest);
                 // $scope.active = false;

            });

        };

      }
]);
