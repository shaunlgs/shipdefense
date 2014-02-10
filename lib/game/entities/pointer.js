ig.module(
	'game.entities.pointer'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityPointer = ig.Entity.extend({
		size: {x: 1, y: 1},
		type: ig.Entity.TYPE.B,
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			ig.input.initMouse();
			ig.input.bind( ig.KEY.MOUSE1, 'click' );
		},

		update: function() {
			this.parent();	
			this.pos.x = ig.input.mouse.x;
        	this.pos.y = ig.input.mouse.y;
		},


	});
});