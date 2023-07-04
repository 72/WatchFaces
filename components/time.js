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
	// Account for 0 in tens position.
	// Note that this approach makes the type sometimes be a Number, and sometimes a String. We will default it to String for our purposes. (ie. '02' becomes '2' as a Number, and we don't want that, we need the zero so that we can properly display the time.) 
	h = (h < 10) ? ("0" + h) : h;
	m = (m < 10) ? ("0" + m) : m;
	s = (s < 10) ? ("0" + s) : s;
	// define time
	let time = [h.toString(), m.toString(), s.toString(), period]; // ie. ['06', '53', '02', 'PM']
	return time;
}