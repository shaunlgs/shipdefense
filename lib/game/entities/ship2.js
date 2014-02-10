ig.module(
	'game.entities.ship2'
)
.requires(
	'impact.entity',
	'game.entities.ship2canon',
	'game.entities.bomb',
	'game.entities.sinkSound'
)
.defines(function(){
	EntityShip2 = ig.Entity.extend({
		animSheet: new ig.AnimationSheet( 'media/small/ship_2.png', 132, 96 ),
		size: {x: 132, y: 48},
		offset: {x: 0, y: 48},
	    friction: {x: 0, y: 0},
	    gravityFactor: 0,
	    type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim('ship2', 1, [0] );
			this.vel.x = -100;
			ig.game.spawnEntity( 'EntityShip2canon', this.pos.x-8, this.pos.y-16);
			ig.game.spawnEntity( 'EntityBomb', this.pos.x-8, this.pos.y-16);
			shoot2Timer = new ig.Timer(1);
			ship2posx = this.pos.x;
			ship2posy = this.pos.y;
			random2 = Math.random();
			ship2killed = false;
		},

		update: function() {
			this.parent();
			if(shoot2Timer.delta() > 0){
				ig.game.spawnEntity( 'EntityBomb', this.pos.x-8, this.pos.y-16);
				shoot2Timer.reset();
			}
			ship2posx = this.pos.x;
			ship2posy = this.pos.y;
			if(this.pos.x < (random2 * 505)) {
				this.vel.x = 0;
			}
		},

		check: function( other ) {
			this.kill();
			other.kill();
			ig.game.spawnEntity('EntitySinkSound', 0, 0);
			ig.game.stats.kills++;
			ship2killed = true;
		}

	});
});