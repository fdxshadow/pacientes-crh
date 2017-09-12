//angular.module('example').controller('ExampleController',['$scope','prueba',function ($scope,prueba) {
//$scope.name = prueba.mensaje;

//}])


angular.module('reservaPaciente').controller('reservaPacienteController'
,['$scope', function ($scope) {

//$scope.visibility= true;


$scope.medico = [{
                 nombreMedico: "Agusto perez",
                 Id: 0
                 },
                 {
                     nombreMedico: "raul sanchez",
                   Id: 1
                 }, 
                {
                    nombreMedico: "dania rubio",
                  Id: 2
            }];
            
            $scope.copiarmedicoseleccionado = $scope.medico[1];


$scope.disponibilidad0 = [{
hora: '8:00-8:15'
}];

$scope.disponibilidad1 = [{
hora: '9:00-9:15'
}, {
hora: '9:45-10:00'
}];

$scope.disponibilidad3 = [{
hora: '11:00-11:15'
},{
hora: '12:15-12:30'
},{
hora: '20:15-20:30'
}];



$scope.disponibilidad4 = [{
hora: '17:00-17:15'
}, {
hora: '17:15-17:30'
}, {
hora: '17:30-17:45'
}, {
hora: '17:45-18:00'
}];


$scope.buscar = function () {
    


    if ($scope.date == "2017-09-01" && $scope.copiarmedicoseleccionado.Id=="0"){
$scope.disponibilidad2 = $scope.disponibilidad0;
    }
   if($scope.date == "2017-09-02" && $scope.copiarmedicoseleccionado.Id=="0"){
 $scope.disponibilidad2 = $scope.disponibilidad1;
        
    }
     if($scope.date == "2017-09-03" && $scope.copiarmedicoseleccionado.Id=="0"){
 $scope.disponibilidad2 = $scope.disponibilidad3;
        
    }
    if($scope.date == "2017-09-04" && $scope.copiarmedicoseleccionado.Id=="0"){
 $scope.disponibilidad2 = $scope.disponibilidad4;
        
    }





     if ($scope.date == "2017-09-01" && $scope.copiarmedicoseleccionado.Id=="1"){
$scope.disponibilidad2 = $scope.disponibilidad3;
    }
   if($scope.date == "2017-09-02" && $scope.copiarmedicoseleccionado.Id=="1"){
 $scope.disponibilidad2 = $scope.disponibilidad1;
        
    }
     if($scope.date == "2017-09-03" && $scope.copiarmedicoseleccionado.Id=="1"){
 $scope.disponibilidad2 = $scope.disponibilidad3;
        
    }
    if($scope.date == "2017-09-04" && $scope.copiarmedicoseleccionado.Id=="1"){
 $scope.disponibilidad2 = $scope.disponibilidad0;
        
    }




     if ($scope.date == "2017-09-01" && $scope.copiarmedicoseleccionado.Id=="2"){
$scope.disponibilidad2 = $scope.disponibilidad0;
    }
   if($scope.date == "2017-09-02" && $scope.copiarmedicoseleccionado.Id=="2"){
 $scope.disponibilidad2 = $scope.disponibilidad3;
        
    }
     if($scope.date == "2017-09-03" && $scope.copiarmedicoseleccionado.Id=="2"){
 $scope.disponibilidad2 = $scope.disponibilidad1;
        
    }
    if($scope.date == "2017-09-04" && $scope.copiarmedicoseleccionado.Id=="2"){
 $scope.disponibilidad2 = $scope.disponibilidad4;
        
    }





     if ($scope.date == "2017-09-01" && $scope.copiarmedicoseleccionado.Id=="3"){
$scope.disponibilidad2 = $scope.disponibilidad0;
    }
   if($scope.date == "2017-09-02" && $scope.copiarmedicoseleccionado.Id=="3"){
 $scope.disponibilidad2 = $scope.disponibilidad1;
        
    }
     if($scope.date == "2017-09-03" && $scope.copiarmedicoseleccionado.Id=="3"){
 $scope.disponibilidad2 = $scope.disponibilidad4;
        
    }
    if($scope.date == "2017-09-04" && $scope.copiarmedicoseleccionado.Id=="3"){
 $scope.disponibilidad2 = $scope.disponibilidad0;
        
    }

$scope.remove = function(disponibilidad) {
$scope.disponibilidad2.splice($scope.disponibilidad2.indexOf(disponibilidad), 1);
}



};



}]);

