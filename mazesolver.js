//Js file
//Comming Soon...
//Labyrinth genarator through Prim's algorithm and Recursive Backtracking 

var canvas = document.getElementById("maze");
var ctx = canvas.getContext('2d');
var ot = document.getElementById("outcome");
let body = document.querySelector('body');
//width="920" height="576" 
canvas.width = 940;
canvas.height = 576;
space = 3;

let onf = document.getElementById("of");
onf.innerHTML = 'OFF';

var mheight = 576, mwidth = 940;
var tileRcount = 25, tileCcount = 41; // 25,40
// var tile = {h:20,w:20};
var tileH = 20, tileW = 20;
var tc = 41;
var tr = 25;

var targetX = 0, targetY = 0;
var clc = document.getElementById("bn1");
var clw = document.getElementById("bnw");
var iswall = false;
var ispath = false;
// var stc = 0,str = 0;
// var ftc = tileCcount-1,ftr = tileRcount-1;// 24,40

var tiles = [];
for (var c = 0; c < tileCcount; c++) {
    tiles[c] = [];  //Creating a 2D array
    for (var r = 0; r < tileRcount; r++) {
        tiles[c][r] = { x: c * (tileW + space), y: r * (tileH + space), state: 'e' }; // state is e for empty
    }
}
tiles[0][0].state = 's'; // s for start
tiles[tileCcount - 1][tileRcount - 1].state = "f"; // f for finish

var flag = false;

function smooth() {
    Rst();
    if (!flag) {
        canvas.height = 580;
        canvas.width = 1140;
        mheight = 580;
        mwidth = 1140;
        tileCcount = 57;
        tc = 57;
        tileRcount = 29;
        tr = 29;
        space = 0;

        for (var c = 0; c < tileCcount; c++) {
            tiles[c] = [];  //Creating a 2D array
            for (var r = 0; r < tileRcount; r++) {
                tiles[c][r] = { x: c * (tileW + space), y: r * (tileH + space), state: 'e' }; // state is e for empty
            }
        }
        tiles[0][0].state = 's'; // s for start
        tiles[tileCcount - 1][tileRcount - 1].state = "f";

        document.getElementById('s1').value = 0;
        document.getElementById('s2').value = 0;
        document.getElementById('f1').value = 56;
        document.getElementById('f2').value = 28;
        document.getElementById('ne').innerHTML = 56;
        document.getElementById('wo').innerHTML = 28;
        onf.innerHTML = 'ON';
        flag = true;
    }
    else {
        canvas.height = 576;
        canvas.width = 940;
        mheight = 576;
        tileCcount = 41;
        tc = 41;
        tileRcount = 25;
        tr = 25;
        space = 3;
        for (var c = 0; c < tileCcount; c++) {
            tiles[c] = [];  //Creating a 2D array
            for (var r = 0; r < tileRcount; r++) {
                tiles[c][r] = { x: c * (tileW + space), y: r * (tileH + space), state: 'e' }; // state is e for empty
            }
        }
        tiles[0][0].state = 's'; // s for start
        tiles[tileCcount - 1][tileRcount - 1].state = "f";
        document.getElementById('s1').value = 0;
        document.getElementById('s2').value = 0;
        document.getElementById('f1').value = 40;
        document.getElementById('f2').value = 24;
        document.getElementById('ne').innerHTML = 40;
        document.getElementById('wo').innerHTML = 24;
        onf.innerHTML = 'OFF';
        flag = false;
    }
}

