
angular.module('reservaPaciente').controller('ReservaController'
,['$scope', 'ReservaServicio','pacienteinfo' ,function ($scope, servicio,pacienteinfo) {

$scope.paciente = pacienteinfo.paciente_id;


$scope.crearReserva = function(){
    var reserva = {
        paciente_id: "100",
        medico_id: "800000",
        hora_inicio_reserva: "18",
        hora_fin_reserva: "19",
        fecha_reserva: '12'
    };
    servicio.create(reserva, function(data){});
}

$scope.disponibilidad4 = [{
    hora: '17:00-17:15'},{
    hora: '17:15-17:30'},{
    hora: '17:30-17:45'},{
    hora: '17:45-18:00'} ];

$scope.buscar = function () {
    if ($scope.date == "2017-09-01" && $scope.copiarmedicoseleccionado.Id=="0"){
        $scope.disponibilidad2 = $scope.disponibilidad0;
    }
    if($scope.date == "2017-09-02" && $scope.copiarmedicoseleccionado.Id=="0"){
        $scope.disponibilidad2 = $scope.disponibilidad1;    
    }
    if($scope.date == "2017-09-03" && $scope.copiarmedicoseleccionado.Id=="0"){
        $scope.disponibilidad2 = $scope.disponibilidad3;
    }
    if($scope.date == "2017-09-04" && $scope.copiarmedicoseleccionado.Id=="0"){
        $scope.disponibilidad2 = $scope.disponibilidad4;    
    }
    if ($scope.date == "2017-09-01" && $scope.copiarmedicoseleccionado.Id=="1"){
        $scope.disponibilidad2 = $scope.disponibilidad3;
    }
    if($scope.date == "2017-09-02" && $scope.copiarmedicoseleccionado.Id=="1"){
        $scope.disponibilidad2 = $scope.disponibilidad1;    
    }
    if($scope.date == "2017-09-03" && $scope.copiarmedicoseleccionado.Id=="1"){
        $scope.disponibilidad2 = $scope.disponibilidad3; 
    }
    if($scope.date == "2017-09-04" && $scope.copiarmedicoseleccionado.Id=="1"){
        $scope.disponibilidad2 = $scope.disponibilidad0;
    }
    if ($scope.date == "2017-09-01" && $scope.copiarmedicoseleccionado.Id=="2"){
        $scope.disponibilidad2 = $scope.disponibilidad0;
    }
    if($scope.date == "2017-09-02" && $scope.copiarmedicoseleccionado.Id=="2"){
        $scope.disponibilidad2 = $scope.disponibilidad3;
    }
    if($scope.date == "2017-09-03" && $scope.copiarmedicoseleccionado.Id=="2"){
        $scope.disponibilidad2 = $scope.disponibilidad1;
    }
    if($scope.date == "2017-09-04" && $scope.copiarmedicoseleccionado.Id=="2"){
        $scope.disponibilidad2 = $scope.disponibilidad4;
    }
    if ($scope.date == "2017-09-01" && $scope.copiarmedicoseleccionado.Id=="3"){
        $scope.disponibilidad2 = $scope.disponibilidad0;
    }
    if($scope.date == "2017-09-02" && $scope.copiarmedicoseleccionado.Id=="3"){
        $scope.disponibilidad2 = $scope.disponibilidad1;
    }
    if($scope.date == "2017-09-03" && $scope.copiarmedicoseleccionado.Id=="3"){
        $scope.disponibilidad2 = $scope.disponibilidad4;
    }
    if($scope.date == "2017-09-04" && $scope.copiarmedicoseleccionado.Id=="3"){
        $scope.disponibilidad2 = $scope.disponibilidad0;
    }
    $scope.remove = function(disponibilidad) {
        $scope.disponibilidad2.splice($scope.disponibilidad2.indexOf(disponibilidad), 1);
    }
};
}]);

