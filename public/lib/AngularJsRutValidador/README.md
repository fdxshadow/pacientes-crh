#AngularJsRutValidador
Librería de AngularJs para validar ruts chilenos.

## Demo
https://jsfiddle.net/fasme/fhLn78oh/

## Instalación
Ejecutar la siguiente línea de comandos en la ruta de tu pryecto.
```
bower install AnguarJsRutValidador

```
Luego que la librería se termine de descargar, se debe incluir la librería, esto re realiza agregando 'RutValidador' al angular.module, que generalmente esta ubicado en un arhcivo llamado app.js.

```
angular.module('starter', ['ionic', 'starter.controllers','ionic.contrib.drawer','RutValidador'])

```

## Funcionamiento
Una vez instalada la librería se debe incluir el siguiente input, en el cual se debe crear una variable mediante ng-model llamada rutValido, esta servirá para poder almacenar y formatear el rut ingresado por el ususario.

```
<input type="text" ng-model="rutValido">

```
Luego se debe colocar una etiqueta <rut> , la cual desplegará un mensaje diciendo si el rut es válido o no.
```
<rut ng-model="rutValido"></rut>

```
La implementacion final debería quedar de la siguiente forma
```
<input type="text" ng-model="rutValido">
<rut ng-model="rutValido"></rut>

```
## Configuración
En esta librería se puede modificar le texto de los mensajes de rut válido o o inválido, eso se hace en los controladores (controllers), el siguiente ejemplo mustra cómo se modifican los mensajes. Lo primero es incluir el servicio en el controller, esto es agregando '$RutValidador', luego para cambiar los mensajes se tiene que llamar una función del servicio 'textoValidacion', que recibe como parametro un arreglo asociativo el cual modifica el mensaje.

Nota: el texto 'si' y 'no', no se deben cambiar, sólo se cambia el mensaje.
```
.controller('ejemploCtrl', function($scope,$RutValidador) {
  $RutValidador.textoValidacion({
    'si': 'mensaje rut valido personalizado',
    'no': 'mensaje rut no valido personalizado'
  });
})

```


