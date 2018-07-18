var day = [];
var hours = [];
(function(days, hours){
	var monthData = [];
	day.forEach(function(dayValue){
		hours.forEach(function(hourValue){
			this = dayValue + " " + hourValue
		}, monthData);
	}, monthData);
	return monthData;
})(day,hours)