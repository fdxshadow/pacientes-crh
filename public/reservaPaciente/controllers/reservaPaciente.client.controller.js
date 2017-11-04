
angular.module('reservaPaciente').controller('ReservaController'
,['$scope', 'ReservaServicio','pacienteinfo', function ($scope, servicio, pacienteinfo) {

$scope.paciente = pacienteinfo.paciente_nombre;
$scope.medico = pacienteinfo.medico_nombre;
//console.log(pacienteinfo);
if(pacienteinfo.medico_nombre==null){
    $scope.medico = " No aplica";
}


var disponibilidad1 = [];

if(pacienteinfo.examen_id){
    var horas = parseInt(moment(pacienteinfo.examen_disponibilidad.hora_termino,"HH:mm").hours()) - parseInt(moment(pacienteinfo.examen_disponibilidad.hora_inicio,"HH:mm").hours())
    var resini =moment(pacienteinfo.examen_disponibilidad.hora_inicio,"HH:mm");
    var ini = pacienteinfo.examen_disponibilidad.hora_inicio;
    var fin = moment(resini).add(1,'hours').hours()+":"+resini.get("minute");
    var aux = {
        hora_ini:ini,
        hora_term:fin
        }
    disponibilidad1.push(aux);
    console.log(disponibilidad1);
   for (var i = 1; i<horas; i++) {
        var ino = aux.hora_term;
        var resino = moment(ini,"HH:mm");
        var fino = moment(resini).add(1,'hours').hours()+":"+resini.get("minute");

        var aux1 = {
            hora_ini:ino,
            hora_term:fino

        }
        disponibilidad1.push(aux1);
    }
}

//var ini = pacienteinfo.examen_disponibilidad.hora_inicio;
//var res = moment("9.45","HH:mm");
//console.log(res.add(1,'hours').hours()+":"+res.get("minute"));



//console.log(disponibilidad1);








var validar=/^\d{4}-\d{2}-\d{2}$/;

console.log(pacienteinfo.medico_nombre);


$scope.prueba = function(){
    if(validar.test($scope.date)){
        servicio.get({fecha:$scope.date,medico:pacienteinfo.medico_id,examen:pacienteinfo.examen_id},function(response){
            var disponibilidad = [{
                        hora_ini: '17:00',
                        hora_term:'18:15'}
                        ,{
                        hora_ini: '18:15',
                        hora_term:'19:30'}
                        ];
            if(response.length==1){
                angular.forEach(response,function(value,key){
                    if(value.hora_inicio_reserva == disponibilidad[key].hora_ini){
                        disponibilidad.splice(key,1);
                    }
                });
                $scope.horarios = disponibilidad;
            }else{
                if (response.length==2) {$scope.horarios={};}
                if(response.length==0){$scope.horarios=disponibilidad;}
            }          
        });


    }else {
        $scope.horarios = {};

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
        if(data=="t"){
            console.log("hola");

        }



    });
    $scope.horarios.splice(horario,1);
}



}]);

