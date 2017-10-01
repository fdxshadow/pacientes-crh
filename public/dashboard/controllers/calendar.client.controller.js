angular.module('dashboard').controller('calendar',['$scope', '$http', 'uiCalendarConfig',function($scope,$http,uiCalendarConfig){


  $scope.show=true;


  

  $scope.probar = function(datos){

    datos.title = "algo";
    uiCalendarConfig.calendars.micalendario.fullCalendar('updateEvent',datos);//modifica el calendario al instante , con esto podemos manejar los colores para ver los estados de cada consulta

  }


  


  $scope.eventSources = [
         {
            events: [ // put the array in the `events` property
                {
                    title  : 'Francisco Peña',
                    start  : '2017-10-01',
                    celular :'99647326',
                    tipo:'examen de sangre'    
                },
                {
                    title  : 'Fabian Cristobal',
                    start  : '2017-10-05',
                    end    : '2017-10-07',
                    celular:'8832456',
                    tipo: 'consulta'
                },
                {
                    title  : 'Felipe Montalba',
                    start  : '2017-10-09T12:30:00',
                    celular:'93450005',
                    tipo:'consulta'
                }
            ],
            color: 'blue',     // an option!
            textColor: 'white' // an option!
        }
      
    ]


	$scope.uiConfig = {
      calendar:{
        height: 400,
        editable: true,
        header:{
          left: 'month basicWeek basicDay agendaWeek agendaDay',
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