"use strict";
let canvas;
let ctx;

let keySpace;
let mouseclick;
let clickx;
let clicky;
let mouseX;
let mouseY;
let esc;

let pause = false;
let menu = true;
let inGame = false;
let options = false;
let credits = false;
let music = true;
let SFX = true;
let unselect = false;

let startKnapp = false;
let optionsKnapp = false;
let creditsKnapp = false;
let backKnapp = false;

let speedmultiplier = 1;
let hpMultiplier = 1;
let hpMultiplierFenrir = 1;
let runes = 300;
let hitpoints = 50;
let wave = 0;
let waveMax = 4;
let runda = 1;
let tick = 0;
let mellan = 30;
let gudVal = -1;
let gameOver = false;

window.onload = init;

//SOUNDS
//Music
var backgroundMusic = new Audio('sound/musik.mp3');
//"Prepare for War" av Alexander Nakarada https://www.youtube.com/watch?v=shymBOHp0nw
//"Hymn to the Gods" av Alexander Nakarada https://www.youtube.com/watch?v=WqOXTzwO8dY
//"Blood Eagle" av Alexander Nakarada https://www.youtube.com/watch?v=aoHwzdOxvK8

//SFX
var placera = new Audio('sound/placera.wav');
//från JFXR https://jfxr.frozenfractal.com/#%7B%22_version%22%3A1%2C%22_name%22%3A%22n%C3%A5got%22%2C%22_locked%22%3A%5B%5D%2C%22sampleRate%22%3A44100%2C%22attack%22%3A0%2C%22sustain%22%3A0%2C%22sustainPunch%22%3A0%2C%22decay%22%3A0.47000000000000003%2C%22tremoloDepth%22%3A41%2C%22tremoloFrequency%22%3A36%2C%22frequency%22%3A1247.7578025999903%2C%22frequencySweep%22%3A-4900%2C%22frequencyDeltaSweep%22%3A-2000%2C%22repeatFrequency%22%3A0%2C%22frequencyJump1Onset%22%3A33%2C%22frequencyJump1Amount%22%3A0%2C%22frequencyJump2Onset%22%3A66%2C%22frequencyJump2Amount%22%3A0%2C%22harmonics%22%3A0%2C%22harmonicsFalloff%22%3A0.5%2C%22waveform%22%3A%22pinknoise%22%2C%22interpolateNoise%22%3Atrue%2C%22vibratoDepth%22%3A0%2C%22vibratoFrequency%22%3A10%2C%22squareDuty%22%3A50%2C%22squareDutySweep%22%3A0%2C%22flangerOffset%22%3A2%2C%22flangerOffsetSweep%22%3A2%2C%22bitCrush%22%3A16%2C%22bitCrushSweep%22%3A0%2C%22lowPassCutoff%22%3A22050%2C%22lowPassCutoffSweep%22%3A0%2C%22highPassCutoff%22%3A0%2C%22highPassCutoffSweep%22%3A0%2C%22compression%22%3A1.8%2C%22normalization%22%3Atrue%2C%22amplification%22%3A100%7D
var knappSound = new Audio('sound/knapp.wav');
//av JarredGibb https://freesound.org/people/JarredGibb/sounds/219478/
var lightningSound0 = new Audio('sound/blixt.wav'); var lightningSound1 = new Audio('sound/blixt.wav');var lightningSound2 = new Audio('sound/blixt.wav');var lightningSound3 = new Audio('sound/blixt.wav');var lightningSound4 = new Audio('sound/blixt.wav');var lightningSound5 = new Audio('sound/blixt.wav');var lightningSound6 = new Audio('sound/blixt.wav');var lightningSound7 = new Audio('sound/blixt.wav');var lightningSound8 = new Audio('sound/blixt.wav');var lightningSound9 = new Audio('sound/blixt.wav');var lightningSound10 = new Audio('sound/blixt.wav');
var lightningList = [lightningSound0, lightningSound1, lightningSound2, lightningSound3 ,lightningSound4, lightningSound5 ,lightningSound6 , lightningSound7, lightningSound8, lightningSound9, lightningSound10];
let lightningnumber = 0;

var swordSwoosh0 = new Audio('sound/sword-swoosh.wav');var swordSwoosh1 = new Audio('sound/sword-swoosh.wav');var swordSwoosh2 = new Audio('sound/sword-swoosh.wav');var swordSwoosh3 = new Audio('sound/sword-swoosh.wav');var swordSwoosh4 = new Audio('sound/sword-swoosh.wav');var swordSwoosh5 = new Audio('sound/sword-swoosh.wav');var swordSwoosh6 = new Audio('sound/sword-swoosh.wav');var swordSwoosh7 = new Audio('sound/sword-swoosh.wav');var swordSwoosh8 = new Audio('sound/sword-swoosh.wav');var swordSwoosh9 = new Audio('sound/sword-swoosh.wav');var swordSwoosh10 = new Audio('sound/sword-swoosh.wav');
var swordSwooshList = [swordSwoosh0,swordSwoosh1,swordSwoosh2,swordSwoosh3,swordSwoosh4,swordSwoosh5,swordSwoosh6,swordSwoosh7,swordSwoosh8,swordSwoosh9,swordSwoosh10];
let swordSwooshNumber = 0;

