ig.module(
	'game.entities.musicbtn'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityMusicbtn = ig.Entity.extend({
		animSheet: new ig.AnimationSheet( 'media/small/music_btn.png', 30, 28),
		size: {x: 30, y: 28},
		gravityFactor: 0,
		checkAgainst: ig.Entity.TYPE.B,
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'on1', 1, [0] );
			this.addAnim( 'off1', 1, [1] );
			ig.music.add( 'media/sound/bgMusic.*' );
			ig.music.loop = true;
			if(ig.finalstats.music == true) {
				this.currentAnim = this.anims.on1;
			} else if (ig.finalstats.music == false) {
				this.currentAnim = this.anims.off1;
			}
		},

		update: function() {
			if(ig.finalstats.music == true ) {
				ig.music.play();
			} else if (ig.finalstats.music == false) {
				ig.music.pause();
			}
		},

		check: function( other ) {
			if ( other instanceof EntityPointer) {
				if( ig.input.pressed('click')) {
					if(ig.finalstats.music == true) {
						ig.finalstats.music = false;
						this.currentAnim = this.anims.off1;
					} else if (ig.finalstats.music == false) {
						ig.finalstats.music = true;
						this.currentAnim = this.anims.on1;
					}
					
				}
			}
		}
	});
});