import getTime from './time.js';

// Setup UI elements
let app = document.querySelector('#App');
let container = document.querySelector('#watchFaceContainer');
let ring1Lines = document.querySelectorAll("#Ring1 path");
let ring2Lines = document.querySelectorAll("#Ring2 path");
let ring3Lines = document.querySelectorAll("#Ring3 path");
let ring4Lines = document.querySelectorAll("#Ring4 path");
let themeFill = "#FFF";
let digitColor = "black";

// DOM frame mgmt
let windowWidth;
let windowHeight;
let baseValue;

// Define time
let currentTime;
let ticker;

function setTime(time){
	currentTime = time; // ie. ['06', '53', '02', 'PM']
	
	setDigit(ring1Lines, Number(currentTime[0][0]));
	setDigit(ring2Lines, Number(currentTime[0][1]));
	setDigit(ring3Lines, Number(currentTime[1][0]));
	setDigit(ring4Lines, Number(currentTime[1][1]));

	// Detect period
	if(currentTime[3] == "PM"){
		// Do something when PM
	}

}

function setDigit(ring, number){
	
	ring.forEach((item) => {
		item.style.fill = digitColor;
		item.style.opacity = 1;
	})
	ring[7].style.stroke = 'none';

	switch(number){
		case 0:
			ring[7].style.fill = themeFill;
			ring[7].style.stroke = themeFill;
			break;
		case 1:
			ring[1].style.opacity = 0;
			ring[2].style.opacity = 0;
			ring[4].style.opacity = 0;
			ring[5].style.opacity = 0;
			ring[7].style.fill = themeFill;
			ring[7].style.stroke = themeFill;
			ring[8].style.opacity = 0;
			break;
		case 2:
			ring[0].style.opacity = 0;
			ring[5].style.opacity = 0;
			break;
		case 3:
			ring[0].style.opacity = 0;
			ring[3].style.opacity = 0;
			break;
		case 4:
			ring[1].style.opacity = 0;
			ring[3].style.opacity = 0;
			ring[4].style.opacity = 0;
			break;
		case 5:
			ring[2].style.opacity = 0;
			ring[3].style.opacity = 0;
			break;
		case 6:
			ring[2].style.opacity = 0;
			break;
		case 7:
			ring[0].style.opacity = 0;
			ring[3].style.opacity = 0;
			ring[4].style.opacity = 0;
			ring[6].style.opacity = 0;
			ring[7].style.fill = themeFill;
			ring[7].style.stroke = themeFill;
			break;
		case 8:
			break;
		case 9:
			ring[3].style.opacity = 0;
			break;
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
