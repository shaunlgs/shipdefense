ig.module(
	'game.entities.resumebtn'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityResumebtn = ig.Entity.extend({
		animSheet: new ig.AnimationSheet( 'media/small/resume_btn.png', 44, 38 ),
		size: {x: 44, y: 38},
		checkAgainst: ig.Entity.TYPE.B,
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'resume' , 1, [0] );
			this.addAnim( 'resume1', 1, [1] );
		},

		update: function() {
			this.parent();
			this.currentAnim = this.anims.resume;
		},

		check: function( other ) {
			if ( other instanceof EntityPointer) {
				this.currentAnim = this.anims.resume1;
				if( ig.input.pressed('click')) {
					ig.system.setGame(MyGame);
				}
			}
		}
	});
});