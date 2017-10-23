angular.module('dashboard').controller('calendar',['$scope','uiCalendarConfig','Eventos',function($scope,uiCalendarConfig,Eventos){


  $scope.show=true;

  $scope.confirmar = function(datos){

    datos.color = "blue";

    uiCalendarConfig.calendars.micalendario.fullCalendar('updateEvent',datos);//modifica el calendario al instante , con esto podemos manejar los colores para ver los estados de cada consulta

  }

  $scope.rechazar = function(datos){
    console.log(datos);

    uiCalendarConfig.calendars.micalendario.fullCalendar('removeEvents',datos._id);
  }


  $scope.eventSources=[]
  $scope.events=[]

  var pico = function(){

    Eventos.query(function(data){
      console.log(data);
      angular.forEach(data,function(value,key){
        console.log(value);
        var colore = (value.estado==='registrado')?'blue':'green';
        var aux = {
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

  pico();


	$scope.uiConfig = {
      calendar:{
        height: 400,
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
