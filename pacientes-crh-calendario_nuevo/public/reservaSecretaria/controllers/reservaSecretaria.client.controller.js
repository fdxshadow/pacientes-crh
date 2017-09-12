//angular.module('example').controller('ExampleController',['$scope','prueba',function ($scope,prueba) {
//$scope.name = prueba.mensaje;

//}])


angular.module('reservaSecretaria').controller('reservaSecretariaController'
,['$scope',function ($scope) {

$scope.eventSources = [];


/* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'month basicWeek basicDay agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
        eventClick: $scope.alertEventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
      }

  }

}]);

angular.module('mwl.calendar.docs').controller('TimespanClickCtrl', function(moment) {

    var vm = this;

    vm.events = [];
    vm.calendarView = 'month';
    vm.viewDate = moment().startOf('month').toDate();

    vm.timespanClicked = function(date) {
      vm.lastDateClicked = date;
    };

  });
