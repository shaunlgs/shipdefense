ig.module(
	'game.entities.explosion'
)
.requires(
	'impact.entity',
	'impact.timer',
	'impact.sound'
)
.defines(function(){
	EntityExplosion = ig.Entity.extend({
		animSheet: new ig.AnimationSheet( 'media/small/explosion.png', 160, 120),
		size: {x: 160, y: 120},
		gravityFactor: 0,
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'explosion', 0.2, [0,1,2,3,4,5] );
			explosionTime = new ig.Timer(1.2);
			explosionSFX  = new ig.Sound( 'media/sound/explosion.ogg');
			if(ig.finalstats.sfx == true) {
				explosionSFX.play();
			}
		},

		update: function() {
			this.parent();
			if(explosionTime.delta() > 0) {
				this.kill();
			}
			if (ig.finalstats.sfx == false) {
				explosionSFX.stop();
			}
		}
	});
});