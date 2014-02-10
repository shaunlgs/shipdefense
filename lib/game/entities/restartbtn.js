ig.module(
	'game.entities.restartbtn'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityRestartbtn = ig.Entity.extend({
		animSheet: new ig.AnimationSheet( 'media/small/restart_btn.png', 44, 38 ),
		size: {x: 44, y: 38},
		checkAgainst: ig.Entity.TYPE.B,
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'restart' , 1, [0] );
			this.addAnim( 'restart1', 1, [1] );
		},

		update: function() {
			this.parent();
			this.currentAnim = this.anims.restart;
		},

		check: function( other ) {
			if ( other instanceof EntityPointer) {
				this.currentAnim = this.anims.restart1;
				if( ig.input.pressed('click')) {
					ig.finalstats = {HighScore: 0, Health: 100, Time: 0, kills: 0, TotalKills: 0, Score: 0, Wave: 0, sfx: true, music: true};
					ig.system.setGame(MyGame);
				}
			}
		}
	});
});