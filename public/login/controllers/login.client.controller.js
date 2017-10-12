angular.module('userController',['userServices'])


.controller('regCtrl',function($http,$location,$timeout,User){

	var app=this;

	this.regUser = function(regData){
		app.loading=true;
		app.errorMsg=false;

		console.log('formulario enviado');
		console.log(this.regData);
		
		User.create(app.regData).then(function(data){//Imprimir usuarios en la base de datos
		
			if(data.data.success){
				app.loading=false;
				app.successMsg = data.data.message+' ...Redireccionando...';
				$timeout(function(){
					$location.path('/dashboard');
				},2000);
			}else{
				app.loading=false;			
				app.errorMsg = data.data.message;
			}
		});
	};
});