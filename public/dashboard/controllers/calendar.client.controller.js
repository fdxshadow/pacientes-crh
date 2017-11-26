angular.module('dashboard').controller('calendar',
  ['$scope',
  'uiCalendarConfig',
  'Eventos',
  function($scope,uiCalendarConfig,Eventos){
    $scope.show=true;
    $scope.confirmar = function(ev){
      even = {
        _id:ev.id_bd,
        accion:"confirmado"
      }
      Eventos.save({evento:even},
        function(resp){
          if(resp){
            ev.color = "green";
            uiCalendarConfig.calendars.micalendario.fullCalendar('updateEvent',ev);
          }
        });
    }
    $scope.rechazar = function(ev){
      even = {
        _id:ev.id_bd,
        accion:"rechazado"
      }
      Eventos.save({evento:even},
        function(resp){
          if(resp){
            uiCalendarConfig.calendars.micalendario.fullCalendar('removeEvents',ev._id);
          }
        });
    }
    $scope.eventSources=[]
    $scope.events=[]
    var cargar = function(){
      Eventos.query(function(data){
        angular.forEach(data,function(value,key){
          //console.log(value);
          // Muestra reserva de bloqueo de medicos
          if(value.paciente_id==null){
            var aux = {
              id_bd:    value._id,
              title:    'Bloqueo: '+value.medico_id.nombre,
              start:    value.fecha_reserva+'T'+value.hora_inicio_reserva,
              end:      value.fecha_reserva+'T'+value.hora_fin_reserva,
              color:    'red',
              tipo:     'Bloqueo de Horario',
              fecha:    value.fecha_reserva,
              horario:  value.hora_inicio_reserva+' - '+value.hora_fin_reserva,
              botonA:    "Cancelar Bloqueo",
              view:      "display: none;"
              //celular:value.paciente_id.telephone
            }
          }else{
            var colore  = (value.estado_reserva==='registrado')?'blue':'green';
            var medic   = (value.medico_id===null)?'No Aplica':value.medico_id.nombre;
            var tipe    = (value.tipo_reserva.tipo==='consulta médica')?
                                value.tipo_reserva.tipo:value.tipo_reserva.tipo +
                                ' : '+value.tipo_reserva.descripcion.nombre;
            var aux = {
              id_bd:    value._id,
              title:    'Paciente: '+value.paciente_id.firstName,
              start:    value.fecha_reserva+'T'+value.hora_inicio_reserva,
              end:      value.fecha_reserva+'T'+value.hora_fin_reserva,
              color:     colore,
              celular:  'Telefono : '+value.paciente_id.telephone,
              tipo:     tipe,
              horario:  value.hora_inicio_reserva+' - '+value.hora_fin_reserva,
              medico:   'Medico : '+medic,
              botonA:    "Rechazar",
              botonB:    "Confirmar",
            }
          }
          $scope.events.push(aux);
        });
        $scope.eventSources.push($scope.events);
      });
    }
    cargar();
    $scope.uiConfig = {
      calendar:{
        height: 400,
        allDaySlot: false,
        minTime: '08:00',
        maxTime: '20:00',
        editable: true,
        header:{
          left: 'agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
          },
        eventClick: $scope.alertEventOnClick = function(event,jsEvent,view){
          console.log(event);
          $scope.show=false;
          $scope.datos = event;
          },
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
      }
    };
  }
  ]);
