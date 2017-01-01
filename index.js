var monthNames = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
var d3 = require('d3');
var Calendar = require('calendar').Calendar;
var cal = new Calendar(1); //start week on mon, not sun


var d = new Date();
var month = d.getMonth();
var year = d.getFullYear();
var weeks = cal.monthDays(year,month);
var table = d3.select('#calendar');
var title = table.append('ttitle');
var header = table.append('thead');
var body = table.append('tbody');

var hmap = L.map('map', { zoomControl:false }).setView([-33.8688, 151.209], 13); //add map to add to header

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="https://carto.com/attribution">CARTO</a>'
 }).addTo(hmap);

var osmGeocoder = new L.Control.OSMGeocoder();

hmap.addControl(osmGeocoder);

header
.append('tr')
.append('td')
.attr('colspan',7)
.attr("class", "mhead")
.style('text-align','center')
.text(monthNames[month]);

header
.append('tr')
.append('td')
.attr('colspan',7)
.attr("class", "yhead")
.style('text-align','center')
.text(year);

header
.append('tr')
.selectAll('td')
.data(dayNames)
.enter()
.append('td')
.style('text-align','center')
.attr("class", "dhead")
.text(function(d) {
	return d; 
});



weeks.forEach(function (week) {
	body
	.append('tr')
	.selectAll('td')
	.data(week)
	.enter()
	.append('td')
	.attr('class', function(d){
		return d > 0 ? '' : 'empty';
	})
	.text(function (d) {
		return d> 0 ? d: '';
	})
});

