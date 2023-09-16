//For Phone Pickaxe....

var can = document.getElementById('solveMaze');
var ctx = can.getContext('2d');

can.style.background = 'dimgray';
let lvl = 1;
var tiles = [];

var tc = 71, tr = 37;
var tx = Math.floor(tc / 2);
var tm = 13;
var tileH = 20, tileW = 20;
var currX = 1;
var currY = 1;
var currX2 = tc - 2;
var currY2 = 1;
var win = false;
var gameWin = false;

var multiplayer = false;
var isSetting = true;

var pld, pll, plu, plr;

var mazeIntro = document.getElementById('mazeIntro');

var player = new Image();
//player.crossOrigin = "anonymous";
player.src = "./Images/player.png";

var player_r = new Image();
player_r.src = "./Images/player_r.png";

var player_u = new Image();
player_u.src = "./Images/player_u.png";

var player_l = new Image();
player_l.src = "./Images/player_l.png";

var player2_r = new Image();

var player2_l = new Image();

var player2_u = new Image();

var player2 = new Image();

var stairs = new Image();
stairs.src = "./Images/stairs.png";

var key = new Image();
key.src = "./Images/key.png";

var treasure = new Image();
treasure.src = "./Images/treasure.png";

var healthIcn = new Image();
healthIcn.src = "./Images/health.png";

var healthAud = new Audio();
healthAud.src = "./Audio/Health1.m4a";

var bombIcn = new Image();
bombIcn.src = "./Images/bomb.png";

var bombAud = new Audio();
bombAud.src = "./Audio/bomb.mp3";

var pickaxeImg = new Image();
pickaxeImg.src = "./Images/pickaxe.png";

var axeAud = new Audio();
axeAud.src = "./Audio/item_drop.wav";

var breakAud = new Audio();
breakAud.src = "./Audio/breakable_wall_hit_1.wav";

var wallImg = new Image();
wallImg.src = "./Images/wall.png";

var wallImg2 = new Image();
wallImg2.src = "./Images/wall3.png";

var wallImg4 = new Image();
wallImg4.src = "./Images/wall4.png";

var pstar = new Image();
pstar.src = "./Images/pstar.png";

var pstaradu = new Audio();
pstaradu.src = "./Audio/pstar.wav";

var mapscr = new Image();
mapscr.src = "./Images/scroll.png";

var smoll = new Audio();
smoll.src = "./Audio/scroll.wav";

var lvti = new Image();
lvti.src = "./Images/lava.png";

var shoot = new Image();
shoot.src = "./Images/shuriken.png";

var shurikenAud = new Audio();
shurikenAud.src = "./Audio/shoot.wav";

var fireSpit = new Image();
fireSpit.src = "./Images/fire_ball.png";

var fireSpit2 = new Image();
fireSpit2.src = "./Images/fire_ball2.png";

var skullFire = new Image();
skullFire.src = "./Images/blue_fire.png";

var portalAud = new Audio();
portalAud.src = "./Audio/Portal.m4a";

var tchest = new Audio();
tchest.src = "./Audio/tchest.wav";

var keyaud = new Audio();
keyaud.src = "./Audio/key.wav";

var wall_move = new Audio();
wall_move.src = "./Audio/wall_move.wav";

var pauseaud = new Audio();
pauseaud.src = "./Audio/pause.wav";

//Behold the DRAGON!!
//https://www.pngitem.com/
var dragon = new Image();
dragon.src = "./Images/dragon.png";

var drwall = new Image();
drwall.src = "./Images/drag_walls.png";

var skull = new Image();
skull.src = "./Images/skull.png";

var skullbf = new Audio();
skullbf.src = "./Audio/skull_fire.wav";

var dHeart = new Image();
dHeart.src = "./Images/dragonHeart.jpeg";

var draco_roar = new Audio();
draco_roar.src = "./Audio/draco_roar_01.wav";

var dragfire = new Audio();
dragfire.src = "./Audio/flamethrow.wav";

var boss_audio = new Audio();
boss_audio.src = "./Audio/Boss_Battle_1.wav";

var victory = new Audio();
victory.src = "./Audio/won.wav";

let music = document.querySelector('iframe');
let music_source = ""; //can be anything
//https://www.youtube.com/embed/GXH64w5fiXc?autoplay=1&loop=1
let music_sourceDummy = "";

let muted = false;

var drx = 240, dry = 360;
var cdy = 20; //Should't 15*20...
var cdx = 1160;
var dheight = 360;
var dv = 1;
var secondPhase = false;
// var mouth = Math.floor(cdy/20)+8;


for (var c = 0; c < tc; c++) {
    tiles[c] = [];
    for (var r = 0; r < tr; r++) {
        tiles[c][r] = {
            x: c * tileW,
            y: r * tileH,
            state: 'e',
            isvisited: false
        };
    }
}
tiles[currX][currY].state = 's';
tiles[currX][currY].isvisited = true;
tiles[tc - 2][tr - 2].state = 'f';

let timeWin = true;
var show = document.getElementById('show');
var show2 = document.getElementById('show2');
show.innerHTML = 0;
show2.innerHTML = 0;

var hide = document.getElementById('hide');
hide.style.display = 'none';

var highScore = document.getElementById('higsc');
var currentScore = document.getElementById('curscr');
const Save_highScore = "Best Maze score";
var hscore = 0;
var checkScore = 0;
var index = 0;
var index2 = 0;
var seconds = 300;
var sc1 = 0;
var scl = [];

var showScore = localStorage.getItem(Save_highScore);

if (showScore == null) {
    hscore = 0;
}
else {
    hscore = parseInt(showScore);
}
function initialScore() {
    checkScore = parseInt((seconds / index) * 1000);
    if (index == 0) {
        checkScore = "It's over 9000!!";
    }
    currentScore.innerHTML = checkScore;
    highScore.innerHTML = hscore;
}

function getScore() {
    //checkScore = ((seconds/index)*1000);
    if (win) {
        scl.push(checkScore);
        sc1 += checkScore;
        if (checkScore > hscore) {
            hscore = checkScore;
            localStorage.setItem(Save_highScore, hscore);
        }
    } else {
        hscore = 0;
    }
}

setInterval(initialScore, 300);
var ti = document.getElementById("timer");

var timer;
function time() {
    ti.innerHTML = "Timer: " + seconds + " sec";
    if (seconds < seconds) {
        ti.innerHTML = seconds;
    }
    if (seconds > 0) {
        seconds--;
    } else {
        clearInterval(timer);
        allStop();
        alert('You ran out of time');
        ti.innerHTML = 'Game Over';
        gameWin = true;
        timeWin = false;
    }
}
function loop() {
    if (!timer) {
        timer = window.setInterval(time, 1000);
    }
}
//loop();

function checktime() {
    if (!isPanel && !isSetting) {
        //music.src = music_source;
        loop();
    }
    else {
        //console.log('Reading instruction ...');
    }
}

setInterval(checktime, 10);

var axel = document.getElementById('piaxe');
var axe = 0;

function walls() {
    for (var c = 0; c < tc; c += 2) {
        for (var r = 0; r < tr; r++) {
            tiles[c][r].state = 'w';
        }
    }
    for (var c = 0; c < tc; c++) {
        for (var r = 0; r < tr; r += 2) {
            tiles[c][r].state = 'w';

        }
    }
}
function lvwalls() {
    for (var c = 0; c < tx; c += 2) {
        for (var r = 0; r < tr; r++) {
            tiles[c][r].state = 'w';
        }
    }
    for (var c = 0; c < tx; c++) {
        for (var r = 0; r < tr; r += 2) {
            tiles[c][r].state = 'w';
        }
    }

}

