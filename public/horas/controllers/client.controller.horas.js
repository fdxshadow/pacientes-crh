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
        $scope.create = function() {
            // Usar los campos form para crear un nuevo objeto $resource hora
            var hora = new HorasResource({
                nombre: this.nombre,
                // moment(item.date,"DD/MM/YYYY").year()
                // fecha: this.momentDate.toString(),
                fecha:   moment(this.momentDate,"YYYY-MM-DD").format("YYYY-MM-DD"),
                // format("hh:mm:ss a")
                hora_inicio: moment(this.momentTimerInicioDate,"hh:mm").format("hh:mm"),
                // hora_inicio: this.momentTimerDate,
                hora_final: moment(this.momentTimerFinalDate,"hh:mm").format("hh:mm"),
                id_medico: this.medicoSelec._id,
                id_paciente: this.pacienteSelec._id

            });

            // Usar el método '$save' de hora para enviar una petición POST apropiada
            hora.$save(function(response) {
//                NuevoIngresoService.hora = response;
                $scope.$storage.hora = response;
                // Si un hora fue creado de modo correcto, redireccionar al usuario a la página del hora
                $location.path('/tipohora');
            }, function(errorResponse) {
                // En otro caso, presentar al usuario el mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

        // retorna lista de horas segun fecha y id_medico


        $scope.findHoras = function(){
            $scope.horasFiltro = $scope.findHoras_byFechaMedico($scope.$storage.fechaAgenda,$scope.$storage.medicoAgenda._id);
            // $scope.horaini="18:15";
            // $scope.horasFiltro = $scope.findHoras_byFechaMedico($scope.$storage.fechaAgenda,$scope.horaini);
        };
        $scope.findHoras_byFechaMedico = function(_fecha, _id_medico) {
            return HorasResource.query({
              buscarFecha: _fecha,
              nombreMedico: _id_medico
            });
        };

        $scope.findpaciente = function(){
            $scope.pacienteprueba = $scope.findHoras_pacienteTest($scope.$storage.medicoAgenda._id);
        };
        $scope.find_pacienteTest = function(_id) {
            // Usar el método 'query' de ingreso para enviar una petición GET apropiada
            $scope.pacientetest = PacienteResource.query(
                {pacienteId: _id}
            );
        };





        //lista de todas las horas
        $scope.find = function() {
            // Usar el método 'query' de paciente para enviar una petición GET apropiada
            $scope.horas = HorasResource.query();
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
