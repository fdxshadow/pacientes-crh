(function () {
'use strict';
angular.module('dashboard').service('ExamenesSrv', function ($q, Examen) {
    this.funcionExamen = function(newExamenData, accion){
        //var newPaciente = new Paciente(newPacienteData);
        var dfd = $q.defer();


        accion.then(function () {
            dfd.resolve();
        }, function (response) {
            dfd.reject(response.data.reason);
        });
        return dfd.promise;
    };
});
})();


(function () {
angular.module('dashboard').factory('Examen', function ($resource) {
    var ExamenResource = $resource('/edit/examen/:_id',
        {_id: "@id"},
        {update: { method: 'PUT'}
        });

    return ExamenResource;
});
})();