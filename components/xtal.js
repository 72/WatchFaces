import getTime from './time.js';
import * as digit from './xtalNumbers.js';

// Setup UI elements
let app = document.querySelector('#App');
let container = document.querySelector('#watchFaceContainer');

// Handle Info Modal
let infoButton = document.querySelector('#infoButton');
let modal = document.querySelector('#modal-xtal');
let exits = document.querySelectorAll('.modal-exit');


// DOM frame mgmt
let windowWidth;
let windowHeight;
let baseValue;

// Define time
let collectionHour = [digit.num0, digit.num1, digit.num2, digit.num3, digit.num4, digit.num5, digit.num6, digit.num7, digit.num8, digit.num9];
let currentTime;

let composition;

let ticker;

function setTime(time){
	currentTime = time; // ie. ['06', 53, '02', 'PM']
	container.innerHTML = '';
	composition = '';

	composition = `<svg id="xtal" viewBox="0 0 1502 359">`;
	// <svg width="1502" height="359" viewBox="0 0 1502 359">

	// First Digit
	composition += `<g id="Digit1" width="410" height="359" viewBox="0 0 410 359">`;
	composition += collectionHour[currentTime[0][0]];
	composition += `</g>`;
	// Second Digit
	composition += `<g id="Digit2" width="410" height="359" viewBox="0 0 410 359">`;
	composition += collectionHour[currentTime[0][1]];
	composition += `</g>`;
	// Third Digit
	composition += `<g id="Digit3" width="410" height="359" viewBox="0 0 410 359">`;
	composition += collectionHour[currentTime[1][0]];
	composition += `</g>`;
	// Fourth Digit
	composition += `<g id="Digit4" width="410" height="359" viewBox="0 0 410 359">`;
	composition += collectionHour[currentTime[1][1]];
	composition += `</g>`;

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

	app.style.height = `${windowHeight}px`;
	modal.style.height = `${windowHeight}px`;

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

container.style.display = 'block';
setTimeout( ()=>{
	container.style.opacity = 1;
}, 1000);




infoButton.addEventListener('click', (event)=>{
	event.preventDefault();
	modal.style.display = 'flex';
	modal.classList.add('open');
});

exits.forEach((exit)=> {
	exit.addEventListener('click', (event)=>{
		event.preventDefault();
		modal.classList.remove('open');
	});
});