ig.module(
	'game.entities.sfxbtn'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntitySfxbtn = ig.Entity.extend({
		animSheet: new ig.AnimationSheet( 'media/small/sfx_btn.png', 30, 28),
		size: {x: 30, y: 28},
		gravityFactor: 0,
		checkAgainst: ig.Entity.TYPE.B,
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'on', 1, [0] );
			this.addAnim( 'off', 1, [1] );
			if(ig.finalstats.sfx == true) {
				this.currentAnim = this.anims.on;
			} else if (ig.finalstats.sfx == false) {
				this.currentAnim = this.anims.off;
			}
		},

		check: function( other ) {
			if ( other instanceof EntityPointer) {
				if( ig.input.pressed('click')) {
					if(ig.finalstats.sfx == true) {
						ig.finalstats.sfx = false;
						this.currentAnim = this.anims.off;
					} else if (ig.finalstats.sfx == false) {
						ig.finalstats.sfx = true;
						this.currentAnim = this.anims.on;
					}
					
				}
			}
		}
	});
});