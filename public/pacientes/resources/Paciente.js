angular.module('pacientes').factory('Paciente', function ($resource) {
    var PacienteResource = $resource('/api/pacientes/:_id',{_id: "@id"},
        {
            'update': { method:'PUT' }
        });


    return PacienteResource;
})