function drawrect(x, y, w, h, st = 'e') {
    if (st == 'e') {
        ctx.fillStyle = "#94B1A3";
    }
    else if (st == 'bb') {
        ctx.fillStyle = "rgb(0,125,191)";
    }
    else if (st == 'dr') {
        ctx.beginPath();
        ctx.drawImage(lvti, 0, 0, 20, 20, x, y, w, h);
        ctx.closePath();
        return;
    }
    else if (st == 'drh') {
        ctx.beginPath();
        ctx.drawImage(dHeart, 0, 0, 20, 20, x, y, w, h);
        ctx.closePath();
        return;
    }
    else if (st == 'scr') {
        ctx.beginPath();
        ctx.drawImage(mapscr, 0, 0, 20, 20, x, y, w, h);
        ctx.closePath();
        return;
    }
    else if (st == 'sku') {
        ctx.beginPath();
        ctx.drawImage(skull, 0, 0, 20, 20, x, y, w, h);
        ctx.closePath();
        return;
    }
    else if (st == 'fir') {
        ctx.beginPath();
        ctx.drawImage(fireSpit, 0, 0, 20, 20, x, y, w, h);
        ctx.closePath();
        return;
    }
    else if (st == 'fiw') {
        ctx.beginPath();
        ctx.drawImage(fireSpit2, 0, 0, 20, 20, x, y, w, h);
        ctx.closePath();
        return;
    }
    else if (st == 'blf') {
        ctx.beginPath();
        ctx.drawImage(skullFire, 0, 0, 20, 20, x, y, w, h);
        ctx.closePath();
        return;
    }
    else if (st == 's') {
        //ctx.fillStyle = "#008700"; 
        ctx.beginPath();
        if (right) {
            ctx.drawImage(player_r, 0, 0, 20, 20, x, y, w, h);
        }
        else if (left) {
            ctx.drawImage(player_l, 0, 0, 20, 20, x, y, w, h);
        }
        else if (up) {
            ctx.drawImage(player_u, 0, 0, 20, 20, x, y, w, h);
        }
        else if (down) {
            ctx.drawImage(player, 0, 0, 20, 20, x, y, w, h);
        }
        else {
            //ctx.drawImage(player,0,0,20,20,x,y,w,h);
            if (!starEaten) {
                ctx.fillStyle = "#000000";
                ctx.beginPath();
                ctx.fillRect(x, y, w, h);
                ctx.closePath();
                ctx.fillStyle = "#ffffff";
                ctx.beginPath();
                ctx.fillRect(x + 4, y + 9, 4, 7);
                ctx.fillRect(x + 14, y + 9, 4, 7);
                ctx.closePath();
            }
            else {
                ctx.fillStyle = "#ffffff";
                ctx.beginPath();
                ctx.fillRect(x, y, w, h);
                ctx.closePath();
                ctx.fillStyle = "#000000";
                ctx.beginPath();
                ctx.fillRect(x + 4, y + 9, 4, 7);
                ctx.fillRect(x + 14, y + 9, 4, 7);
                ctx.closePath();
            }
        }
        ctx.closePath();
        return;
    }
    else if (st == 's2') {
        ctx.beginPath();
        if (sr) {
            ctx.drawImage(player2_r, 0, 0, 20, 20, x, y, w, h);
        }
        else if (sl) {
            ctx.drawImage(player2_l, 0, 0, 20, 20, x, y, w, h);
        }
        else if (su) {
            ctx.drawImage(player2_u, 0, 0, 20, 20, x, y, w, h);
        }
        else if (sd) {
            ctx.drawImage(player2, 0, 0, 20, 20, x, y, w, h);
        }
        else {
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.fillRect(x, y, w, h);
            ctx.closePath();
            ctx.fillStyle = "#000000";
            ctx.beginPath();
            ctx.fillRect(x + 4, y + 9, 4, 7);
            ctx.fillRect(x + 14, y + 9, 4, 7);
            ctx.closePath();
        }
        ctx.closePath();
        return;
    }
    else if (st == 'f') {
        if (lvl == 4) {
            try {
                if (!hasCrossed) {
                    ctx.beginPath();
                    ctx.drawImage(key, 0, 0, 20, 20, x, y, w, h);
                    ctx.closePath();
                    return;
                }
                else {
                    ctx.beginPath();
                    ctx.drawImage(treasure, 0, 0, 20, 20, x, y, w, h);
                    ctx.closePath();
                    return;
                }
            } catch (error) {
                ctx.fillStyle = "#ff0000";
            }
        }
        else if (lvl == 3) {
            if (!gotKey) {
                ctx.fillStyle = "#ff0000";
            } else {
                ctx.beginPath();
                ctx.drawImage(stairs, 0, 0, 20, 20, x, y, w, h);
                ctx.closePath();
                return;
            }
        } else {
            ctx.beginPath();
            ctx.drawImage(stairs, 0, 0, 20, 20, x, y, w, h);
            ctx.closePath();
            return;
        }

    }
    else if (st == 'str') {
        ctx.beginPath();
        ctx.drawImage(pstar, 0, 0, 20, 20, x, y, w, h);
        ctx.closePath();
        return;
    }
    else if (st == 'key') {
        ctx.beginPath();
        ctx.drawImage(key, 0, 0, 20, 20, x, y, w, h);
        ctx.closePath();
        return;
    }
    else if (st == 'w') {
        if (lvl == 1) {
            ctx.fillStyle = "#293D52";
        }
        else if (lvl == 2) {
            ctx.beginPath();
            ctx.drawImage(wallImg, 0, 0, 20, 20, x, y, w, h);
            ctx.closePath();
            return;
        }
        else if (lvl == 3) {
            ctx.beginPath();
            ctx.drawImage(wallImg2, 0, 0, 20, 20, x, y, w, h);
            ctx.closePath();
            return;
        }
        else {
            ctx.beginPath();
            ctx.drawImage(wallImg4, 0, 0, 20, 20, x, y, w, h);
            ctx.closePath();
            return;
        }
    }
    else if (st == 'h') {
        //ctx.fillStyle = '#00aaff';
        ctx.beginPath();
        ctx.drawImage(healthIcn, 0, 0, 20, 20, x, y, w, h);
        ctx.closePath();
        return;
    }
    else if (st == 'b') {
        ctx.beginPath();
        //ctx.fillStyle = '#000000';
        ctx.drawImage(bombIcn, 0, 0, 20, 20, x, y, w, h);
        ctx.closePath();
        return;
    }
    else if (st == 'bl') {
        ctx.beginPath();
        ctx.drawImage(shoot, 0, 0, 20, 20, x, y, w, h);
        ctx.closePath();
        return;
    }
    else if (st == 'pt') {
        ctx.beginPath();
        ctx.fillStyle = "tomato";
        ctx.arc(x + 10, y + 10, 8 * Math.sqrt(2), 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        return;
    }
    else if (st == 'pt2') {
        ctx.beginPath();
        ctx.fillStyle = "orange";
        ctx.arc(x + 10, y + 10, 8 * Math.sqrt(2), 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        return;
    }
    else if (st == 'axe') {
        ctx.beginPath();
        ctx.drawImage(pickaxeImg, 0, 0, 20, 20, x, y, w, h);
        ctx.closePath();
        return;
    }
    else {
        if (!starEaten) {
            ctx.fillStyle = "#00E172";//rgb(0,125,191)   
        } else {
            ctx.fillStyle = "rgb(0,125,191)";
        }

    }
    ctx.beginPath();
    ctx.fillRect(x, y, w, h);
    ctx.closePath();
}
function drawDragon(x, y) {
    ctx.beginPath();
    ctx.drawImage(dragon, 0, 0, drx, dry, x, y, drx, dry);
    ctx.closePath();
    return;
}

walls();
var hasCrossed = false;
var dHealth = 215;
var dHealthColor = "#00ff00";

function draw() {
    if (lvl != 4) {
        for (var c = 0; c < tc; c++) {
            for (var r = 0; r < tr; r++) {
                drawrect(tiles[c][r].x, tiles[c][r].y, tileW, tileH, tiles[c][r].state);
            }
        }
    }
    else {
        for (var c = 0; c < tc - tm - 1; c++) {
            for (var r = 0; r < tr; r++) {
                drawrect(tiles[c][r].x, tiles[c][r].y, tileW, tileH, tiles[c][r].state);
            }
        }
        for (var c = tc - 1; c < tc; c++) {
            for (var r = 0; r < tr; r++) {
                drawrect(tiles[c][r].x, tiles[c][r].y, tileW, tileH, tiles[c][r].state);
            }
        }
        ctx.beginPath();
        ctx.drawImage(drwall, 0, 0, 20, 740, 57 * 20, 0, 20, 740);
        ctx.closePath();
        //For the dragon
        for (var c = tc - tm; c < tc; c++)//tc-tm = 58
        {
            drawrect(tiles[c][0].x, tiles[c][0].y, tileW, tileH, tiles[c][0].state);
        }
        for (var c = tc - tm; c < tc; c++)//tc-tm = 58
        {
            drawrect(tiles[c][tr - 1].x, tiles[c][tr - 1].y, tileW, tileH, tiles[c][tr - 1].state);
        }
        if (hasCrossed) {
            for (var c = tc - tm - 1; c < tc - tm; c++) {
                for (var r = 0; r < tr; r++) {
                    drawrect(tiles[c][r].x, tiles[c][r].y, tileW, tileH, tiles[c][r].state);
                }
            }
            if (!secondPhase) {
                ctx.font = "30px Arial";//Arial
                ctx.fillStyle = "Black";
                ctx.fillText("Dragon Hp: ", 57 * 20 + 20, 34 * 20);
                ctx.beginPath();
                ctx.fillStyle = "#eee";
                ctx.fillRect(58 * 20 + 10, 35 * 20, 230 - 3, 15);
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = dHealthColor;
                ctx.fillRect(59 * 20 - 5, 35 * 20 + 3, dHealth, 8);
                ctx.closePath();
            } else {
                for (var c = tc - 1; c < tc; c++) {
                    for (var r = 0; r < tr; r++) {
                        drawrect(tiles[c][r].x, tiles[c][r].y, tileW, tileH, tiles[c][r].state);
                    }
                }
                for (var c = tc - tm; c < tc; c++)//tc-tm = 58
                {
                    drawrect(tiles[c][tr - 1].x, tiles[c][tr - 1].y, tileW, tileH, tiles[c][tr - 1].state);
                }
                ctx.clearRect(57 * 20 + 20, 34 * 20, 61 * 20, 36 * 20);
                ctx.font = "30px Arial";//Arial
                ctx.fillStyle = "Black";
                ctx.fillText("Dragon Hearts:", 57 * 20 + 20, 34 * 20);
                ctx.fillText(fourHearts, 59 * 20 - 5, 35 * 20 + 3);
            }
        }
        if (dragonDefeted) {
            for (var c = tc - tm - 1; c < tc; c++) {
                for (var r = 0; r < tr; r++) {
                    drawrect(tiles[c][r].x, tiles[c][r].y, tileW, tileH, tiles[c][r].state);
                }
            }
        }

        if (starEaten) {
            player.src = "./Images/exptis.png";
            player_l.src = "./Images/ep_l.png";
            player_r.src = "./Images/ep_r.png";
            player_u.src = "./Images/ep_u.png";
        }

        changeDragonPosition();
        if (!dragonDefeted) {
            drawDragon(cdx, cdy);//cdx => 58*20 = 1160
        }
        Dragonflame(cdy);
    }
}


function changeDragonPosition() {
    cdy += dv;
    if (cdy > (15) * 20) {
        dv = -dv;
    }
    if (cdy < 20) {
        dv = -dv;
    }
}
var dracoSoundDone = false;
var dhx, dhy, dchoice = [];
var starty = true;
var done = true;

function checkSpotForHeart() {
    //{1->6 && 23 to rest(33)} => free slots in y dir for dheart
    dchoice = [(Math.floor(Math.random() * 6) + 1), (Math.floor(Math.random() * 11) + 23)];
    dhy = dchoice[Math.floor(Math.random() * 2)];
    dhx = Math.floor(Math.random() * 21) + 37; //tr=37, 37-58
}
//https://stackoverflow.com/questions/20339466/how-to-remove-duplicates-from-multidimensional-array
//This function came in handy
function multiDimensionalUnique(arr) {
    var uniques = [];
    var itemsFound = {};
    for (var i = 0, l = arr.length; i < l; i++) {
        var stringified = JSON.stringify(arr[i]);
        if (itemsFound[stringified]) { continue; }
        uniques.push(arr[i]);
        itemsFound[stringified] = true;
    }
    return uniques;
}

function Dragonflame(cdy2) {
    var mouth = Math.floor(cdy2 / 20) + 7;
    if (secondPhase && dracoSoundDone) {

        if (!muted && !isPaused) {
            dragfire.play();
        }
        for (var c = (tc - tm - 2); c > tx; c--) {
            //Fire biforcation{1-6, 23-33}
            hellflame.push([c, mouth]);
            tiles[c][mouth].state = 'fir';
            if (cdy2 == 20) {
                hellflame.push([c, 1]);
                hellflame.push([c, 3]);
                hellflame.push([c, 5]);
                tiles[c][1].state = 'fir';
                tiles[c][3].state = 'fir';
                tiles[c][5].state = 'fir';
            }
            if (cdy2 == (15 * 20)) {
                hellflame.push([c, 33]);
                hellflame.push([c, 31]);
                hellflame.push([c, 29]);
                hellflame.push([c, 27]);
                hellflame.push([c, 25]);
                tiles[c][33].state = 'fir';
                tiles[c][31].state = 'fir';
                tiles[c][29].state = 'fir';
                tiles[c][27].state = 'fir';
                tiles[c][25].state = 'fir';
            }
        }
        //hellflame = [...new Set(hellflame)];
        hellflame = multiDimensionalUnique(hellflame);
        if (starty) {
            checkSpotForHeart();
            starty = false;
        }
        if (daga && secondPhase) {
            tiles[dhx][dhy].state = 'drh';
        }
        daga = false;
        for (var i = 0; i < hellflame.length; i++) {
            if (currX == hellflame[i][0] && currY == hellflame[i][1]) {
                hnum -= 2;//2 => (fDamage/10)
                hellflame.splice(i, 1);
                document.getElementById('bar').value = hnum.toString();
                showHealth.innerHTML = document.getElementById('bar').value;
            }
        }
    }
    if (hnum < 0) {
        hnum = 0;
        gameWin = false;
        nextLevel();
        scoreBoard();
    }

}

var right = false, left = false, up = false, down = false;
var sr = false, sl = false, sd = false, su = false;
function kd(e) {
    if (!isPanel && !isPaused && !scoreB) {
        switch (e.keyCode) {
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
            case 77:  //m for mute
                if (muted) {
                    sound.innerHTML = "ON";
                    muted = false;
                    music.src = music_source;
                    e.preventDefault();
                    break;
                } else {
                    sound.innerHTML = "OFF";
                    muted = true;
                    music.src = music_sourceDummy;
                    e.preventDefault();
                    break;
                }
        }
        if (multiplayer) {
            //For multiplayer
            switch (e.keyCode) {
                case 87:
                    su = true;
                    break;
                case 65:
                    sl = true;
                    break;
                case 68:
                    sr = true;
                    break;
                case 83:
                    sd = true;
                    break;
            }
        }
    }
}
function ku(e) {
    if (!isPanel) {
        switch (e.keyCode) {
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
    if (multiplayer) {
        //For multiplayer
        switch (e.keyCode) {
            case 87:
                su = false;
                break;
            case 65:
                sl = false;
                break;
            case 68:
                sr = false;
                break;
            case 83:
                sd = false;
                break;
        }
    }

}
function allStop() {
    left = false; right = false; up = false; down = false;
}

var gotKey = false;
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
var once = true;
var onlyOnce = true;
var keyone = true;
var daga = true;
var gotscroll = false;
var maponce = true;
var fourHearts = 0;

function logic() {
    if (multiplayer) {
        logicPlay();
        return;
    }
    if (lvl != 4) {
        tcl = 0;
    } else {
        tcl = 13;//13
    }
    if (right && currX < tc - tcl - 2 && tiles[currX + 1][currY].state != 'w') {
        currX += 1;
        tiles[currX - 1][currY].state = 'sr';
        index += 1;
        show.innerHTML = index;
    }
    else if (left && currX > entleft && tiles[currX - 1][currY].state != 'w') {
        currX -= 1;
        tiles[currX + 1][currY].state = 'sl';
        index += 1;
        show.innerHTML = index;

    }
    else if (up && currY > 1 && tiles[currX][currY - 1].state != 'w') {
        currY -= 1;
        tiles[currX][currY + 1].state = 'su';
        index += 1;
        show.innerHTML = index;

    }
    else if (down && currY < tr - 2 && tiles[currX][currY + 1].state != 'w') {
        currY += 1;
        tiles[currX][currY - 1].state = 'sd';
        index += 1;
        show.innerHTML = index;

    }
    if (lvl == 4 && currX == tx + 1 && currY == tr - 2) {
        hasCrossed = true;
        dragE = true;
        show.innerHTML = index;
        if (starEaten) { entleft = tx + 1; }
        if (once) {
            tiles[tc - tm - 2][tr - 2].state = 'f';
            tiles[tc - tm - 3][tr - 2].state = 'w';
            tiles[tc - tm - 2][tr - 3].state = 'w';
            tiles[tc - tm - 3][tr - 3].state = 'w';
            once = false;
        }

    }
    if (lvl == 4 && currX == tx - 2 && currY == tr - 2) {

        if (!muted && keyone) {
            keyaud.play();
            keyone = false;
        }
    }
    if (lvl == 4) {
        if (currX == tc - tm - 2 && currY == tr - 2)// tc-tm-2
        {

            if (!muted) {
                tchest.play();
            }
            won();
            gameWin = true;
            //dragon();
            dragE = true;
            show.innerHTML = index;
            return;
        }
    }
    else if (lvl == 3) {
        if (currX == tc - 2 && currY == tr - 2) {//tc-2
            if (gotKey) {
                won();

                if (!muted) {
                    wall_move.play();
                }
                show.innerHTML = index;
                return;
            } else {
                alert("Get the key to open the Block!");
                currX = tc - 2; currY = 1;
                allStop();
            }
        }
    }
    else {
        if (currX == tc - 2 && currY == tr - 2)//tc-2
        {
            won();
            //index = 0;

            if (!muted) {
                wall_move.play();
            }
            show.innerHTML = index;
            return;
        }
    }


    if (axe > 0) {
        if (pr) {
            if (tiles[currX + 1][currY].state == 'w') {
                tiles[currX + 1][currY].state = 'e';
                axe--;

                if (!muted) {
                    breakAud.play();
                }
                axel.innerHTML = axe;
                pr = false;
                return;
            }
            else {
                return;
            }
        }
        if (pl) {
            if (tiles[currX - 1][currY].state == 'w') {
                tiles[currX - 1][currY].state = 'e';
                axe--;

                if (!muted) {
                    breakAud.play();
                }
                axel.innerHTML = axe;
                pl = false;
                return;
            }
            else {
                return;
            }
        }
        if (pu) {
            if (tiles[currX][currY - 1].state == 'w') {
                tiles[currX][currY - 1].state = 'e';
                axe--;

                if (!muted) {
                    breakAud.play();
                }
                axel.innerHTML = axe;
                pu = false;
                return;
            }
            else {
                return;
            }
        }
        if (pd) {
            if (tiles[currX][currY + 1].state == 'w') {
                tiles[currX][currY + 1].state = 'e';
                axe--;

                if (!muted) {
                    breakAud.play();
                }
                axel.innerHTML = axe;
                pd = false;
            }
            else {
                return;
            }
        }
    }
    if (currX == hx && currY == hy) {

        if (!muted) {
            healthAud.play();
        }
        index -= 80;
        show.innerHTML = index;
        changeHealth();
    }
    if (currX == bmx && currY == bmy) {

        if (!muted) {
            bombAud.play();
        }
        index += 100;
        show.innerHTML = index;
        changeBomb();
    }
    if (currX == pax && currY == pay) {
        // index += 100;
        // show.innerHTML = index;

        if (!muted) {
            axeAud.play();
        }
        axe += 2;
        axel.innerHTML = axe;
        useAxe();
        changAxe();
    }
    if (currX == pox && currY == poy) {

        if (!muted) {
            portalAud.play();
        }
        currX = pox_2;
        currY = poy_2;
        changePorts();
    }
    if (currX == pox_2 && currY == poy_2) {

        if (!muted) {
            portalAud.play();
        }
        currX = pox;
        currY = poy;
        changePorts();
    }
    if (currX == stx && currY == sty) {
        //Change player icn
        starEaten = true;

        if (!muted) {
            pstaradu.play();
        }
        shuriken.style.display = 'inline';
        healthBar.style.display = 'inline';
        sharp = 20; //No of Shuriken initially 11
        blade.innerHTML = sharp;
        changeStar();
    }
    if (currX == kx && currY == ky) {
        gotKey = true;

        if (!muted) {
            keyaud.play();
        }
        changeKeys();
    }
    if (lvl == 4 && currX == mx && currY == my) {
        gotscroll = true;
        if (!muted) {
            smoll.play();
        }
        if (maponce) {
            setTimeout(() => {
                alert("You got the scroll!!.\nPause the game by pressing shift and check out page 5 in instruction page by pressing Enter...");
                allStop();
            }, 300);
            maponce = false;
        }
        changeMap();
    }
    if (lvl == 2) {
        checkForEmptyTiles();
        Bomb();
        health();
        pickaxe();
        ag = false;
        empt = [];
    }
    if (lvl == 3) {
        checkForEmptyTiles();
        ag = true;
        Bomb();
        health();
        pickaxe();
        portalOne();
        portalTwo();
        lkey();
        aga = false;
        empt = [];
    }
    if (lvl == 4) {
        // ag = false;
        // aga = false;
        if (!dragonDefeted) {
            if (!isPaused && !muted) {
                boss_audio.play();
            } else {
                boss_audio.pause();
            }
        } else {
            boss_audio.pause();
        }
        music.src = music_sourceDummy;
        changeBomb();
        changAxe();
        changeHealth();
        changePorts();
        checkForEmptyTiles();
        star();
        showMap();
        if (hasCrossed && starEaten) {
            tiles[tx - 1][tr - 2].state = 'w';
            //dv = 1;
        }
        else {
            tiles[tx - 1][tr - 2].state = 'e';
            //dv = 0;
        }
        if (hasCrossed) {
            if (!starEaten) {
                alert("You should have a health bar to fight take the power up star and enter!!");
                hasCrossed = false;
                currX = 1;
                right = false;
                currY = tr - 2;

            }
            else {
                if (hasHit) {
                    if (onlyOnce) {
                        if (!muted) {
                            draco_roar.play();
                            onlyOnce = false;
                        }
                        onlyOnce = false;
                    }
                    sleep(3000);
                    dragonAttacks();
                }
                else {
                    if (!flame) {

                    } else { fireTiles = []; }
                }
            }
        }
        showStar = false;
        empt = [];
    }
    if (hasCrossed && starEaten) {
        // console.log(fireTiles);
        for (var i = 0; i < fireTiles.length; i++) {
            if (currX == fireTiles[i][0] && currY == fireTiles[i][1]) {
                hnum -= (fDamage / 10);
                document.getElementById('bar').value = hnum.toString();
                showHealth.innerHTML = document.getElementById('bar').value;
                //fireTiles.splice(i,1);
                if (hnum <= 0) {
                    hnum = 0;
                    fDamage = 0;
                    gameWin = false;
                    document.getElementById('bar').value = hnum.toString();
                    showHealth.innerHTML = document.getElementById('bar').value;
                    nextLevel();
                    scoreBoard();
                }
                else {
                    //Dragon_mini dimension: 64x96
                    //Dragon dimension:  240 × 360 => Hcf: 120
                    //240x360 = 86400 i.e 216 tiles(12tilex16tile)
                    document.getElementById('bar').value = hnum.toString();
                    showHealth.innerHTML = document.getElementById('bar').value;
                }
            }
        }
    }
    if (lvl == 5) {
        boss_audio.pause();
        scoreBoard();
    }
    blade.innerHTML = sharp;
    if (sharp < 0) {
        sharp = 0;
    }

    tiles[currX][currY].state = 's';
    //Developer only:
    //tiles[1][2].state = 'e';
    // gotKey = true;
}

let p1won = false;
let p2won = false;

function logicPlay() {
    if (right && currX < tc - 2 && tiles[currX + 1][currY].state != 'w') {
        currX += 1;
        tiles[currX - 1][currY].state = 'sr';
        index += 1;
        show.innerHTML = index;
    }
    if (left && currX > 1 && tiles[currX - 1][currY].state != 'w') {
        currX -= 1;
        tiles[currX + 1][currY].state = 'sl';
        index += 1;
        show.innerHTML = index;

    }
    if (up && currY > 1 && tiles[currX][currY - 1].state != 'w') {
        currY -= 1;
        tiles[currX][currY + 1].state = 'su';
        index += 1;
        show.innerHTML = index;

    }
    if (down && currY < tr - 2 && tiles[currX][currY + 1].state != 'w') {
        currY += 1;
        tiles[currX][currY - 1].state = 'sd';
        index += 1;
        show.innerHTML = index;
    }

    if (sr && currX2 < tc - 2 && tiles[currX2 + 1][currY2].state != 'w') {
        currX2 += 1;
        tiles[currX2 - 1][currY2].state = 'bb';
        index2 += 1;
        show2.innerHTML = index2;
    }
    if (sl && currX2 > 1 && tiles[currX2 - 1][currY2].state != 'w') {
        currX2 -= 1;
        tiles[currX2 + 1][currY2].state = 'bb';
        index2 += 1;
        show2.innerHTML = index2;
    }
    if (su && currY2 > 1 && tiles[currX2][currY2 - 1].state != 'w') {
        currY2 -= 1;
        tiles[currX2][currY2 + 1].state = 'bb';
        index2 += 1;
        show2.innerHTML = index2;
    }
    if (sd && currY2 < tr - 2 && tiles[currX2][currY2 + 1].state != 'w') {
        currY2 += 1;
        tiles[currX2][currY2 - 1].state = 'bb';
        index2 += 1;
        show2.innerHTML = index2;
    }
    tiles[1][tr - 2].state = 'f';
    tiles[tc - 2][tr - 2].state = 'f';

    pld = "./Images/exptis.png";
    pll = "./Images/ep_l.png";
    plu = "./Images/ep_u.png";
    plr = "./Images/ep_r.png";
    player2.src = pld;
    player2_l.src = pll;
    player2_r.src = plr;
    player2_u.src = plu;


    if (currX == tc - 2 && currY == tr - 2) {
        p1won = true;
        gameWin = false;
        scoreBoard();
    }
    else if (currX2 == 1 && currY2 == tr - 2) {
        p2won = true;
        gameWin = false;
        scoreBoard();
    }

    tiles[currX][currY].state = 's';
    tiles[currX2][currY2].state = 's2';

}

var scoreB = false;
let pl2move = document.getElementById('cypl');

function multiPlayerGame() {
    multiplayer = true;
    level.innerHTML = "Multiplayer"
    pageNo.innerHTML = '1/1';
    content();
    hideSetting('crdp2');
    pl2move.style.display = "initial";
}
let mlt = document.getElementById('mlt');
let mot = document.getElementById('mot');

function scoreBoard() {
    fireTiles = [];
    let te = document.getElementById('te');
    let ts = document.getElementById('ts');
    let lst = document.getElementById('lst');
    //mlt.innerHTML = "Moves of player two: ";
    //mot.innerHTML = "Moves of player one(Winner): ";
    if (p1won) {
        mlt.innerHTML = 'No. of Moves of player two: <span id="lst">0</span>';
        mot.innerHTML = 'No. of Moves of player one(Winner): <span id="ts"></span>';
    } else if (p2won) {
        mlt.innerHTML = 'No. of Moves of player one: <span id="lst">0</span>';
        mot.innerHTML = 'No. of Moves of player two(Winner): <span id="ts"></span>';
    }

    secondPhase = false;
    //Stop the timer
    //Total time elapsed
    //Total score from the 4 levels
    //Best score out of the 4 levels
    level.innerHTML = 'Done';
    clearInterval(timer);
    if (gameWin && timeWin && hnum > 0) {
        ti.innerHTML = 'You Won';
        verdict.innerHTML = "You Won";
    } else if (gameWin && !timeWin) {
        ti.innerHTML = 'Time Out';
        verdict.innerHTML = "You Ran Out Of Time";
    } else if (!gameWin && p1won) {
        ti.innerHTML = 'You Won';
        verdict.innerHTML = "PLAYER 1 IS WINNER!!";
    }
    else if (!gameWin && p2won) {
        ti.innerHTML = 'You Won';
        verdict.innerHTML = "PLAYER 2 IS WINNER!!";
    }
    else {
        ti.innerHTML = 'Game Over';
        verdict.innerHTML = "You Lost your Path";
    }
    var timeElapsed = 300 - seconds;
    //console.log(timeElapsed);
    var crd = document.getElementById('crd');
    crd.style.display = 'flex';
    crd.className = 'ctr';
    scoreB = true;
    let minuteTime = Math.floor(timeElapsed / 60);
    let secondsTime = timeElapsed % 60;
    te.innerHTML = minuteTime + ' min and ' + secondsTime + ' seconds<br>' + timeElapsed + 'sec(Total)';
    try {
        ts.innerHTML = sc1;
        lst.innerHTML = Math.max(...scl);
    } catch (error) {
        console.log("There was an error in loading the scores");
    }
    if (!gameWin && p1won) {
        document.getElementById('ts').innerHTML = index;
        document.getElementById('lst').innerHTML = index2;
    } else if (!gameWin && p2won) {
        document.getElementById('ts').innerHTML = index2;
        document.getElementById('lst').innerHTML = index;
    }
}
function over() {
    location.reload();
}

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
                tiles[1][2].state = 'e';//Just added for the maze to be a little more tough at the begining.
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
        //console.log('Done');
    }
}
recursion(currX, currY);

let level = document.getElementById('lvl');

function clear() {
    ctx.clearRect(0, 0, can.width, can.height);
}

function won() {
    win = true;
    getScore();
    index = 0;
    //clear();
    setTimeout(() => {
        nextLevel();
    }, 50);//change from 250 to 50...
}

setInterval(draw, 0);
setInterval(logic, 100);


window.addEventListener('keydown', kd);
window.addEventListener('keyup', ku);

var hellflame = [];
var healonce = true;

function Dragonreset() {
    secondPhase = true;
    if (healonce) {
        hnum += 20;
        healonce = false;
    }

    document.getElementById('bar').value = hnum.toString();
    showHealth.innerHTML = document.getElementById('bar').value;
    //{1->6 && 23 to rest(33)} => free slots in y dir for dheart
    //Have to change this....
    if (!muted && lvl == 4 && !dragonDefeted) {
        draco_roar.play();
    }
    setTimeout(() => {
        dracoSoundDone = true;
    }, 3000);
    // dHealth = 215;
    //daralv = false;
    for (var c = (tc - tm - 2); c > tx + 1; c--) {
        for (var r = 1; r < tr - 1; r++) {
            tiles[c][r].state = 'e';
        }
    }
    tiles[tc - tm - 2][tr - 2].state = 'f';
    tiles[tc - tm - 3][tr - 2].state = 'w';
    tiles[tc - tm - 3][tr - 3].state = 'w';
    tiles[tc - tm - 2][tr - 3].state = 'w';
    if (fourHearts >= 4) { afterDragonDefeat(); done = false; }
}
var dragonDefeted = false;
function afterDragonDefeat() {
    secondPhase = false;
    if (!muted && done) {
        victory.play();
        done = false;
    }
    hellflame = [];
    for (var c = (tc - tm - 2); c > tx + 1; c--) {
        for (var r = 1; r < tr - 1; r++) {
            tiles[c][r].state = 'e';
        }
    }
    tiles[tc - tm - 2][tr - 2].state = 'f';
    tiles[tc - tm - 3][tr - 2].state = 'e';
    tiles[tc - tm - 3][tr - 3].state = 'e';
    tiles[tc - tm - 2][tr - 3].state = 'e';
    dragonDefeted = true;
}

var empt = [];

function checkForEmptyTiles() {
    if (lvl == 4) {
        if (showStar) {
            for (var c = 0; c < tx; c++) {
                for (var r = 0; r < tr; r++) {
                    if (tiles[c][r].state == 'e') {
                        empt.push([c, r]);
                    }
                }
            }
        }
        else {
            empt = [];
        }
    }
    else {
        if (ag || aga) {
            for (var c = 0; c < tc; c++) {
                for (var r = 0; r < tr; r++) {
                    if (tiles[c][r].state == 'e') {
                        empt.push([c, r]);
                    }
                }
            }
        }
        else {
            empt = [];
        }
    }

}
//1257
var ag = true;
var aga = true;
var showStar = true;
var r1 = Math.floor(Math.random() * 1257);
var r2 = Math.floor(Math.random() * 1257);
var bmx;
var bmy;

var hx;
var hy;

function Bomb() {
    if (aga) {
        if (ag) {
            bmx = empt[r1][0];
            bmy = empt[r1][1];
            tiles[bmx][bmy].state = 'b';
        }
    }

}

function changeBomb() {
    bmx = '';
    bmy = '';
}
function health() {
    if (aga) {
        if (ag) {
            hx = empt[r2][0];
            hy = empt[r2][1];
            tiles[hx][hy].state = 'h';
        }
    }
}
function changeHealth() {
    hx = '';
    hy = '';
}
function changeStar() {
    stx = '';
    sty = '';
}
function changeKeys() {
    kx = '';
    ky = '';
}
function changeMap() {
    mx = '';
    my = '';
}

var r3 = Math.floor(Math.random() * 1257);
var r4 = Math.floor(Math.random() * 1257);
var pox;
var poy;
var pox_2;
var poy_2;
function portalOne() {
    if (aga) {
        pox = empt[r3][0];
        poy = empt[r3][1];
        tiles[pox][poy].state = 'pt';
    }
}
function portalTwo() {
    if (aga) {
        pox_2 = empt[r4][0];
        poy_2 = empt[r4][1];
        tiles[pox_2][poy_2].state = 'pt2';
    }
}

function changePorts() {
    pox = '';
    poy = '';
    pox_2 = '';
    poy_2 = '';
}
var r5 = Math.floor(Math.random() * 1257);
var pax, pay;

function pickaxe() {
    if (aga) {
        if (ag) {
            pax = empt[r5][0];
            pay = empt[r5][1];
            tiles[pax][pay].state = 'axe';
        }
    }
}
function changAxe() {
    pax = '';
    pay = '';
}
var r6 = Math.floor(Math.random() * 600);
var stx, sty;
var atx = tx + 1, aty = tr - 2;

function star() {
    if (showStar) {
        stx = empt[r6][0];
        sty = empt[r6][1];
        tiles[stx][sty].state = 'str';
    }
}

var r7 = Math.floor(Math.random() * 600) + 600;
var kx, ky;
function lkey() {
    if (aga) {
        kx = empt[r7][0];
        ky = empt[r7][1];
        tiles[kx][ky].state = 'key';
    }
}
var mx = 1, my = tr - 2;
function showMap() {
    if (showStar) {
        tiles[mx][my].state = 'scr';
    }
}

var fx;
var fy;

var pr = false, pl = false, pd = false, pu = false;

function useAxe() {
    document.addEventListener('keydown', e => {
        if (!multiplayer) {
            if (e.keyCode == 68 && axe > 0) // d
            {
                pr = true;
                return;
            }
            else if (e.keyCode == 65 && axe > 0) // a
            {
                pl = true;
                return;
            }
            else if (e.keyCode == 87 && axe > 0) // w
            {
                pu = true;
                return;
            }
            else if (e.keyCode == 83 && axe > 0) // s
            {
                pd = true;
                return;
            }
        }
    });
}

function nextLevel() {
    clear();
    lvl++;
    sharp = 0;
    if (lvl == 4) {
        for (var c = 0; c < tx; c++) {
            tiles[c] = [];
            for (var r = 0; r < tr; r++) {
                tiles[c][r] = {
                    x: c * tileW,
                    y: r * tileH,
                    state: 'e',
                    isvisited: false
                };
            }
        }
        for (var c = tx; c < tc - tm; c++) {
            //720 x 740
            tiles[c] = [];
            for (var r = 0; r < tr; r++) {
                tiles[c][r] = {
                    x: c * tileW, //x
                    y: r * tileH,  //y
                    state: 'e',
                    isvisited: true
                };
            }
        }
        for (var c = tc - tm; c < tc; c++) {
            tiles[c] = [];
            for (var r = 0; r < tr; r++) {
                tiles[c][r] = {
                    x: c * tileW,
                    y: r * tileH,
                    state: 'e', //May give any other state in the future
                    isvisited: true
                };
            }
        }

        for (var c = tx; c < tc; c++) {
            tiles[c][0].state = 'dr';
            tiles[c][tr - 1].state = 'dr';
        }
        for (var r = 0; r < tr; r++) {
            tiles[tx][r].state = 'dr';
            tiles[tc - 1][r].state = 'dr';
        }

        tiles[tx - 2][tr - 2].state = 'f';
        t = true;
        currX = 1;
        currY = 1;
        level.innerHTML = lvl + '/4';
        lvwalls();
        recursion(currX, currY);
    }
    else {
        for (var c = 0; c < tc; c++) {
            tiles[c] = [];
            for (var r = 0; r < tr; r++) {
                tiles[c][r] = {
                    x: c * tileW,
                    y: r * tileH,
                    state: 'e',
                    isvisited: false
                };
            }
        }
        tiles[tc - 2][tr - 2].state = 'f';
        t = true;
        currX = 1;
        currY = 1;
        level.innerHTML = lvl + '/4';
        walls();
        recursion(currX, currY);
    }

}

function hearu() {
    up = true;
}
function releaseu() {
    up = false;
}
function hearr() {
    right = true;
}
function releaser() {
    right = false;
}
function hearl() {
    left = true;
}
function releasel() {
    left = false;
}
function heard() {
    down = true;
}
function released() {
    down = false;
}
function hearx() {
    Spacebar = true;
    throwShuriken();
}
function releasex() {
    Spacebar = false;
}

//From mazesolver.js

setTimeout(detectMob, 0);

function detectMob() {
    if (typeof window.orientation !== 'undefined') {
        alert("Plese Auto rotate your Phone to play...");
        document.getElementById('phoneButtons').style.display = 'grid';
        document.getElementById('phoneButtons2').style.display = 'grid';
    }
}


moveit('panel');
moveit('crd');
moveit('crdp');
moveit('crdp2');
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
    if (!uno) {
        music.src = music_source;
        uno = true;
    }
    var hide = document.getElementById(hide);
    hide.style.display = 'none';
    isPanel = false;
    mazeIntro.className = 'rmv';
    //hide.className = 'hid';
}
function hidePause(hide) {
    var hide = document.getElementById(hide);
    hide.style.display = 'none';
    isPaused = false;
    timer = window.setInterval(time, 1000);
    dv = 1;
    //hide.className = 'hid';
}

let sound = document.getElementById('mute');
function hideSetting(hided) {
    var hidee = document.getElementById(hided);
    hidee.style.display = 'none';
    document.getElementById('noscript').style.display = "none";
    hide.style.display = 'flex';
    isSetting = false;
}

var isPanel = true;
var isPaused = false;
var crdp = document.getElementById('crdp');
var uno = false;

function showintro(e) {
    if ((e.keyCode == 13) && !isPanel) {
        hide.style.display = 'flex';
        isPanel = true;
        e.preventDefault();
    }
    else if ((e.keyCode == 13) && isPanel) {
        if (!uno) {
            music.src = music_source;
            uno = true;
        }
        hide.style.display = 'none';
        isPanel = false;
        mazeIntro.className = 'rmv';
        e.preventDefault();
    }
    //e.preventDefault();
}
function showpaused(e) {
    if ((e.keyCode == 16) && !isPaused) {
        isPaused = true;
        if (!muted) {
            pauseaud.play();
        }
        music.src = music_sourceDummy;
        crdp.style.display = 'flex';
        crdp.className = 'used';
        clearInterval(timer);
        dv = 0;
        e.preventDefault();
    }
    else if ((e.keyCode == 16) && isPaused) {
        isPaused = false;
        if (!muted) {
            pauseaud.play();
        }
        music.src = music_source;
        crdp.style.display = 'none';
        crdp.className = '';
        timer = window.setInterval(time, 1000);
        dv = 1;
        e.preventDefault();
    }
}
var vx = 1;
var Spacebar = false;
function throwShuriken(e) {
    if (hasCrossed && starEaten && !isPaused && lvl == 4) {
        if (Spacebar || e.keyCode == 32) {
            //console.log('cool');
            if (sharp > 0) {
                if (!muted) {
                    shurikenAud.play();
                }
                for (var i = currX + 1; i < tc - tm; i++) {
                    if (tiles[i + 1][currY].state == 'w') {
                        console.log("can't attack that..");
                        setTimeout(disapperBlade, 20);
                        sharp--;
                        shurikenAttack();
                        e.preventDefault();
                        return;
                    }
                    tiles[i][currY].state = 'bl';
                }
                setTimeout(disapperBlade, 100); //For animation
                sharp--;
                shurikenAttack();
                e.preventDefault();
                hellflame = [];

            }
        }
    }
    if (dHealth >= 150 && dHealth <= 213) {
        dHealthColor = "#00ff00";
    }
    else if (dHealth < 150 && dHealth >= 60) {
        dHealthColor = "#ffcc00";
    }
    else if (dHealth >= 1 && dHealth < 60) {
        dHealthColor = "#ff0000";
    }
    if (dHealth == 1) {
        hasHit = false;
        flame = true;
        Dragonreset();
    }
}

function shurikenAttack() {
    //This function is basically a check that did the shuriken hit the dragon/skeleton or not...
    if (dHealth > 1 && !secondPhase) {
        if (currY == leftoutTile)//currY > 0 && currY < eye
        {
            dHealth -= 25;
            fireTiles = [];
            //console.log(dHealth);
            if (dHealth < 0) {
                dHealth = 1;
            }
            hasHit = true;
        } else {
            hnum -= fDamage;
            document.getElementById('bar').value = hnum.toString();
            showHealth.innerHTML = document.getElementById('bar').value;
            if (hnum <= 0) {
                gameWin = false;
                nextLevel();
                scoreBoard();
            }
            console.log("miss");
        }
    }
    if (secondPhase && !dragonDefeted) {
        //if i have hit the dragon heart then
        if (currY == dhy) {
            daga = true;
            hnum += (fDamage / 4);//5
            fourHearts++;
            document.getElementById('bar').value = hnum.toString();
            showHealth.innerHTML = document.getElementById('bar').value;
            checkSpotForHeart();
        }
        else {
            daga = true;
            hnum -= (fDamage / 4);// 5
            document.getElementById('bar').value = hnum.toString();
            showHealth.innerHTML = document.getElementById('bar').value;
        }
        // console.log(daga+'The y cordinate is: '+ dhy+'and our y: '+currY);
    }
}

function disapperBlade() {
    for (var i = currX + 1; i < tc - tm - 1; i++) {
        if (tiles[i][currY].state == 'bl' || tiles[i][currY].state == 'fir') {
            tiles[i][currY].state = 'fiw';
        }
    }
}

const sleep = (milliseconds) => {
    return (resolve) => setTimeout(resolve, milliseconds);
}

let fireTiles = [];
let leftoutTile;

function setTile() {
    leftoutTile = Math.floor(Math.random() * (tr - 5)) + 2; //1 to 33
    return leftoutTile;
}

function dragonAttacks() {
    var lt = setTile();
    for (var c = (tc - tm - 2); c > tx + 1; c--) {
        for (var r = 1; r < tr - 1; r++) {
            if (r == lt) {
                tiles[c][r].state = 'e';
                tiles[tc - tm - 1][r].state = 'sku';
            }
            else {
                fireTiles.push([c, r]);
                tiles[c][r].state = 'fir';
            }
        }
    }
    for (var c = tc - tm - 1; c < tc - tm; c++) {
        for (var r = 1; r < tr - 1; r++) {
            if (r != lt) {
                tiles[c][r].state = 'fiw';
            }
        }
    }
    //console.log(dHealth);
    skullAttack();
    tiles[tc - tm - 2][tr - 2].state = 'f';
    tiles[tc - tm - 3][tr - 2].state = 'w';
    tiles[tc - tm - 2][tr - 3].state = 'w';
    tiles[tc - tm - 3][tr - 3].state = 'w';
    hasHit = false;
    flame = false;

}
function skullAttack() {
    if (dHealth > 15) {
        setTimeout(() => {
            if (!muted) {
                skullbf.play();
            }
            for (var c = (tc - tm - 2); c > tx; c--) {
                tiles[c][leftoutTile].state = 'blf';
                fireTiles.push([c, leftoutTile]);
            }
        }, 3000);
    }
}

var pageContent = document.getElementById('infor');
var info1 = document.getElementById('info');
var info2 = document.getElementById('toleft');
var pageNo = document.getElementById('pageno');
var next = document.getElementById('next');
var prev = document.getElementById('prev');
var pno = 1;

function Nextpage() {
    if (!multiplayer) {
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
        content();
    } else {
        pageNo.innerHTML = '1/1';
    }
}

function Prevpage() {
    if (!multiplayer) {
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
        }
        else if (pno == 4) {
            pageNo.innerHTML = '3/5';
            pno = 3;
        }
        else if (pno == 5) {
            pageNo.innerHTML = '4/5';
            pno = 4;
        }
        content();
    } else {
        pageNo.innerHTML = '1/1';
    }
}

