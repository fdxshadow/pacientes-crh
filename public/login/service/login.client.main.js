angular.module('mainServices',[])

.factory('Auth', function($http,AuthToken) {
    return {
        login: function (loginData) {
            return $http.post('/authenticate', loginData).then(function (data) {
                AuthToken.setToken(data.data.token);
                return data;
            });
        },
        isLoggedIn: function(){
            return AuthToken.getToken();
        },
        logout: function(){
            AuthToken.setToken();
        }
    }
})

.factory('AuthToken',function($window){
    return {
        setToken: function(token){
            if(token){
                $window.localStorage.setItem('token',token);
            }else{
                $window.localStorage.removeItem('token');
            }
        },
        getToken: function(){
            return $window.localStorage.getItem('token');
        }
    }
});