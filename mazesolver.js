//Js file
//Comming Soon...
//Labyrinth genarator through Prim's algorithm and Recursive Backtracking 

var canvas = document.getElementById("maze");
var ctx = canvas.getContext('2d');
var ot = document.getElementById("outcome");
let body = document.querySelector('body');


var mheight = 576, mwidth = 920;
var tileRcount = 25, tileCcount = 40;
// var tile = {h:20,w:20};
var tileH = 20, tileW =20;

var targetX = 0, targetY = 0;
var clc = document.getElementById("bn1");

// var stc = 0,str = 0;
// var ftc = tileCcount-1,ftr = tileRcount-1;// 24,39

var tiles = [];
for(var c = 0;c < tileCcount; c++)
{
   tiles[c] = [];  //Creating a 2D array
   for(var r = 0;r < tileRcount ; r++)
    {
        tiles[c][r] = {x:c*(tileW+3), y:r*(tileH+3), state:'e'}; // state is e for empty
    }
}
tiles[0][0].state = 's'; // s for start
tiles[tileCcount-1][tileRcount-1].state = "f"; // f for finish
function radsf()
{
    /*stc = Math.floor(Math.random()*24);
    ftc = Math.floor(Math.random()*39);
    str = Math.floor(Math.random()*39);
    ftr = Math.floor(Math.random()*24);
    */
    var s1 = document.getElementById('s1').value;
    var s2 = document.getElementById('s2').value;
    var f1 = document.getElementById('f1').value;
    var f2 = document.getElementById('f2').value;
    if(s1 > 39 || s1 < 0 || s2 > 24 || s2 < 0 || f1 > 39 || f1 < 0 || f1 > 39 || f2 < 0) 
    {
        alert("Entered coordinates exceeded the limits!!");
        Rst();
        return;
    }
    for(var c = 0;c < tileCcount; c++)  //coloumns
    {
    tiles[c] = [];  //Creating a 2D array
    for(var r = 0;r < tileRcount ; r++)   //rows
        {
            tiles[c][r] = {x:c*(tileW+3), y:r*(tileH+3), state:'e'}; // state is e for empty
        }
    }
    tiles[parseInt(s1)][s2].state = 's'; // s for start
    tiles[f1][f2].state = "f";
}

function clear()
{
    ctx.clearRect(0,0,mwidth,mheight);
}

function drawrect(x = 10,y = 10,w = 10,h = 10,st = 'e')    //default values
{
    if(st == 'e')
    {
        // rgb hexa
        ctx.fillStyle = "#AAAAAA"; //grey: "#808080
    }
    else if(st == 's')
    {
        ctx.fillStyle = "#00d778"; //green -->#00ff00
    }
    else if(st == 'f')
    {
        ctx.fillStyle = "#fa4242"; //red-->#ff0000
    }
    else if(st == 'w')
    {
        ctx.fillStyle = "#293D52"; //blue -->#0000ff
    }
    else if(st == 'x')
    {
        ctx.fillStyle = "#FFCC00"; //yellow -->#ffff00
    }
    else
    {
        ctx.fillStyle = "rgb(0,125,191)";
    }
    ctx.beginPath();
    ctx.fillRect(x,y,w,h);
    ctx.closePath();
}

function Rst()
{
    clc.className = '';
    for(var c = 0;c < tileCcount; c++)  //coloumns
    {
    tiles[c] = [];  //Creating a 2D array
    for(var r = 0;r < tileRcount ; r++)   //rows
        {
            tiles[c][r] = {x:c*(tileW+3), y:r*(tileH+3), state:'e'}; // state is e for empty
        }
    }
    tiles[0][0].state = 's'; // s for start
    tiles[tileCcount-1][tileRcount-1].state = "f";

    ot.innerHTML = '';
    document.getElementById('s1').value = 0;
    document.getElementById('s2').value = 0;
    document.getElementById('f1').value = 39;
    document.getElementById('f2').value = 24;
    console.clear();
}

function draw()
{
    clear();
    for(var c = 0;c < tileCcount; c++)
    {
        for(var r = 0;r < tileRcount; r++)
        {
            drawrect(tiles[c][r].x,tiles[c][r].y,tileW,tileH,tiles[c][r].state);
        }
    }
}