//IMAGES
//bana
let bana1 = new Image;
bana1.src = "img/bana1.png";
let plank = new Image;
plank.src = "img/Plankor.png"

//fiender
let fiende1 = new Image;
fiende1.src = "img/monster1.png";
let fiende2 = new Image;
fiende2.src = "img/Is_Monster.png";
let fiende3 = new Image;
fiende3.src = "img/Stronk_Monster.png";
let fenrir = new Image;
fenrir.src = "img/Fenrir_Super_WIP.png";

//gudar
let tor = new Image;
tor.src = "img/TorIdle.png";
let torAtk = new Image;
torAtk.src = "img/TorAtk.png";
let tyr = new Image;
tyr.src = "img/Tyr_WIP.png";
let torKort = new Image;
torKort.src = "img/Tor_Portratt.png";
let tyrKort = new Image;
tyrKort.src = "img/Tyr_Portratt.png";
let lokeKort = new Image;
lokeKort.src = "img/Loki_Portrait.png";
let odenKort = new Image;
odenKort.src = "img/Odin_Portrait.png";

//runes
let runa = new Image;
runa.src = "img/runa.png";
let rune1 = new Image;
rune1.src = "img/rune1.png";
let rune2 = new Image;
rune2.src = "img/rune2.png";
let rune3 = new Image;
rune3.src = "img/rune3.png";
let rune4 = new Image;
rune4.src = "img/rune4.png";
let rune5 = new Image;
rune5.src = "img/rune5.png";
let rune6 = new Image;
rune6.src = "img/rune6.png";
let rune7 = new Image;
rune7.src = "img/rune7.png";
let rune8 = new Image;
rune8.src = "img/rune8.png";
let rune9 = new Image;
rune9.src = "img/rune9.png";
let rune0 = new Image;
rune0.src = "img/rune0.png";
var runeimg = [rune0, rune1, rune2, rune3, rune4, rune5, rune6, rune7, rune8, rune9];

//Other
let menuImg = new Image;
menuImg.src = "img/Main_menu.png";
let start_knapp = new Image;
start_knapp.src = "img/Start_knapp.png";
let options_knapp = new Image;
options_knapp.src = "img/Options_knapp.png";
let options_sida = new Image;
options_sida.src = "img/Options_sida.png";
let check_knapp = new Image;
check_knapp.src = "img/check_knapp.png";
let credits_knapp = new Image;
credits_knapp.src = "img/Credits_knapp.png";
let creditsSida = new Image;
creditsSida.src = "img/Credits_sida.png";
let back = new Image;
back.src = "img/back.png";
let pauseMenu = new Image;
pauseMenu.src = "img/Pause_menu_rune.png";
let pauseMenuMuteSFX = new Image;
pauseMenuMuteSFX.src = "img/Pause_menu_mute_sfx.png";
let pauseMenuMuteMusic = new Image;
pauseMenuMuteMusic.src = "img/Pause_menu_mute_musik.png";
let game_over = new Image;
game_over.src = "img/Game_over.png";
let home_ = new Image;
home_.src = "img/Home_.png";
let restartHover = new Image;
restartHover.src = "img/Restart.png";
let heart = new Image;
heart.src = "img/Hjarta_500x500.png";

//lightning
let blixt1 = new Image;
blixt1.src = "img/blixt_1.png";
let blixt2 = new Image;
blixt2.src = "img/blixt_2.png";
let blixt3 = new Image;
blixt3.src = "img/blixt_3.png";
let blixt4 = new Image;
blixt4.src = "img/blixt_4.png";
let blixt5 = new Image;
blixt5.src = "img/blixt_5.png";
var blixtimg = [blixt1, blixt1, blixt2, blixt2, blixt3, blixt3, blixt4, blixt4, blixt5, blixt5];

//beyblade aka tyrs animation
let beyblade1 = new Image;
beyblade1.src = "img/TyrSpin1.png";
let beyblade2 = new Image;
beyblade2.src = "img/TyrSpin2.png";
let beyblade3 = new Image;
beyblade3.src = "img/TyrSpin3.png";
let beyblade4 = new Image;
beyblade4.src = "img/TyrSpin4.png";
let beyblade5 = new Image; 
beyblade5.src = "img/TyrSpin5.png";
var beybladeimg = [beyblade1, beyblade1, beyblade2, beyblade2, beyblade3, beyblade3, beyblade4, beyblade4, beyblade5, beyblade5];

