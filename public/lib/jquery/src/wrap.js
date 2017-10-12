define([
	"./core",
	"./core/init",
	"./manipulation", // clone
	"./traversing" // parent, contents
], function( jQuery ) {

<<<<<<< HEAD
jQuery.fn.extend( {
=======
jQuery.fn.extend({
>>>>>>> calendario-diario
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
<<<<<<< HEAD
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
=======
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
>>>>>>> calendario-diario
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
<<<<<<< HEAD
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
=======
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
>>>>>>> calendario-diario
	}
});

return jQuery;
});
