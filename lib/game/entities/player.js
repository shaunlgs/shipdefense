ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity',
	'game.entities.bullet'
)
.defines(function(){

	EntityPlayer = ig.Entity.extend({
		animSheet: new ig.AnimationSheet( 'media/small/island_canon.png', 72, 50),
		size: {x: 72, y: 50},
		gravityFactor: 0,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'idle', 1, [0] );
			this.addAnim( 'playershoot', 0.3, [1,2,3,4,5,0,0,0,0] );
			ig.input.initMouse();
            shootTimer = new ig.Timer(0.1);
		},

		update: function() {
			// turn left or right
			if( ig.input.mouse.x < this.pos.x ) {
				this.anims.idle.flip.x = true;
				this.anims.playershoot.flip.x = true;
			} else if ( ig.input.mouse.x >= this.pos.x ) {
				this.anims.idle.flip.x = false;
				this.anims.playershoot.flip.x = false;
			}
			// click to shoot bullet
			if( ig.input.pressed('click') && shootTimer.delta() > 0 ) {
        		this.currentAnim = this.anims.playershoot.rewind();
        		if(this.currentAnim.flip.x) {
        			ig.game.spawnEntity( 'EntityBullet', this.pos.x+15, this.pos.y+15, {vel: {x: -200}});
        		}else {
        			ig.game.spawnEntity( 'EntityBullet', this.pos.x+45, this.pos.y+15, {vel: {x: 200}});
        		}
                //set delay 1 sec after shooting
                shootTimer.set(1);
    		} else if ( this.currentAnim == this.anims.playershoot && this.currentAnim.loopCount ) {
            	this.currentAnim = this.anims.idle;
            }
            // press spacebar to change position
            if( ig.input.pressed('space') && waveTimer.delta() < 0) {
            	if(this.pos.x == 364 && this.pos.y == 140) {
            		this.pos.x = 412;
            		this.pos.y = 236;
            	} else if ( this.pos.x == 412 && this.pos.y == 236 ){
            		this.pos.x = 296;
            		this.pos.y = 256;
            	} else if ( this.pos.x == 296 && this.pos.y == 256 ){
            		this.pos.x = 228;
            		this.pos.y = 144;
            	} else if ( this.pos.x == 228 && this.pos.y == 144 ){
            		this.pos.x = 304;
            		this.pos.y = 64;
            	} else if ( this.pos.x == 304 && this.pos.y == 64 ){
            		this.pos.x = 364;
            		this.pos.y = 140;
            	} else {

            	}
            }
			this.parent();
		}
	});
});