//sliceanimation
let tyrSlice1 = new Image;
tyrSlice1.src = "img/tyrSlice1.png";
let tyrSlice2 = new Image;
tyrSlice2.src = "img/tyrSlice2.png";
let tyrSlice3 = new Image;
tyrSlice3.src = "img/tyrSlice3.png";
let tyrSlice4 = new Image;
tyrSlice4.src = "img/tyrSlice4.png";
var tyrSliceImg = [tyrSlice1, tyrSlice2, tyrSlice3, tyrSlice3, tyrSlice4];

//första 15 rundorna
var rundor = [
    [0,0,0,0],
    [0, 0, 0,0,0,0],
    [0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 1, 1, 0], //5
    [1, 1, 1, 0, 0, 0,],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 1, 1, 0, 1, 1, 1, 0, 0, 1],
    [1, 1, 1,0, 1,0, 1,0, 1, 1,0, 1, 1, 1],
    [2, 1, 1, 0, 1,1,1,0,1,0,0], //10
    [2, 1, 0, 2, 2, 1],
    [2, 1, 1, 2, 1, 2, 0, 2, 2,1],
    [2, 2, 2, 1, 2, 1, 2, 2,1,1,2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [3], //15
];

//vart fiender ska gå, punkter för varje sväng. 
var pointlist = [
    {x: -40, y: 238}, //0
    {x:415, y:238}, 
    {x:415, y:112},
    {x:180, y:112},
    {x:180, y:500},
    {x:300, y:500}, //5
    {x:300, y:360},
    {x:800, y:360},
    {x:800, y:198},
    {x:626, y:198},
    {x:626, y:480}, //10
    {x:496, y:480},
    {x:496, y:650}
];

//olika fiender, de siffror som ändras baserat på fienden.
var enemytypes = [
    {width: 58, height: 45, speed: 2, maxHP: 10, runes: 5, dmg: 1, img: fiende1},
    {width: 58, height: 45, speed: 2, maxHP: 20, runes: 10, dmg: 5, img: fiende2},
    {width: 58, height: 45, speed: 2, maxHP: 40, runes: 20, dmg: 10, img: fiende3},
    {width: 100, height: 250, speed: 2, maxHP: 150, runes: 100, dmg: 100, img: fenrir}
];

//alla fiender som lever på skärmen
var enemies = [];

//klass för fiender med variabler och funktioner
class enemy{
    constructor(type){
        this.type = type;
        this.x = -40;
        this.y = 238;
        this.point = 0;
        if(type == 3){
            this.hp = enemytypes[type].maxHP*hpMultiplierFenrir;
        }
        else{
            this.hp = enemytypes[type].maxHP*hpMultiplier;
        }
        this.img = enemytypes[type].img;
        this.dx = 0;
        this.dy = 0;
        this.width = enemytypes[type].width;
        this.height = enemytypes[type].height;
        this.speed = enemytypes[type].speed;
        this.runes = enemytypes[type].runes;
        this.angle = 0;
        this.dmg = enemytypes[type].dmg;
    }

    //får dem att gå varje tick
    update(){
        this.x+=this.dx;
        this.y+=this.dy;
    }
    //sätter deras hastighet i båda riktningarna
    setdelta(distx, disty){
        this.angle = Math.atan2(disty, distx);
        this.dx=Math.cos(this.angle)*this.speed*speedmultiplier;
        this.dy=Math.sin(this.angle)*this.speed*speedmultiplier;
    }
    //ritar ut
    draw(ctx){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle-0.5*Math.PI);
        ctx.translate(this.x*-1, this.y*-1);
        ctx.drawImage(this.img, this.x-(this.width/2), this.y-(this.height/2), this.width, this.height);
        ctx.restore();
    }
};

//sätter alla variabler för spelet till startvärdena
function restart(){
    speedmultiplier = 1;
    hpMultiplier = 1;
    hpMultiplierFenrir = 1;
    hitpoints = 50;
    gameOver = false;
    pause = false;
    unselect = false;
    runda = 1;
    tick = 0;
    gudVal = -1;
    runes = 300;
    waveMax = 4;
    wave = 0;
    keySpace = false;
    gods.splice(0, gods.length);
    enemies.splice(0, enemies.length);
}

//spawnar fiender enligt rundor listan om det är första 15 rundorna, annars samma wave 4/5 gånger fast med mer hp, fenrir sista 1/5 med mer hp. 
function roundManager(){
    if(runda <= 15){
        if (wave == waveMax){ //byter runda
            if(enemies.length == 0){
                if(tick == 100){ //Hur länge man väntar mellan alla rundor
                    tick = 0;
                    runda++;
                    wave = 0;
                    if(runda <= 15){
                        waveMax = rundor[runda-1].length;
                    }
                    else{
                        waveMax = 10;
                        hpMultiplier = 1.2;
                        hpMultiplierFenrir = 1.1;
                    }
                }
                else{
                    tick++;
                }
    
            }
        }
        else{ //spawnar fiender
            if(tick >= mellan){ //Mellanrum på fienderna
                enemies.push(new enemy(rundor[runda-1][wave]));
                wave++;
                tick = 0;
            }
            else{
                tick++;
            }
        }
    }
    else{
        if(wave == waveMax){
            if(enemies.length == 0){
                if(tick == 100){
                    tick = 0;
                    runda++;
                    wave = 0;
                    hpMultiplier*=1.2;
                    if(runda % 5 == 0){
                        waveMax = 1;
                    }
                    else{
                        waveMax = 10;
                    }
                }
                else{
                    tick++;
                }
            }
        }
        else{
            if(tick >= mellan){ //Mellanrum på fienderna
                if(runda % 5 == 0){
                    enemies.push(new enemy(3));
                }
                else{
                    enemies.push(new enemy(2));
                }
                wave++;
                tick = 0;
            }
            else{
                tick++;
            }
        }
    }
}