function fixsf() {
    /*stc = Math.floor(Math.random()*24);
    ftc = Math.floor(Math.random()*40);
    str = Math.floor(Math.random()*40);
    ftr = Math.floor(Math.random()*24);
    */
    var s1 = document.getElementById('s1').value;
    var s2 = document.getElementById('s2').value;
    var f1 = document.getElementById('f1').value;
    var f2 = document.getElementById('f2').value;
    let letters = /^[A-Za-z]+$/;
    var n1, n2;
    if (!flag) {
        n1 = 40;
        n2 = 24;
    }
    else {
        n1 = 56;
        n2 = 28;
    }
    if (s1 > n1 || s1 < 0 || s2 > n2 || s2 < 0 || f1 > n1 || f1 < 0 || f2 > n2 || f2 < 0) {
        alert("Entered coordinates exceeded the limits!!");
        Rst();
        return;
    }
    else if (s1 == f1 && s2 == f2) {
        alert("Entered same coordinates for starting and finishing point");
        Rst();
        return;
    }
    else if (s1.match(letters) || s2.match(letters) || f1.match(letters) || f2.match(letters)) {
        alert('No character allowed!');
        Rst();
        return;
    }
    else if (s1 == '') {
        s1 = 0;
    }
    else if (s2 == '') {
        s2 = 0;
    }
    else if (f1 == '') {
        f1 = 0;
    }
    else if (f2 == '') {
        f2 = 0;
    }

    for (var c = 0; c < tileCcount; c++)  //coloumns
    {
        tiles[c] = [];  //Creating a 2D array
        for (var r = 0; r < tileRcount; r++)   //rows
        {
            tiles[c][r] = { x: c * (tileW + space), y: r * (tileH + space), state: 'e' }; // state is e for empty
        }
    }

    tiles[parseInt(s1)][parseInt(s2)].state = 's'; // s for start
    tiles[parseInt(f1)][parseInt(f2)].state = "f";
}

function clear() {
    ctx.clearRect(0, 0, mwidth, mheight);
}
function drawrect(x = 10, y = 10, w = 10, h = 10, st = 'e')    //default values
{
    // ctx.shadowBlur = 15;
    // ctx.shadowColor = 'black';
    if (st == 'e') {
        // rgb hexa
        ctx.fillStyle = "#AAAAAA"; //grey: "#808080
    }
    else if (st == 's') {
        ctx.fillStyle = "#00d778"; //green -->#00ff00
    }
    else if (st == 'f') {
        ctx.fillStyle = "#fa4242"; //red-->#ff0000
    }
    else if (st == 'w') {
        ctx.fillStyle = "#293D52"; //blue -->#0000ff
    }
    else if (st == 'mn') {
        ctx.fillStyle = "#000000"; //yellow -->#ffff00
    }
    else if (st == 'x') {
        ctx.fillStyle = "#FFCC00"; //yellow -->#ffff00
    }
    else {
        ctx.fillStyle = "rgb(0,125,191)";
    }
    ctx.beginPath();
    ctx.fillRect(x, y, w, h);
    ctx.closePath();
}

function Rst() {
    clc.className = '';
    clw.className = '';
    isMineOn = false;
    for (var c = 0; c < tileCcount; c++)  //coloumns
    {
        tiles[c] = [];  //Creating a 2D array
        for (var r = 0; r < tileRcount; r++)   //rows
        {
            tiles[c][r] = { x: c * (tileW + space), y: r * (tileH + space), state: 'e' }; // state is e for empty
        }
    }
    tiles[0][0].state = 's'; // s for start
    tiles[tileCcount - 1][tileRcount - 1].state = "f";

    ot.innerHTML = '';
    document.getElementById('s1').value = 0;
    document.getElementById('s2').value = 0;
    if (!flag) {
        document.getElementById('f1').value = 40;
        document.getElementById('f2').value = 24;
    }
    else {
        document.getElementById('f1').value = 56;
        document.getElementById('f2').value = 28;
    }
    console.clear();
    t = true;
}

function draw() {
    clear();
    for (var c = 0; c < tileCcount; c++) {
        for (var r = 0; r < tileRcount; r++) {
            drawrect(tiles[c][r].x, tiles[c][r].y, tileW, tileH, tiles[c][r].state);
        }
    }
}

function main()    //kindda like the driver code for this file
{
    return setInterval(draw, 10);
}

