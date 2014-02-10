ig.module(
	'game.entities.title'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityTitle = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/small/title.png', 255, 110 ),
		size: {x: 255, y: 110},
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'title' , 1, [0] );
		},
	});
});