//Dragon is coming...
//Site is not Complete yet...
var can = document.getElementById('solveMaze');
var ctx = can.getContext('2d');

can.style.background = 'dimgray';
let lvl = 1;
var tiles = [];

var tc = 71,tr = 37;
var tx = Math.floor(tc/2);
var tm = 13;
var tileH = 20,tileW = 20;
var currX = 1;
var currY = 1;
var win = false;
var gameWin = false;

var pld = "./Images/player.png",pll = "./Images/player_l.png",plu = "./Images/player_u.png",plr = "./Images/player_r.png";

var mazeIntro = document.getElementById('mazeIntro');

var player = new Image();
//player.crossOrigin = "anonymous";
player.src = pld;

var player_r = new Image();
player_r.src = plr;

var player_u = new Image();
player_u.src = plu;

var player_l = new Image();
player_l.src = pll;

var stairs = new Image();
stairs.src = "./Images/stairs.png";

var key = new Image();
key.src = "./Images/key.png";

var treasure = new Image();
treasure.src = "./Images/treasure.png";

var healthIcn = new Image();
healthIcn.src = "./Images/health.png";

var bombIcn = new Image();
bombIcn.src = "./Images/bomb.png";

var pickaxeImg = new Image();
pickaxeImg.src = "./Images/pickaxe.png";

var wallImg = new Image();
wallImg.src = "./Images/wall.png";

var wallImg2 = new Image();
wallImg2.src = "./Images/wall3.png";

var wallImg4 = new Image();
wallImg4.src = "./Images/wall4.png";

var pstar = new Image();
pstar.src = "./Images/pstar.png";

var lvti = new Image();
lvti.src = "./Images/lava.png";

var shoot = new Image();
shoot.src = "./Images/shuriken.png";

var fireSpit = new Image();
fireSpit.src = "./Images/fire_ball.png";

var fireSpit2 = new Image();
fireSpit2.src = "./Images/fire_ball2.png";

//Behold the DRAGON!!
//https://www.pngitem.com/
var dragon = new Image();
dragon.src = "./Images/dragon.png";

var drwall = new Image();
drwall.src = "./Images/drag_walls.png";

var skull = new Image();
skull.src = "./Images/skull.png";

var drx = 240,dry = 360;
var cdy = 20; //Should't 15*20...
var dheight = 360;
var dv = 1;
var eye = tr/2;

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

var hide = document.getElementById('hide');

var highScore = document.getElementById('higsc');
var currentScore = document.getElementById('curscr');
const Save_highScore = "Best Maze score";
var hscore = 0;
var checkScore = 0;
var index = 0;
var seconds = 300;
var sc1 = 0;
var scl = [];

var showScore = localStorage.getItem(Save_highScore);

if(showScore == null)
    {
        hscore = 0;
    }
    else
    {
        hscore = parseInt(showScore);
    }
    function initialScore()
    {
        checkScore = parseInt((seconds/index)*1000);
        if(index == 0)
        {
            checkScore = "It's over 9000!!";
        }
        currentScore.innerHTML = checkScore;
        highScore.innerHTML = hscore;
    }

    function getScore()
    {
        //checkScore = ((seconds/index)*1000);
        if(win)
        {
            scl.push(checkScore);
            sc1 += checkScore;
            if(checkScore > hscore)
            {
                hscore = checkScore;
                localStorage.setItem(Save_highScore,hscore);
            }
        }else{
            hscore = 0;
        }
    }

    setInterval(initialScore,300);
var ti = document.getElementById("timer");

var timer;
function time()
{
ti.innerHTML = "Timer: "+ seconds+" sec";
    if(seconds < seconds) {
        ti.innerHTML = seconds;
    }
        if (seconds > 0 ) {
            seconds--;
        } else {
            clearInterval(timer);
            alert('You ran out of time');
            ti.innerHTML = 'Game Over';
            gameWin = false;
            verdict.innerHTML = "You Ran Out Of Time";
        }
}
function loop() {
    if(!timer)
    {
        timer = window.setInterval(time, 1000);
    }  
} 
//loop();

function checktime()
{
    if(!isPanel)
    {
        loop();
    }
else{
    //console.log('Reading instruction ...');
}
}

setInterval(checktime,10);

var axel = document.getElementById('piaxe');
var axe = 0;

