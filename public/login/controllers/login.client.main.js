angular.module('mainController', ['mainServices'])


    .controller('mainCtrl', function (Auth, AuthToken, $scope, $timeout, $location, $window) {
        var app = this;

        $scope.auth = Auth;

        var parseTOKEN = function parseJwt(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
        };

        if (Auth.isLoggedIn()) {
            
            $scope.userName = (parseTOKEN(AuthToken.getToken()).username);
        } else {
            console.log('no hay nadie');
        }
        this.doLogin = function (loginData) {
            app.loading = true;
            app.errorMsg = false;

            Auth.login(app.loginData).then(function (data) {

                if (data.data.success) {
                    app.loading = false;
                    app.successMsg = data.data.message + '...Redireccionando...';
                    $timeout(function () {
                        $location.path('/dashboard');
                    }, 2000);
                } else {
                    app.loading = false;
                    app.errorMsg = data.data.message
                }
            });
        };

        this.logout = function () {
            Auth.logout();
            $location.path('/logout');
            $timeout(function () {
                $location.path('/login');
            }, 2000);
        };
    });