function content() {
    if (pno == 1) {
        pageContent.innerHTML = '<p id="info">' + info1.innerHTML + '<div id="toleft">' + info2.innerHTML + '</div></p>';

    }
    else if (pno == 2) {
        pageContent.innerHTML = '<div style="float: left;text-align:left;"><span class="bullet">◉</span>There are Four levels in Total.<br><span class="bullet">◉</span>1st Level you have to reach the end its simple.<br><span class="bullet">◉</span>2nd Level there will be a bomb and a health(in shape of &nbsp;&nbsp;&nbsp;blue heart), crossing the bomb will increase 100 steps &nbsp;&nbsp;&nbsp;decreasing you score and crossing health will decrease 80 &nbsp;&nbsp;&nbsp;steps increasing your score.<br><span class="bullet">◉</span>3rd Level will cointain bomb,health as well as portals. If you &nbsp;&nbsp;&nbsp;enter to any one you will come out of the other!!<br><span class="bullet">◉</span>Press the Spacebar once you have acquired the power-up &nbsp;&nbsp;&nbsp;star to throw the shuriken.<br><span class="bullet">◉</span>The 4th Level is ...</div><br><br><button id="bt1" style="background:url(./Images/bomb.png)"></button>Bomb<button id="bt2" style="background:url(./Images/health.png)"></button>Health<button id="bt1" style="background:url(./Images/pickaxe.png)"></button>Pickaxe<button id="bt3" style="background:tomato"></button>Portal<br><button id="bt5" style="background:orange"></button>Portal<br> <h3>More Stuffs coming Soon...</h3>';
    }
    else if (pno == 3) {
        pageContent.innerHTML = '<br><br><h2>How to use the Pickaxe</h2><hr><br>Once the pickaxe is acquired, the user can use it 2 times only.<br>The purpose of the pickaxe is to break the wall!!<br>To break wall in certain direction press:<br><h2>W</h2> For up wall<br><h2>A</h2> For left wall<br><h2>S</h2> For down wall<br><h2>D</h2> For right wall<hr>';
    }
    else if (pno == 4) {
        pageContent.innerHTML = '<br><br><h2>Press SHIFT to Pause.</h2><hr><br>Also Scroll down and give your feedback on the comment section or just post your score in the comments.<br>Press m to mute or un-mute the Sound.';
    }
    else if (pno == 5) {
        if (gotscroll) {
            pageContent.innerHTML = '<br><br><h2>How to Defeat the Dragon</h2><hr><br><span class="bullet">◉</span>Once you Enter the Dragon Arena, Stay there don՚t Move.<br><span class="bullet">◉</span>The Dragon will spawn skulls as its minions and surround the area with dragon fire.<br><span class="bullet">◉</span>Go parallel to them and Press <span id="ze">Enter</span> to throw shuriken and destroy the skull minions.<br><span class="bullet">◉</span>Aiming and Shooting in the wrong direction will cost you 20Hp and the skull minions can also breath blue dragon fire, on getting hit by it you rapidly start loosing helth by standing infront of it<br><span class="bullet">◉</span>Shooting the skull minions lowers the Dragons health. Once the Dragon reaches to the lowest Hp it starts breathing fire.<br><span class="bullet">◉</span>The Dragon has 4 hearts.<br><span class="bullet">◉</span>Destroy them to defeat the dragon once and for all.';
        }
        else {
            pageContent.innerHTML = '<br><br><h4>This Page is torn out.<br>You Wonder what was here...</h4>';
        }
    }
    if (pno == 1 && multiplayer) {
        pageContent.innerHTML = '<p id="info">' + info1.innerHTML + '<div id="toleft">' + info2.innerHTML + '</div>' + '<br><span class="bullet">◉</span>Try Reaching the end point (Diagonal to the player,in form of a stairs) Faster than your opponent!<br><span class="bullet">◉</span>Player 1: arrow keys and Player 2: w,a,s,d.</p>';
    }
}

window.addEventListener('keypress', showintro);
window.addEventListener('keydown', showpaused);

window.addEventListener('keypress', throwShuriken);

let credit = document.getElementById("crde2");

function showCredits() {
    credit.style.display = "flex";
    credit.className = "mine";// or credit.classList.add("mine");
    console.log("Made with ❤️ By Arkaraj");
}

//forSave = true;
function Save() {
    try {
        //I saw this function in a youtube tutorial...
        const a = document.createElement('a');
        //For IE/Edge.... who uses this again:(
        if (window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(can.msToBlob(), "mazegen_solve.png")
        }
        else {
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

/**
    *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
    *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables

    // Replace PAGE_URL with your page's canonical URL variable

    // Replace PAGE_IDENTIFIER with your page's unique identifier variable
*/