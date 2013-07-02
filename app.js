var baudio = require('baudio');
var XboxController = require('node-xbox-controller');
var xbox = new XboxController;
var domain = require('domain')

var root = 300;
var currentPitch = root;
var currentVolume = 0;
var recording = false;


//input values:
var x=y=z=w=0;
var PI = Math.PI

var maxInputValue = 33000;
var maxOutputFrequency = 10000;

function mapInputToFrequency(input){
	// console.log("in: "+input+" out: "+maxOutputFrequency / maxInputValue * input)
	return maxOutputFrequency / maxInputValue * input
}
function soundForFrequencyAtTime(f, t){
	var l = Math.sin(2*PI*f*t/1000)
	// console.log("Requested level: "+l)
	return l
}

// xbox.on('lefttrigger', function(position){
// 	console.log("L trigger: "+JSON.stringify(position))
// });
// xbox.on('righttrigger', function(position){
// 	console.log("R trigger: "+JSON.stringify(position))
// });
// xbox.on('left:move', function(position){
// 	console.log("Left position: "+JSON.stringify(position))
// });


var components = [
	function(t){
		soundForFrequencyAtTime(x, t);
	},
	// function(t){
	// 	soundForFrequencyAtTime(y, t);
	// }
	// function(t){
	// 	return Math.sin(100*PI*t)
	// }
]


function componentSum(t){
	var result = 0;

	components.forEach(function(component){
		result+=component(t);
	})
    return result/(components.length)*0.8;
}

var b = baudio(function (t) {

	xbox.on('right:move', function(position){
		x = mapInputToFrequency(position.x)
		y = mapInputToFrequency(position.y)
	});

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