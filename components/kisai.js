import getTime from './time.js';
import * as digit from './kisaiNumbers.js';

// Setup UI elements
let container = document.querySelector('#watchFaceContainer');
let strip = document.querySelector("#strip");
let leftHand = document.querySelector("#leftHand");
let rightHand = document.querySelector("#rightHand");
let leftDigit1 = document.querySelectorAll(".number")[0];
let leftDigit2 = document.querySelectorAll(".number")[1];
let rightDigit1 = document.querySelectorAll(".number")[2];
let rightDigit2 = document.querySelectorAll(".number")[3];

// DOM frame mgmt
let windowWidth;
let windowHeight;
let baseValue;

// Define time
let collection = [digit.num0, digit.num1, digit.num2, digit.num3, digit.num4, digit.num5, digit.num6, digit.num7, digit.num8, digit.num9];
let currentTime;
let firstDigit;
let secondDigit;
let ticker;

function setTime(time){
	currentTime = time; // ie. ['06', 53, '02', 'PM']
	
	// Set Minutes
	leftDigit1.innerHTML 	= collection[currentTime[1][0]];
	leftDigit2.innerHTML 	= collection[currentTime[1][1]];
	rightDigit1.innerHTML 	= collection[currentTime[1][0]];
	rightDigit2.innerHTML 	= collection[currentTime[1][1]];

	// Set Hour
	switch(currentTime[0]){
		case '01':
			strip.style.transform = 'rotate(-60deg)';
			hideLeftHand();
			break;
		case '02':
			strip.style.transform = 'rotate(-30deg)';
			hideLeftHand();
			break;
		case '03':
			strip.style.transform = 'rotate(0deg)';
			hideLeftHand();
			break;
		case '04':
			strip.style.transform = 'rotate(30deg)';
			hideLeftHand();
			break;
		case '05':
			strip.style.transform = 'rotate(60deg)';
			hideLeftHand();
			break;
		case '06':
			strip.style.transform = 'rotate(90deg)';
			hideLeftHand();
			break;
		case '07':
			strip.style.transform = 'rotate(-60deg)';
			hideRightHand();
			break;
		case '08':
			strip.style.transform = 'rotate(-30deg)';
			hideRightHand();
			break;
		case '09':
			strip.style.transform = 'rotate(0deg)';
			hideRightHand();
			break;
		case '10':
			strip.style.transform = 'rotate(30deg)';
			hideRightHand();
			break;
		case '11':
			strip.style.transform = 'rotate(60deg)';
			hideRightHand();
			break;
		case '12':
			strip.style.transform = 'rotate(90deg)';
			hideRightHand();
			break;
	}

	// Detect period
	if(currentTime[3] == "PM"){
		// Do something when PM
	}
}

function hideLeftHand(){
	leftHand.style.opacity = 0;
	rightHand.style.opacity = 1;
}
function hideRightHand(){
	leftHand.style.opacity = 1;
	rightHand.style.opacity = 0;
}


function setAspectRatio() {
	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;

	if(windowWidth >= windowHeight){
		baseValue = windowHeight;
	} else {
		baseValue = windowWidth;
	}
	container.style.width = (baseValue * 0.98) + 'px';
}


function positionStrip(){
	let containerWidth = container.offsetWidth;
	let parsedTop = (containerWidth / 2) - (strip.offsetHeight / 2);
	let parsedLeft = (containerWidth - strip.offsetWidth) / 2;
	strip.style.top = parsedTop + "px";
	strip.style.left = parsedLeft + "px";
}


function adjustMain() {
	setAspectRatio();
	positionStrip();
}

window.addEventListener("resize", adjustMain);

// Set and Update Time 
function updateTime(){
	setTime(getTime());
	ticker = setTimeout(updateTime, 1000);
}

// Init
setTime(getTime());
setAspectRatio();
positionStrip();
updateTime();
