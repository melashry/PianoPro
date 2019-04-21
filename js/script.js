
var myScore ,x_axis = 0,sounds = [], 
myHero , interval, myBtns = [], img = '';

var username = JSON.parse(window.localStorage.getItem('username')),
level = JSON.parse(window.localStorage.getItem('level')),
myHero_img = JSON.parse(window.localStorage.getItem('imgCharacter'));

document.getElementById('show-img').src = 'img/' + myHero_img + '.gif'
document.getElementById('show-highScore').textContent = JSON.parse(window.localStorage.getItem('highScore'))

document.onkeydown=move;

var levels = {
    easy : {stime: 25},
    intermediate : {stime: 15 },
    hard : {stime: 7},
    veryhard : {stime: 3}
}

var startGame = {
    width: 70,
    height: 50,
    canvasWidth: document.getElementById('myCanvas').width,
    canvasHeight: document.getElementById('myCanvas').height,
    x_axis: x_axis,
    y_axis: 0,
    imgs: ['s1.png', 's2.png','s3.png','s4.png','s5.png','s6.png','s7.png'],
    frameNo: 0,
    context: document.getElementById('myCanvas').getContext('2d'),
    clear : function () {
        this.context.clearRect(this.x_axis, this.y_axis, this.canvasWidth, this.canvasHeight)
    }
}
start()

function start () {
    if (username == '') {
        username = 'Player'
    }
    if (level == '') {
        level = 'easy'
    }
    if (myHero_img == '') {
        myHero_img = 'x1'
    }
    time = levels[level].stime 
    myScore = new Shape("30px", "Consolas", "red", 320, 30, "text");
    myHero = new Shape(80, 70, myHero_img+'.gif', startGame.canvasWidth / 2 , startGame.canvasHeight - 70)


    interval = setInterval(function() { 
        startGame.clear()
        myHero.update()
        for (i = 0; i < myBtns.length; i += 1) {
            if (myHero.crashWith(myBtns[i])) {
                gameOver()
            } 
        }
        
        x_axis = Math.floor(Math.random() * 400) +10
        img = startGame.imgs[Math.floor(Math.random()*startGame.imgs.length)]
        startGame.frameNo +=1
        if (startGame.frameNo == 1 || everyinterval(80)) {
            myBtns.push( new Shape(startGame.width, startGame.height, img, x_axis, startGame.y_axis));
            sounds.push( new Sound('music/m' + Math.floor(Math.random()*16 + 1)+'.wav'))
        }

        for (i = 0; i < myBtns.length; i += 1) {
            myBtns[i].y += 1;
            myBtns[i].update();
            if (myBtns[i].y == startGame.canvasHeight - 50) {
                sounds[i].play();
            }
           
        }
        myScore.text="SCORE: " + startGame.frameNo;
        myScore.update();
       
    }, time)
    
}
function Shape (width, height, src, x, y, type) {
    this.image = new Image();
    if (type != 'text') {
        this.image.src = 'img/'+src;
    }
    this.width = width
    this.height = height
    this.x = x
    this.y = y 
    this.type = type
    this.context = startGame.context
    this.update = function () {
        if (this.type == "text") {
            this.context.font = this.width + " " + this.height;
            this.context.fillStyle = src;
            this.context.fillText(this.text, this.x, this.y);
        } else {
            this.context.src = this.height
            this.context.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height)
        } 
    }
    
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
    
    this.gameOv=false;
}

function gameOver () {
    clearInterval(interval)
    window.localStorage.setItem('myscore', JSON.stringify(startGame.frameNo+1))
    var highScore = JSON.parse(window.localStorage.getItem('highScore'))
    if (startGame.frameNo+1 > highScore || highScore == '') {
        window.localStorage.setItem('highScore', JSON.stringify(startGame.frameNo+1))
    }
    var blog=document.getElementById("blog");
    var gameOverMessage=document.getElementById("gameOverMessage");
    var scoreSpan=document.getElementById("myScore");
    var highScoreSpan = document.getElementById('myHighScore')
    highScoreSpan.textContent = JSON.parse(window.localStorage.getItem('highScore'))
    scoreSpan.textContent= startGame.frameNo+1;
    blog.style.display='block';
    gameOverMessage.style.display='block';
    myHero.gameOv=true;

}

function everyinterval(n) {
    if ((startGame.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
}


function move(e) {
    if(myHero.gameOv==true){

    }else{
        if(e.keyCode==37) {  //left
            myHero.update()
            if (myHero.x != 10) {
                myHero.x -=10
            } 
            
        }
        
    if(e.keyCode==39) { // right
        myHero.update()
        if (myHero.x !=startGame.canvasWidth - 100) {           
            myHero.x +=10
        }
        
    }

    if(e.keyCode==38) { //top
        myHero.update()
        if (myHero.y != 10) {
            myHero.y -=10
        }
        
    }
    
    if(e.keyCode==40) { //bottom
        myHero.update()
        if (myHero.y != startGame.canvasHeight - 70) {
            myHero.y +=10
        }
        
    }

    }
    
}