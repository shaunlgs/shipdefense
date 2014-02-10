ig.module(
	'game.entities.ship3'
)
.requires(
	'impact.entity',
	'game.entities.ship3canon',
	'game.entities.bomb',
	'game.entities.sinkSound'
)
.defines(function(){
	EntityShip3 = ig.Entity.extend({
		animSheet: new ig.AnimationSheet( 'media/small/ship_3.png', 118, 72 ),
		size: {x: 118, y: 45},
		offset: {x: 0, y: 25},
	    friction: {x: 0, y: 0},
	    gravityFactor: 0,
	    type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim('ship3', 1, [0] );
			this.vel.x = -100;
			ig.game.spawnEntity( 'EntityShip3canon', this.pos.x-2, this.pos.y-13);
			ig.game.spawnEntity( 'EntityBomb', this.pos.x-2, this.pos.y-13);
			shoot3Timer = new ig.Timer(1);
			ship3posx = this.pos.x;
			ship3posy = this.pos.y;
			random3 = Math.random();
			ship3killed = false;
		},

		update: function() {
			this.parent();
			if(shoot3Timer.delta() > 0){
				ig.game.spawnEntity( 'EntityBomb', this.pos.x-2, this.pos.y-13);
				shoot3Timer.reset();
			}
			ship3posx = this.pos.x;
			ship3posy = this.pos.y;
			if(this.pos.x < (random3 * 505)) {
				this.vel.x = 0;
			}
		},

		check: function( other ) {
			this.kill();
			other.kill();
			ig.game.spawnEntity('EntitySinkSound', 0, 0);
			ig.game.stats.kills++;
			ship3killed = true;
		}

	});
});