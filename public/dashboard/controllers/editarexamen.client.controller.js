'use strict';

angular.module('dashboard').controller('ExamenesControllerEdit', function($scope, Examen, Notifier, $location, ExamenesSrv, $routeParams) {
    $scope.examen = Examen.get({
        _id: $routeParams._id
    });

    $scope.guardar = function() {
        $scope.examen.horario = {hora_inicio:moment(this.hora_inicio,"HH:mm").format("HH:mm"),
          hora_termino:moment(this.hora_termino,"HH:mm").format("HH:mm")};
        var updatedExamenData = $scope.examen;
        if(updatedExamenData.horario.hora_inicio=="Invalid date" || updatedExamenData.horario.hora_termino=="Invalid date"){
            Notifier.error('Debe volver a seleccionar el horario!');
            Notifier.error(reason);
        }
        ExamenesSrv.funcionExamen(updatedExamenData, updatedExamenData.$update()).then(function() {
            Notifier.notify('Examen Editado Exitosamente!');
            $location.path('/examen');
        }, function(reason) {
            Notifier.error(reason);
        });
    };
});
