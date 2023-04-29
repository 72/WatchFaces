import getTime from './time.js';
import * as digit from './adjustNumbers.js';

// Setup UI elements
let app = document.querySelector('#App');
let container = document.querySelector('#watchFaceContainer');
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
let ticker;


function setTime(time){
	currentTime = time; // ie. ['06', 53, '02', 'PM']
	
	leftDigit1.innerHTML	= collection[currentTime[0][0]];
	leftDigit2.innerHTML	= collection[currentTime[0][1]];
	rightDigit1.innerHTML	= collection[currentTime[1][0]];
	rightDigit2.innerHTML	= collection[currentTime[1][1]];

	// Detect period
	if(currentTime[3] == "PM"){
		// Do something when PM
	}
}


function setAspectRatio() {
	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;

	app.style.height = `${windowHeight}px`;

	if(windowWidth >= windowHeight){
		baseValue = windowHeight;
	} else {
		baseValue = windowWidth;
	}

	container.style.width = (baseValue * 0.92) + 'px';
	container.style.top = ((windowHeight - container.clientHeight) / 2 ) + 'px';

}

function adjustMain() {
	setAspectRatio();
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
updateTime();
