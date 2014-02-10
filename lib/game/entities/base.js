ig.module(
	'game.entities.base'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityBase = ig.Entity.extend({

		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.PASSIVE,
		
		health: 100,
		hpSprite: 5,

		animSheet: new ig.AnimationSheet( 'media/big/island.png', 320, 290 ),
		size: {x: 30, y: 30},
		offset: {x: 160, y: 145},
		flip: false,
		gravityFactor: 0,
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'health1', 1, [0] );
			this.addAnim( 'health2', 1, [1] );
			this.addAnim( 'health3', 1, [2] );
			this.addAnim( 'health4', 1, [3] );
			this.addAnim( 'health5', 1, [4] );
		},

		update: function() {
			this.parent();
			if(this.health > 80 && this.health <= 100) {
				this.currentAnim = this.anims.health1;
				hpSprite = 5;
			} else if (this.health > 60 && this.health <= 80) {
				this.currentAnim = this.anims.health2;
				hpSprite = 4;
			} else if (this.health > 40 && this.health <= 60) {
				this.currentAnim = this.anims.health3;
				hpSprite = 3;
			} else if (this.health > 20 && this.health <= 40) {
				this.currentAnim = this.anims.health4;
				hpSprite = 2;
			} else if (this.health > 0 && this.health <= 20) {
				this.currentAnim = this.anims.health5;
				hpSprite = 1;
			}
			ig.game.stats.Health = this.health;
		}
	});
});