ig.module(
	'game.entities.bomb'
)
.requires(
	'impact.entity',
	'game.entities.explosion'
)
.defines(function(){
	EntityBomb = ig.Entity.extend({
		animSheet: new ig.AnimationSheet( 'media/small/water_droplet.png', 32, 24),
		size: {x: 32, y: 24},
		maxVel: {x: 600, y: 600},

		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'idle', 1, [0] );
			this.addAnim( 'hit', 0.3, [1,2,3,4,5,6,7,8] );
		},

		move_toward_coord: function(x, y) {
		    var distance_x = x - this.pos.x - this.size.x / 2;
		    var distance_y = y - this.pos.y - this.size.y / 2;
		    var speed = 300;
		    this.vel.x = (distance_x > 1 ? 1 : -1) * speed * (Math.abs(distance_x) / (Math.abs(distance_x) + Math.abs(distance_y)));
		    this.vel.y = (distance_y > 1 ? 1 : -1) * speed * (Math.abs(distance_y) / (Math.abs(distance_x) + Math.abs(distance_y)));
		},

		update: function() {
			this.parent();
			this.move_toward_coord(ig.system.width/2, ig.system.height/2);
		},

		explosioneffect: function() {
			ig.game.spawnEntity( 'EntityExplosion', this.pos.x, this.pos.y );
		},
		check: function( other ) {
			this.kill();
			if ( other instanceof EntityBase) {
				this.explosioneffect();
				other.receiveDamage(1, this);
			}
		}	

	});
});