angular.module('pacientes').value('clToastr', toastr);

angular.module('pacientes').factory('Notifier', function(clToastr){
    return {
        notify: function(msg){
            clToastr.success(msg);
            console.log(msg);
        },
        error: function(msg) {
            clToastr.error(msg);
            console.log(msg);
        }

    }
})