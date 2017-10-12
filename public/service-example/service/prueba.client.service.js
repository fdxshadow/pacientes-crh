angular.module('service-example').service('SharedDataService', function () {
     var sharedData = {
        rut: '',
        hora:''
    };

    return sharedData;
});
