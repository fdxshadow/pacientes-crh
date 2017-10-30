angular.module('dashboard').controller('calendar',['$scope','uiCalendarConfig','Eventos',function($scope,uiCalendarConfig,Eventos){


  $scope.show=true;

  $scope.confirmar = function(ev){
    even = {
        _id:ev.id_bd,
        accion:"confirmado"

    }
    Eventos.save({evento:even},function(resp){
      if(resp){
        ev.color = "blue";
        uiCalendarConfig.calendars.micalendario.fullCalendar('updateEvent',ev);
      }

    });
  }



  $scope.rechazar = function(ev){

    even = {
        _id:ev.id_bd,
        accion:"rechazado"

    }
    Eventos.save({evento:even},function(resp){
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
        console.log(value);
        var colore = (value.estado_reserva==='registrado')?'green':'blue';
        var aux = {
          id_bd:value._id,
          title:value.paciente_id.firstName,
          start:value.fecha_reserva+'T'+value.hora_inicio_reserva,
          end:value.fecha_reserva+'T'+value.hora_fin_reserva,
          color:colore,
          celular:value.paciente_id.telephone
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
        minTime: '8:00',
        maxTime: '16:00',
        editable: true,
        header:{
          left: 'agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
        eventClick: $scope.alertEventOnClick = function(event,jsEvent,view){
          $scope.show=false;
          $scope.datos = event;

        },
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
      }
    };






}]);