function main()    //kindda like the driver code for this file
{
    return setInterval(draw,10);
}

function Move(e)
{
    let x = e.pageX - canvas.offsetLeft;
    let y = e.pageY - canvas.offsetTop;

    
    for(var c = 0;c < tileCcount; c++){
        for(var r = 0;r < tileRcount; r++){
            if(c*(tileW+3) < x && x < c*(tileW+3)+tileW && r*(tileH+3) < y && y < r*(tileH+3)+tileH)
            {
                if(tiles[c][r].state == 'e' && (c != targetX ||r != targetY))
                {
                    tiles[c][r].state = 'w';
                    targetX = c;
                    targetY = r;
                }
                else if(tiles[c][r].state == 'w' && (c != targetX ||r != targetY))
                {
                    tiles[c][r].state = 'e';
                    targetX = c;
                    targetY = r;
                }
            }
        }
    }
}

function Clickwall(e)       // e --> event
{
    canvas.onmousemove = Move;
    //setting x and y to 0,0 nomatter where the canvas starts from
    x = e.pageX - canvas.offsetLeft;  //Get the horizontal coordinate -->PageX
    y = e.pageY - canvas.offsetTop;   // Get the vertical coordinate -->PageY
    //console.log("pressed "+x+" "+y);
    
    for(var c = 0;c < tileCcount; c++){
        for(var r = 0;r < tileRcount; r++){
            if(c*(tileW+3) < x && x < c*(tileW+3)+tileW && r*(tileH+3) < y && y < r*(tileH+3)+tileH)
            {
                if(tiles[c][r].state == 'e')
                {
                    tiles[c][r].state = 'w';
                    //console.log("Changed");
                    targetX = c;
                    targetY = r;
                }
                else if(tiles[c][r].state == 'w')
                {
                    tiles[c][r].state = 'e';
                    targetX = c;
                    targetY = r;
                }
            }
        }
    }
}
function myUP(){
    canvas.onmousemove = null;// like remove-addlistner
}

function distanceToFinish (xVal, yVal) {
    return (xVal-24)*(xVal-24) + (yVal-24)*(yVal-24);
  }

function Solve()
{
    // Path-finding Algorithm
    // Acknowledgement & inspiration gray utopia: https://minstem.com/ & https://pathjs.herokuapp.com/#
    clc.className = "open";
    var stc = parseInt(document.getElementById('s1').value);
    var str = parseInt(document.getElementById('s2').value);
    var aray = [[stc, str]]; //queue
    var xloc;
    var yloc;
    var pathFound = false;
    while (aray.length > 0 && !pathFound) {
        xloc = aray[0][0];
        yloc = aray[0][1];
        var index = 0;
        for (var i = 1; i < aray.length; i++) {
        if (distanceToFinish(aray[i][0], aray[i][1]) < distanceToFinish(xloc, yloc)) {
            xloc = aray[i][0];
            yloc = aray[i][1];
            index = i;
        }
        }
        aray.splice(index, 1);
        if (xloc < tileCcount - 1) {
        if (tiles[xloc+1][yloc].state == 'f') {
            pathFound = true;
        }
        }
        if (yloc < tileRcount - 1) {
        if (tiles[xloc][yloc+1].state == 'f') {
            pathFound = true;
        }
        }
        if (xloc > 0) {
        if (tiles[xloc-1][yloc].state == 'e') {
            aray.push([xloc-1, yloc]);
            tiles[xloc-1][yloc].state = tiles[xloc][yloc].state + 'l';
        }
        }
        if (xloc < tileCcount - 1) {
        if (tiles[xloc+1][yloc].state == 'e') {
            aray.push([xloc+1, yloc]);
            tiles[xloc+1][yloc].state = tiles[xloc][yloc].state + 'r';
        }
        }
        if (yloc > 0) {
        if (tiles[xloc][yloc-1].state == 'e') {
            aray.push([xloc, yloc-1]);
            tiles[xloc][yloc-1].state = tiles[xloc][yloc].state + 'u';
        }
        }
        if (yloc < tileRcount - 1) {
        if (tiles[xloc][yloc+1].state == 'e') {
            aray.push([xloc, yloc+1]);
            tiles[xloc][yloc+1].state = tiles[xloc][yloc].state + 'd';
        }
        }
    }
    if (!pathFound) {
        ot.innerHTML = '✘ No Solution';
        console.log("Nah nice tough one though!!");
        alert("✘ No solution!");
    }
    else {
        ot.innerHTML = '✔︎ Solved!';
        console.log("Solved :)");
        var path = tiles[xloc][yloc].state;
        var pathLength = path.length;
        var currX = stc;
        var currY = str;
     for (var i = 0; i < pathLength-1; i++) {
        if (path.charAt(i+1) == 'u') {
            currY -= 1;
        }
        if (path.charAt(i+1) == 'd') {
            currY += 1;
        }
        if (path.charAt(i+1) == 'r') {
            currX += 1;
        }
        if (path.charAt(i+1) == 'l') {
            currX -= 1;
        }
        tiles[currX][currY].state = 'x';
        }
    }
//ot.innerHTML = "COMINNG SOON...";
// console.log(path);
}

