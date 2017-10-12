angular.module('mainController',['mainServices'])


.controller('mainCtrl',function(Auth,$timeout,$location){
	var app = this;

	if(Auth.isLoggedIn()){
		console.log('maldito logeao');
	}else{
		console.log('no hay nadie');
	}

	this.doLogin = function(loginData){
		app.loading = true;
		app.errorMsg = false;

		Auth.login(app.loginData).then(function(data){

			if(data.data.success){
				app.loading = false;
				app.successMsg = data.data.message + '...Redireccionando...';
				$timeout(function(){
					$location.path('/');
				},2000);
			}else{
				app.loading = false;
				app.errorMsg = data.data.message
			}
		});
	};

	this.logout = function(){
		Auth.logout();
		$location.path('/logout');
		$timeout(function(){
			$location.path('/login');
		},2000);
	};
});