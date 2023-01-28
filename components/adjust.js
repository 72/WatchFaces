import getTime from './time.js';

// Setup UI elements
let container = document.querySelector('#watchFaceContainer');

// DOM frame mgmt
let windowWidth;
let windowHeight;
let baseValue;

// Define time
let currentTime;
let firstDigit;
let secondDigit;
let ticker;

function setTime(time){
	currentTime = time; // ie. ['06', 53, '02', 'PM']
	
	// ToDo

	// Detect period
	if(currentTime[3] == "PM"){
		// Do something when PM
	}
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

// setTimeout(()=>{
// 	clearTimeout(ticker);
// }, 5000);