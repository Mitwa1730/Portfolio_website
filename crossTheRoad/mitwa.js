
/* Author: Mitwa Patel, 000905034  
   Date: 19th November 2023
   This file represents a game "Walk Across The Road", that lets a player to walk across the road, while preventing obstacle objects (car).
   It includes various functions that manages car movement, random obstacle car generation, level increment, car and character collision.
   It also involves a feature to change the game theme for better user experience. */


let NSsvg = "http://www.w3.org/2000/svg";
let obstacleSpeed = 100;
let isGameOver = true;
let gameLevel=1;

/**
 * function that generates a random number 
 * @param {*} num 
 * @returns random number 
 */
function generateRandomNum(num) {
    return Math.ceil(Math.random()*num);
}

/**
 * function that creates obstacle cars
 * @returns redCarImage
 */
function ObstacleCar(){
    let redCarImage = document.createElementNS(NSsvg , "image");
    redCarImage.setAttribute("href", "assests/redcar.png");
    redCarImage.setAttribute("class", "redCarImg");
    redCarImage.setAttribute("x", "701");
    redCarImage.setAttribute("y", 51*generateRandomNum(6));
    let parent = document.querySelector(".gameRoad");
    parent.appendChild(redCarImage);
    return redCarImage;
}

/**
 * function that generates random car obstacles
 */
function randomObstacle(){
    let obstacleTime = setInterval(()=>{
        let obstacle = ObstacleCar();
        let moveTime=setInterval(()=>{
            carCrash(obstacle);
            if(isGameOver == false){
                let positionX=parseInt(obstacle.getAttribute("x"))
                obstacle.setAttribute("x", positionX-10);
            }
            else{
                clearInterval(obstacleTime);
                clearInterval(moveTime);
            }       
        }, obstacleSpeed)
    }, 1000);
}

/**
 * function that initiates the game
 */
function gameStart(){
    let gameStartButton=document.querySelector(".gameStart");

    gameStartButton.addEventListener("click", ()=>{
        isGameOver = false;
        obstacleSpeed=100;
        removeObstacles();
        let gameOver_element = document.querySelector(".over");
        
        if(gameOver_element != null){
            console.log(gameOver_element);
            gameOver_element.remove();
        }
        randomObstacle();
        document.querySelector(".character").setAttribute("y", "0");
    })
}

/**
 * Function that increases the game level, while increasing the car speed
 */
function levelUp(){
    let gameScore=document.querySelector(".gameScore");
    gameLevel++;
    obstacleSpeed-=20;
    gameScore.textContent="LEVEL: "+gameLevel;
 }

 /**
  * Function that checks for collision between car and character 
  * @param {obstacle} obstacle 
  */
function carCrash(obstacle){
    let character=document.querySelector(".character");
    let characterX=character.getAttribute("x");
    let characterY=character.getAttribute("y");
    let obstacleX=obstacle.getAttribute("x");
    let obstacleY=obstacle.getAttribute("y");
    if(Math.abs(obstacleX-characterX)<50 && Math.abs(obstacleY-characterY)<10){
         gameLevel=0;
         isGameOver = true;
         displayGameOver();
    }
 }

/**
 * Function that enables night theme
 */
function nightGameTheme(){
    let nightThemeButton=document.querySelector(".nightGameTheme");
    nightThemeButton.addEventListener("click", ()=>{
        let moonSvg = document.querySelector(".sunCircle");
        moonSvg.setAttribute("fill", "white");
        moonSvg.setAttribute("cx", "545");
        document.querySelector("#blueSky").setAttribute("fill", "black");
    })
}

/**
 * Function that enables day theme
 */
function dayGameTheme(){
    let dayThemeButton=document.querySelector(".dayGameTheme");
    dayThemeButton.addEventListener("click", ()=>{
        let sunSvg = document.querySelector(".sunCircle");
        sunSvg.setAttribute("fill", "yellow");
        sunSvg.setAttribute("cx", "95");
        document.querySelector("#blueSky").setAttribute("fill", "lightblue");
        
    } )
}

 /**
  * Function that handles character movement by pressing key
  */
function moveCharacter(){
    document.addEventListener('keypress', function(event){
            if(isGameOver == false){
                let character=document.querySelector(".character");
                let positionY=parseInt(character.getAttribute("y"));
                character.setAttribute("y", positionY+50); 
                if(parseInt(character.getAttribute("y")) === 400){
                    character.setAttribute("y", "0");
                    levelUp();   
                };
            }
    })    
}

/**
 * Function that removes all the obstacle cars 
 */
function removeObstacles(){
    let allObstacles = document.querySelectorAll(".redCarImg");
    
    for(let x=0; x<allObstacles.length; x++){
        allObstacles[x].remove();
    }
}

/**
 * Function that displays "Game Over" text when game ends
 */
function displayGameOver(){
    let parent = document.querySelector(".gameRoad");
    let text = document.createElementNS(NSsvg,'text');
    text.textContent = "Game Over";
    text.setAttribute("y", "188");
    text.setAttribute("x", "280");
    text.setAttribute("fill", "white");
    text.setAttribute("class", "over");    
    parent.appendChild(text);
}

/**
 * Event listener to initialize game functions the window loads
 */
window.addEventListener("load", function(event){   
    gameStart();
    moveCharacter();
    dayGameTheme();
    nightGameTheme();
})
