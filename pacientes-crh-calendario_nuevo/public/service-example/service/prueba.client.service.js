angular.module('service-example').factory('prueba',[
	function(){
		this.mensaje = window.huaso;

		return {
			mensaje:this.mensaje
		};
	}]);