function walls()
{
    for(var c = 0; c < tc; c+=2)
    {
        for(var r = 0;r < tr; r++)
        {
            tiles[c][r].state = 'w';
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
function lvwalls()
{
    for(var c = 0; c < tx; c+=2)
    {
        for(var r = 0;r < tr; r++)
        {
            tiles[c][r].state = 'w';
        }
    }
    for(var c = 0; c < tx; c++)
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
    else if(st == 'dr')
    {
        ctx.beginPath();
        ctx.drawImage(lvti,0,0,20,20,x,y,w,h);
        ctx.closePath();
        return; 
    }
    else if(st == 'sku')
    {
        ctx.beginPath();
        ctx.drawImage(skull,0,0,20,20,x,y,w,h);
        ctx.closePath();
        return; 
    }
    else if(st == 'fir')
    {
        ctx.beginPath();
        ctx.drawImage(fireSpit,0,0,20,20,x,y,w,h);
        ctx.closePath();
        return; 
    }
    else if(st == 'fiw')
    {
        ctx.beginPath();
        ctx.drawImage(fireSpit2,0,0,20,20,x,y,w,h);
        ctx.closePath();
        return; 
    }
    else if(st == 's')
    {
        //ctx.fillStyle = "#008700"; 
        ctx.beginPath();
        if(right)
        {
            ctx.drawImage(player_r,0,0,20,20,x,y,w,h);
        }
        else if(left)
        {
            ctx.drawImage(player_l,0,0,20,20,x,y,w,h);
        }
        else if(up)
        {
            ctx.drawImage(player_u,0,0,20,20,x,y,w,h);
        }
        else if(down)
        {
            ctx.drawImage(player,0,0,20,20,x,y,w,h);
        }
        else{
            //ctx.drawImage(player,0,0,20,20,x,y,w,h);
            if(!starEaten)
            {
                ctx.fillStyle = "#000000";
                ctx.beginPath();
                ctx.fillRect(x,y,w,h);
                ctx.closePath();
                ctx.fillStyle = "#ffffff";
                ctx.beginPath();
                ctx.fillRect(x+4,y+9,4,7);
                ctx.fillRect(x+14,y+9,4,7);
                ctx.closePath();
            }
            else
            {
                ctx.fillStyle = "#ffffff";
                ctx.beginPath();
                ctx.fillRect(x,y,w,h);
                ctx.closePath();
                ctx.fillStyle = "#000000";
                ctx.beginPath();
                ctx.fillRect(x+4,y+9,4,7);
                ctx.fillRect(x+14,y+9,4,7);
                ctx.closePath();
            }  
        }
        ctx.closePath();
        return;
    }
    else if(st == 'f')
    {
        if(lvl == 4)
        {
            try {
                if(!hasCrossed)
                {
                    ctx.beginPath();
                    ctx.drawImage(key,0,0,20,20,x,y,w,h);
                    ctx.closePath();
                    return;
                }else{
                    ctx.beginPath();
                    ctx.drawImage(treasure,0,0,20,20,x,y,w,h);
                    ctx.closePath();
                    return;
                }
            } catch (error) {
               ctx.fillStyle = "#ff0000";  
            }
        }
        else{
            ctx.beginPath();
            ctx.drawImage(stairs,0,0,20,20,x,y,w,h);
            ctx.closePath();
            return;
        }
        
    }
    else if(st == 'str')
    {
        ctx.beginPath();
        ctx.drawImage(pstar,0,0,20,20,x,y,w,h);
        ctx.closePath();
        return;
    }
    else if(st == 'w')
    {
        if(lvl == 1)
        {
            ctx.fillStyle = "#293D52"; 
        }
        else if(lvl == 2){
            ctx.beginPath();
            ctx.drawImage(wallImg,0,0,20,20,x,y,w,h);
            ctx.closePath();
            return;
        } 
        else if(lvl == 3){
            ctx.beginPath();
            ctx.drawImage(wallImg2,0,0,20,20,x,y,w,h);
            ctx.closePath();
            return;
        }
        else{
            ctx.beginPath();
            ctx.drawImage(wallImg4,0,0,20,20,x,y,w,h);
            ctx.closePath();
            return;
        }
    }
    else if(st == 'h')
    {
        //ctx.fillStyle = '#00aaff';
        ctx.beginPath();
        ctx.drawImage(healthIcn,0,0,20,20,x,y,w,h);
        ctx.closePath();
        return;
    }
    else if(st == 'b')
    {
        ctx.beginPath();
        //ctx.fillStyle = '#000000';
        ctx.drawImage(bombIcn,0,0,20,20,x,y,w,h);
        ctx.closePath();
        return; 
    }
    else if(st == 'bl')
    {
        ctx.beginPath();
        ctx.drawImage(shoot,0,0,20,20,x,y,w,h);
        ctx.closePath();
        return; 
    }
    else if(st == 'pt')
    {
        ctx.beginPath();
        ctx.fillStyle = "tomato"; 
        ctx.arc(x+10,y+10,8*Math.sqrt(2),0,2*Math.PI);
        ctx.fill();
        ctx.closePath();
        return;
    }
    else if(st == 'pt2')
    {
        ctx.beginPath();
        ctx.fillStyle = "orange"; 
        ctx.arc(x+10,y+10,8*Math.sqrt(2),0,2*Math.PI);
        ctx.fill();
        ctx.closePath();
        return;
    }
    else if(st == 'axe')
    {
        ctx.beginPath();
        ctx.drawImage(pickaxeImg,0,0,20,20,x,y,w,h);
        ctx.closePath();
        return;

    }
    else
    {
        ctx.fillStyle = "#00E172";//rgb(0,125,191)
    }
    ctx.beginPath();
    ctx.fillRect(x,y,w,h);
    ctx.closePath();
}
function drawDragon(x,y)
{
    ctx.beginPath();
    ctx.drawImage(dragon,0,0,drx,dry,x,y,drx,dry);
    ctx.closePath();
    return;
}

walls();
var hasCrossed = false;
var dHealth = 215;
var dHealthColor = "#00ff00";

function draw()
{
    if(lvl != 4)
    {
        for(var c = 0; c < tc; c++)
        {
            for(var r = 0;r < tr; r++)
            {
                drawrect(tiles[c][r].x,tiles[c][r].y,tileW,tileH,tiles[c][r].state);
            }
        }
    }
    else{
        for(var c = 0; c < tc-tm-1; c++)
        {
            for(var r = 0;r < tr; r++)
            {
                drawrect(tiles[c][r].x,tiles[c][r].y,tileW,tileH,tiles[c][r].state);
            }
        }
        for(var c = tc-1; c < tc; c++)
        {
            for(var r = 0;r < tr; r++)
            {
                drawrect(tiles[c][r].x,tiles[c][r].y,tileW,tileH,tiles[c][r].state);
            }
        }
        ctx.beginPath();
        ctx.drawImage(drwall,0,0,20,740,57*20,0,20,740);
        ctx.closePath();
        //For the dragon
        for(var c = tc-tm; c < tc; c++)//tc-tm = 58
        {
            drawrect(tiles[c][0].x,tiles[c][0].y,tileW,tileH,tiles[c][0].state);
        }
        for(var c = tc-tm; c < tc; c++)//tc-tm = 58
        {
            drawrect(tiles[c][tr-1].x,tiles[c][tr-1].y,tileW,tileH,tiles[c][tr-1].state);
        }
        if(hasCrossed)
        {
            for(var c = tc-tm-1; c < tc-tm; c++)
            {
                for(var r = 0;r < tr; r++)
                {
                    drawrect(tiles[c][r].x,tiles[c][r].y,tileW,tileH,tiles[c][r].state);
                }
            }

            ctx.font = "30px Arial";//Arial
            ctx.fillStyle = "Black";
            ctx.fillText("Dragon Hp: ", 57*20+20, 34*20);
            ctx.beginPath();
            ctx.fillStyle = "#eee";
            ctx.fillRect(58*20+10,35*20,230-3,15);
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = dHealthColor;
            ctx.fillRect(59*20 - 5,35*20 + 3,dHealth,8);
            ctx.closePath();
        }
        
        changeDragonPosition();
        drawDragon(1160,cdy);//58*20 = 1160
        
    }
    
}

function changeDragonPosition()
{
    //cleardrag();
    cdy += dv;
    //console.log(dv);
    if(cdy > (15)*20)
    {
        dv = -dv;
    }
    if(cdy < 20)
    {
        dv = -dv;
    }
}

var right = false,left = false,up = false,down = false;
function kd(e)
{
    if(!isPanel && !isPaused)
    {
        switch(e.keyCode)
{
    case 38:
        up = true;
        //console.log('up');
        e.preventDefault();
        break;
    case 37:
        left = true;
        e.preventDefault();
        break;
    case 39:
        right = true;
        e.preventDefault();
        break;
    case 40:
        down = true;
        e.preventDefault();
        break;
}
    }
}
function ku(e)
{
    if(!isPanel)
    {
        switch(e.keyCode)
    {
        case 38:
            up = false;
            e.preventDefault();
            break;
        case 37:
            left = false;
            e.preventDefault();
            break;
        case 39:
            right = false;
            e.preventDefault();
            break;
        case 40:
            down = false;
            e.preventDefault();
            break;
    }
    }
}

var starEaten = false;
var dragE = false;
var sharp = 0;
var shuriken = document.getElementById('cyre');
var healthBar = document.getElementById('cyrh');
var hnum = 100;//Math.floor(Math.random()*10 + 1)
var fDamage = 20;
var blade = document.getElementById('blade');
var showHealth = document.getElementById('hbar');
var tcl = 0;
var entleft = 1;
var hasHit = true;
var flame = false;
var verdict = document.getElementById('verdict');

function logic()
{
    if(lvl != 4)
    {
        tcl = 0;
    }else{
        tcl = 13;
    }
    if(right && currX < tc-tcl-2 && tiles[currX+1][currY].state != 'w')
    {
        currX +=1;
        tiles[currX-1][currY].state = 'sr';
        index += 1;
        show.innerHTML = index;
    }
    else if(left && currX > entleft && tiles[currX-1][currY].state != 'w')
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
    if(lvl == 4 && currX == tx+1 && currY == tr-2)
        {
            hasCrossed = true;
            dragE = true;
            show.innerHTML = index;
            if(starEaten)
            {entleft = tx+1;}
            tiles[tc-tm-2][tr-2].state = 'f';
            tiles[tc-tm-3][tr-2].state = 'w';
            tiles[tc-tm-2][tr-3].state = 'w';
            tiles[tc-tm-3][tr-3].state = 'w';
        }
    if(lvl == 4)
    {
        if(currX == tc-tm-2 && currY == tr-2)// tc-tm-2
        {
            won();
            gameWin = true;
            //dragon();
            dragE = true;
            show.innerHTML = index;
            return;
        }
    }
    else{
        if(currX == tc-2 && currY == tr-2)
        {
            won();
            //index = 0;
            show.innerHTML = index;
            return;
        }
    }


    if(axe > 0)
    {
        if(pr)
    {
        if(tiles[currX+1][currY].state == 'w')
        {
            tiles[currX+1][currY].state = 'e';
            axe--;
            axel.innerHTML = axe;
            pr = false;
        }
        else{
            
        }
    }
    if(pl)
    {
        if(tiles[currX-1][currY].state == 'w')
        {
            tiles[currX-1][currY].state = 'e';
            axe--;
            axel.innerHTML = axe;
            pl = false;
        }
        else{

        }
    }
    if(pu)
    {
        if(tiles[currX][currY-1].state == 'w')
        {
            tiles[currX][currY-1].state = 'e';
            axe--;
            axel.innerHTML = axe;
            pu = false;
        }
        else{

        }
    }
    if(pd)
    {
        if(tiles[currX][currY+1].state == 'w')
        {
            tiles[currX][currY+1].state = 'e';
            axe--;
            axel.innerHTML = axe;
            pd = false;
        }
        else{

        }
    }
    }
    if(currX == hx && currY == hy)
    {
        index -= 80;
        show.innerHTML = index;
        changeHealth();
    }
    if(currX == bmx && currY == bmy)
    {
        index += 100;
        show.innerHTML = index;
        changeBomb();
    }
    if(currX == pax && currY == pay)
    {
        // index += 100;
        // show.innerHTML = index;
        axe+=2;
        axel.innerHTML = axe;
        useAxe();
        changAxe();
    }
    if(currX == pox && currY == poy)
    {
        currX = pox_2;
        currY = poy_2;
        changePorts();
    }
    if(currX == pox_2 && currY == poy_2)
    {
        currX = pox;
        currY = poy;
        changePorts();
    }
    if(currX == stx && currY == sty)
    {
        //Change player icn
        pld = "./Images/exptis.png";
        pll = "./Images/ep_l.png";
        plu = "./Images/ep_u.png";
        plr = "./Images/ep_r.png";
        player.src = pld;
        player_l.src = pll;
        player_r.src = plr;
        player_u.src = plu;
        starEaten = true;
        shuriken.style.display = 'inline';
        healthBar.style.display = 'inline';
        sharp = 11; //No of Shuriken initially
        blade.innerHTML = sharp;
        changeStar();
    }
    if(lvl == 2)
    {
        checkForEmptyTiles();
        Bomb();
        health();
        pickaxe();
        ag = false;
        empt = [];
    }
    if(lvl == 3)
    {
        checkForEmptyTiles();
        ag = true;
        Bomb();
        health();
        pickaxe();
        portalOne();
        portalTwo();
        aga = false;
        empt = [];
    }
    if(lvl == 4)
    {
        // ag = false;
        // aga = false;
        changeBomb();
        changAxe();
        changeHealth();
        changePorts();
        checkForEmptyTiles();
        star();
        if(hasCrossed && starEaten){
            tiles[tx-1][tr-2].state = 'w';
            //dv = 1;
        }
        else{
            tiles[tx-1][tr-2].state = 'e';
            //dv = 0;
        }
        if(hasCrossed)
        {
            if(!starEaten)
            {
                alert("You should have a health bar to fight take the power up star and enter!!");
                hasCrossed = false;
                currX = 1;
                right = false;
                currY = tr-2;
                
            }
            else{
                sleep(2000);
                if(hasHit)
                {
                    dragonAttacks();
                }
                else{
                    if(!flame)
                    {
                        
                    }else{fireTiles = [];}
                }
            } 
        }
        showStar = false;
        empt = [];
    }
    if(hasCrossed && starEaten)
    {
        // console.log(fireTiles);
        for(var i = 0;i < fireTiles.length; i++)
        {
            if(currX == fireTiles[i][0] && currY == fireTiles[i][1])
            {
                hnum -= (fDamage/10);
                document.getElementById('bar').value = hnum.toString();
                showHealth.innerHTML = document.getElementById('bar').value;
                if(hnum <= 0){
                    hnum = 0;
                    fDamage = 0;
                    gameWin = false;
                    document.getElementById('bar').value = hnum.toString();
                    showHealth.innerHTML = document.getElementById('bar').value;
                    nextLevel();
                    scoreBoard();
                }
                else{
                    //Dragon_mini dimension: 64x96
                    //Dragon dimension:  240 × 360 => Hcf: 120
                    //240x360 = 86400 i.e 216 tiles(12tilex16tile)
                    document.getElementById('bar').value = hnum.toString();
                    showHealth.innerHTML = document.getElementById('bar').value;
                }
            }
            }
    }
    if(lvl == 5)
    {
        scoreBoard();
    }
    blade.innerHTML = sharp;
    if(sharp < 0)
    {
        sharp = 0;
    }

    tiles[currX][currY].state = 's';
    // tiles[1][2].state = 'e';
}

function scoreBoard()
{
    fireTiles =[];
    //Stop the timer
    //Total time elapsed
    //Total score from the 4 levels
    //Best score out of the 4 levels
    level.innerHTML = 'Done';
    clearInterval(timer);
    if(gameWin)
    {
        ti.innerHTML = 'You Won';
        verdict.innerHTML = "You Won";
    }else{
        ti.innerHTML = 'Game Over';
        verdict.innerHTML = "You Lost your Path";
    }
    var timeElapsed = 300 - seconds;
    //console.log(timeElapsed);
    var crd = document.getElementById('crd');
    crd.style.display = 'flex';
    crd.className = 'ctr';
    let te = document.getElementById('te');
    let ts = document.getElementById('ts');
    let lst = document.getElementById('lst');
    te.innerHTML = timeElapsed + 'sec';
    ts.innerHTML = sc1;
    lst.innerHTML = Math.max(...scl);
}
function over()
{
    location.reload();
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
        //console.log(d);
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
        //console.log('Done');
    }
}
recursion(currX,currY);

let level = document.getElementById('lvl');

function clear()
{
    ctx.clearRect(0,0,can.width,can.height);
}

function won()
{   
    win = true;
    getScore();
    index = 0;
    //clear();
    setTimeout(() =>{
        nextLevel();
    }, 50);//change from 250 to 50...
}

setInterval(draw,0);
setInterval(logic,100);

window.addEventListener('keydown',kd);
window.addEventListener('keyup',ku);


function afterDragonDefeat()
{
    for(var c = (tc-tm-1);c > tx + 1; c--) {
        for(var r = 1;r < tr-1;r++)
        {
            tiles[c][r].state = 'e';
        }
    }
    tiles[tc-tm-2][tr-2].state = 'f';
    tiles[tc-tm-3][tr-2].state = 'e';
    tiles[tc-tm-3][tr-3].state = 'e';
    tiles[tc-tm-2][tr-3].state = 'e';
}

var empt = [];

function checkForEmptyTiles()
{
    if(lvl == 4)
    {
        if(showStar)
        {
            for(var c = 0;c < tx; c++)
            {
                for(var r = 0;r < tr; r++)
                {
                    if(tiles[c][r].state == 'e')
                    {
                        empt.push([c,r]);
                    }
                }
            }
        }
        else{
            empt = [];
        }
    }
    else{
        if(ag || aga)
        {
            for(var c = 0;c < tc; c++)
            {
                for(var r = 0;r < tr; r++)
                {
                    if(tiles[c][r].state == 'e')
                    {
                        empt.push([c,r]);
                    }
                }
            }
            }
            else{
                empt =[];
            }
        }
    
}
//1257
var ag = true;
var aga = true;
var showStar = true;
var r1 = Math.floor(Math.random()*1257);
var r2 = Math.floor(Math.random()*1257);
var bmx;
var bmy;

var hx;
var hy;

//empt = [];

function Bomb()
{
    if(aga)
    {
        if(ag)
        {
            bmx = empt[r1][0];
            bmy = empt[r1][1];
            tiles[bmx][bmy].state = 'b';
        }
    }
    
}

function changeBomb()
{
    bmx = '';
    bmy = '';
}
function health()
{
    if(aga)
    {
        if(ag)
        {
            hx = empt[r2][0];
            hy = empt[r2][1];
            tiles[hx][hy].state = 'h';
        }
    }
}
function changeHealth()
{
    hx = '';
    hy = '';
}
function changeStar()
{
    stx = '';
    sty = '';
}

var r3 = Math.floor(Math.random()*1257);
var r4 = Math.floor(Math.random()*1257);
var pox;
var poy;
var pox_2;
var poy_2;
function portalOne()
{
    if(aga)
    {
        pox = empt[r3][0];
        poy = empt[r3][1];
        tiles[pox][poy].state = 'pt';
    }
}
function portalTwo()
{
    if(aga)
    {
        pox_2 = empt[r4][0];
        poy_2 = empt[r4][1];
        tiles[pox_2][poy_2].state = 'pt2';
    }
}

function changePorts()
{
    pox = '';
    poy = '';
    pox_2 = '';
    poy_2 = '';
}
var r5 = Math.floor(Math.random()*1257);
var pax,pay;

function pickaxe()
{
    if(aga)
    {
        if(ag)
        {
            pax = empt[r5][0];
            pay = empt[r5][1];
            tiles[pax][pay].state = 'axe'; 
        }
    } 
}
function changAxe()
{
    pax = '';
    pay = '';
}
var r6 = Math.floor(Math.random()*600);
var stx,sty;

function star()
{
    if(showStar)
    {
        stx = empt[r6][0];
        sty = empt[r6][1];
        tiles[stx][sty].state = 'str';
    }
}
var fx;
var fy;

var pr = false,pl = false,pd = false,pu = false;
function useAxe()
{
    document.addEventListener('keydown', e =>{
        if(e.keyCode == 68 && axe > 0) // d
        {
            pr = true;
            return;
        }
        else if(e.keyCode == 65 && axe > 0) // a
        {
            pl = true;
            return;
        }
        else if(e.keyCode == 87 && axe > 0) // w
        {
            pu = true;
            return;
        }
        else if(e.keyCode == 83 && axe > 0) // s
        {
            pd = true;
            return;
        }
    });
}

function nextLevel()
{
    clear();
    lvl++;
    if(lvl == 4)
    {
        for(var c = 0; c < tx; c++)
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
        for(var c = tx; c < tc-tm; c++)
        {
            //720 x 740
            tiles[c] = [];
            for(var r = 0;r < tr; r++)
            {
                tiles[c][r] = {
                    x:c*tileW, //x
                    y:r*tileH,  //y
                    state:'e',
                    isvisited: true
                };
            }
        }
        for(var c = tc-tm; c < tc; c++)
        {
            tiles[c] = [];
            for(var r = 0;r < tr; r++)
            {
                tiles[c][r] = {
                    x:c*tileW, 
                    y:r*tileH,
                    state:'e', //May give any other state in the future
                    isvisited: true
                };
            }
        }
        
        for(var c = tx;c < tc; c++)
        {
            tiles[c][0].state = 'dr';
            tiles[c][tr-1].state = 'dr';
        }
        for(var r = 0;r < tr; r++)
        {
            tiles[tx][r].state ='dr';
            tiles[tc-1][r].state ='dr';
        }

        tiles[tx-2][tr-2].state = 'f';
        t = true;
        currX = 1;
        currY = 1;
        level.innerHTML = lvl+'/4';
        lvwalls();
        recursion(currX,currY);
    }
    else
    {
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
        tiles[tc-2][tr-2].state = 'f';
        t = true;
        currX = 1;
        currY = 1;
        level.innerHTML = lvl+'/4';
        walls();
        recursion(currX,currY);
    }
    
}

//From mazesolver.js


moveit('panel');
moveit('crd');
moveit('crdp');
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
    mazeIntro.className = 'rmv';
    //hide.className = 'hid';
}
function hidePause(hide)
{
    var hide = document.getElementById(hide);
    hide.style.display = 'none';
    isPaused = false;
    timer = window.setInterval(time, 1000);
    dv = 1;
    //hide.className = 'hid';
}

var isPanel = true;
var isPaused = false;
var crdp = document.getElementById('crdp');

function showintro(e)
{
    if((e.keyCode == 13) && !isPanel) 
    {
        hide.style.display = 'flex';
        isPanel = true;
        //playing = false;
        e.preventDefault();
    }
    else if((e.keyCode == 13) && isPanel)
    {
        hide.style.display = 'none';
        isPanel = false;
        //playing = true;
        mazeIntro.className = 'rmv';
        e.preventDefault();
    }
    //e.preventDefault();
}
function showpaused(e)
{
    if((e.keyCode == 16) && !isPaused)
    {
        isPaused = true;
        crdp.style.display = 'flex';
        crdp.className = 'used';
        clearInterval(timer);
        dv = 0;
        e.preventDefault();
    }
    else if((e.keyCode == 16) && isPaused)
    {
        isPaused = false;
        crdp.style.display = 'none';
        crdp.className = '';
        timer = window.setInterval(time, 1000);
        dv = 1;
        e.preventDefault();
    }
}
var vx = 1;
function throwShuriken(e)
{
    if(hasCrossed && starEaten)
    {
        if(e.keyCode == 32)
        {
            //console.log('cool');
            if(sharp > 0)
            {
                for(var i = currX+1; i < tc-tm; i++)
                {
                    if(tiles[i+1][currY].state == 'w')
                    {
                        console.log("can't attack that..");
                        setTimeout(disapperBlade,20);
                        sharp--;
                        shurikenAttack();
                        e.preventDefault();
                        return;
                    }
                    tiles[i][currY].state = 'bl';    
                }
                setTimeout(disapperBlade,100); //For animation
                sharp--;
                shurikenAttack();
                e.preventDefault();
            }
        }
    }
    if(dHealth >= 150 && dHealth <=213)
    {
        dHealthColor = "#00ff00";
    }
    else if(dHealth < 150 && dHealth >=60)
    {
        dHealthColor = "#ffcc00";
    }
    else if(dHealth >= 1 && dHealth < 60)
    {
        dHealthColor = "#ff0000";
    }
    if(dHealth == 1)
    {
        hasHit = false;
        flame = true;
        afterDragonDefeat();
    }
}

function shurikenAttack()
{
    //This function is basically a check that did the shuriken hit the dragon/skeleton or not...
    if(currY == leftoutTile)//currY > 0 && currY < eye
    {
        dHealth -= 25;
        fireTiles = [];
        //console.log(dHealth);
        if(dHealth < 0){
            dHealth = 1;
        }
        hasHit = true;
    }else{
        hnum -= fDamage;
        document.getElementById('bar').value = hnum.toString();
        showHealth.innerHTML = document.getElementById('bar').value;
        if(hnum <= 0)
        {
            gameWin = false;
            nextLevel();
            scoreBoard();
        }
        console.log("miss");
    }
}

function disapperBlade()
{
    for(var i = currX+1;i < tc-tm-1; i++)
    {
        if(tiles[i][currY].state == 'bl' || tiles[i][currY].state == 'fir')
        {
            tiles[i][currY].state = 'fiw';
        }
    }
}

const sleep = (milliseconds) => {
    return (resolve) => setTimeout(resolve, milliseconds);
  }

let fireTiles = [];
let leftoutTile;

function setTile()
{
    leftoutTile = Math.floor(Math.random()*(tr-5)) + 2; //1 to 33
    return leftoutTile;
}

function dragonAttacks()
{
    var lt = setTile();

    for(var c = (tc-tm-2);c > tx + 1; c--) {
        for(var r = 1;r < tr-1;r++)
        {
            if(r == lt)
            {
                tiles[c][r].state = 'e';
                tiles[tc-tm-1][r].state = 'sku';
            }
            else{
                fireTiles.push([c,r]);
                tiles[c][r].state = 'fir';  
            }
        }
    }
    for(var c = tc-tm-1; c < tc-tm; c++)
    {
        for(var r = 1;r < tr-1;r++)
        {
            if(r != lt)
            {
                tiles[c][r].state = 'fiw';
            }
        }
    }
    tiles[tc-tm-2][tr-2].state = 'f';
    tiles[tc-tm-3][tr-2].state = 'w';
    tiles[tc-tm-2][tr-3].state = 'w';
    tiles[tc-tm-3][tr-3].state = 'w';
    
    hasHit = false;
    flame = false;
   
}

var pageContent = document.getElementById('infor');
var info1 = document.getElementById('info');
var info2 = document.getElementById('toleft');
var pageNo = document.getElementById('pageno');
var next = document.getElementById('next');
var prev = document.getElementById('prev');
var pno = 1;

function Nextpage()
{
    if(pno == 1)
    {
        pageNo.innerHTML = '2/4';
        pno = 2;
    }
    else if(pno == 2)
    {
        pageNo.innerHTML = '3/4';
        pno = 3;
    }
    else if(pno == 3)
    {
        pageNo.innerHTML = '4/4';
        pno = 4;
    }
    else if(pno == 4)
    {
        pageNo.innerHTML = '1/4';
        pno = 1;
    }
    //pageContent.innerHTML = '<h1>Next Page</h1>';
    content();
}

function Prevpage()
{
    if(pno == 1)
    {
        pageNo.innerHTML = '4/4';
        pno = 4;
    }
    else if(pno == 2)
    {
        pageNo.innerHTML = '1/4';
        pno = 1;
    }
    else if(pno == 3)
    {
        pageNo.innerHTML = '2/4';
        pno = 2;
    }
    else if(pno == 4)
    {
        pageNo.innerHTML = '3/4';
        pno = 3;
    }
    content();
}

function content()
{
    if(pno == 1)
    {
        pageContent.innerHTML = '<p id="info">'+info1.innerHTML + '<div id="toleft">' + info2.innerHTML + '</div></p>';
        
    }
    else if(pno == 2)
    {
        pageContent.innerHTML = '<div style="float: left;text-align:left;"><span class="bullet">◉</span>There are Four levels in Total.<br><span class="bullet">◉</span>1st Level you have to reach the end its simple.<br><span class="bullet">◉</span>2nd Level there will be a bomb and a health(in shape of &nbsp;&nbsp;&nbsp;blue heart), crossing the bomb will increase 100 steps &nbsp;&nbsp;&nbsp;decreasing you score and crossing health will decrease 80 &nbsp;&nbsp;&nbsp;steps increasing your score.<br><span class="bullet">◉</span>3rd Level will cointain bomb,health as well as portals. If you &nbsp;&nbsp;&nbsp;enter to any one you will come out of the other!!<br><span class="bullet">◉</span>Press the Spacebar once you have acquired the power-up &nbsp;&nbsp;&nbsp;star to throw the shuriken.<br><span class="bullet">◉</span>The 4th Level is still work on progress...</div><br><br><button id="bt1" style="background:url(./Images/bomb.png)"></button>Bomb<button id="bt2" style="background:url(./Images/health.png)"></button>Health<button id="bt1" style="background:url(./Images/pickaxe.png)"></button>Pickaxe<button id="bt3" style="background:tomato"></button>Portal<br><button id="bt5" style="background:orange"></button>Portal<br> <h3>More Stuffs coming Soon...</h3>';
    }
    else if(pno == 3)
    {
        pageContent.innerHTML = '<br><br><h2>How to use the Pickaxe</h2><hr><br>Once the pickaxe is acquired, the user can use it 2 times only.<br>The purpose of the pickaxe is to break the wall!!<br>To break wall in certain direction press:<br><h2>W</h2> For up wall<br><h2>A</h2> For left wall<br><h2>S</h2> For down wall<br><h2>D</h2> For right wall<hr>';
    }
    else if(pno == 4)
    {
        pageContent.innerHTML = '<br><br><h2>Press SHIFT to Pause.</h2><hr><br>Also Scroll down and give your feedback on the comment section or just post your score in the comments.';
    }

}

window.addEventListener('keypress',showintro);
window.addEventListener('keydown',showpaused);

window.addEventListener('keypress',throwShuriken);

//forSave = true;
function Save()
{
    try {
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
            //a.href = can.toDataURL("image/png").replace("image/jpeg", "image/octet-stream");
            a.download = 'mazegen_solve.jpeg';
            a.click();
            document.body.removeChild(a);
        }
        
    } catch (error) {
        alert("Sorry, We ran into some errors!!\nAlso you can't download the maze as image during the game, save it at the begining...\nEnjoy!!");
    }
}