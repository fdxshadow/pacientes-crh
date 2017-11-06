
angular.module('reservaPaciente').controller('ReservaController'
,['$scope', 'ReservaServicio','pacienteinfo', function ($scope, servicio, pacienteinfo) {

$scope.horarios = [];
$scope.paciente = pacienteinfo.paciente_nombre;
$scope.medico = pacienteinfo.medico_nombre;
//console.log(pacienteinfo);
if(pacienteinfo.medico_nombre==null){
    $scope.medico = " No aplica";
}




var validar=/^\d{4}-\d{2}-\d{2}$/;

$scope.prueba = function(){
    if(validar.test($scope.date)){
        if(pacienteinfo.examen_id){
            var med = (pacienteinfo.medico_id)?pacienteinfo.medico_id:"no";
            servicio.get({fecha:$scope.date,medico:med,examen:pacienteinfo.examen_id},function(response){
                var disponibilidad1 = [];            
                    var horas = parseInt(moment(pacienteinfo.examen_disponibilidad.hora_termino,"HH:mm").hours()) - parseInt(moment(pacienteinfo.examen_disponibilidad.hora_inicio,"HH:mm").hours())
                    var resini =moment(pacienteinfo.examen_disponibilidad.hora_inicio,"HH:mm");
                    var ini = pacienteinfo.examen_disponibilidad.hora_inicio;
                    var min = ini.split(":")[1];
                    var fin = moment(resini).add(1,'hours').hours()+":"+min;
                    var aux = {
                        hora_ini:ini,
                        hora_term:fin
                        };
                    disponibilidad1.push(aux);
                    for (var i = 1; i<horas; i++){
                        var ino = disponibilidad1[disponibilidad1.length - 1].hora_term; 
                        var resino = moment(ino,"HH:mm");
                        var fino = moment(resino).add(1,'hours').hours()+":"+min;

                        var aux1 = {
                            hora_ini:ino,
                            hora_term:fino

                        }
                        disponibilidad1.push(aux1);
                    }
                console.log("esta son las reservas",response);
                angular.forEach(response,function(reserva,key){
                    angular.forEach(disponibilidad1,function(horario,key){
                        if(reserva.hora_inicio_reserva==horario.hora_ini){
                            disponibilidad1.splice(disponibilidad1.indexOf(horario),1);
                        }
                    });
                });
                $scope.horarios=disponibilidad1;
            
            });
        }
    }
}



$scope.reservar = function(horario){
        if(pacienteinfo.examen_id){
     var reserva = {
        paciente_id: pacienteinfo.paciente_id,
        medico_id: pacienteinfo.medico_id,
        hora_inicio_reserva: horario.hora_ini,
        hora_fin_reserva: horario.hora_term,
        fecha_reserva: $scope.date,
        tipo_reserva : {tipo:'examen',descripcion:pacienteinfo.examen_id}
    };
}else{
    var reserva = {
        paciente_id: pacienteinfo.paciente_id,
        medico_id: pacienteinfo.medico_id,
        hora_inicio_reserva: horario.hora_ini,
        hora_fin_reserva: horario.hora_term,
        fecha_reserva: $scope.date
    };
}

    servicio.create(reserva, function(data){
    });

    var i = $scope.horarios.indexOf(horario);
    $scope.horarios.splice(i,1);
}



}]);

