/* Author: Mitwa Patel, 000905034
   Date: 4th November, 2023 
   This file is responsible for adding functionality to the page. 
   It involves handling events and functions for images update. 
   It includes functions that sets timer for automatic refresh and for randomizing images.*/

let imgCount = 0;    // image update counter
var imgTimer;        // image refresh timer

// arrays for images
var foodImages=["images/img1.png", "images/img2.png", "images/img3.png"];
var teddyImages=["images/img4.png", "images/img5.png", "images/img6.png"];
var cupcakeImages=["images/img7.png", "images/img8.png", "images/img9.png"];

/**
 * function to generate random number 
 * @param {num} num 
 * @returns 
 */
function randomNumGenerate(num){
    return Math.ceil(Math.random() * num);
}

/**
 * function to change individual images
 * @param {img} img 
 */
function changeEachImg(img){
    let imgSelected = document.getElementById(img);
    let random = randomNumGenerate(9);
    imgSelected.classList.remove('animationImg');
    let randomImg = "images/img" + random + ".png";
    imgSelected.setAttribute("src", randomImg);
    setTimeout(() => {imgSelected.classList.add('animationImg')},0)
    imgCount++;
    countUpdate();
    startTimer()
}

/**
 * function for random images update
 */
function imagesUpdate(){
    let random1 = randomNumGenerate(3);
    let random2 = randomNumGenerate(3);
    let random3 = randomNumGenerate(3);
    let img1 = foodImages[random1-1];
    let img2 = teddyImages[random2-1];
    let img3 = cupcakeImages[random3-1];
    let imgSelected1 = document.querySelector("#img1");
    imgSelected1.setAttribute("src", img1);
    
    let imgSelected2 = document.querySelector("#img2");
    imgSelected2.setAttribute("src", img2);

    let imgSelected3 = document.querySelector("#img3");
    imgSelected3.setAttribute("src", img3);
    imgCount+=3;
    countUpdate();
    startTimer();
}

/**
 * function for updating image counter
 */
function countUpdate(){
    let countImg = document.querySelector(".updateCounter");
    countImg.innerHTML = "Image has updated: " + imgCount + " times";    
}

/**
 * function for updating refresh timer
 * @param {clock} clock 
 * @returns 
 */
function refreshTimerUpdate(clock){
    var timeElement  = document.getElementById(clock);
    let time = timeElement.value;
    if (time < 500 || time > 15000 || isNaN(time)){
        timeElement.value = '';
        return
    }
    clearTimeout(imgTimer);
    startTimer(); 
}

/**
 * function for starting refresh timer
 */
function startTimer(){
    var timeElement = document.getElementById("range");
    var text = document.getElementById("refresh");
    var userTime = parseInt(timeElement.value);
    if (!isNaN(userTime) && userTime > 0) {
        
        clearInterval(imgTimer); 
        
        imgTimer = setInterval(function() {
            userTime -= 10;
        
          text.innerText = (userTime/1000).toFixed(2);
          colorTimerUpdate(userTime); 
          if (userTime <= 0) {
            clearInterval(imgTimer);
            imagesUpdate();
            startTimer();
          }
        }, 10);
      }  
}

/**
 * function for updating refresh timer color
 * @param {time} time 
 */
function colorTimerUpdate(time){
    var input = document.getElementById("range").value;
    var text = document.getElementById("refresh");
    if(time< input/4){
        text.style.backgroundColor = "red";
    }
    else if(time<input/2){
        text.style.backgroundColor = "yellow";
    }
    else{
        text.style.backgroundColor = "green";
    }
}

/**
 * event listener for loading the page
 */
window.addEventListener("load", function(event){
    imagesUpdate();
    startTimer();
    countUpdate();
})






