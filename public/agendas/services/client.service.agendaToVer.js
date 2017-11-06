// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'agendas'
angular.module('agendas').factory('items', function($q) {

  return {
  sharedObject: {
    value: new Array(),
    value2: new Array()
  }
};





    // var items = [];
    // var itemsService = {};
    //
    // var defered = $q.defer();
    // var promise = defered.promise;
    //
    // itemsService.add = function(item) {
    //     items.push(item);
    // };
    // itemsService.list = function() {
    //   defered.resolve(items)
		// 	// var defered = $q.defer();
    //   // var promise = defered.promise;
    //     // return items;
    // };
    //
    // return itemsService;
});
