ig.module(
	'game.entities.ship2canon'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityShip2canon = ig.Entity.extend({
		animSheet: new ig.AnimationSheet( 'media/small/ship_2_canon.png', 34, 26),
		size: {x: 34, y: 26},
		gravityFactor: 0,
	    type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim('ship2canon', 0.3, [0,1,2,3,4,5] );
			ship2killed = false;
		},

		update: function() {
			this.parent();
			if(ship2killed) {
				this.kill();
			}
			ship2killed = false;
			this.pos.x = ship2posx-8;
			this.pos.y = ship2posy-16;
			if(ship2killed) {
				this.kill();
			}
		}
	});
});

