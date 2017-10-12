define([
	"../core",
	"../selector",
	"../effects"
], function( jQuery ) {

jQuery.expr.filters.animated = function( elem ) {
<<<<<<< HEAD
	return jQuery.grep( jQuery.timers, function( fn ) {
=======
	return jQuery.grep(jQuery.timers, function( fn ) {
>>>>>>> calendario-diario
		return elem === fn.elem;
	}).length;
};

});