function ClearPath()
{
    ot.innerHTML = "";
    for(var c = 0;c < tileCcount; c++)
    {
        for(var r =0;r < tileRcount; r++)
        {
            //console.log(tiles[c][r].state);
            if(tiles[c][r].state =='x' || (tiles[c][r].state).includes('u') || (tiles[c][r].state).includes('d') || (tiles[c][r].state).includes('l') || (tiles[c][r].state).includes('r'))
            {
                tiles[c][r].state = 'e';
            }
        }
    }
}

function ShowC()
{
    var crd = document.getElementById('crd');
    crd.style.display = 'flex';
    crd.className = 'ctr';
}

let swt = document.getElementById('switch');
//drak();
function drak()
{
    if(swt.checked)
    {
        canvas.className = "dark";
        body.className = 'dark';
    }
    else
    {
        canvas.className = "";
        body.className = '';
    }
}
function detectMob() {
    // var check = ( ( window.innerWidth <= 800 ) && ( window.innerHeight <= 600 ) );
    //Stack overflow
    if (typeof window.orientation !== 'undefined')
    {    alert("Welcome! \nInstruction:\nTest your skills and form a maze by clicking on the tiles to form walls.\nUse your mouse/trackpad to click on the tile and right click and drag for selecting multiple tiles. Click Solve to find the shortest path and hit reset to work out on a new Maze pattern.\nNOTE:\nUse laptop or PC for full experience.\n Enjoy!!");
}
        
  }
// setTimeout(()=>{alert("Welcome! \nInstruction:\nTest your skills and form a maze by clicking on the tiles to form walls.\nUse your mouse/trackpad to click on the tile and right click and drag for selecting multiple tiles. Click Solve to find the shortest path and hit reset to work out on a new Maze pattern.\nNOTE:\nUse laptop or PC for full experience.\n Enjoy!!");},0); //Using arrow function

setTimeout(detectMob,0);

setTimeout(() => {
    if(confirm("Do you want Maze background to be dark?"))
    {
        canvas.className = "dark";
        body.className = 'dark';
        swt.checked = true;
    }
    else
        swt.checked = false;
},2);

let usr = ["Scholar","Nobody","Gamer","User","Great mind","Person","Solver","Coder"];
let rnd = Math.floor(Math.random()*usr.length);
setTimeout(()=>{
    let name = prompt("Enter your name","Enter");
    if (name == null || name == "" || name == "Enter") {
        name = usr[rnd]; //Gamer,person,User anything
        document.getElementById('name').innerHTML = 'Welcome!'+' '+name;
      }
      else if(name == "Arkaraj")
      {
        document.getElementById('name').innerHTML = 'Welcome!'+' '+"Creator";
        hidePanel('hide');
      } 
      else {
        document.getElementById('name').innerHTML = 'Welcome!'+' '+name; 
      }
},1);

main();
canvas.onmousedown = Clickwall; // This also works //canvas.addEventListener("mousedown",Clickwall);
canvas.onmouseup = myUP;

//This is from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_draggable for dragging an html element

moveit("panel"); //whatever id is given in css position:absolute must be done


function moveit(slide)
{
    dragElement(document.getElementById(slide));

    function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
    }
}

function hidePanel(hide)
{
    var hide = document.getElementById(hide);
    hide.style.display = 'none';
    //hide.className = 'hid';
}


//End!!
//Arkaraj - 28/4/20
