ig.module(
	'game.entities.playbtn'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityPlaybtn = ig.Entity.extend({
		animSheet: new ig.AnimationSheet( 'media/big/play_btn.png', 92, 86 ),
		size: {x: 92, y: 86},
		checkAgainst: ig.Entity.TYPE.B,
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'play' , 1, [0] );
			this.addAnim( 'play1', 1, [1] );
		},

		update: function() {
			this.parent();
			this.currentAnim = this.anims.play;
		},

		check: function( other ) {
			if ( other instanceof EntityPointer) {
				this.currentAnim = this.anims.play1;
				if( ig.input.pressed('click')) {
					ig.system.setGame(MyGame);
				}
			}
		}
	});
});