//siffror som är olika beroende på vilken typ av gud. 
var godtypes = [
    {width: 100, height: 75, range:180**2, dmg: 3, attackCD: 48, cost:100, img: tor, cost:100, xOffset: 45, yOffset: 42.5},
    {width: 65, height: 65, range: 70**2, dmg: 6, attackCD: 45, img: tyr, cost: 250, xOffset: 34.5, yOffset: 39.5},
];

//lista med alla utsatta gudar i
var gods = [];

//gud klass med variabler och funktioner
class god{
    constructor(x, y, type){
        this.type = type;
        this.x = x;
        this.y = y;
        this.img = godtypes[type].img;
        this.width = godtypes[type].width;
        this.height = godtypes[type].height;
        this.range = godtypes[type].range;
        this.dmg = godtypes[type].dmg;
        this.attackCD = godtypes[type].attackCD;
        this.remainingCD = 0;
        this.highlight = false;
        this.angle = 0.5*Math.PI;
        this.xOffset = godtypes[type].xOffset;
        this.yOffset = godtypes[type].yOffset;
    }

    
    draw(ctx){
        if(this.type == 0){
            if(this.attackCD - this.remainingCD < 10){
                this.img = torAtk;
            }
            else{
                this.img = tor;
            }
        }
        if(this.type == 1){
            if(this.attackCD - this.remainingCD < beybladeimg.length){
                this.img = beybladeimg[this.attackCD - this.remainingCD];
                this.width = 120;
                this.height = 92;
                this.xOffset = 60
                this.yOffset = 46;
            }
            else{
                this.img = tyr;
                this.width = 65;
                this.height = 65;
                this.xOffset = 34.5
                this.yOffset = 39.5;
            }
        }
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle-0.5*Math.PI);
        ctx.translate(this.x*-1, this.y*-1);
        ctx.drawImage(this.img, this.x-this.xOffset, this.y-this.yOffset, this.width, this.height);
        ctx.restore();
    }
    //ritar highlight cirkeln om guden är highlightad
    drawHighlight(){
        if(this.highlight){
            ctx.beginPath();
            ctx.arc(this.x,this.y, this.range**0.5, 0, 2*Math.PI);
            ctx.globalAlpha = 0.3;
            ctx.fillStyle = "black";
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }
}

//gången och andra saker som gör att man inte kan placera gudar där
var stig = [
    {x: -10, width: 430, y: 200, height: 60}, //-10, 220, 430, 39
    {x: 380, width: 70, y: 80, height: 175}, //392, 106, 45, 140
    {x: 175, width: 245, y: 75, height: 70}, //175, 91, 245, 40
    {x: 140, width: 80, y: 85, height: 430}, //155, 106, 46, 395
    {x: 168, width: 140, y: 460, height: 70}, //5 --- 168, 480, 140, 40
    {x: 260, width: 80, y: 330, height: 190}, //277, 355, 46, 150
    {x: 290, width: 530, y: 320, height: 70}, //296, 337, 500, 41
    {x: 755, width: 80, y: 170, height: 200}, //777, 201, 46, 160
    {x: 600, width: 220, y: 160, height: 70}, //625, 175, 170, 40
    {x: 580, width: 80, y: 205, height: 290}, //10 --- 599, 205, 46, 280
    {x: 470, width: 170, y: 440, height: 70}, //492, 460, 130, 40
    {x: 450, width: 85, y: 460, height: 140}, //469, 480, 46, 110
    {x: 0, width: 155, y: 130, height: 90}, //skylten
    {x: 630, width: 250, y: 0, height: 100}, //busken1
    {x: 650, width: 250, y: 100, height: 30} //busken2 electric bogaloo
]

//ritar ut alla aktiva Tor attacker
function drawTorAtk(){
    for(let i=0 ; i < activeTorAtk.length ; i++){
        ctx.drawImage(blixtimg[activeTorAtk[i].frame-1], activeTorAtk[i].x-90, activeTorAtk[i].y-67.5, 180, 135);
    }
}

//listor för aktiva tor och tyr attackanimationer
var activeTorAtk = [];
var activeTyrAtk = [];

function drawTyrAtk(){
    for(let i=0 ; i < activeTyrAtk.length ; i++){
        ctx.drawImage(tyrSliceImg[activeTyrAtk[i].frame-1], activeTyrAtk[i].x-40, activeTyrAtk[i].y-25, 80, 60);
    }
}

