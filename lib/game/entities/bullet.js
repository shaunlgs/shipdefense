ig.module(
	'game.entities.bullet'
)
.requires(
	'impact.entity'
)
.defines(function(){

	EntityBullet = ig.Entity.extend({
		animSheet: new ig.AnimationSheet( 'media/small/canon_ball.png', 12, 12),
		size: {x: 12, y: 12},
		maxVel: {x: 500, y: 500},
		gravityFactor: 3,
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.PASSIVE,

		init: function( x, y, settings) {
			this.parent( x, y, settings );
			this.addAnim( 'bomb', 1, [0,1,2,3,4,5] );
		},
		update: function() {
			this.parent();
		}
		
	});
});