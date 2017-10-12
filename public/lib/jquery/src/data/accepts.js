<<<<<<< HEAD:public/lib/jquery/src/data/var/acceptData.js
define( function() {
=======
define([
	"../core"
], function( jQuery ) {
>>>>>>> calendario-diario:public/lib/jquery/src/data/accepts.js

/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};

return jQuery.acceptData;
});
