const colorname=[
    "red",
    "Green",
    "Blue",
    "Yellow",
    "purple",
    "Cyan",
    "Magenta",
    "Orange",
    "Pink",
    "Brown",
    "Lime",
    "Olive",
    "Teal",
    "Navy",
    "Maroon",
    "Silver"

]
let winingscore = 3;
let targetcolor ="";
let score = 0;
let timer = 120;
let gameInterval,timeInterval; 


let setrandomcolor=()=>{
const cells = document.querySelectorAll('.cell')
cells.forEach(cell=>{
    const randomIndex = Math.floor(Math.random()*colorname.length)
    const randomcolor = colorname[randomIndex]
    cell.style.backgroundColor = randomcolor;
    cell.setAttribute('data-color',randomcolor )
 })

}

let settargetcolor=()=>{
    const randomIndex = Math.floor(Math.random()*colorname.length)
     targetcolor = colorname[randomIndex]
     document.getElementById('targetcolor').textContent = targetcolor
}

let formatetime =(seconds)=>{

    const minutes =Math.floor(seconds/60);
    const sec= seconds%60;
    return`${minutes}:${sec<10 ? '0': ''}${sec}`
     


}
let updatetimer=()=>{
    timer--;
    document.getElementById('timer').textContent=formatetime(timer)
    
      if(timer<=0){
        endgame(false);
      }

    }



let initializegame =()=>{

    score =0;
    timer = 120;
    document.getElementById('score').textContent = score;
    document.getElementById('timer').textContent= formatetime(timer);
    document.getElementById('congratsoverlay').style.display ='none';
    document.getElementById('loseoverlay').style.display ='none';
    setrandomcolor();
    settargetcolor();
    const bgm = document.getElementById('backgroundmusic');
    bgm.play();
    gameInterval = setInterval(setrandomcolor,2000)
    timeInterval = setInterval(updatetimer,2000);
}

let endgame =()=>{

    clearInterval(gameInterval);
    clearInterval(timeInterval);
    document.getElementById("backgroundmusic").pause();
    const overlay = isWin ? document.getElementById('congratsoverlay')
    : document.getElementById('loseoverlay');

    overlay.style.display = 'block';
    if(isWin){
       document.getElementById('winmusic').play(); 
    }else{
        document.getElementById('losemusic').play();
    }

}

 let handle =(e)=>{
    winingscore=3;
   const clickcolor = e.target.getAttribute('data-color');
   if(clickcolor  === targetcolor){
    score++
    document.getElementById('score').textContent= score;
    if(score === 3){
        endgame(true);
    }
    setrandomcolor();
   settargetcolor();
   document.getElementById('correctmusic').play();
   }else{
    document.getElementById('IncorrectMusic').play();
   }
   
 }
 
 document.querySelectorAll('.cell').forEach(cell=>{
 
    cell.addEventListener('click',handle)

 });


 document.getElementById("restartbutton").addEventListener('click',initializegame());
 document.getElementById("restartbuttonlose").addEventListener('click',initializegame());
initializegame();
