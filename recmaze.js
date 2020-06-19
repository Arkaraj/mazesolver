
var can = document.getElementById('maze');
var ctx = can.getContext('2d');

can.style.background = 'dimgray';

var tiles = [];
var tc = 71,tr = 37;
var tileH = 20,tileW = 20;
var currX = 1;
var currY = 1;

for(var c = 0; c < tc; c++)
{
    tiles[c] = [];
    for(var r = 0;r < tr; r++)
    {
        tiles[c][r] = {
            x:c*tileW,
            y:r*tileH,
            state:'e',
            isvisited: false
        };
    }
}
tiles[currX][currY].state = 's';
tiles[currX][currY].isvisited = true;
tiles[tc-2][tr-2].state = 'f';

var show = document.getElementById('show');
show.innerHTML = 0;

//Timer 
//This function is taken from a game-master's github
function startTimer(duration, display) {
        var start = Date.now(),
            diff,
            minutes,
            seconds;

        function timer() {
            if(playing) {
                diff = duration - (((Date.now() - start) / 1000) | 0);
                minutes = (diff / 60) | 0;
                seconds = (diff % 60) | 0;
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                display.textContent = "Timer: " + minutes + ":" + seconds;

                if (diff <= 0) {
                    display.textContent = "Game Over";
                    start = Date.now() + 1000;
                    playing = false;
                    alert('U ran out of time!!');
                }
            }
        };
        timer();
        setInterval(timer,1000)
    }
    var strt = document.getElementById('panel');

    setTimeout(() => {
        twominutes = 120;
        x = document.querySelector("#timer");
        startTimer(twominutes,x)
    },3000);
    var playing = false;


function walls()
{
    for(var c = 0; c < tc; c+=2)
    {
        for(var r = 0;r < tr; r++)
        {
            tiles[c][r].state = 'w';
            //tiles[r][c].state = 'w';
        }
    }
    for(var c = 0; c < tc; c++)
    {
        for(var r = 0;r < tr; r+=2)
        {
            tiles[c][r].state = 'w';
            
        }
    }
    
}
function drawrect(x,y,w,h,st = 'e')
{
    if(st == 'e')
    {
        ctx.fillStyle = "#94B1A3"; 
    }
    else if(st == 's')
    {
        ctx.fillStyle = "#008700"; 
    }
    else if(st == 'f')
    {
        ctx.fillStyle = "#ff0000"; 
    }
    else if(st == 'w')
    {
        ctx.fillStyle = "#293D52"; 
    }
    else if(st == 'x')
    {
        ctx.fillStyle = "#FFCC00"; 
    }
    else
    {
        ctx.fillStyle = "#00E172";//rgb(0,125,191)
    }
    ctx.beginPath();
    ctx.fillRect(x,y,w,h);
    ctx.closePath();
}
walls();
function draw()
{
    //walls();
    for(var c = 0; c < tc; c++)
    {
        for(var r = 0;r < tr; r++)
        {
            drawrect(tiles[c][r].x,tiles[c][r].y,tileW,tileH,tiles[c][r].state);
        }
    }
}
//draw();
var right = false,left = false,up = false,down = false;
var index = 0;
function kd(e)
{
switch(e.keyCode)
{
    case 38:
        up = true;
        //console.log('up');
        e.preventDefault();
        break;
    case 87:
        up = true;
        //console.log('up');
        e.preventDefault();
        break;
    case 37:
        left = true
        //console.log('left');
        e.preventDefault();
        break;
    case 65:
        left = true
        //console.log('left');
        e.preventDefault();
        break;
    case 39:
        right = true;
        //console.log('right');
        e.preventDefault();
        break;
    case 68:
        right = true;
        //console.log('right');
        e.preventDefault();
        break;
    case 40:
        down = true;
        //console.log('down');
        e.preventDefault();
        break;
    case 83:
        down = true;
        //console.log('down');
        e.preventDefault();
        break;
}
}
function ku(e)
{
switch(e.keyCode)
{
    case 38:
        up = false;
        break;
    case 87:
        up = false;
        break;
    case 37:
        left = false;
        break;
    case 65:
        left = false;
        break;
    case 39:
        right = false;
        break;
    case 68:
        right = false;
        break;
    case 40:
        down = false;
        break;
    case 83:
        down = false;
        break;
}
}

