var x = 10;	//how many tiles there are
var y = 10;

var i;		//index variables
var j;

var selectedTile;

function run(){		//called over and over to make the program run
	tick();
	render();
};

function tick(){	//the thinking part of the program
	for (i = 0; i<x; i++){		//goes through all tiles
		for (j = y-1; j>=0; j--){
			tileArray[i][j].pop.size *= 1.005;
			var tl = (tileArray[i][j]);		//grabes a tile
		}
	}
};

function render(){	//the drawing part of the program

	for (i = 0; i<x; i++){		//goes through all tiles
		for (j = y-1; j>=0; j--){
			var tl = (tileArray[i][j]);						//grabes a tile
			ctx.fillStyle = tl.clr;							//gets its color
			ctx.fillRect((i*delta),(j*delta),delta,delta);	//draws that tile
			if(tl.selected){								//if selected, highlight the tile
				ctx.strokeStyle = "#FFFFFF";
      			ctx.lineWidth = 4;
				ctx.strokeRect((i*delta)-2,(j*delta)+2,delta,delta);
			}
		}
	}
};

function Pop(){
	this.size = 100;
}

function componentToHex(c) {				//Convers a decimal to a hex.  Credit to Tim Down on Stack overflow
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function Tile(_x, _y, _wetness, _vegetation){		//a tile.  pretty self explanatory.  X and Y are the positions
	this.x = _x;
	this.y = _y;
	this.wetness = _wetness;
	this.vegetation = _vegetation;

	var r = 255 - (0.5 * (_wetness + _vegetation));
	var g = _vegetation;
	var b = (0.5 * _wetness);
	var rgb = ("#" + componentToHex(r) + componentToHex(g) + componentToHex(b));

	this.clr = rgb;
	this.pop = new Pop();

	this.selected = false;		//will be used to make it clear what you are selecting.
};

function onCanvasClicked(xPos,yPos){
	xPos /= delta;
	yPos /= delta;
	xPos =  Math.floor(xPos);
	yPos =  Math.floor(yPos);
	clickedTile = tileArray[xPos][yPos]
	if(selectedTile == null){
		selectedTile = clickedTile;
		clickedTile.selected = true;
		document.getElementById("dropDownMenu").style.display = "inline";
	}
	else if (selectedTile == clickedTile){
		clickedTile.selected = false;
		selectedTile = null;
		document.getElementById("dropDownMenu").style.display = "none";
		document.getElementById("dropDownMenuBuild").style.display = "none";
		document.getElementById("dropDownMenuBuy").style.display = "none";
		document.getElementById("dropDownMenuBoink").style.display = "none";
	}
	else{
		selectedTile.selected = false;
		selectedTile = clickedTile;
		clickedTile.selected = true;
		document.getElementById("dropDownMenuBuild").style.display = "none";
		document.getElementById("dropDownMenuBuy").style.display = "none";
		document.getElementById("dropDownMenuBoink").style.display = "none";
	}
}

function toggelBuild(){
	if(document.getElementById("dropDownMenuBuild").style.display == "inline"){
		document.getElementById("dropDownMenuBuild").style.display = "none"
		return;
	}
	document.getElementById("dropDownMenuBuild").style.display = "inline";
	document.getElementById("dropDownMenuBuy").style.display = "none";
	document.getElementById("dropDownMenuBoink").style.display = "none";
}

function toggelBuy(){
	if(document.getElementById("dropDownMenuBuy").style.display == "inline"){
		document.getElementById("dropDownMenuBuy").style.display = "none"
		return;
	}
	document.getElementById("dropDownMenuBuild").style.display = "none";
	document.getElementById("dropDownMenuBuy").style.display = "inline";
	document.getElementById("dropDownMenuBoink").style.display = "none";
}

function toggelBoink(){	
	if(document.getElementById("dropDownMenuBoink").style.display == "inline"){
		document.getElementById("dropDownMenuBoink").style.display = "none"
		return;
	}
	document.getElementById("dropDownMenuBuild").style.display = "none";
	document.getElementById("dropDownMenuBuy").style.display = "none";
	document.getElementById("dropDownMenuBoink").style.display = "inline";
}

var c = document.getElementById("canvas");		//gets the canvas
var cLeft = c.offsetLeft;
var cTop = c.offsetTop;

var ctx = c.getContext("2d");						//gets context?
var delta = (c.width/x);						//how big a tile is

c.addEventListener('click', function(event){
	if(event.pageX || event.pageY){
		var mouseX = event.pageX - cLeft;
		var mouseY = event.pageY - cTop;
	}
	onCanvasClicked(mouseX,mouseY);
},false);

var tileArray = [];								//all the tiles

for (i = 0; i < x; i++){						//loads and fills the tile array.
	var ar = [];
	for (j = 0; j<y; j++){
		var t = new Tile(i,j, (25*i), (25*j));
		ar[j] = t;
	}
	tileArray[i] = ar;
}

setInterval(function(){ run(); }, 1);			//loops the program.