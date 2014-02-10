ig.module( 'game.levels.untitled' )
.requires( 'impact.image','game.entities.base','game.entities.player' )
.defines(function(){
LevelUntitled=/*JSON[*/{"entities":[{"type":"EntityBase","x":320,"y":237},{"type":"EntityPlayer","x":364,"y":140}],"layer":[{"name":"untitled","width":4,"height":3,"linkWithCollision":false,"visible":1,"tilesetName":"media/big/game_bg.png","repeat":false,"preRender":false,"distance":"1","tilesize":160,"foreground":false,"data":[[1,2,3,4],[5,6,7,8],[9,10,11,12]]}]}/*]JSON*/;
LevelUntitledResources=[new ig.Image('media/big/game_bg.png')];
});