function logic()
{
if(right && currX < tc-2 && tiles[currX+1][currY].state != 'w')
{
    currX +=1;
    tiles[currX-1][currY].state = 'sr';
    index += 1;
    show.innerHTML = index;
}
else if(left && currX > 1 && tiles[currX-1][currY].state != 'w')
{
    currX -=1;
    tiles[currX+1][currY].state = 'sl';
    index += 1;
    show.innerHTML = index;
        
}
else if(up && currY>1 &&tiles[currX][currY-1].state != 'w')
{
    currY -=1;
    tiles[currX][currY+1].state = 'su';
    index += 1;
    show.innerHTML = index;
        
}
else if(down && currY < tr-2 &&tiles[currX][currY+1].state != 'w')
{
    currY +=1;
    tiles[currX][currY-1].state = 'sd';
    index += 1;
    show.innerHTML = index;
        
}
if(currX == tc-2 && currY == tr-2)
{
    won();
    index = 0;
    show.innerHTML = index;
    return;
}
tiles[currX][currY].state = 's';
}

var visited =[[currX,currY]];
var cr = false,cl = false,cu = false,cd = false;
var dirlist = [];

function canmove(cmx,cmy)
{
    if(cmx == 1)
    {
        isrfree(cmx,cmy);
        isufree(cmx,cmy);
        isdfree(cmx,cmy);
        t = true;
        return true;
    }
    else if(cmy == 1)
    {
        isrfree(cmx,cmy);
        islfree(cmx,cmy);
        isdfree(cmx,cmy);
        t = true;
        return true;
    }
    else if(cmx == tc - 2)
    {
        islfree(cmx,cmy);
        isufree(cmx,cmy);
        isdfree(cmx,cmy);
        t = true;
        return true;
    }
    else if(cmy == tr - 2)
    {
        isrfree(cmx,cmy);
        islfree(cmx,cmy);
        isufree(cmx,cmy);
        t = true;
        return true;
    }
    if(tiles[cmx+2][cmy].isvisited && tiles[cmx][cmy-2].isvisited && tiles[cmx][cmy+2].isvisited &&  tiles[cmx-2][cmy].isvisited)
    {
        return false;
    }
    else
    {
        isrfree(cmx,cmy);
        islfree(cmx,cmy);
        isufree(cmx,cmy);
        isdfree(cmx,cmy);
        return true;    
    }
}
function isrfree(rx,ry)
{
    if(rx + 2 <= tc-2 && rx >= 1 && ry >= 1 && ry <= tr-2)
    {
        if(!tiles[rx+2][ry].isvisited)
        {
            cr = true;
            dirlist.push('r');
        }
    }
}
function islfree(lx,ly)
{
    if(lx <= tc-2 && lx-2 >= 1 && ly >= 1 && ly <= tr-2)
    {
        if(!tiles[lx-2][ly].isvisited)
        {
            cl = true;
            dirlist.push('l');
        }
    }
}
function isufree(ux,uy)
{
    if(ux <= tc-2 && ux >= 1 && uy-2 >= 1 && uy <= tr-2)
    {

        if(!tiles[ux][uy-2].isvisited)
        {
            cu = true;
            dirlist.push('u');
        }

    }
}
function isdfree(wx,wy)
{
    if(wx <= tc-2 && wx >= 1 && wy >= 1 && wy+2 <= tr-2)
    {

        if(!tiles[wx][wy+2].isvisited)
        {
            cd = true;
            dirlist.push('d');
        }

    }
}