//Löser båda gudarnas attacker och uppdaterar deras animationer
function attack(){
    //löser tors aktiva attacker
    for(let a=0 ; a < activeTorAtk.length ; a++){
        if(activeTorAtk[a].frame == 3){
            if(SFX){
                lightningList[lightningnumber].play();
                lightningnumber++;
                if(lightningnumber >= lightningList.length){
                    lightningnumber = 0;
                }
            }
            for(let i=0 ; i < enemies.length ; i++){
                if((enemies[i].x - activeTorAtk[a].x)**2+(enemies[i].y - activeTorAtk[a].y)**2 < activeTorAtk[a].range){
                    enemies[i].hp -= activeTorAtk[a].dmg;
                }
            }
            deadEnemy();
            activeTorAtk[a].frame++;
        }
        else if(activeTorAtk[a].frame == 10){
            activeTorAtk.splice(a, 1);
        }
        else{
            activeTorAtk[a].frame++;
        }
    }
    //Tar hand om tyrs slice animationer.
    for(let s=0 ; s < activeTyrAtk.length ; s++){
        if(activeTyrAtk[s].frame == tyrSliceImg.length){
            activeTyrAtk.splice(s, 1);
        }
        else{
            activeTyrAtk[s].frame++;
        }
    }

    for(let g=0 ; g < gods.length ; g++){
        if (gods[g].remainingCD > 0){
            gods[g].remainingCD -= 1;
        }
        else{

            //Tor sätter ut nya attacker.
            if(gods[g].type == 0){
                for(let i=0 ; i < enemies.length ; i++){
                    if((enemies[i].x - gods[g].x)**2+(enemies[i].y - gods[g].y)**2 < gods[g].range){
                        activeTorAtk.push({x: enemies[i].x, y: enemies[i].y, frame: 1, range: 25**2, dmg: gods[g].dmg});
                        let disty = gods[g].y - enemies[i].y;
                        let distx = gods[g].x - enemies[i].x;
                        gods[g].angle = Math.atan2(disty, distx);
                        gods[g].remainingCD = gods[g].attackCD;
                        break;
                    }
                }
            }

            //Tyrs attacker
            if(gods[g].type == 1){
                let angleChange = false;
                for(let i=0 ; i < enemies.length ; i++){
                    if((enemies[i].x - gods[g].x)**2+(enemies[i].y - gods[g].y)**2 < gods[g].range){
                        if(!angleChange){
                            let disty = gods[g].y - enemies[i].y;
                            let distx = gods[g].x - enemies[i].x;
                            gods[g].angle = Math.atan2(disty, distx);
                            angleChange = true;
                            if(SFX){
                                swordSwooshList[swordSwooshNumber].play();
                                swordSwooshNumber++;
                                if(swordSwooshNumber >= swordSwooshList.length){
                                    swordSwooshNumber = 0;
                                }
                            }
                        }
                        activeTyrAtk.push({x: enemies[i].x, y: enemies[i].y, frame: 1});
                        enemies[i].hp -= gods[g].dmg;
                        gods[g].remainingCD = gods[g].attackCD;
                    }
                }
                deadEnemy();
            }
        }
    }
}

//tar bort fiender om dom är döda och rewardar runor. 
function deadEnemy(){
    for(let i=enemies.length-1 ; i >= 0 ; i--){
        if(enemies[i].hp <= 0){
            runes += enemies[i].runes;
            enemies.splice(i, 1);
        }
    }
}

//ritar ut hur många runor (valutan) man har. 
function drawRunes(){
    ctx.drawImage(runa, 1024-((String(runes).length+1)*20+15), -2, 28, 56);
    for(let i=0 ; i < String(runes).length ; i++){
        ctx.drawImage(runeimg[String(runes).charAt(i)],1024-((String(runes).length-i)*20+5),5,20,40);
    }
}

//Ritar ut vilken runda man är på.
function drawRound(){
    for(let i=0 ; i < String(runda).length ; i++){
        ctx.drawImage(runeimg[String(runda).charAt(i)],1024-((String(runda).length-i)*20+5),60,20,40);
    }
}

function drawEndgameround(){
    for(let i=0 ; i < String(runda).length ; i++){
        ctx.drawImage(runeimg[String(runda).charAt(i)],770+i*40,420,40,80);
    }
}

//Ritar ut ens egna health. 
function drawHitpoints(){
    ctx.drawImage(heart,-5,3,70,60);
    if(String(hitpoints).length == 2){
        for(let i=0 ; i < String(hitpoints).length ; i++){
            ctx.drawImage(runeimg[String(hitpoints).charAt(i)],15+15*i,15,15,30);
        }
    }
    else{
        ctx.drawImage(runeimg[String(hitpoints).charAt(0)],22,15,15,30);
    }
}


