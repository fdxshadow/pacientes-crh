
angular.module('reservaPaciente').controller('ReservaController'
,['$scope','$location', 'ReservaServicio','Notifier','$timeout','$localStorage', function ($scope,$location,servicio,Notifier,$timeout, $localStorage) {
$scope.$storage = $localStorage;
$scope.horarios = [];
$scope.paciente = $scope.$storage.paciente_nombre;
$scope.medico = $scope.$storage.medico_nombre;
$scope.boton = "Reservar";
//console.log($scope.$storage);
if($scope.$storage.medico_nombre==null){
    $scope.medico = " No aplica";
}
if($scope.$storage.paciente_nombre==null){
    $scope.boton = " Bloquear Horario ";
}


// las 3 lineas de abajo funcionan ############
var today = moment();
var tomorrow = moment(today).add(0, 'days');

var minDate = new Date();
$scope.dateMinLimit = tomorrow;
//de aca a 10 años
var monthsAhead = 60;
var maxDate = new Date();
maxDate.setMonth(maxDate.getMonth() + monthsAhead);
$scope.dateMaxLimit = maxDate;
// ###############
if(!$scope.$storage.examen_id){
          // $scope.what = $scope.$storage
          moment.locale("es");
          // $scope.test = moment().day('domingo');
          // var dow = $scope.test.day();
          var medicoDisp = $scope.$storage.medico_disponibilidad;
          var dias = [];
          console.log(medicoDisp);

          for (var j = 0; j<= 6; j++){
            var flag = 0;
            for (var i = 0; i<medicoDisp.length; i++){
              var dateDia = moment().day(medicoDisp[i].dia);
              var numberDia = dateDia.day();
              if (numberDia == j){
                flag = 1;
                break;
              };

            };
          if( flag ==0){
            dias.push(j);
          }
          };
};
// ##########


var disableWeekends = function(minDate, maxDate) {
        var startDate = minDate;
        // '31' is the maximum days in a month, we want not less
        var endDate = new Date(startDate.getTime() + monthsAhead*31*24*60*60*1000);
        var days = [];

        for (var iDate = new Date(startDate); iDate < endDate; iDate.setDate(iDate.getDate() + 1)) {
            // if ((iDate.getDay() == 0) || (iDate.getDay() == 6)) {
            //solo domingos
            if($scope.$storage.examen_id){//si es examen se puede pedir los sabados
              if ((iDate.getDay() == 0) ) {
                  // months are zero indexed so + 1
                  days.push(new Date(iDate.getMonth() + 1 + '/' + iDate.getDate() + '/' + iDate.getFullYear()).getTime());
              }
            }else{ // si es consulta,  depende del medico y si e
              for (var i = 0; i<dias.length; i++){
                if ((iDate.getDay() == dias[i]) ) {
                    // months are zero indexed so + 1
                    days.push(new Date(iDate.getMonth() + 1 + '/' + iDate.getDate() + '/' + iDate.getFullYear()).getTime());
                }
              }
            }


        }
        return days;
    };

$scope.datesDisabled = disableWeekends(minDate, maxDate);


var validar=/^\d{4}-\d{2}-\d{2}$/;

$scope.prueba = function(){
    if(validar.test($scope.date)){
        if($scope.$storage.examen_id){
            var med = ($scope.$storage.medico_id)?$scope.$storage.medico_id:"no";
            var disponibilidad1 = [];
            var horas = parseInt(moment($scope.$storage.examen_disponibilidad.hora_termino,"hh:mm").hours()) - parseInt(moment($scope.$storage.examen_disponibilidad.hora_inicio,"hh:mm").hours());
            var resini =moment($scope.$storage.examen_disponibilidad.hora_inicio,"hh:mm");
            var ini = $scope.$storage.examen_disponibilidad.hora_inicio;
            var min = ini.split(":")[1];
            var hour= (moment(resini).add(1,'hours').hours()<10)?"0"+moment(resini).add(1,'hours').hours():moment(resini).add(1,'hours').hours()
            var fin = hour+":"+min;
            var aux = {
                hora_ini:ini,
                hora_term:fin
            };
            disponibilidad1.push(aux);
            for (var i = 1; i<horas; i++){
                    var ino = disponibilidad1[disponibilidad1.length - 1].hora_term;
                    var resino = moment(ino,"hh:mm");
                    var houro = (moment(resino).add(1,'hours').hours()<10)?"0"+moment(resino).add(1,'hours').hours():moment(resino).add(1,'hours').hours()
                    var fino = houro+":"+min;
                    var aux1 = {
                        hora_ini:ino,
                        hora_term:fino

                    }
                    disponibilidad1.push(aux1);
            }
            servicio.get({fecha:$scope.date,medico:med,examen:$scope.$storage.examen_id},function(response){

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
        else{
            if ($scope.$storage.medico_id) {
                moment.locale("es");
                var day = moment($scope.date,"YYYY-MM-DD");
                var selectday=day.format("dddd").toLowerCase();
                angular.forEach($scope.$storage.medico_disponibilidad,function(disp,key){
                    if (disp.dia == selectday) {
                        var disponibilidad1=[];
                        var horas = parseInt(moment(disp.hora_termino,"hh:mm").hours()) - parseInt(moment(disp.hora_inicio,"hh:mm").hours());
                        var resini =moment(disp.hora_inicio,"hh:mm");
                        var ini = disp.hora_inicio;
                        var min = ini.split(":")[1];
                        var hour= (moment(resini).add(1,'hours').hours()<10)?"0"+moment(resini).add(1,'hours').hours():moment(resini).add(1,'hours').hours()
                        var fin = hour+":"+min;
                        var aux = {
                            hora_ini:ini,
                            hora_term:fin
                        };
                        disponibilidad1.push(aux);
                        for (var i = 1; i<horas; i++){
                            var ino = disponibilidad1[disponibilidad1.length - 1].hora_term;
                            var resino = moment(ino,"hh:mm");
                            var houro = (moment(resino).add(1,'hours').hours()<10)?"0"+moment(resino).add(1,'hours').hours():moment(resino).add(1,'hours').hours()
                            var fino = houro+":"+min;
                            var aux1 = {
                                hora_ini:ino,
                                hora_term:fino
                            }
                        disponibilidad1.push(aux1);
                        }
                        servicio.get({fecha:$scope.date,medico:$scope.$storage.medico_id,examen:$scope.$storage.examen_id},function(response){
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
                });
            };
        }
    }
}



$scope.reservar = function(horario){
        if($scope.$storage.examen_id){
     var reserva = {
        paciente_id: $scope.$storage.paciente_id,
        medico_id: $scope.$storage.medico_id,
        hora_inicio_reserva: horario.hora_ini,
        hora_fin_reserva: horario.hora_term,
        fecha_reserva: $scope.date,
        tipo_reserva : {tipo:'examen',descripcion:$scope.$storage.examen_id}
    };
}else{
    var reserva = {
        paciente_id: $scope.$storage.paciente_id,
        medico_id: $scope.$storage.medico_id,
        hora_inicio_reserva: horario.hora_ini,
        hora_fin_reserva: horario.hora_term,
        fecha_reserva: $scope.date
    };
}
    var c = new servicio(reserva);

    c.$save().then(function(){
        var i = $scope.horarios.indexOf(horario);
        $scope.horarios.splice(i,1);
        $scope.$storage = [];
        Notifier.notify("Reserva Realizada");

        $timeout(function() {
        // $location.path('/newValue');
        $localStorage.$reset();
        $location.url('/dashboard');

        }, 2000);
        // $location.url('/dashboard');


    },function(response){
        Notifier.error("Reserva no logro realizarse")
    }

    )
}


    /*servicio.create(reserva, function(data){
    });

    var i = $scope.horarios.indexOf(horario);
    $scope.horarios.splice(i,1);
}*/




}]);
