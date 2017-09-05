function cTime() { return new moment(); }

$(document).ready(function(){
	updateDisplay();
});

// Convert first-element seasons to current
function season() {
	var c = cTime();
	var seasons = getSeasons(c.toDate().getFullYear());
	var s = 'Winter';
	if ( (c >= seasons[1]) && (c < seasons[2]) ) { s = 'Spring'; }
	if ( (c >= seasons[2]) && (c < seasons[3]) ) { s = 'Summer'; }
	if ( (c >= seasons[3]) && (c < seasons[4]) ) { s = 'Fall'; }
	return s
}

// Determine fraction of current year
function yearLevel() {
	var yearsStart = cTime().startOf('year')
		yearsEnd = cTime().endOf('year');
	var fraction = ( ( cTime().unix() - yearsStart.unix() ) * 1.0 
		        / ( yearsEnd.unix() - yearsStart.unix() ) );
	return fraction
}

var displayText = $("#time"), 
	displaySeason = $("#season"),
	clockFace = $("#face"),
	clockHand = $("#hand");

var shadowBase = '0px 0px 18px ';

// Update text and apply season class
function updateDisplay(c, s, f) {
	var currentTime = c || cTime(),
		currentSeason = s || season(),
		fractionYear = f || yearLevel();

	displayText[0].innerHTML = currentTime.format('MMMM Do, YYYY');
	displaySeason[0].innerHTML = currentSeason

	clockFace.attr('class', currentSeason);
	clockHand.attr('class', currentSeason);
	clockHand.attr('title', Math.round(100*fractionYear) + '%');

	var rotation = (fractionYear * 360.00) - 270.00;
	clockHand.css({
		'transform': 'rotate(' + rotation + 'deg)'
	});
};
