ig.module(
	'game.entities.sinkSound'
)
.requires(
	'impact.entity',
	'impact.sound'
)
.defines(function(){
	EntitySinkSound = ig.Entity.extend({
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			sinkSFX  = new ig.Sound( 'media/sound/sink.*');
			sinkSoundTime = new ig.Timer(1.2);
			if(ig.finalstats.sfx == true) {
				sinkSFX.play();
			} else if (ig.finalstats.sfx == false) {
				sinkSFX.stop();
			}
		},
		update: function() {
			this.parent();
			if(sinkSoundTime.delta() > 0) {
				this.kill();
			}
		}
	});
});