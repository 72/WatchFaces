import getTime from './time.js';
import * as digit from './onlineNumbers.js';

// Setup UI elements
let app = document.querySelector('#App');
let container = document.querySelector('#watchFaceContainer');
let onlineWrapper = document.querySelector('#online svg');

let digitOne = document.querySelector('#DigitOne');
let digitTwo = document.querySelector('#DigitTwo');
let digitThree = document.querySelector('#DigitThree');
let digitFour = document.querySelector('#DigitFour');

// DOM frame mgmt
let windowWidth;
let windowHeight;
let baseValue;

// Define time
let collection = [digit.num0, digit.num1, digit.num2, digit.num3, digit.num4, digit.num5, digit.num6, digit.num7, digit.num8, digit.num9];
let currentTime;

let composition;

let ticker;

function setTime(time){
	currentTime = time; // ie. ['06', 53, '02', 'PM']

	// Detect AM/PM and handle hour hand
	if(currentTime[3] == "PM"){
		let pmTime = (Number(currentTime[0]) + 12);		
		if(pmTime == 24){ 
			pmTime = '00'
		} else {
			pmTime = pmTime.toString();
		}
		pmTime = pmTime.toString();console.log(pmTime);
		digitOne.innerHTML = `${collection[pmTime[0]]}`
		digitTwo.innerHTML = `${collection[pmTime[1]]}`
	} else{
		digitOne.innerHTML = `${collection[currentTime[0][0]]}`
		digitTwo.innerHTML = `${collection[currentTime[0][1]]}`
	}
	// Minute hand
	digitThree.innerHTML = `${collection[currentTime[1][0]]}`
	digitFour.innerHTML = `${collection[currentTime[1][1]]}`

}


function setAspectRatio() {
	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;

	app.style.height = `${windowHeight}px`;

	// special adjustment for Online watchface
	if(windowWidth >= windowHeight){
		baseValue = windowHeight;
		onlineWrapper.style.height = `${windowHeight + 36}px`;
		onlineWrapper.style.width = 'auto';
	} else {
		baseValue = windowWidth;
		onlineWrapper.style.height = 'auto';
		onlineWrapper.style.width = `${windowWidth * 0.8}px`;
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