angular.module('reservaPaciente').controller('ReservaController'
,[  '$scope', 
    'ReservaServicio',
    'pacienteinfo', 
    function($scope, servicio, pacienteinfo){
        $scope.paciente = pacienteinfo.paciente_nombre;
        $scope.medico = pacienteinfo.medico_nombre;
        //console.log(pacienteinfo);
        if(pacienteinfo.medico_nombre==null){
            $scope.medico = " No aplica";
        }
        var disponibilidad1 = [];
        if(pacienteinfo.examen_id){
            var horas = parseInt(moment(pacienteinfo.examen_disponibilidad.hora_termino,"HH:mm").hours()) - 
                parseInt(moment(pacienteinfo.examen_disponibilidad.hora_inicio,"HH:mm").hours())
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
        // las 3 lineas de abajo funcionan ############
        var today = moment();
        var tomorrow = moment(today).add(1, 'days');
        var minDate = new Date();
        $scope.dateMinLimit = tomorrow;
        //de aca a 10 años
        var monthsAhead = 120;
        var maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + monthsAhead);
        $scope.dateMaxLimit = maxDate;
        var disableWeekends = function(minDate, maxDate) {
            var startDate = minDate;
            // '31' is the maximum days in a month, we want not less
            var endDate = new Date(startDate.getTime() + monthsAhead*31*24*60*60*1000);
            var days = [];
            for (var iDate = new Date(startDate); iDate < endDate; iDate.setDate(iDate.getDate() + 1)) {
                // if ((iDate.getDay() == 0) || (iDate.getDay() == 6)) {
                    //solo domingos
                    if(pacienteinfo.examen_id){
                        //si es examen se puede pedir los sabados
                        if ((iDate.getDay() == 0) ) {
                            // months are zero indexed so + 1
                            days.push(new Date(iDate.getMonth() + 1 + '/' + iDate.getDate() + '/' + 
                                iDate.getFullYear()).getTime());
                        }
                    }else{ // si es consulta, solo de lunes a viernes
                        if((iDate.getDay() == 0) || (iDate.getDay() == 6)) {
                            // months are zero indexed so + 1                            
                            days.push(new Date(iDate.getMonth() + 1 + '/' + iDate.getDate() + '/' + 
                                iDate.getFullYear()).getTime());
                        }
                    }
                }
                return days;
            }
            $scope.datesDisabled = disableWeekends(minDate, maxDate);
    //var ini = pacienteinfo.examen_disponibilidad.hora_inicio;
    //var res = moment("9.45","HH:mm");
    //console.log(res.add(1,'hours').hours()+":"+res.get("minute"));



    //console.log(disponibilidad1);

        var validar=/^\d{4}-\d{2}-\d{2}$/;
        console.log(pacienteinfo.medico_nombre);
        $scope.prueba = function(){
            if(validar.test($scope.date)){
                servicio.get({
                    fecha:$scope.date,
                    medico:pacienteinfo.medico_id,
                    examen:pacienteinfo.examen_id
                },function(response){
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
                console.log(reserva);
            } else if(pacienteinfo == null){
                var reserva = {
                    paciente_id: pacienteinfo.paciente_id,
                    medico_id: pacienteinfo.medico_id,
                    hora_inicio_reserva: horario.hora_ini,
                    hora_fin_reserva: horario.hora_term,
                    fecha_reserva: $scope.date,
                    bloqueo_reserva: "bloqueo"
                };
                console.log(reserva);
            }else{
                var reserva = {
                    paciente_id: pacienteinfo.paciente_id,
                    medico_id: pacienteinfo.medico_id,
                    hora_inicio_reserva: horario.hora_ini,
                    hora_fin_reserva: horario.hora_term,
                    fecha_reserva: $scope.date
                };
                console.log(reserva);
            }
            servicio.create(reserva, function(data){
                if(data=="t"){
                    console.log("hola");
                }
            });
            $scope.horarios.splice(horario,1);
        }
    }]);
