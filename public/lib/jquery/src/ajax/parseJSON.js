<<<<<<< HEAD
define( [
=======
define([
>>>>>>> calendario-diario
	"../core"
], function( jQuery ) {

// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};

return jQuery.parseJSON;

<<<<<<< HEAD
} );
=======
});
>>>>>>> calendario-diario
