var baudio = require('baudio');
// var xbox = require('xbox-controller');

var root = 300;
var currentPitch = root;
var currentVolume = 0;
var recording = false;

//input values:
var x=y=z=w=0;



xbox.on('lefttrigger', function(position){
	console.log("L trigger: "+JSON.stringify(position))
});
xbox.on('righttrigger', function(position){
	console.log("R trigger: "+JSON.stringify(position))
});
xbox.on('left:move', function(position){
	console.log("Left position: "+JSON.stringify(position))
});
xbox.on('right:move', function(position){
	console.log("Right Position: "+JSON.stringify(position))
});

var components = [
	function(t){
		return Math.sin( t * currentPitch ) * Math.sin( t * 2 );
	},
	function(t){
		return Math.cos( t * currentPitch ) * Math.sin( t * 2 );
	},
	function(t){
		return Math.sin( t * currentPitch * 3 );
	},	
	function(t){
		return Math.sin( t * currentPitch * 3 ) * Math.sin( t * 5 );
	},
]

function componentSum(t){
	var result = 0;
	components.forEach(function(component){
		result+=component(t);
	})
    return result;
}

var b = baudio(function (t) {
    return componentSum(t);
});

b.play();
// xbox.on('start:press', function(key){
// 	if(recording){
// 		b.record('./result')
// 		recording=true;
// 	}else{
// 		b.record()
// 	}
// })

// b.record('./result')