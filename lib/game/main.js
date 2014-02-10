ig.module( 
	'game.main'
)
.requires(
	'impact.game',
	'game.levels.untitled',
	'game.levels.wavescreen',
	'game.levels.Gameover',
	'game.levels.startscreen',
	'game.entities.ship1',
	'game.entities.ship2',
	'game.entities.ship3',
	'game.entities.resumebtn',
	'game.entities.restartbtn',
	'game.entities.playbtn',
	'game.entities.pointer',
	'game.entities.sfxbtn',
	'game.entities.musicbtn',
	'impact.font'
)
.defines(function(){

MyGame = ig.Game.extend({
	gravity: 300,
	font: new ig.Font( 'media/download.png'),
	instruct: new ig.Font( 'media/instruct.png'),
	hpIcon: new ig.Image( 'media/small/hp_icon.png' ),
	stats: {HighScore: 0, Health: 100, Time: 0, kills: 0, TotalKills: 0, Score: 0, Wave: 1, sfx: true, music: true},
	init: function( x, y, settings ) {
		// Initialize your game here; bind keys etc.
		if (typeof ig.finalstats != "undefined") {
   			this.stats = ig.finalstats;
   			this.stats.Wave++;
		} else {
			ig.finalstats = this.stats;
		}
		this.loadLevel( LevelUntitled );		
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.MOUSE1, 'click' );
		ig.input.bind( ig.KEY.SPACE, 'space' );
		this.stats.kills = 0;
		this.stats.Score = 0;
		hsAchieved = false;
		spawnTimer = new ig.Timer(5);
		waveTimer = new ig.Timer(60);
		// number of ships per spawn
		numShip = this.stats.Wave + 2;
		// spawn rate, range is 0 to 5, slow to fast
		spawnFrequency = 0 + (this.stats.Wave*0.2);
		countdownTimer = new ig.Timer(3);
		ig.game.spawnEntity( 'EntityPointer', ig.system.width/2, ig.system.height/2);
		ig.game.spawnEntity( 'EntitySfxbtn', 610, 452);
		ig.game.spawnEntity( 'EntityMusicbtn', 610, 424);
		instructTimer = new ig.Timer(2);
	},
	update: function() {
		this.parent();
		this.stats.Time = Math.round(-(waveTimer.delta()));
		// calculate score
		this.stats.Score = (50 * this.stats.kills) - (10 * (100 - this.stats.Health));
		// spawn ships
		if(waveTimer.delta() < 0){
			if(spawnTimer.delta() > (-spawnFrequency + 0 )){
				for( var i = 1; i <= numShip; i++){
					if( Math.floor(Math.random()*3) == 0) {
						ig.game.spawnEntity( 'EntityShip1', 640, Math.random() * 110 + 300);
					} else if ( Math.floor(Math.random()*3) == 1 ){
						ig.game.spawnEntity( 'EntityShip2', 640, Math.random() * 110 + 300);
					} else if ( Math.floor(Math.random()*3) == 2 ){
						ig.game.spawnEntity( 'EntityShip3', 640, Math.random() * 110 + 300);
					}
				}
				spawnTimer.reset();
			}
		} else{
			// move over stats and switch to wave over screen
			this.stats.TotalKills += this.stats.kills;
			ig.finalstats = this.stats;
			ig.system.setGame(WaveOverScreen);
		} 
		if(this.stats.Health < 2 ) {
			// game over if health is less than 2
			ig.system.setGame(GameOverScreen);
			this.stats.TotalKills += this.stats.kills;
			ig.finalstats = this.stats;
		}
	},

	draw: function() {
		this.parent();
		// countdown before each wave
		if(countdownTimer.delta() >-3 && countdownTimer.delta() < -2) {
			this.font.draw('3', ig.system.width/2, ig.system.height/2+150, ig.Font.ALIGN.LEFT);
		} else if (countdownTimer.delta() >-1.7 && countdownTimer.delta() < -0.7) {
			this.font.draw('2', ig.system.width/2, ig.system.height/2+150, ig.Font.ALIGN.LEFT);
		} else if (countdownTimer.delta() >-0.4 && countdownTimer.delta() < 0.4) {
			this.font.draw('1', ig.system.width/2, ig.system.height/2+150, ig.Font.ALIGN.LEFT);
		} else if (countdownTimer.delta() >0.7 && countdownTimer.delta() < 1.7) {
			this.font.draw('Wave '+this.stats.Wave+' start!', ig.system.width/2-70, ig.system.height/2+150, ig.Font.ALIGN.LEFT);
		}
		// status bar
		this.font.draw('Score: ' + this.stats.Score, 0, 0, ig.Font.ALIGN.LEFT);
		this.font.draw('High Score: ' + this.stats.HighScore, 0, 0+20, ig.Font.ALIGN.LEFT);
        this.font.draw('Time: '+this.stats.Time, 0, 0+40, ig.Font.ALIGN.LEFT);
        this.font.draw('Wave: '+this.stats.Wave, 0, 0+60, ig.Font.ALIGN.LEFT);
        this.font.draw('Health: ', 540, 0, ig.Font.ALIGN.LEFT);
        for(var i=0; i< hpSprite; i++) {
        	this.hpIcon.draw(((this.hpIcon.width+2)*-i)+595, 30);
        }
        // instruction for first timer
        if(this.stats.Wave == 1 && (instructTimer.delta() < -1.0 || (instructTimer.delta() > -0.3 && instructTimer.delta() < 0.3) || (instructTimer.delta() > 1 && instructTimer.delta() < 2))) {
        	this.instruct.draw('Press spacebar to switch position. Click to shoot.', 70, 425);
        }
	}
});

StartScreen = ig.Game.extend({
    init: function( x, y, settings ) {
    	this.loadLevel( LevelStartscreen );
    	ig.game.spawnEntity( 'EntityPlaybtn', ig.system.width/2-46, 380);
    	ig.game.spawnEntity( 'EntityPointer', ig.system.width/2, ig.system.height/2);
    }
});

WaveOverScreen = ig.Game.extend({
    instructText: new ig.Font( 'media/Simhei.png' ),
    hsIcon: new ig.Image( 'media/small/hs_icon.png'),
    init: function( x, y, settings ) {
    	this.stats = ig.finalstats;
  		this.loadLevel( LevelWavescreen);
    	ig.game.spawnEntity( 'EntityResumebtn', ig.system.width/2-20, 380);
    	ig.game.spawnEntity( 'EntityPointer', ig.system.width/2, ig.system.height/2);
    },
    update: function() {
    	// when pressed space, start next wave
        if (this.stats.Score > this.stats.HighScore) {
			this.stats.HighScore = this.stats.Score;
			hsAchieved = true;
		}
        this.parent();
    },
    draw: function() {
        this.parent();
        x = ig.system.width/2;
        y = ig.system.height/2;
		if (hsAchieved == true) {
			this.instructText.draw('A new high Score!', x, y-40, ig.Font.ALIGN.CENTER);
			this.hsIcon.draw(x+190, y-40);
		}
		this.instructText.draw('Wave '+this.stats.Wave+' completed!', x, y-80, ig.Font.ALIGN.CENTER);
        this.instructText.draw('Total Kills: '+this.stats.kills, x, y, ig.Font.ALIGN.CENTER);
        this.instructText.draw('Score: '+this.stats.Score, x, y+40, ig.Font.ALIGN.CENTER);
    }
});

GameOverScreen = ig.Game.extend({
    instructText2: new ig.Font( 'media/game-over-font.png' ),
    instructText3: new ig.Font( 'media/instruct3.png'),
    init: function() {
        this.stats = ig.finalstats;
        this.loadLevel( LevelGameover);
        ig.game.spawnEntity( 'EntityRestartbtn', ig.system.width/2-20, 380);
    	ig.game.spawnEntity( 'EntityPointer', ig.system.width/2, ig.system.height/2);
    },
    update: function() {
        this.parent();
    },
    draw: function() {
        this.parent();
        x = ig.system.width/2;
        y = ig.system.height/2;
        this.instructText2.draw('Game Over', x, y - 80, ig.Font.ALIGN.CENTER);
        this.instructText3.draw('Highest Score: '+this.stats.HighScore, x, y+30, ig.Font.ALIGN.CENTER);
        this.instructText3.draw('Total Kills: '+this.stats.TotalKills, x, y+50, ig.Font.ALIGN.CENTER);
        this.instructText3.draw('Wave Survived: '+this.stats.Wave, x, y+70, ig.Font.ALIGN.CENTER);
    }
});

// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', StartScreen, 60, 640, 480, 1 );

});
