# Sistema Pacientes - Clínica de Reproducción Humana de la Facultad de Medicina de la Universidad de Valparaíso

Sistema para automatizar el ingreso de pacientes, la toma de horas y exámenes para los pacientes y 
generar reportes sobre los aspectos de reserva para apoyar la labor administrativa.

## Inicio

Estas instrucciones le permitirán obtener una copia del proyecto en funcionamiento en su máquina 
local para fines de produccion. Acontinuacion le precentaremos la implementación para obtener notas sobre 
cómo implementar el proyecto en un sistema en vivo.

### Requisitos previos

Para poder instalar la aplicación en su maquina local, necesita tener docker el cual le permitira crear 
contenedores ligeros y portables para las aplicaciónes software que puedan ejecutarse en cualquier máquina 
con Docker previamnete instalado, independientemente del sistema operativo que la máquina tenga por debajo, facilitando 
así también los despliegues.

La informacion para instalar Docker en su maquina local, lo puede consultar en [docs.docker.com/](https://docs.docker.com/engine/installation/) - Install Docker

## Instalacion de aplicación

Para poder cargar la aplicación en su maquina local, necesita. 

Instalar el motor de base de datos MongoDB a través de docker:

```
$ docker pull mongo
```
Luego se procedemos a dominisar nuestra imangen de mongo por medio de:

```
$ docker run -p 27017:27017 -d --name db mongo
```
### Comando de utilidad para docker y MongoDB:
Para obtener el host donde corre mongo, hay que hacer lo siguiente:

```
$ docker ps 
```
Esto entregara la lista de los contenedores corriendo, y tomamos el ID donde esta corriendo MongoDB.
```
$ docker inspect <id donde corre mongo>
```
Y en el apartado donde dice network buscarmos ip address.

Luego para instalar la nuestra aplicación: 
```
$ docker pull <link del repositorio>  
```
y para finalizar arrancamos nuestra aplicación en docker con el comando: 
```
$ sudo docker run -p 3000:3000 -e dbhost=<host donde corre la bd>  --name mean --link db:db <nombre de la imagen> 
```



## Tecnologias utilizadas

* [Git](https://git-scm.com/downloads)
* [MongoDB](https://www.mongodb.org/downloads)
* [Node 6.x](https://nodejs.org/en/download/)
* npm 3.x ( or yarn)

> MEAN <sup> 2 </ sup> solo es compatible con Node 6.xo versiones superiores.


## Autores

* **ALFONSO OSCAR VARGAS**
* **FRANCISCO IGNACIO PEÑA**
* **ELIAS**
* **CLAUDIO ANTONIO ARAYA**
* **CARLOS FERNANDO TAPIA**
* **JUAN CARLOS TAPIA**

## Licencia

This project is licensed under the Creative Commons License - see the [creative commons](https://creativecommons.org/licenses/by/4.0/) file for details
