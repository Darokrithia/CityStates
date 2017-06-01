var x = 10;	//how many tiles there are
var y = 10;

var i;		//index variables
var j;

function run(){		//called over and over to make the program run
	tick();
	render();
};

function tick(){	//the thinking part of the program
	checkKeys();
};

function render(){	//the drawing part of the program

	for (i = 0; i<x; i++){		//goes through all tiles
		for (j = y-1; j>=0; j--){
			var tl = (tileArray[i][j]);		//grabes a tile
			ctx.fillStyle=tl.color;			//gets its color
			ctx.fillRect((i*delta),(j*delta),delta,delta);	//draws that tile
		}
	}
};

function checkKeys(){	//finds keys.  Will be implemented
	
};

function Tile(x, y,color){		//a tile.  pretty self explanitory.  X and Y are the positions
	this.x = x;
	this.y = y;
	this.color = color;
};

function WildernessTile(x,y){
	Tile.call(this,x,y,"#FFFFFF");
};

function FarmTile(x,y){
	Tile.call(this,x,y,"#00DD44");
};

function MineTile(x,y){
	Tile.call(this,x,y,"#EEDD00");
};

function RoadTile(x,y){
	Tile.call(this,x,y,"#554433");
};

function WallTile(x,y){
	Tile.call(this,x,y,"#999999");
};

var c=document.getElementById("canvas");		//gets the canvas
var ctx=c.getContext("2d");						//gets context?
var delta = (c.width/x);						//how big a tile is

var tileArray = [];								//all the tiles

for (i = 0; i < x; i++){						//loads and fills the tile array.
	var ar = [];
	for (j = 0; j<y; j++){
		if((i*j) > 16 && (i*j) < 196){
			var t = new WildernessTile(i,j);
		}
		else{
			var t = new FarmTile(i,j);
		}
		ar[j] = t;
	}
	tileArray[i] = ar;
}

setInterval(function(){ run(); }, 1);			//loops the program.