function moveInRandomDirection(cx,cy,dir)
{
    //console.log('moves that are available are:' + dir);
    if(dir.length > 0)
    {
        let mv = Math.floor(Math.random()*dir.length);
        let d = dir[mv];
        console.log(d);
        tiles[dx][dy].isvisited = true;
        if(d == 'r')
        {
            tiles[dx+1][dy].state = 'e';
            dx+=2;
        }
        else if(d == 'l')
        {
            tiles[dx-1][dy].state = 'e';
            dx-=2;
        }
        else if(d == 'u')
        {
            tiles[dx][dy-1].state = 'e';
            dy-=2;
        }
        else if(d == 'd')
        {
            tiles[dx][dy+1].state = 'e';
            dy+=2;
        }
        dir = [];     
    } 
    else{
        if(tiles[dx-1][dy].state == 'w' || tiles[dx][dy-1].state == 'w' || tiles[dx][dy+1].state == 'w' ||tiles[dx+1][dy].state == 'w')
        {
            tiles[dx][dy].isvisited = true;
            
            //console.log('No, there is no unvisited node');
            //Backtrack
            //This won't work
            dx = visited[visited.length - 2][0];
            dy = visited[visited.length - 2][1];
            if(dx == 1 && dy == 1)
            {
                t = false;
            }
            //console.log('Backtracked x is: '+dx+'\nBacktracked y is: '+dy);
            visited.pop();
            recursion(dx,dy);
        }
        else{
            t = false;
        }
        //t = false;
    } 
}

var dx,dy;
let t = true;

function recursion(x,y)
{
    dx = x;
    dy = y;
    
    //console.log(t);
    
    if(t)
    {
        if(canmove(x,y))
        {
            //console.log('Yes there are unvisited node');
            moveInRandomDirection(x,y,dirlist);
            dirlist = [];
            //console.log('current x is: '+dx+'\ncurrent y is: '+dy);
            visited.push([dx,dy]);
            recursion(dx,dy);
        }
        else{
            //This did'nt work
            tiles[dx][dy].isvisited = true;
            
            //console.log('No, there is no unvisited node');
            //Backtrack
            dx = visited[visited.length - 2][0];
            dy = visited[visited.length - 2][1];
            //console.log('Backtracked x is: '+dx+'\nBacktracked y is: '+dy);
            visited.pop();
            recursion(dx,dy);      
        }
    }
    else{
        console.log('Done');
    }
}
recursion(currX,currY);

// for(var i = 0; i < 5; i++)
// {
//     recursion(dx,dy);
// }


function won()
{
    //alert('success!!');
    console.log('Done!');
    location.reload();
}

setInterval(draw,0);
setInterval(logic,100);

window.addEventListener('keydown',kd);
window.addEventListener('keyup',ku);


//From mazesolver.js
moveit('panel');
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
    isPanel = false;
    //hide.className = 'hid';
}

var isPanel = true;

function showintro(e)
{
    if((e.keyCode == 32 || e.keyCode == 13) && !isPanel) 
    {
        var hide = document.getElementById('hide');
        hide.style.display = 'flex';
        isPanel = true;
        playing = false;
        e.preventDefault();
    }
    else if((e.keyCode == 32 || e.keyCode == 13) && isPanel)
    {
        var hide = document.getElementById('hide');
        hide.style.display = 'none';
        isPanel = false;
        playing = true;
        e.preventDefault();
    }
    //e.preventDefault();
}

window.addEventListener('keypress',showintro);

function Save()
{
    //I saw this function in a youtube tutorial...
    const a = document.createElement('a');
        //For IE/Edge.... who uses this again:(
        if(window.navigator.msSaveBlob){
            window.navigator.msSaveBlob(can.msToBlob(),"mazegen_solve.png")
        }
        else 
        {
            document.body.appendChild(a);
            a.href = can.toDataURL("image/jpeg");
            a.download = 'mazegen_solve.jpeg';
            a.click();
            document.body.removeChild (a);
        }
}