ig.module(
	'game.entities.ship3canon'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityShip3canon = ig.Entity.extend({
		animSheet: new ig.AnimationSheet( 'media/small/ship_3_canon.png', 34, 26),
		size: {x: 34, y: 26},
		gravityFactor: 0,
	    type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim('ship2canon', 0.3, [0,1,2,3,4,5] );
			ship3killed = false;
		},

		update: function() {
			this.parent();
			if(ship3killed) {
				this.kill();
			}
			ship3killed = false;
			this.pos.x = ship3posx-2;
			this.pos.y = ship3posy-13;
			if(ship3killed) {
				this.kill();
			}
		}
	});
});

