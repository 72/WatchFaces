export default function getTime(){
	// setup
	let date = new Date();
	let h = date.getHours(); 	// From 0 to 23
	let m = date.getMinutes(); 	// From 0 to 59
	let s = date.getSeconds();	// From 0 to 59
	let period = "AM";
	// logic
	if (h == 0){ h = 12; };
	if (h > 12){ 
		h = h - 12;
		period = "PM"; 
	}
	// account for 0 in tens position
	h = (h < 10) ? ("0" + h) : h;
	m = (m < 10) ? ("0" + m) : m;
	s = (s < 10) ? ("0" + s) : s;
	// define time
	let time = [h, m, s, period];
	return time;
}