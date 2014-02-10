ig.module(
	'game.entities.ship1canon'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityShip1canon = ig.Entity.extend({
		animSheet: new ig.AnimationSheet( 'media/small/ship_1_canon.png', 34, 26),
		size: {x: 34, y: 26},
		gravityFactor: 0,
	    type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim('ship1canon', 0.3, [0,1,2,3,4,5] );
			ship1killed = false;
		},

		update: function() {
			this.parent();
			if(ship1killed) {
				this.kill();
			}
			ship1killed = false;
			this.pos.x = ship1posx-5;
			this.pos.y = ship1posy-18;
			if(ship1killed) {
				this.kill();
			}
		}
	});
});

