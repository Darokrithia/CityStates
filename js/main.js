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

function Tile(x, y,color){		//a tile.  pretty self explanatory.  X and Y are the positions
	this.x = x;
	this.y = y;
	this.color = color;

	this.hover = false;		//will be used to make it clear what you are selecting.
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

function onCanvasClicked(xPos,yPos){
	xPos /= delta;
	yPos /= delta;
	xPos =  Math.floor(xPos);
	yPos =  Math.floor(yPos);
	tileArray[xPos][yPos].color = "#FF0000";

	//ctx.fillStyle="#FF0000"
	//ctx.fillRect((xPos*delta),(yPos*delta),delta,delta);

}

var c=document.getElementById("canvas");		//gets the canvas
var cLeft = c.offsetLeft;
var cTop = c.offsetTop;

var ctx=c.getContext("2d");						//gets context?
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
		if((i*j) > 16 && (i*j) < 196){
			var t = new MineTile(i,j);
		}
		else{
			var t = new FarmTile(i,j);
		}
		ar[j] = t;
	}
	tileArray[i] = ar;
}

setInterval(function(){ run(); }, 1);			//loops the program.