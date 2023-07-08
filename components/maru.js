import getTime from './time.js';

// Setup UI elements
let app = document.querySelector('#App');
let container = document.querySelector('#watchFaceContainer');

// DOM frame mgmt
let windowWidth;
let windowHeight;
let baseValue;

// Define maru vars
let ticker;
let distance = 100;
let percentage;
let modulate;

let connector = document.querySelector('#connector');
let hourHand = document.querySelector('#hours path');
let minuteHand = document.querySelector('#minutes path');

let radius = connector.getAttribute('r');
let circumference = (Math.PI*(radius*2)).toFixed(2);

// Connector distance
function setDistance(val){
	if (val < 0) { val = 0;}
	if (val > 100) { val = 100;}
	percentage = ((100-val)/100)*circumference;
	connector.style.strokeDashoffset = percentage;
}

function setTime(val){
	// val format is: ['06', '53', '02', 'PM']

	// Define position based in current time
	let hrPosition = val[0]*360/12 + ((val[1] * 360/60)/12);
	let minPosition = val[1]*360/60 + ((val[2] * 360/60)/60);
	if(hrPosition >= 360) { hrPosition = hrPosition - 360 };
	if(minPosition >= 360) { minPosition = 0 };

	// Define conector length based in hour and minute hands
	if(minPosition > hrPosition){
		connector.setAttribute('transform', `rotate(${(hrPosition - 90)} 160 160)`);
	} else if(minPosition < hrPosition){
		connector.setAttribute('transform', `rotate(${(minPosition - 90)} 160 160)`);
	} else {
		connector.setAttribute('transform', `rotate(${(0)} 160 160)`);
	modulate= 0;
	}
	modulate = Math.abs(Number((((minPosition - hrPosition) * 100) / 360).toFixed(2)));

	hourHand.setAttribute('transform', `rotate(${hrPosition} 160 160)`);
	minuteHand.setAttribute('transform', `rotate(${minPosition} 160 160)`);
	setDistance(modulate);

	// Debug
	// console.log(hrPosition, minPosition, modulate);
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
	container.style.width = (baseValue * 0.94) + 'px';
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
