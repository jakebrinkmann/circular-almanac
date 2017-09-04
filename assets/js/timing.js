// Northern Hemisphere, Astronomical
// TODO: Calculate these numerically
var seasons = {
    // Spring - March Equinox to June Solstice;
    Spring: "03/20/2018 16:15",
    // Summer - June Solstice to September Equinox;
    Summer: "06/21/2018 10:07",
    // Fall (autumn) - September Equinox to December Solstice
    Fall: "09/22/2017 20:02",
    // Winter - December Solstice to March Equinox.
    Winter: "12/21/2017 16:28"
}

$(document).ready(function(){
	var now = moment();
	var currentSeason = season(now);
	updateDisplay(now, currentSeason);
});

// Determine current season string
function season(ctime) {
	var season = "Summer",
		keys = Object.keys(seasons);
	for (var i = 0, N=keys.length; i < N; i++) {
		var k = keys[i];
		var s = moment(seasons[k], 'MM/DD/YYYY HH:mm');
		console.log(ctime.format('MM/DD/YY') + '>=' + s.format('MM/DD/YY'))
		console.log(ctime >= s);
		if(ctime >= s) {
			season = k;
			break;
		}
	}
	return season;
}

var displayText = $("#time"), 
	displaySeason = $("#season"),
	clockFace = $("#face"),
	clockHand = $("#hand");

var shadowBase = '0px 0px 18px ';

// Update text and apply season class
function updateDisplay(currentTime, currentSeason) {
	displayText[0].innerHTML = currentTime.format('MMMM Do');
	displaySeason[0].innerHTML = currentSeason + " " + currentTime.format('YYYY')
	clockFace.attr('class', currentSeason);
	clockHand.attr('class', currentSeason);
};