function Move(e) {
    let x = e.pageX - canvas.offsetLeft;
    let y = e.pageY - canvas.offsetTop;


    for (var c = 0; c < tileCcount; c++) {
        for (var r = 0; r < tileRcount; r++) {
            if (c * (tileW + space) < x && x < c * (tileW + space) + tileW && r * (tileH + space) < y && y < r * (tileH + space) + tileH) {
                if (tiles[c][r].state == 'e' && (c != targetX || r != targetY)) {
                    tiles[c][r].state = 'w';
                    targetX = c;
                    targetY = r;
                }
                else if (tiles[c][r].state == 'w' && (c != targetX || r != targetY)) {
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

    for (var c = 0; c < tileCcount; c++) {
        for (var r = 0; r < tileRcount; r++) {
            if (c * (tileW + space) < x && x < c * (tileW + space) + tileW && r * (tileH + space) < y && y < r * (tileH + space) + tileH) {
                if (tiles[c][r].state == 'e') {
                    tiles[c][r].state = 'w';
                    //console.log("Changed");
                    targetX = c;
                    targetY = r;
                }
                else if (tiles[c][r].state == 'w') {
                    tiles[c][r].state = 'e';
                    targetX = c;
                    targetY = r;
                }
            }
        }
    }
}
function myUP() {
    canvas.onmousemove = null;// like remove-addlistner
}
function changeh() {
    var heur = document.getElementById('heur');
    var he = document.getElementById('bn3');
    heur.style.display = 'flex';
    he.style.display = 'none';
}

var isMineOn = false;
//For Visualization
let speedOfViz = 10;
let Visual = true;

function slowDown() {
    Visual = true;
    speedOfViz = 50;
}

function quest() {
    Visual = false;
}
function baseSpeed() {
    Visual = true;
    speedOfViz = 10;
}

function checkheur() {
    var ru = document.getElementById("heur");
    var sti = ru.options[ru.selectedIndex].value;
    if (sti == 'Manhattan') {
        return 'Manhatten';
    }
    else if (sti == 'Euclidian') {
        return 'Euclidean';
    }
    else if (sti == 'Chebyshev') {
        return 'Chebyshev';
    }
}
function distanceToFinish(xVal, yVal) {
    // Distance Methods:
    if (checkheur() == 'Manhattan')
        return Math.abs((xVal - 24)) + Math.abs((yVal - 24));
    else if (checkheur() == 'Euclidean')
        return Math.sqrt(Math.abs((xVal - 24) * (xVal - 24)) + Math.abs((yVal - 24) * (yVal - 24)));
    else if (checkheur() == 'Chebyshev')
        return Math.max(Math.abs(xVal - 24), Math.abs(yVal - 24));
}

function solveMaze() {
    var stc = parseInt(document.getElementById('s1').value);
    var str = parseInt(document.getElementById('s2').value);

    var m1 = parseInt(document.getElementById('m1').value);
    var m2 = parseInt(document.getElementById('m2').value);
    if (!isMineOn) {
        setTimeout(Solve(stc, str, 'f'), 0);
    }
    else if (isMineOn) {
        setTimeout(Solve(stc, str, 'mn'), 0);
        setTimeout(Solve(m1, m2, 'f'), 0);

    }

}

function sleeper(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function Solve(stc, str, state) {
    // Path-finding Algorithm
    // Acknowledgement & inspiration gray utopia: https://minstem.com/ & https://pathjs.herokuapp.com/#
    clc.className = "open";
    clw.className = "open";
    ispath = true;
    iswall = true;

    //var stc = parseInt(document.getElementById('s1').value);
    //var str = parseInt(document.getElementById('s2').value);
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
            if (tiles[xloc + 1][yloc].state == state) {
                pathFound = true;
                //minePathFound = true;
            }
        }
        if (yloc < tileRcount - 1) {
            if (tiles[xloc][yloc + 1].state == state) {
                pathFound = true;
                //minePathFound = true;
            }
        }
        if (xloc > 0) {
            if (tiles[xloc - 1][yloc].state == 'e') {
                aray.push([xloc - 1, yloc]);
                tiles[xloc - 1][yloc].state = tiles[xloc][yloc].state + 'l';
            }
        }
        if (xloc < tileCcount - 1) {
            if (tiles[xloc + 1][yloc].state == 'e') {
                aray.push([xloc + 1, yloc]);
                tiles[xloc + 1][yloc].state = tiles[xloc][yloc].state + 'r';
            }
        }
        if (yloc > 0) {
            if (tiles[xloc][yloc - 1].state == 'e') {
                aray.push([xloc, yloc - 1]);
                tiles[xloc][yloc - 1].state = tiles[xloc][yloc].state + 'u';
            }
        }
        if (yloc < tileRcount - 1) {
            if (tiles[xloc][yloc + 1].state == 'e') {
                aray.push([xloc, yloc + 1]);
                tiles[xloc][yloc + 1].state = tiles[xloc][yloc].state + 'd';
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
        visualize(path, pathLength, currX, currY, speedOfViz, Visual);
    }
    aray = [];
}

const visualize = async (path, pathLength, currX, currY, speed, none) => {
    for (var i = 0; i < pathLength - 1; i++) {
        if (none) {
            await sleeper(speed);
        }
        if (path.charAt(i + 1) == 'u') {
            currY -= 1;
        }
        if (path.charAt(i + 1) == 'd') {
            currY += 1;
        }
        if (path.charAt(i + 1) == 'r') {
            currX += 1;
        }
        if (path.charAt(i + 1) == 'l') {
            currX -= 1;
        }
        tiles[currX][currY].state = 'x';
    }
}

var currX = 1;
var currY = 1;


function walls() {
    Rst();
    for (var c = 0; c < tileCcount; c += 2) {
        for (var r = 0; r < tileRcount; r++) {
            tiles[c][r].state = 'w';
            //tiles[r][c].state = 'w';
        }
    }
    for (var c = 0; c < tileCcount; c++) {
        for (var r = 0; r < tileRcount; r += 2) {
            tiles[c][r].state = 'w';
        }
    }
    document.getElementById('s1').value = 1;
    document.getElementById('s2').value = 1;
    document.getElementById('f1').value = tileCcount - 2;
    document.getElementById('f2').value = tileRcount - 2;
    tiles[1][1].state = 's';
    tiles[tileCcount - 2][tileRcount - 2].state = 'f';

    console.log(tc + " and " + tr);

    recursion(currX, currY);

}

function ClearPath() {
    isMineOn = false;
    if (ispath) {
        clc.className = '';
        ispath = false;
    }
    ot.innerHTML = "";
    for (var c = 0; c < tileCcount; c++) {
        for (var r = 0; r < tileRcount; r++) {
            //console.log(tiles[c][r].state);
            if (tiles[c][r].state == 'x' || (tiles[c][r].state).includes('u') || (tiles[c][r].state).includes('d') || (tiles[c][r].state).includes('l') || (tiles[c][r].state).includes('r')) {
                tiles[c][r].state = 'e';
            }
        }
    }
}
function ClearWalls() {
    if (iswall) {
        clw.className = '';
        iswall = false;
    }
    for (var c = 0; c < tileCcount; c++) {
        for (var r = 0; r < tileRcount; r++) {
            if (tiles[c][r].state == 'w') {
                tiles[c][r].state = 'e';
            }
        }
    }
}

function randomaze(n = 320) {
    var slider = document.getElementById("range");
    if (flag) {
        slider.value = 500;
    }
    else {
        //slider.value = 320;
        n = parseInt(slider.value);
    }
    ClearWalls();
    n = parseInt(slider.value);
    console.log(n);
    var stc = parseInt(document.getElementById('s1').value);
    var str = parseInt(document.getElementById('s2').value);
    var ftc = parseInt(document.getElementById('f1').value);
    var ftr = parseInt(document.getElementById('f2').value);
    for (var i = 0; i < n; i++) {
        var x = Math.floor(Math.random() * tileRcount);
        var y = Math.floor(Math.random() * tileCcount);
        tiles[y][x].state = 'w';
    }
    tiles[stc][str].state = 's';
    tiles[ftc][ftr].state = 'f';
    tiles[stc + 1][str].state = 'e';
    tiles[stc][str + 1].state = 'e';
    tiles[ftc - 1][ftr].state = 'e';
    tiles[ftc][ftr - 1].state = 'e';
}

function ShowC() {
    var crd = document.getElementById('crd');
    crd.style.display = 'flex';
    crd.className = 'ctr';
    if (!flag) {
        document.getElementById('ne').innerHTML = 40;
        document.getElementById('wo').innerHTML = 24;
    }
    else {
        document.getElementById('ne').innerHTML = 56;
        document.getElementById('wo').innerHTML = 28;
    }
}
//The mine part is not perfect ...

function showMine() {
    var cr2 = document.getElementById('crde2');
    cr2.style.display = 'flex';
    cr2.className = 'mine';
}

function setMine() {
    var m1 = document.getElementById('m1').value;
    var m2 = document.getElementById('m2').value;
    if (m1 > tc - 1 || m1 < 0 || m2 > tr - 1 || m2 < 0 || m1 == '' || m2 == '') {
        alert('The entry is not valid!!');
    }
    tiles[m1][m2].state = 'mn';
    isMineOn = true;
}

let swt = document.getElementById('switch');
//dark();
function drak() {
    if (swt.checked) {
        canvas.className = "dark";
        body.className = 'dark';
    }
    else {
        canvas.className = "";
        body.className = '';
    }
}
function detectMob() {
    // var check = ( ( window.innerWidth <= 800 ) && ( window.innerHeight <= 600 ) );
    //Stack overflow
    if (typeof window.orientation !== 'undefined') {
        alert("Open this website in your Computer for full experience!!\n Its not meant for phone.\n Enjoy!!");
    }
}

// setTimeout(()=>{alert("Welcome! \nInstruction:\nTest your skills and form a maze by clicking on the tiles to form walls.\nUse your mouse/trackpad to click on the tile and right click and drag for selecting multiple tiles. Click Solve to find the shortest path and hit reset to work out on a new Maze pattern.\nNOTE:\nUse laptop or PC for full experience.\n Enjoy!!");},0); //Using arrow function

setTimeout(detectMob, 0);

setTimeout(() => {
    if (confirm("Do you want Maze background to be dark?")) {
        canvas.className = "dark";
        body.className = 'dark';
        swt.checked = true;
    }
    else
        swt.checked = false;
}, 2);

let usr = ["Scholar", "Nobody", "Gamer", "User", "Great mind", "Person", "Solver", "Coder"];
let rnd = Math.floor(Math.random() * usr.length);
setTimeout(() => {
    let name = prompt("What should we call you?", "Enter");
    if (name == null || name == "" || name == "Enter") {
        name = usr[rnd]; //Gamer,person,User anything
        document.getElementById('name').innerText = 'Welcome!' + ' ' + name;
    }
    else if (name == "Arkaraj") {
        document.getElementById('name').innerText = 'Welcome!' + ' ' + "Creator";
        hidePanel('hide');
        Visual = false;
    }
    else {
        document.getElementById('name').innerText = 'Welcome!' + ' ' + name;
    }
}, 1);

main();
canvas.onmousedown = Clickwall; // This also works //canvas.addEventListener("mousedown",Clickwall);
canvas.onmouseup = myUP;

function cgenah() {
    var hat = document.getElementById('crde');
    hat.className = 'add';
    hat.style.display = 'flex';
}

var slider = document.getElementById("range");
var output = document.getElementById("here");
output.innerHTML = 'Value: ' + slider.value;

slider.oninput = function () {
    output.innerHTML = 'Value: ' + this.value;
}

var pageContent = document.getElementById('infor');
var info1 = document.getElementById('info');
var info2 = document.getElementById('toleft');
var pageNo = document.getElementById('pageno');
var next = document.getElementById('next');
var prev = document.getElementById('prev');
var pno = 1;

function Nextpage() {
    if (pno == 1) {
        pageNo.innerHTML = '2/5';
        pno = 2;
    }
    else if (pno == 2) {
        pageNo.innerHTML = '3/5';
        pno = 3;
    }
    else if (pno == 3) {
        pageNo.innerHTML = '4/5';
        pno = 4;
    }
    else if (pno == 4) {
        pageNo.innerHTML = '5/5';
        pno = 5;
    }
    else if (pno == 5) {
        pageNo.innerHTML = '1/5';
        pno = 1;
    }
    //pageContent.innerHTML = '<h1>Next Page</h1>';
    content();
}

function Prevpage() {
    if (pno == 1) {
        pageNo.innerHTML = '5/5';
        pno = 5;
    }
    else if (pno == 2) {
        pageNo.innerHTML = '1/5';
        pno = 1;
    }
    else if (pno == 3) {
        pageNo.innerHTML = '2/5';
        pno = 2;
        pageContent.innerHTML = '<h1>Prev Page</h1>';
    }
    else if (pno == 4) {
        pageNo.innerHTML = '3/5';
        pno = 3;
        pageContent.innerHTML = '<h1>Prev Page</h1>';
    }
    else if (pno == 5) {
        pageNo.innerHTML = '4/5';
        pno = 4;
        pageContent.innerHTML = '<h1>Prev Page</h1>';
    }
    content();
}

function content() {
    if (pno == 1) {
        pageContent.innerHTML = '<p id="info">' + info1.innerHTML + '<div id="toleft">' + info2.innerHTML + '</div></p>';

    }
    else if (pno == 2) {
        pageContent.innerHTML = '<br><br><img src="./Images/Editor_Panel.png" width="500" height="426"><br><h4>The main Editor Panel allows you to Change the Starting and Ending Coordinates.<br>The Edit randomizer basically allows you to change the number of walls density for Random maze Generator.<br>The add a mine lets you fix a mine/target at any coordinate and on clicking solve it will have to go through the mine before it reaches the finish/end point.Though it is not accurate and still has bugs in it, due to visited nodes can՚t be backtracked by my algorithm....</h4>'
    }
    else if (pno == 3) {
        pageContent.innerHTML = '<br><img src="./Images/drop_down.png"><br><h4>This is a Drop-Down menu list on automatic maze generator. For random maze genrator you can increase or decrease the no. of walls by going to Edit randomizer in the editor panel.<br>Recursive Backtraking as the name suggests it is done by recursive bact. Algorithm.<br>Once the Maze is generated you can change/Edit it with your mouse/trackpad.<br>Also Prim՚s Algorithm ain՚t gonna come!!</h4>'
    }
    else if (pno == 4) {
        pageContent.innerHTML = '<br><img src="./Images/maze_dwn.jpeg"><br><h4>You can now Download the maze after solving it!!<br>Also you can move around this Insturction Panel<br>|| To bring up the intro panel again click spacebar or Enter ||</h4>'
    }
    else if (pno == 5) {
        pageContent.innerHTML = '<br><br><h2 style="font-family:cursive;color:#fff;">❝Life is like a maze from which we can never escape. Every decision takes us in a different direction and every decision for something is a decision against something else.❞</h2>'
    }

}

function Save() {
    //I saw this function in a youtube tutorial...
    const a = document.createElement('a');
    //For IE/Edge.... who uses this again:(
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(canvas.msToBlob(), "maze_solve.png")
    }
    else {
        document.body.appendChild(a);
        a.href = canvas.toDataURL("image/jpeg");
        a.download = 'maze_solve.jpeg';
        a.click();
        document.body.removeChild(a);
    }
}

//This is from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_draggable for dragging an html element
var isPanel = true;

function showintro(e) {
    if ((e.keyCode == 32 || e.keyCode == 13) && !isPanel) {
        var hide = document.getElementById('hide');
        hide.style.display = 'flex';
        isPanel = true;
        e.preventDefault();
    }
    else if ((e.keyCode == 32 || e.keyCode == 13) && isPanel) {
        var hide = document.getElementById('hide');
        hide.style.display = 'none';
        isPanel = false;
        e.preventDefault();
    }
    //e.preventDefault();
}

window.addEventListener('keypress', showintro);

moveit("panel"); //whatever id is given in css position:absolute must be done

moveit('crd');
moveit('crde');
moveit('crde2');

function moveit(slide) {
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
function hidePanel(hide) {
    var hide = document.getElementById(hide);
    hide.style.display = 'none';
    isPanel = false;
    //hide.className = 'hid';
}
//Most time taken for this but it was worth it i am proud of myslef!!
var visited = [[currX, currY]];
var cr = false, cl = false, cu = false, cd = false;
var dirlist = [];


function canmove(cmx, cmy) {
    if (cmx == 1) {
        isrfree(cmx, cmy);
        isufree(cmx, cmy);
        isdfree(cmx, cmy);
        t = true;
        return true;
    }
    else if (cmy == 1) {
        isrfree(cmx, cmy);
        islfree(cmx, cmy);
        isdfree(cmx, cmy);
        t = true;
        return true;
    }
    else if (cmx == tc - 2) {
        islfree(cmx, cmy);
        isufree(cmx, cmy);
        isdfree(cmx, cmy);
        t = true;
        return true;
    }
    else if (cmy == tr - 2) {
        isrfree(cmx, cmy);
        islfree(cmx, cmy);
        isufree(cmx, cmy);
        t = true;
        return true;
    }
    if (tiles[cmx + 2][cmy].isvisited && tiles[cmx][cmy - 2].isvisited && tiles[cmx][cmy + 2].isvisited && tiles[cmx - 2][cmy].isvisited) {
        return false;
    }
    else {
        isrfree(cmx, cmy);
        islfree(cmx, cmy);
        isufree(cmx, cmy);
        isdfree(cmx, cmy);
        return true;
    }
}
function isrfree(rx, ry) {
    if (rx + 2 <= tc - 2 && rx >= 1 && ry >= 1 && ry <= tr - 2) {
        if (!tiles[rx + 2][ry].isvisited) {
            cr = true;
            dirlist.push('r');
        }
    }
}
function islfree(lx, ly) {
    if (lx <= tc - 2 && lx - 2 >= 1 && ly >= 1 && ly <= tr - 2) {
        if (!tiles[lx - 2][ly].isvisited) {
            cl = true;
            dirlist.push('l');
        }
    }
}
function isufree(ux, uy) {
    if (ux <= tc - 2 && ux >= 1 && uy - 2 >= 1 && uy <= tr - 2) {

        if (!tiles[ux][uy - 2].isvisited) {
            cu = true;
            dirlist.push('u');
        }

    }
}
function isdfree(wx, wy) {
    if (wx <= tc - 2 && wx >= 1 && wy >= 1 && wy + 2 <= tr - 2) {

        if (!tiles[wx][wy + 2].isvisited) {
            cd = true;
            dirlist.push('d');
        }

    }
}

function moveInRandomDirection(cx, cy, dir) {
    //console.log('moves that are available are:' + dir);
    if (dir.length > 0) {
        let mv = Math.floor(Math.random() * dir.length);
        let d = dir[mv];
        //console.log(d);
        tiles[dx][dy].isvisited = true;
        if (d == 'r') {
            tiles[dx + 1][dy].state = 'e';
            dx += 2;
        }
        else if (d == 'l') {
            tiles[dx - 1][dy].state = 'e';
            dx -= 2;
        }
        else if (d == 'u') {
            tiles[dx][dy - 1].state = 'e';
            dy -= 2;
        }
        else if (d == 'd') {
            tiles[dx][dy + 1].state = 'e';
            dy += 2;
        }
        dir = [];
    }
    else {
        if (tiles[dx - 1][dy].state == 'w' || tiles[dx][dy - 1].state == 'w' || tiles[dx][dy + 1].state == 'w' || tiles[dx + 1][dy].state == 'w') {
            tiles[dx][dy].isvisited = true;

            //console.log('No, there is no unvisited node');
            //Backtrack
            //This won't work
            dx = visited[visited.length - 2][0];
            dy = visited[visited.length - 2][1];
            if (dx == 1 && dy == 1) {
                t = false;
            }
            //console.log('Backtracked x is: '+dx+'\nBacktracked y is: '+dy);
            visited.pop();
            recursion(dx, dy);
        }
        else {
            t = false;
        }
        //t = false;
    }
}

var dx, dy;
let t = true;

function recursion(x, y) {
    dx = x;
    dy = y;

    //console.log(t);

    if (t) {
        if (canmove(x, y)) {
            //console.log('Yes there are unvisited node');
            moveInRandomDirection(x, y, dirlist);
            dirlist = [];
            //console.log('current x is: '+dx+'\ncurrent y is: '+dy);
            visited.push([dx, dy]);
            recursion(dx, dy);
        }
        else {
            //This did'nt work
            tiles[dx][dy].isvisited = true;

            //console.log('No, there is no unvisited node');
            //Backtrack
            dx = visited[visited.length - 2][0];
            dy = visited[visited.length - 2][1];
            //console.log('Backtracked x is: '+dx+'\nBacktracked y is: '+dy);
            visited.pop();
            recursion(dx, dy);
        }
    }
    else {
        console.log('Done');
    }
}

/*var flag = false;
function adjust(){
    if(!flag)
    {
        document.body.style.zoom = 0.8;
        flag = true;
    }
    else
    {
        document.body.style.zoom = 1;
        flag = false;
    }
}*/
//export {drak};
//End!!
//Arkaraj - 28/4/20