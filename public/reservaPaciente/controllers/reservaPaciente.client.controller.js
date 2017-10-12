
angular.module('reservaPaciente').controller('ReservaController'
,['$scope', 'ReservaServicio','pacienteinfo' ,function ($scope, servicio, pacienteinfo) {

$scope.paciente = pacienteinfo.paciente_id;
$scope.medico = pacienteinfo.medico_id;
var validar=/^\d{4}-\d{2}-\d{2}$/;

$scope.prueba = function(){    
if(validar.test($scope.date)){
    servicio.get({fecha:$scope.date},function(response){
        var disponibilidad = [{
                        hora_ini: '17:00',
                        hora_term:'18:15'}
                        ,{
                        hora_ini: '18:15',
                        hora_term:'19:30'}
                        ];
        angular.forEach(response,function(value,key){
            if(value.hora_inicio_reserva == disponibilidad[key].hora_ini){
                "hola"
                disponibilidad.splice(key,1);
            }
        });

        $scope.horarios = disponibilidad;
    });  
}  
 else {

    $scope.horarios = {};

 }   
}


$scope.reservar = function(horario){
     var reserva = {
        paciente_id: pacienteinfo.paciente_id,
        medico_id: pacienteinfo.medico_id,
        hora_inicio_reserva: horario.hora_ini,
        hora_fin_reserva: horario.hora_term,
        fecha_reserva: $scope.date
    };
    servicio.create(reserva, function(data){});
}



}]);