function update(){
    //Allt som har med menyn att göra.
    if(menu){
        //Om man inte är inne i varken options eller credits aka om man hoverar eller klickar knappar i huvudmenyn
        if(!options && !credits){
            if(mouseX > 266 && mouseX < 761 && mouseY > 111 && mouseY < 243){
                startKnapp = true;
            }
            else{
                startKnapp = false;
            }

            if(mouseX > 264 && mouseX < 759 && mouseY > 265 && mouseY < 397){
                optionsKnapp = true;
            }
            else{
                optionsKnapp = false;
            }

            if(mouseX > 264 && mouseX < 760 && mouseY > 424 && mouseY < 556){
                creditsKnapp = true;
            }
            else{
                creditsKnapp = false;
            }

            if(mouseclick){
                mouseclick = false;
                //startknappen
                if(clickx > 266 && clickx < 761 && clicky > 111 && clicky < 243){
                    inGame = true;
                    menu = false;
                    if(music){
                        backgroundMusic.play();
                    }
                    if(SFX){
                        knappSound.play();
                    }
                }

                //optionsknappen
                if(clickx > 264 && clickx < 759 && clicky > 265 && clicky < 397){
                    options = true;
                    optionsKnapp = false;
                    if(SFX){
                        knappSound.play();
                    }
                }

                //creditsknappen
                if(clickx > 264 && clickx < 760 && clicky > 424 && clicky < 556){
                    credits = true;
                    creditsKnapp = false;
                    if(SFX){
                        knappSound.play();
                    }
                }
            }
        }
        //Kan mutea musik och ljudeffekter i options och en tillbaka pil
        if(options){
            if(mouseX > 20 && mouseX < 79 && mouseY > 10 && mouseY < 70){
                backKnapp = true;
            }
            else{
                backKnapp = false;
            }

            if(mouseclick){
                mouseclick = false;
                if(clickx > 276 && clickx < 389 && clicky > 128 && clicky < 242){
                    if(music){
                        music = false;
                    }
                    else{
                        music = true;
                    }
                    if(SFX){
                        knappSound.play();
                    }
                }
                if(clickx > 275 && clickx < 388 && clicky > 353 && clicky < 467){
                    if(SFX){
                        SFX = false;
                    }
                    else{
                        SFX = true;
                        knappSound.play();
                    }
                }
                if(clickx > 20 && clickx < 79 && clicky > 10 && clicky < 80){
                    options = false;
                    backKnapp = false;
                    if(SFX){
                        knappSound.play();
                    }
                }
            }
        }

        //tillbaka pil i creditssidan
        if(credits){
            if(mouseX > 20 && mouseX < 79 && mouseY > 20 && mouseY < 80){
                backKnapp = true;
            }
            else{
                backKnapp = false;
            }
            if(mouseclick){
                mouseclick = false;
                if(clickx > 20 && clickx < 79 && clicky > 10 && clicky < 80){
                    credits = false;
                    backKnapp = false;
                    if(SFX){
                        knappSound.play();
                    }
                }
            }
        }
    }

    //Allt som är hur man spelar spelet.
    if(inGame){
        //Om man inte har förlorat, alltså om man spelar och har pausat. 
        if(!gameOver){
            if(hitpoints <= 0){
                gameOver = true;
            }

            //om man inte pausat
            if(!pause){
                if(esc){
                    esc = false;
                    if(gudVal != -1){
                        gudVal = -1;
                    }
                    else{
                        pause = true;
                    }
                }

                //startar första rundan och sen fortsätter med alla andra rundor
                if(keySpace){
                    roundManager();
                }

                //unhighlightar om man försöker sätta ut ny
                if(gudVal != -1){
                    for(let g=0; g < gods.length ; g++){
                        gods[g].highlight = false;
                    }
                }

                //gör så om man drar musen ut från skärmen medans man har valt en gud och haft den innuti skärmen så avbryts gudvalet.
                if(mouseX < 0 || mouseX > 856 || mouseY < 0 || mouseY > 576){
                    if(unselect){
                        gudVal = -1;
                    }
                    unselect = false;
                }
                else{
                    unselect = true;
                }

                //allt som är att man klickar är i här
                if(mouseclick){
                    mouseclick = false;
                    //om man inte har valt en gud så kan man highlighta gudar
                    if(gudVal == -1){
                        let clickhighlight = false;
                        for(let g=0; g < gods.length; g++){
                            if(Math.abs(clickx - gods[g].x) < 20 && Math.abs(clicky - gods[g].y) < 20){
                                for(let h=0; h < gods.length; h++){
                                    gods[h].highlight = false;
                                }
                                gods[g].highlight = true;
                                clickhighlight = true;
                            }
                            if(!clickhighlight){
                                for(let h=0; h < gods.length; h++){
                                    gods[h].highlight = false;
                                }
                            }
                        }
                    }
                    else{ //om gudVal är något annat än -1, kollar om man kan placera och sen placerar och betalar runor om man kan placera
                        let canplace = true;
                        if(clickx > 856 || clicky > 576){
                            canplace = false;
                        }
                        if(canplace){
                            for(let i=0 ; i < stig.length ; i++){
                                if(clickx > stig[i].x && clickx < stig[i].x+stig[i].width &&
                                    clicky > stig[i].y && clicky < stig[i].y+stig[i].height){
                                    canplace = false;
                                }
                            }
                        }
                        if(canplace){
                            for(let g=0 ; g < gods.length ; g++){
                                if((clickx - gods[g].x)**2+(clicky - gods[g].y)**2 < 45**2){
                                    canplace = false;
                                }
                            }
                        }
                        if(canplace){
                            if(godtypes[gudVal].cost <= runes){
                                gods.push(new god(clickx, clicky, gudVal));
                                runes -= godtypes[gudVal].cost;
                                gudVal = -1;
                                if(SFX){
                                    placera.play();
                                }
                            }
                        }
                    }
                    //kollar om man väljer gudarna på höger sidan. 
                    if(clickx > 885 && clickx < 985 && clicky > 100 && clicky < 210){
                        gudVal = 0;
                    }
                    if(clickx > 885 && clickx < 985 && clicky > 220 && clicky < 330){
                        gudVal = 1;
                    }
                }

                //Tar hand om alla fienders rörelse, spawns och waves.
                for(let i=0 ; i < enemies.length ; i++){
                    let distx = pointlist[enemies[i].point].x - enemies[i].x;
                    let disty = pointlist[enemies[i].point].y - enemies[i].y;
                    enemies[i].update();
                    if(Math.abs(distx) < 3 && Math.abs(disty) < 3){
                        if(enemies[i].point < pointlist.length-1){
                            enemies[i].point += 1;
                            distx = pointlist[enemies[i].point].x - enemies[i].x;
                            disty = pointlist[enemies[i].point].y - enemies[i].y;
                            enemies[i].setdelta(distx, disty);
                        }
                        else{
                                hitpoints -= enemies[i].dmg;
                                if(hitpoints < 0){
                                    hitpoints = 0;
                                }
                                enemies.splice(i,1);
                        }
                    }
                }

                attack();
            }
            else{ //om det är pausat
                //Kollar knapptryck för knapparna på pausmenyn
                if(mouseclick){
                    mouseclick = false;
                    if(clickx > 500 && clickx < 550 && clicky > 113 && clicky < 163){//(500,113,50,50); continue
                        pause = false;
                        if(SFX){
                            knappSound.play();
                        }
                    }
                    if(clickx > 498 && clickx < 548 && clicky > 182 && clicky < 232){//(498,182,50,50) restart
                        restart();
                        if(SFX){
                            knappSound.play();
                        }
                    }
                    if(clickx > 495 && clickx < 551 && clicky > 246 && clicky < 298){//494, 245, 57, 53); SFX
                        if(SFX){
                            SFX = false;
                        }
                        else{
                            SFX = true;
                            knappSound.play();
                        }
                    }
                    if(clickx > 496 && clickx < 550 && clicky > 301 && clicky < 355){//495, 302, 56, 56) music
                        if(SFX){
                            knappSound.play();
                        }
                        if(music){
                            music = false;
                            backgroundMusic.pause();
                        }
                        else{
                            music = true;
                            backgroundMusic.play();
                        }
                    }
                    if(clickx > 497 && clickx < 547 && clicky > 372 && clicky < 422){//(497,372,50,50); hem
                        menu = true;
                        inGame = false;
                        restart();
                        if(SFX){
                            knappSound.play();
                        }
                        if(music){
                            backgroundMusic.pause();
                        }
                    }
                }
            }
        }
        else{ //om det är gameover
            //Kollar knapparna på gameover skärmen om man hoverar och klickar
            if(mouseclick){
                mouseclick = false;
                if(clickx > 155 && clickx < 215 && clicky > 156 && clicky < 210){ //home
                    menu = true;
                    inGame = false;
                    restart();
                    if(SFX){
                        knappSound.play();
                    }
                    if(music){
                        backgroundMusic.pause();
                    }
                }
                if(mouseX > 710 && mouseX < 775 && mouseY > 250 && mouseY < 312){ //restart
                    restart();
                    if(SFX){
                        knappSound.play();
                    }
                }
            }
        }
    }
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(menu){
        //ritar ut huvudmenyn, ritar även ut hoverfunktionerna
        if(!options && !credits){
            ctx.drawImage(menuImg, 0, 0, canvas.width, canvas.height);
        }
        if(options){
            ctx.drawImage(options_sida, 0, 0, canvas.width, canvas.height);
            if(music){
                ctx.drawImage(check_knapp, 276, 128, 113, 114);
            }
            if(SFX){
                ctx.drawImage(check_knapp, 275, 353, 113, 114);
            }
        }
        if(credits){
            ctx.drawImage(creditsSida, 0, 0, canvas.width, canvas.height);
        }
        if(startKnapp){
            ctx.drawImage(start_knapp, 266, 111, 495, 132);
        }
        if(optionsKnapp){
            ctx.drawImage(options_knapp, 264, 265, 495, 132);
        }
        if(creditsKnapp){
            ctx.drawImage(credits_knapp, 264, 424, 496, 132);
        }
        if(backKnapp){
            if(options){
                ctx.drawImage(back, 20, 10, 59, 60);
            }
            if(credits){
                ctx.drawImage(back, 19, 10, 59, 60);
            }
        }
    }

    if(inGame){
        //ritar ut allt när man spelar.
        ctx.drawImage(bana1,0,0,canvas.width, canvas.height);
        
        for(let g=0 ; g < gods.length ; g++){
            gods[g].drawHighlight();
        }

        //ritar ut den man håller i och dens range, röd cirkel runt om man inte får placera (förutom om det är pga pengar man inte får placera)
        if(gudVal != -1){
            if(mouseX < 856 && mouseY < 576){
                let canplace = true;
                if(canplace){
                    for(let i=0 ; i < stig.length ; i++){
                        if(mouseX > stig[i].x && mouseX < stig[i].x+stig[i].width &&
                            mouseY > stig[i].y && mouseY < stig[i].y+stig[i].height){
                            canplace = false;
                        }
                    }
                }
                if(canplace){
                    for(let g=0 ; g < gods.length ; g++){
                        if((mouseX - gods[g].x)**2+(mouseY - gods[g].y)**2 < 45**2){
                            canplace = false;
                        }
                    }
                }
                ctx.beginPath();
                ctx.arc(mouseX, mouseY, godtypes[gudVal].range**0.5, 0, 2*Math.PI);
                ctx.globalAlpha = 0.3;
                if(canplace){
                    ctx.fillStyle = "black";
                    ctx.fill();
                }
                if(!canplace){
                    ctx.fillStyle = "red";
                    ctx.fill();
                }
                ctx.globalAlpha = 1;
                ctx.drawImage(godtypes[gudVal].img, mouseX - godtypes[gudVal].xOffset, mouseY - godtypes[gudVal].yOffset, godtypes[gudVal].width, godtypes[gudVal].height);
            }
        }

        //ritar ut alla fiender.
        for(let i=0 ; i < enemies.length ; i++){
            enemies[i].draw(ctx);
        }
        for(let i=0 ; i < gods.length ; i++){
            gods[i].draw(ctx);
        }
        //ritar ut aktiva tor och tyr attack animationer
        drawTyrAtk();
        drawTorAtk();

        //planket på högersidan
        ctx.drawImage(plank, 0, 0, canvas.width, canvas.height);

        //korten på planket på högersidan
        ctx.drawImage(torKort,880,100,110,110);
        ctx.drawImage(tyrKort,880,220,110,110);
        ctx.drawImage(lokeKort,880,340,110,110);
        ctx.drawImage(odenKort,880,460,110,110);

        //alla siffror som ändras
        drawRunes();
        drawRound();
        drawHitpoints();

        //pausmenyn
        if(pause){
            ctx.drawImage(pauseMenu, 0, 0, canvas.width, canvas.height);
            if(!SFX){
                ctx.drawImage(pauseMenuMuteSFX, 494, 245, 57, 53);
            }
            if(!music){
                ctx.drawImage(pauseMenuMuteMusic, 495, 302, 56, 56);
            }
        }
        //game over menyn
        if(gameOver){
            ctx.drawImage(game_over, 0, 0, canvas.width, canvas.height);
            if(mouseX > 155 && mouseX < 215 && mouseY > 156 && mouseY < 210){
                ctx.drawImage(home_, 152, 155, 66, 61);
            }
            if(mouseX > 710 && mouseX < 775 && mouseY > 250 && mouseY < 312){
                ctx.drawImage(restartHover, 697, 236, 83, 76);
            }
            drawEndgameround();
        }
    }
}

function init(){
    canvas = document.getElementById('ragnarokTD');
    ctx = canvas.getContext('2d');
    gameloop();
}

function gameloop(){
    update();
    draw();
    window.requestAnimationFrame(gameloop);
}

//kollar knapptryck, musrörelser och vänsterklick på musen.
document.addEventListener('keydown', function(event) {
    if(inGame){
        if(!gameOver){
            if(!pause){
                if(event.code == "Space") {
                    keySpace = true;
                }
                if(event.key == "1"){
                    gudVal = 0;
                }
                if(event.key == "2"){
                    gudVal = 1;
                }
                if(event.key == "Escape"){
                    esc = true;
                }
            }
            else{
                if(event.key == "Escape"){
                    pause = false;
                }
            }
        }
    }
});

document.addEventListener('mousemove', function(event){
    let rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.left;
});

function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    clickx = event.clientX - rect.left;
    clicky = event.clientY - rect.top;
};
let canvasElem = document.querySelector("canvas");

document.addEventListener('click', function(event){
    mouseclick = true;
    getMousePosition(canvasElem, event);
});