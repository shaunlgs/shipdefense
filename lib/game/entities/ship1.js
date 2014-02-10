ig.module(
	'game.entities.ship1'
)
.requires(
	'impact.entity',
	'game.entities.ship1canon',
	'game.entities.bomb',
	'game.entities.sinkSound'
)
.defines(function(){
	EntityShip1 = ig.Entity.extend({
		animSheet: new ig.AnimationSheet( 'media/small/ship_1.png', 128, 74 ),
		size: {x: 125, y: 45},
		offset: {x: 0, y: 30},
	    friction: {x: 0, y: 0},
	    gravityFactor: 0,
	    type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim('ship1', 1, [0] );
			this.vel.x = -100;
			ig.game.spawnEntity( 'EntityShip1canon', this.pos.x-5, this.pos.y-18);
			ig.game.spawnEntity( 'EntityBomb', this.pos.x-5, this.pos.y-18);
			shoot1Timer = new ig.Timer(1);
			ship1posx = this.pos.x;
			ship1posy = this.pos.y;
			random = Math.random();
			ship1killed = false;
		},

		update: function() {
			this.parent();
			if(shoot1Timer.delta() > 0){
				ig.game.spawnEntity( 'EntityBomb', this.pos.x-5, this.pos.y-18);
				shoot1Timer.reset();
			}
			ship1posx = this.pos.x;
			ship1posy = this.pos.y;
			if(this.pos.x < (random * 505)) {
				this.vel.x = 0;
			}
		},

		check: function( other ) {
			other.kill();
			this.kill();
			ig.game.spawnEntity('EntitySinkSound', 0, 0);
			ig.game.stats.kills++;
			ship1killed = true;
		}
		

	});
});