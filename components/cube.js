import getTime from './time.js';
import * as digit from './cubeNumbers.js';

// Setup UI elements
let container = document.querySelector('#watchFaceContainer');

// DOM frame mgmt
let windowWidth;
let windowHeight;
let baseValue;

// Define time
let collectionHour = [digit.hour1, digit.hour2, digit.hour3, digit.hour4, digit.hour5, digit.hour6, digit.hour7, digit.hour8, digit.hour9, digit.hour10, digit.hour11, digit.hour12];
let collectionTens = [digit.minTens0, digit.minTens1, digit.minTens2, digit.minTens3, digit.minTens4, digit.minTens5];
let collectionOnes = [digit.minOnes0, digit.minOnes1, digit.minOnes2, digit.minOnes3, digit.minOnes4, digit.minOnes5, digit.minOnes6, digit.minOnes7, digit.minOnes8, digit.minOnes9];
let currentTime;

let composition;

let firstDigit;
let secondDigit;
let ticker;

function setTime(time){
	currentTime = time; // ie. ['06', 53, '02', 'PM']
	container.innerHTML = '';
	composition = '';

	composition = `<svg id="cube" viewBox="0 0 920 1064">`;

	// Set Hour
	composition += collectionHour[Number(currentTime[0])-1];
	// Set Minute Tens
	composition += collectionTens[currentTime[1][0]];
	// Set Minute Ones
	composition += collectionOnes[currentTime[1][1]];

	composition += `</svg>`;

	// Detect period
	if(currentTime[3] == "PM"){
		// Do something when PM
	}

	container.innerHTML = composition;
}


function setAspectRatio() {
	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;

	if(windowWidth >= windowHeight){
		baseValue = windowHeight;
	} else {
		baseValue = windowWidth;
	}
	container.style.width = (baseValue * 0.90) + 'px';
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

container.style.display = 'block';
setTimeout( ()=>{
	container.style.opacity = 1;
}, 1000);