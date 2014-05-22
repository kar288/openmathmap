/**
 * Copyright (c) 2013 KWARC Group <kwarc.info>
 *
 * This file is part of OpenMathMap.
 *
 * OpenMathMap is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * OpenMathMap is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with OpenMathMap. If not, see <http://www.gnu.org/licenses/>.
 */

var map;
var ajaxRequest;
var plotlist;
var plotlayers=[];
var markerLayer;
var markers = []
var mathSearchUrl = 'http://search.mathweb.org/zbl/php/tema_proxy.php'
var oms
var drawnItems
var gradientLayer;
var gradientPolygons = []
var gradientBtn;
var rusinBtn;

var info;

var prefix = ""

var rusinClasses;
var drawControl;
var filterBtn;

$(document).ready(main);

var rainbow 

var yearcc = '{"24": {"count": 4, "year": 8006}, "25": {"count": 4, "year": 7995}, "26": {"count": 47464, "year": 94723384}, "27": {"count": 2, "year": 4024}, "20": {"count": 172678, "year": 344217752}, "21": {"count": 0, "year": 0}, "22": {"count": 39899, "year": 79469687}, "23": {"count": 1, "year": 2012}, "28": {"count": 36830, "year": 73377516}, "29": {"count": 1, "year": 2012}, "59": {"count": 1, "year": 2008}, "58": {"count": 66258, "year": 132162747}, "55": {"count": 42172, "year": 83951351}, "54": {"count": 105757, "year": 210682458}, "57": {"count": 70986, "year": 141458375}, "56": {"count": 2, "year": 4022}, "51": {"count": 37722, "year": 75123776}, "50": {"count": 1, "year": 2012}, "53": {"count": 135958, "year": 271198049}, "52": {"count": 32142, "year": 64142725}, "88": {"count": 0, "year": 0}, "89": {"count": 0, "year": 0}, "82": {"count": 77055, "year": 154217918}, "83": {"count": 77632, "year": 155433498}, "80": {"count": 37661, "year": 75300217}, "81": {"count": 166725, "year": 333696746}, "86": {"count": 18637, "year": 37256711}, "87": {"count": 0, "year": 0}, "84": {"count": 0, "year": 0}, "85": {"count": 13070, "year": 26143898}, "02": {"count": 2, "year": 4024}, "03": {"count": 138890, "year": 276902954}, "00": {"count": 60968, "year": 121724194}, "01": {"count": 56398, "year": 112477374}, "06": {"count": 36399, "year": 72531689}, "07": {"count": 3, "year": 6038}, "04": {"count": 2, "year": 4022}, "05": {"count": 188638, "year": 376652278}, "08": {"count": 16766, "year": 33387487}, "09": {"count": 0, "year": 0}, "39": {"count": 29860, "year": 59686931}, "38": {"count": 4, "year": 8032}, "33": {"count": 35443, "year": 70716954}, "32": {"count": 60831, "year": 121235628}, "31": {"count": 19054, "year": 37942450}, "30": {"count": 86421, "year": 172133014}, "37": {"count": 127912, "year": 255812858}, "36": {"count": 3, "year": 6035}, "35": {"count": 458418, "year": 915157473}, "34": {"count": 231487, "year": 461926475}, "60": {"count": 242328, "year": 483092062}, "61": {"count": 1, "year": 1949}, "62": {"count": 316570, "year": 631803583}, "63": {"count": 1, "year": 2011}, "64": {"count": 3, "year": 6026}, "65": {"count": 349638, "year": 697777596}, "66": {"count": 1, "year": 2012}, "67": {"count": 1, "year": 2011}, "68": {"count": 439399, "year": 878137809}, "69": {"count": 1, "year": 2012}, "99": {"count": 2, "year": 4024}, "98": {"count": 2, "year": 4019}, "91": {"count": 153534, "year": 306854922}, "90": {"count": 252970, "year": 505143524}, "93": {"count": 263884, "year": 526234376}, "92": {"count": 93161, "year": 186293780}, "95": {"count": 0, "year": 0}, "94": {"count": 97100, "year": 193879575}, "97": {"count": 4877, "year": 9789687}, "96": {"count": 1, "year": 2012}, "11": {"count": 180371, "year": 359719774}, "10": {"count": 4, "year": 8047}, "13": {"count": 51058, "year": 101796618}, "12": {"count": 19036, "year": 37924782}, "15": {"count": 68413, "year": 136516621}, "14": {"count": 116612, "year": 232713969}, "17": {"count": 48759, "year": 97289336}, "16": {"count": 103666, "year": 206749106}, "19": {"count": 6645, "year": 13299808}, "18": {"count": 32248, "year": 64252638}, "48": {"count": 3, "year": 6034}, "49": {"count": 90060, "year": 179606630}, "46": {"count": 161823, "year": 322334662}, "47": {"count": 175691, "year": 350528023}, "44": {"count": 14249, "year": 28370602}, "45": {"count": 43176, "year": 86002918}, "42": {"count": 54716, "year": 109142111}, "43": {"count": 19415, "year": 38654627}, "40": {"count": 14459, "year": 28779632}, "41": {"count": 67688, "year": 134795758}, "77": {"count": 2, "year": 4018}, "76": {"count": 303356, "year": 605396632}, "75": {"count": 12, "year": 24114}, "74": {"count": 306286, "year": 610627476}, "73": {"count": 98, "year": 194601}, "72": {"count": 0, "year": 0}, "71": {"count": 0, "year": 0}, "70": {"count": 77070, "year": 153655201}, "79": {"count": 2, "year": 4008}, "78": {"count": 35066, "year": 70180604}}'
var smallestyearcc = '{"24": {"year": 2012}, "25": {"year": 2012}, "26": {"year": 2013}, "27": {"year": 2012}, "20": {"year": 2014}, "21": {"year": 0}, "22": {"year": 2013}, "23": {"year": 2012}, "28": {"year": 2013}, "29": {"year": 2012}, "59": {"year": 2008}, "58": {"year": 2013}, "55": {"year": 2013}, "54": {"year": 2013}, "57": {"year": 2013}, "56": {"year": 2011}, "51": {"year": 2013}, "50": {"year": 2012}, "53": {"year": 2013}, "52": {"year": 2013}, "88": {"year": 0}, "89": {"year": 0}, "82": {"year": 2013}, "83": {"year": 2013}, "80": {"year": 2013}, "81": {"year": 2014}, "86": {"year": 2013}, "87": {"year": 0}, "84": {"year": 0}, "85": {"year": 2013}, "02": {"year": 2012}, "03": {"year": 2013}, "00": {"year": 2014}, "01": {"year": 2013}, "06": {"year": 2013}, "07": {"year": 2013}, "04": {"year": 2012}, "05": {"year": 2013}, "08": {"year": 2013}, "09": {"year": 0}, "39": {"year": 2013}, "38": {"year": 2012}, "33": {"year": 2013}, "32": {"year": 2013}, "31": {"year": 2013}, "30": {"year": 2013}, "37": {"year": 2013}, "36": {"year": 2012}, "35": {"year": 2013}, "34": {"year": 2013}, "60": {"year": 2014}, "61": {"year": 1949}, "62": {"year": 2013}, "63": {"year": 2011}, "64": {"year": 2012}, "65": {"year": 2014}, "66": {"year": 2012}, "67": {"year": 2011}, "68": {"year": 2014}, "69": {"year": 2012}, "99": {"year": 2012}, "98": {"year": 2012}, "91": {"year": 2013}, "90": {"year": 2014}, "93": {"year": 2013}, "92": {"year": 2013}, "95": {"year": 0}, "94": {"year": 2013}, "97": {"year": 2013}, "96": {"year": 2012}, "11": {"year": 2014}, "10": {"year": 2012}, "13": {"year": 2014}, "12": {"year": 2014}, "15": {"year": 2014}, "14": {"year": 2013}, "17": {"year": 2013}, "16": {"year": 2013}, "19": {"year": 2013}, "18": {"year": 2013}, "48": {"year": 2012}, "49": {"year": 2013}, "46": {"year": 2013}, "47": {"year": 2013}, "44": {"year": 2013}, "45": {"year": 2013}, "42": {"year": 2013}, "43": {"year": 2013}, "40": {"year": 2013}, "41": {"year": 2013}, "77": {"year": 2010}, "76": {"year": 2013}, "75": {"year": 2013}, "74": {"year": 2014}, "73": {"year": 2012}, "72": {"year": 0}, "71": {"year": 0}, "70": {"year": 2013}, "79": {"year": 2010}, "78": {"year": 2013}}'
var last = '{"24": {"count": 4, "last": 3}, "25": {"count": 4, "last": 2}, "26": {"count": 47464, "last": 5580}, "27": {"count": 2, "last": 2}, "20": {"count": 172678, "last": 14384}, "21": {"count": 0, "last": 0}, "22": {"count": 39899, "last": 2988}, "23": {"count": 1, "last": 1}, "28": {"count": 36830, "last": 2629}, "29": {"count": 1, "last": 1}, "59": {"count": 1, "last": 0}, "58": {"count": 66258, "last": 5072}, "55": {"count": 42172, "last": 2740}, "54": {"count": 105757, "last": 8586}, "57": {"count": 70986, "last": 5663}, "56": {"count": 2, "last": 2}, "51": {"count": 37722, "last": 2340}, "50": {"count": 1, "last": 1}, "53": {"count": 135958, "last": 13483}, "52": {"count": 32142, "last": 3095}, "88": {"count": 0, "last": 0}, "89": {"count": 0, "last": 0}, "82": {"count": 77055, "last": 11184}, "83": {"count": 77632, "last": 15082}, "80": {"count": 37661, "last": 4370}, "81": {"count": 166725, "last": 25074}, "86": {"count": 18637, "last": 1644}, "87": {"count": 0, "last": 0}, "84": {"count": 0, "last": 0}, "85": {"count": 13070, "last": 2662}, "02": {"count": 2, "last": 2}, "03": {"count": 138890, "last": 11095}, "00": {"count": 60968, "last": 7353}, "01": {"count": 56398, "last": 4362}, "06": {"count": 36399, "last": 2889}, "07": {"count": 3, "last": 3}, "04": {"count": 2, "last": 2}, "05": {"count": 188638, "last": 25950}, "08": {"count": 16766, "last": 961}, "09": {"count": 0, "last": 0}, "39": {"count": 29860, "last": 4234}, "38": {"count": 4, "last": 2}, "33": {"count": 35443, "last": 3737}, "32": {"count": 60831, "last": 4663}, "31": {"count": 19054, "last": 1189}, "30": {"count": 86421, "last": 6993}, "37": {"count": 127912, "last": 14847}, "36": {"count": 3, "last": 3}, "35": {"count": 458418, "last": 54917}, "34": {"count": 231487, "last": 25666}, "60": {"count": 242328, "last": 21107}, "61": {"count": 1, "last": 0}, "62": {"count": 316570, "last": 32136}, "63": {"count": 1, "last": 1}, "64": {"count": 3, "last": 2}, "65": {"count": 349638, "last": 37324}, "66": {"count": 1, "last": 1}, "67": {"count": 1, "last": 1}, "68": {"count": 439399, "last": 43479}, "69": {"count": 1, "last": 1}, "99": {"count": 2, "last": 2}, "98": {"count": 2, "last": 1}, "91": {"count": 153534, "last": 21017}, "90": {"count": 252970, "last": 28485}, "93": {"count": 263884, "last": 22210}, "92": {"count": 93161, "last": 12943}, "95": {"count": 0, "last": 0}, "94": {"count": 97100, "last": 10705}, "97": {"count": 4877, "last": 2133}, "96": {"count": 1, "last": 1}, "11": {"count": 180371, "last": 18026}, "10": {"count": 4, "last": 4}, "13": {"count": 51058, "last": 4686}, "12": {"count": 19036, "last": 1354}, "15": {"count": 68413, "last": 7886}, "14": {"count": 116612, "last": 11784}, "17": {"count": 48759, "last": 4412}, "16": {"count": 103666, "last": 9442}, "19": {"count": 6645, "last": 941}, "18": {"count": 32248, "last": 3083}, "48": {"count": 3, "last": 3}, "49": {"count": 90060, "last": 8314}, "46": {"count": 161823, "last": 11235}, "47": {"count": 175691, "last": 18370}, "44": {"count": 14249, "last": 1020}, "45": {"count": 43176, "last": 3449}, "42": {"count": 54716, "last": 5644}, "43": {"count": 19415, "last": 1272}, "40": {"count": 14459, "last": 1230}, "41": {"count": 67688, "last": 4057}, "77": {"count": 2, "last": 1}, "76": {"count": 303356, "last": 22741}, "75": {"count": 12, "last": 7}, "74": {"count": 306286, "last": 13974}, "73": {"count": 98, "last": 10}, "72": {"count": 0, "last": 0}, "71": {"count": 0, "last": 0}, "70": {"count": 77070, "last": 4868}, "79": {"count": 2, "last": 1}, "78": {"count": 35066, "last": 5212}}'

var allClasses_backup = '{"90":{"Bin packing in multiple dimensions: inapproximability results and approximation schemes.":"5279658"},"68Q":{"On polynomial-time truth-table reduciblity of intractable sets to p- selective sets.":"0722.68059","Real number models under various sets of operations.":"0782.68048","Real number computations: On the use of information.":"0814.68059","On the computational complexity of best Chebyshev approximations.":"0617.03039","Best possible heuristics for the bottleneck wandering salesperson and bottleneck vehicle routing problem.":"0596.90093","Une nouvelle approche du problème SAT. (A new approach to the SAT problem).":"0738.03006","On p-creative sets and p-completely creative sets.":"0756.68044","A best possible heuristic for the k-center problem.":"0565.90015","Approximating the minimum maximal independence number.":"0778.68041","Some consequences of non-uniform conditions on uniform classes.":"0541.68017"},"90C":{"Order consolidation for batch processing.":"1066.90106","Breaks, cuts, and patterns.":"1235.90061","Parallel machines scheduling with machine maintenance for minsum criteria.":"1237.90099","Best possible heuristics for the bottleneck wandering salesperson and bottleneck vehicle routing problem.":"0596.90093","Scheduling resumable deteriorating jobs on a single machine with non-availability constraints.":"1207.90054","Approximation algorithms for extensible bin packing.":"1012.90049"},"90B":{"Order consolidation for batch processing.":"1066.90106","Breaks, cuts, and patterns.":"1235.90061","Parallel machines scheduling with machine maintenance for minsum criteria.":"1237.90099","A best possible heuristic for the k-center problem.":"0565.90015","Scheduling resumable deteriorating jobs on a single machine with non-availability constraints.":"1207.90054"},"03D":{"Real number computations: On the use of information.":"0814.68059","On the computational complexity of best Chebyshev approximations.":"0617.03039","Gödel, von Neumann and the P=?⁢N⁢PPnormal-?NPP=?NP problem.":"0671.68019","Une nouvelle approche du problème SAT. (A new approach to the SAT problem).":"0738.03006","Some consequences of non-uniform conditions on uniform classes.":"0541.68017"},"03C":{"Real number computations: On the use of information.":"0814.68059"},"05C":{"On the total dominating set problem.":"0645.05062","A best possible heuristic for the k-center problem.":"0565.90015"},"03F":{"On the computational complexity of best Chebyshev approximations.":"0617.03039"},"41A":{"On the computational complexity of best Chebyshev approximations.":"0617.03039"},"03B":{"Une nouvelle approche du problème SAT. (A new approach to the SAT problem).":"0738.03006"},"15A":{"On the joint spectral radius of matrices of order 2 with equal spectral radius.":"1197.15007"},"65K":{"A best possible heuristic for the k-center problem.":"0565.90015"},"65F":{"Linear interval equations: Computing enclosures with bounded relative overestimation is NP-hard.":"0841.65027"},"65G":{"Linear interval equations: Computing enclosures with bounded relative overestimation is NP-hard.":"0841.65027"},"65Y":{"Linear interval equations: Computing enclosures with bounded relative overestimation is NP-hard.":"0841.65027"},"68R":{"Approximating the minimum maximal independence number.":"0778.68041"}} '

var geojson;


function main () {
	initmap()

	$('.browse').click(buildMenu);

	rainbow = new Rainbow();
	rainbow.setSpectrum('red', 'yellow');

	$.getJSON("/getRusinClasses", function (data) {
		rusinClasses = data;
	})

	
}

//Initialize everything related to the map.
function initmap() {
    // Create map
    map = new L.Map('map');

    // create the tile layer with correct attribution
    var osmUrl='/static/Political/Tiles/{z}/{x}/{y}.png';
    var osmAttrib='Map data (c) OpenStreetMap contributors';
    var osm = new L.TileLayer(osmUrl, {minZoom: 10, maxZoom: 14, attribution: osmAttrib});

    // start the map in the center with zoom level 10
    map.setView(new L.LatLng(0.5, 0.5), 10);
    map.addLayer(osm);

    //Not let go outside of bounds: 
    var southWest = L.latLng(-0.2, -0.2),
    northEast = L.latLng(1.2, 1.2),
    bounds = L.latLngBounds(southWest, northEast);
    map.setMaxBounds(bounds)

    // Listener to clicks on map
    map.on('click', getMscData);

    //Spiderfied plugin
    oms = new OverlappingMarkerSpiderfier(map);
    oms.keepSpiderfied = true;
    oms.circleSpiralSwitchover = 20

    // Draw plugin
	drawnItems = new L.FeatureGroup();
	map.addLayer(drawnItems);

	// Initialise the draw control and pass it the FeatureGroup of editable layers
	drawControl = new L.Control.Draw({
		draw: {
			polyline: false,
			marker: false, 
			polygon: false, 
			rectangle: false,
		},
	    edit: {
	        featureGroup: drawnItems
	    },
	    position: "topleft"
	});

	L.drawLocal.draw.toolbar.buttons.circle = 'Select markers to filter.';
	// L.drawLocal.edit.toolbar.buttons.remove = 'Remove specific shapes'

	L.drawLocal.draw.handlers.circle.tooltip.start += "<br> Select the markers you want to keep.";
	// map.addControl(drawControl);

	map.on('draw:created', function (e) {
		
		$(".leaflet-draw-toolbar-top").popover('destroy');
		
		var type = e.layerType,
			layer = e.layer;

		drawnItems.addLayer(layer);

		if (markers.length) {
			filterMarkers(false)
		}

		$('.confirm').parent().removeClass('leaflet-disabled')
	});

	map.on('draw:editstart', function(e) {
		for (var i in markers) {
			markers[i].setOpacity(1)
		}
	})

	map.on('draw:editstop', function(e) {

		if (markers.length) {
			filterMarkers(false)
		}
	})

	map.on('draw:deletestop', function(e) {
		if (!drawnItems.getLayers().length) {

			$('.confirm').parent().addClass('leaflet-disabled')
		}
	})


	//filter button
	filterBtn = L.functionButtons([{ content: '<div class="map-button confirm"><span class="glyphicon glyphicon-ok-circle"></span></div>' , position: 'topleft', title: 'Confirm'}]);
	filterBtn.on('clicked', filterMarkers);

	// Create search form
	// Initialize proper event handlers
	$.getJSON("/getSearchForm/", function(data) {
		var mapSearch = L.control({position: 'topleft'})

		mapSearch.onAdd = function(map) {
			this._div = L.DomUtil.create('div', 'map-search');
			this._div.innerHTML = data.html
			return this._div
		}
		mapSearch.addTo(map)

		// search control
		$('.search-form').submit(search)
		// $('.msc-search').val('f: P = NP')
		$(".search-form").on('mouseover', controlEnter)
		$(".search-form").on('mouseout', controlLeave);

		$('.search-type').click(function () {
			updateSearch(this.id)
		})

		$('.search-example').click(function() {
			$('.msc-search').val(this.text)
			$('.msc-search').focus()
		})

		$('.search-selection').click(function () {
			if ($('.info').is(':visible')){
				$('.info').hide()
			} else {
				$('.info').show()
			}
			$(document).click(function() {
				$('.info').show()
			}) 
		})
	})
	

	//rusin button
	rusinBtn = L.functionButtons([{ content: '<div class="rusin map-button not-selected text-button">Rusin Categories</div>' , position: 'bottomleft', title: 'Gradient'}]);
	rusinBtn.on('clicked', rusinGradient);
	map.addControl(rusinBtn);

	//gradient button
	gradientBtn = L.functionButtons([{ content: '<div class="timeline map-button not-selected text-button"><span class="glyphicon glyphicon-arrow-right">Class timeline</span></div>' , position: 'bottomleft', title: 'Gradient'}]);
	gradientBtn.on('clicked', lastgradient);
	map.addControl(gradientBtn);


	//Move zoom control 
	map.zoomControl.setPosition("bottomleft")

	// Div showing extra info about results
	info = L.control({position: 'topleft'})
	info.update = update

	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
	    return this._div;
	}

	// Polygon layer initializing
	geojson = L.geoJson(null,{
		style: style,
		onEachFeature: onEachFeature
	}).addTo(map);

}

/********************** INFO DIV *************************/
// Info div content updating
function update (innerHTML) {
	this._div.innerHTML = innerHTML
};

function updateGradientDiv(properties, general) {
	var innerHTML

	var type = properties.type;
	var term = properties.term
	var spacey = term.replace('.', ' ')
	var name = L.Util.splitWords(spacey)

	var num = properties.class.toString()

	if (num.length < 2) {
		num = "0" + num
	} 

	var min = properties.min
	var max = properties.max

	if (term.length > 0) {
		if (!general) {
			innerHTML = '<h4>' + name[1] + ' ' + name[0] + '</h4>'
	    	if (type == "time") {
		    	innerHTML +=  "Average year " + properties.year + " in " + properties.className
		    } else {
		    	innerHTML += properties.count + " publications in " + properties.className
		    }
			return info.update(innerHTML)
		} else {
			innerHTML = '<h4>' + name[1] + ' ' + name[0] + '</h4>'
		    var color;
		    if (type == "time") {
		    	innerHTML += '<h5>Average year: </h5>'
		    	color = 100;
		    } else if (type == "count") {
		    	innerHTML += '<h5> Total number of publications: ' + properties.total + '</h5>'
		    	innerHTML += '<h5> Amount of publications </h5>'
		    	color = 0
		    }
			if (min == max) {
				innerHTML +=
		          '<i class="legend-i" style="background:' + "#" + rainbow.colourAt(color) + '"></i> <span class="legend-label">' +
		          min + '</span><br>';
				// this._div.innerHTML += '<div>All publications in ' + properties.className + '</div>'
				// this._div.innerHTML += '<div>Average publication year: ' + Math.round(min) + '</div>'
				return info.update(innerHTML)
			}
		}
	} else {
		if (general) {
			innerHTML = "<h4> Average publication year per MSC</h4>"
			if (properties.last) {
				innerHTML = "<h4> Percent of publications in last 5 years</h4>"
			}
		} else {
			innerHTML = "<h4>" + properties.className + "</h4>"
			innerHTML += "<span>" + Math.round(properties.count/1000) + "k publications.</span><br>"
			
			if (properties.last) {
				innerHTML += "<span> " + properties.last + "% of papers published in the last 5 years.</span>"
			} else {
				innerHTML += "<span> Average year: " + properties.year + "</span>"
			}
			return info.update(innerHTML)
		}
	}

	var step = 25;

	for (var i = 0; i < 5; i++) {
		current =  Math.round(min + (max-min)*i*step/100)
		next = Math.round(min + (max-min)*(i+1)*step/100) 
		innerHTML +=
          '<i class="legend-i" style="background:' + "#" + rainbow.colourAt(step*i) + '"></i> <span class="legend-label">' +
          current + (i != 4 ? '&ndash;' + next  + '</span><br>' : '+');

	}
	return info.update(innerHTML)
}

function updateRusinDiv(properties, general) {
	var innerHTML;
	if (general) {
		innerHTML = '<h4>General Categories</h4>'
		for (var k in rusinClasses) {
			innerHTML += '<i class="legend-i" style="background:' + rusinClasses[k].color + '"></i> <span class="legend-label">' +
      		rusinClasses[k].name  + '</span><br>';
		}
		return info.update(innerHTML)
	} else {
		innerHTML = '<h4>' + properties.className + '</h4>'
		innerHTML += '<div> Belongs in the ' + properties.rusinName + ' category</div>'
		return info.update(innerHTML)
	}
	
}

function updateAuthorLinkDiv(data) {
	if ($.isEmptyObject(data)) {
		if (markers.length == 0) {
			if (!info._map) {
				info.addTo(map)
			}
			if (markers.length == 0) {
				return info.update("<h4> No results </h4>")
			}
		} else {
			return
		}
	}
	
	if (!info._map) {
		info.addTo(map)
	}
	var authorLink = "http://zbmath.org/authors/?s=0&c=100&q="
	var query = ""
	for (var key in data) {
		var entry = data[key]
		if (query.length > 0) {
			query += "|"
		}
		query += key
	}
	var innerHTML = "<h4> All results: " + '<a href="' + authorLink + query + '" target="_blank">zbMATH</a>' + " </h4>"
	info.update(innerHTML)
}

function updatePapersLinkDiv(numbers) {
	if (!info._map) {
		info.addTo(map)
	}
	if ($.isEmptyObject(numbers) && markers.length == 0) {
		return info.update("<h4> No results </h4>")
	}
	var paperLink = "http://zbmath.org/?q=" //"an:"
	var query = ""

	for (var number in numbers) {
		if (query.length > 0) {
			query += "|"
		}
		query += 'an:' +  number
	}
	var innerHTML = "<h4> All results: " + '<a href="' + paperLink + query + '" target="_blank">zbMATH</a>' + " </h4>"
	info.update(innerHTML)
}

/********************** GEOJSON LAYER *************************/

function clearGeoJSON() {
	if (geojson) {
		geojson.clearLayers()
	}
}

// style for each polygon
function style(feature) {
	if (feature.properties.colorCode) {
		return {			
			fillColor: "#" + rainbow.colourAt(feature.properties.colorCode),
			color: "#" + rainbow.colourAt(feature.properties.colorCode),

		}
	}
	if (feature.properties.color) {
		return {			
			fillColor: feature.properties.color,
			color: feature.properties.color,
		}
	}
}

// Whenever we hover on a polygon give it a specific color
// Change the contents of the info div to just this polygon
function highlightFeature(e) {
   var layer = e.target;

	layer.setStyle({
		dashArray: '',
		fillOpacity: 0.7
	});

	if (!L.Browser.ie && !L.Browser.opera) {
		layer.bringToFront();
	}
	if (e.target.feature.properties.rusinName) {
		updateRusinDiv(layer.feature.properties, false);
	} else {
		updateGradientDiv(layer.feature.properties, false)
	}
}

// Whenever on mouse out of a polygon
// if not going to any other polygon show general info
function resetHighlight(e) {
	geojson.resetStyle(e.target);
	if (e.target.feature.properties.rusinName) {
		updateRusinDiv(e.target.feature.properties, true);
	} else {
		updateGradientDiv(e.target.feature.properties, true)
	}
	
}

// set events for each polygon
function onEachFeature(feature, layer) {
	layer.on({
  		mouseover: highlightFeature,
  		mouseout: resetHighlight,
	});
}

/********************** SEARCH FORM *************************/

//Disable dragging when on top of the search form
function controlEnter(e) {
    map.dragging.disable();
}
function controlLeave() {
    map.dragging.enable();
    $('.tip').fadeOut()
}

/********************** POLYGON LAYERS *************************/

// Average year of publications for all classes
function gradient() {
	// show button status
	$('.timeline').toggleClass("not-selected").toggleClass("selected")

	if ($('.rusin').hasClass("selected")) {
		$('.rusin').toggleClass("not-selected").toggleClass("selected")
	}

	clearForGradient()
	
	if (info._map) {
		info.removeFrom(map)
	}
	if ($('.timeline').hasClass('not-selected')) {
		return
	}

	// retrieve information
	var information = JSON.parse(yearcc)

	// Sum up all publications
	var total = 0;
	for (var i in information) {
		total += information[i].count
	}

	map.spin(true)

	// Retrieve geometry of all classes
	$.getJSON("/getWay/,/1/", function(data) {

		//Get min and max of publication year
		//used to stretch out data between 0-100
		var max = 0
		var min = Number.POSITIVE_INFINITY
		var values = []
		for (var i in data) {
			num = i.slice(0,2)
	   		if (!information[num]) {
	   			continue;
	   		}
	   		amount = information[num].year/information[num].count
			values.push(Math.round(amount))
		}

		values = values.sort(sortNumber)
		min = values[0]
		max = values[values.length - 2]


		// for each class calculate its average year of publication
		// stretch them between 0 and 100 to get a color code for rainbow
	    for (var i in data) {
	   		color = ""
	   		num = i.slice(0,2)
	   		if (!information[num]) {
	   			continue;
	   		}
	   		amount = information[num].year/information[num].count
	   		if (min != max) {
				amount = (amount - min)*100/(max- min)
			}

			l = JSON.parse(data[i].way).coordinates[0]

			// set properties for the polygon and to display info
			properties = {}
			properties.count = information[num].count
			properties.year = Math.round(information[num].year/information[num].count)
			properties.min = min
			properties.max = max
			properties.colorCode = amount + 1
			properties.term = ""
			properties.class = i
			properties.className = data[i].name
			makePolygon(l, properties)
		}

		// Add the information div to the map to display
		info.addTo(map)

		updateGradientDiv(geojson.getLayers()[0].feature.properties, true);

		map.spin(false)
	}).error(function() {
		map.spin(false)
	});
}

function sortNumber(a,b) {
    return a - b;
}

// Average year of publications for all classes
function lastgradient() {
	// show button status
	$('.timeline').toggleClass("not-selected").toggleClass("selected")

	if ($('.rusin').hasClass("selected")) {
		$('.rusin').toggleClass("not-selected").toggleClass("selected")
	}

	clearForGradient()
	
	if (info._map) {
		info.removeFrom(map)
	}
	if ($('.timeline').hasClass('not-selected')) {
		return
	}

	// retrieve information
	var information = JSON.parse(last)

	// Sum up all publications
	var total = 0;
	for (var i in information) {
		total += information[i].count
	}

	map.spin(true)

	// Retrieve geometry of all classes
	$.getJSON("/getWay/,/1/", function(data) {

		//Get min and max of publication year
		//used to stretch out data between 0-100
		var max = 0
		var min = Number.POSITIVE_INFINITY
		var values = []
		for (var i in data) {
			num = i.slice(0,2)
	   		if (!information[num]) {
	   			continue;
	   		}
	   		var amount = information[num].last*100/information[num].count
	   		values.push(Math.round(amount))
		}
		values = values.sort(sortNumber)
		min = values[0]
		max = values[values.length - 2]

		// for each class calculate its average year of publication
		// stretch them between 0 and 100 to get a color code for rainbow
	    for (var i in data) {
	   		color = ""
	   		num = i.slice(0,2)
	   		if (!information[num]) {
	   			continue;
	   		}
	   		amount = information[num].last*100/information[num].count
	   		if (min != max) {
				amount = (amount - min)*100/(max- min)
			}

			l = JSON.parse(data[i].way).coordinates[0]

			// set properties for the polygon and to display info
			properties = {}
			properties.count = information[num].count
			// properties.year = Math.round(information[num].year/information[num].count)
			properties.min = min
			properties.max = max
			properties.colorCode = amount + 1
			properties.last = Math.round(information[num].last*100/information[num].count)
			properties.term = ""
			properties.class = i
			properties.className = data[i].name
			makePolygon(l, properties)
		}

		// Add the information div to the map to display
		info.addTo(map)

		updateGradientDiv(geojson.getLayers()[0].feature.properties, true);

		map.spin(false)
	}).error(function() {
		map.spin(false)
	});
}


// Average year of publications for all classes
function smallestgradient() {
	// show button status
	$('.timeline').toggleClass("not-selected").toggleClass("selected")

	if ($('.rusin').hasClass("selected")) {
		$('.rusin').toggleClass("not-selected").toggleClass("selected")
	}

	clearForGradient()
	
	if (info._map) {
		info.removeFrom(map)
	}
	if ($('.timeline').hasClass('not-selected')) {
		return
	}

	// retrieve information
	var information = JSON.parse(smallestyearcc)

	map.spin(true)

	// Retrieve geometry of all classes
	$.getJSON("/getWay/,/1/", function(data) {

		//Get min and max of publication year
		//used to stretch out data between 0-100
		var max = 0
		var min = Number.POSITIVE_INFINITY
		var values = []

		for (var i in data) {
			num = i.slice(0,2)
	   		if (!information[num]) {
	   			continue;
	   		}
	   		amount = information[num].year
	   		values.push(Math.round(amount))
		}
		values = values.sort(sortNumber)
		min = values[0]
		max = values[values.length - 1]

		// for each class calculate its average year of publication
		// stretch them between 0 and 100 to get a color code for rainbow
	    for (var i in data) {
	   		color = ""
	   		num = i.slice(0,2)
	   		if (!information[num]) {
	   			continue;
	   		}
	   		amount = information[num].year
	   		if (min != max) {
				amount = (amount - min)*100/(max- min)
			}

			l = JSON.parse(data[i].way).coordinates[0]

			// set properties for the polygon and to display info
			properties = {}
			// properties.count = information[num].count
			properties.year = Math.round(information[num].year)
			properties.min = min
			properties.max = max
			properties.colorCode = amount + 1
			properties.term = ""
			properties.class = i
			properties.className = data[i].name
			makePolygon(l, properties)
		}

		// Add the information div to the map to display
		info.addTo(map)

		updateGradientDiv(geojson.getLayers()[0].feature.properties, true);

		map.spin(false)
	}).error(function() {
		map.spin(false)
	});
}

// Genereate gradient for a specific author
function authorGradient(term, type) {


	clearForGradient()
	
	map.spin(true)
	$.getJSON("/searchAuthorTimeline/" + term, function(data) {
		if ($.isEmptyObject(data.distribution)) {
			map.spin(false)
			alert("There is no publication infromation for this author.")
			return;
		}

		max = 0.0
		min = Number.POSITIVE_INFINITY
		
		for (var i in data.distribution) {
			cc = data.distribution[i]
			number = cc[1]

			if (type == "time") {
				number = cc[0]/number
			} 
			max = Math.max(number, max)
			min = Math.min(number, min)
		}

		var authorGeoJSON = {}
		authorGeoJSON.type = "FeatureCollection"
		authorGeoJSON.features = []

		for (var i in data.distribution) {
			color = ""
			cc = data.distribution[i]

			amount = cc[1]
			if (type == "time") {
				amount = cc[0]/amount
			} 
			if (min != max) {
				amount = (amount - min)*100/(max- min)
			} 
			l = JSON.parse(cc[2]).coordinates[0];
			var properties = {}
			properties.type = "time"
			if (type == "time") {
				properties.type = "time"
				properties.year = Math.round(cc[0]/cc[1])
			} else {

				properties.type = "count"
				properties.count = cc[1]
			}
			properties.colorCode = amount + 1
			properties.term = term
			properties.min = min
			properties.max = max
			properties.total = data.count
			properties.class = i
			properties.className = cc[3]
			makePolygon(l, properties)

		}

		if (info._map) {
			info.removeFrom(map)
		}

		info.addTo(map)

		updateGradientDiv(geojson.getLayers()[0].feature.properties, true);
		map.spin(false)
		
		
	}).error(function() {
		map.spin(false)
	});
}

function rusinGradient() { 
// show button status
	$('.rusin').toggleClass("not-selected").toggleClass("selected")


	if ($('.timeline').hasClass("selected")) {
		$('.timeline').toggleClass("not-selected").toggleClass("selected")
	}


	clearForGradient()

	if (info._map) {
		info.removeFrom(map)
	}
	if ($('.rusin').hasClass('not-selected')) {
		return
	}

	map.spin(true)

	// Retrieve geometry of all classes
	$.getJSON("/getWay/,/1/", function(data) {
		// for each class calculate its average year of publication
		// stretch them between 0 and 100 to get a color code for rainbow
	    for (var i in data) {
	   		color = ""
	   		num = i.slice(0,2)

			l = JSON.parse(data[i].way).coordinates[0]

			// set properties for the polygon and to display info
			properties = {}
			properties.rusinName = data[i].rusinName
			properties.color = data[i].rusinColor
			properties.term = ""
			properties.class = i
			properties.className = data[i].name
			makePolygon(l, properties)
		}

		// Add the information div to the map to display
		info.addTo(map)

		updateRusinDiv(geojson.getLayers()[0].feature.properties, true);

		map.spin(false)

		
	}).error(function() {
		map.spin(false)
	});
}

function clearForGradient() {
	clearGeoJSON()


	if (drawControl._map){
		drawControl.removeFrom(map)
	}
	if (filterBtn._map){
		filterBtn.removeFrom(map)
	}


	drawnItems.clearLayers()

	for (var i in markers) {
		markers[i].setOpacity(1)
	}
}


/********************** FORMULA MARKERS *************************/

// For each marker check if it is inside of a user created polygon
// If it is not inside of any then remove it.
function filterMarkers(removeMode) {

	$('.confirm').parent().addClass('leaflet-disabled')
	if (typeof removeMode == 'undefined') {
		removeMode = true
	} 
	var polygons = drawnItems._layers
    var ms = markerLayer._layers
    if ($.isEmptyObject(polygons)) {
    	return;
    }
    var numbers = {}

    for (var i in ms) {
    	check = 0;
    	position = L.CRS.EPSG900913.project(ms[i]._latlng);
    	title = ms[i]._popup._content;

    	//check if inside
    	for (var j in polygons) {
	    	pos = L.CRS.EPSG900913.project(polygons[j]._latlng)
	    	radius = polygons[j]._mRadius
	    	var dist = Math.sqrt(Math.pow(position.x-pos.x,2) + Math.pow(position.y - pos.y,2))
	    	if (dist < radius) {
	    		check++;
	    	} 
	    }

	    //remove marker
	    if (check == 0) {
	    	if (removeMode) {
		    	markers = jQuery.grep(markers, function(value) {
				  return value != ms[i];
				});
		    } else {
		    	ms[i].setOpacity(0.5)
		    	k = oms.markers.indexOf(ms[i])
		    	oms.markers[k].setOpacity(0.5)
		    }
	    } else {
	    	numbers[ms[i].options.number] = true
	    	ms[i].setOpacity(1)
	    	var k = oms.markers.indexOf(ms[i])
	    	oms.markers[k].setOpacity(1)
	    }
    }

    updatePapersLinkDiv(numbers)

    //rebuild marker layer
	rebuildMarkerLayer()

	if (removeMode) {
		drawnItems.clearLayers()
	}
}
/********************** INFORMATION MAP DISPLAY ************************/



var b 
// Create a marker in position with title and possibly spiderfy
function makeMarker(position, title, number) {
	// console.log(position)
	var marker = L.marker();
	marker
		.setLatLng(L.latLng(position[1], position[0]))
		.bindPopup(title)
		.on('click', function () {
			$('.timeline').click(function (e) {
				marker.closePopup()
				authorGradient(this.attributes['author'].value, "time")
			})
			$('.classes').click(function (e) {
				marker.closePopup()
				authorGradient(this.attributes['author'].value, "amount")
			})
		})
	if (number) {
		marker.options['number'] = number
	}
	markers.push(marker)
	oms.addMarker(marker)
}


// Create a marker in position with title and possibly spiderfy
function makePolygon(l, properties) {
	for (var i in l) {
	   l[i][1] += l[i][0]
	   l[i][0] = l[i][1] - l[i][0]
	   l[i][1] -= l[i][0]
	}

	polygon = L.polygon(l)
	polyJson = polygon.toGeoJSON()
	polyJson.properties = properties

	geojson.addData(polyJson)
}

// Given a change to the markers rebuild the layer that contains them
function rebuildMarkerLayer() {
	if (markerLayer) {
		markerLayer.clearLayers()
	}
	markerLayer = L.layerGroup(markers)
	markerLayer.addTo(map)
}

var b
// Given articles put them in the map in respective mscs.
function displayArticles(allClasses, markers, z) {
	console.log(markers)

	z = map.getZoom()
	cs = ""
    for (var c in allClasses) {
    	cs += c + " "
    }
	$.getJSON("/search/" + cs  + "/" + 13 + "/2", function(data) {
		map.spin(false)
		for(var key in data) {
			titles = allClasses[key.replace(/x/g,'')]
			entry = data[key]
			for (var title in titles) {
				var content = '<h5>' + title + '</h5>' + '<a target="_blank" href="http://zbmath.org/?q=an:' + titles[title] + '">zbMath</a>'
				if (entry.position) {
					makeMarker(entry.position, content, titles[title]);
				}
			}
		}
		rebuildMarkerLayer()

		if (markers.length > 0 && !drawControl._map) {
			map.addControl(drawControl)
			$(".leaflet-draw-toolbar-top").popover({
		        placement: 'right',
		        html: 'true',
		        content : '<div style="text-align: right"><a class="close-popup" href="#" >&times;</a></div><div>Click here to filter your results!</div>'
		    })
		    $(".leaflet-draw-toolbar-top").popover('show');
		    $('.popover').width('100px')
		    $('.close-popup').click(function () { 
		    	$(".leaflet-draw-toolbar-top").popover('destroy');
		    })
			map.addControl(filterBtn)
			$('.confirm').parent().addClass('leaflet-disabled')
		}
	}).error(function() {
		map.spin(false)
		if (!info._map) {
			info.addTo(map)
		}
		
		if (markers.length == 0) {
			info.update("<h4> No results </h4>")
		}
	})

	var numbers = {}
	for (var c in allClasses) {
		for (var title in allClasses[c]) {
			numbers[allClasses[c][title]] = true
		}
	}
	updatePapersLinkDiv(numbers);

}


/********************** SEARCH METHODS *************************/

// Search according to type of search. 
// If empty don't try anything
function search(event) {
	event.preventDefault()
	if ($('.timeline').hasClass("selected")) {
		$('.timeline').toggleClass("not-selected").toggleClass("selected")
	}
	if ($('.rusin').hasClass("selected")) {
		$('.rusin').toggleClass("not-selected").toggleClass("selected")
	}

	markers = []
	rebuildMarkerLayer()
	clearGeoJSON()
	if (info._map) {
		info.removeFrom(map)
	}
	if (drawControl._map) {
		drawControl.removeFrom(map)
	}
	if (filterBtn._map) {
		filterBtn.removeFrom(map)
	}
	
	drawnItems.clearLayers()

	var term = $('.msc-search').val();
	if (!term) {
		return;
	}
	term = term.trim()
	if (prefix == "c" || term.slice(0,2) == "c:") {
		mscsearch(term.slice(2).trim());
	} else if (term.slice(0,2) == "f:" || term.slice(0,2) == "t:") {
		var indexF = term.indexOf("f:")
		var indexT = term.indexOf("t:")
		var formula, text;
		if (indexF > indexT) {
			text = term.slice(indexT+2, indexF)
			formula = term.slice(indexF+2)
		} else {
			formula = term.slice(indexF+2, indexT)
			text = term.slice(indexT+2)
		}
		//WHY IS IT GOING HERE? with: "General"
		mathsearch(formula, text);
	} else if (term.slice(0,2) == "a:") {
		//searching an author
		authorsearch(term.slice(2).trim());
	} else {
		markers = []
		mscsearch(term, true);
		authorsearch(term, true);
		mathsearch(term, "", true);
		mathsearch("", term, true);
	}
}


// Pull from database MSC data from given point
function getMscData (e) {
	var a = e.latlng
	var pos = L.CRS.EPSG900913.project(e.latlng);
	var z = map.getZoom();
	$.getJSON("/getMSC/" + pos.x + "/" + pos.y + "/" + z, function(data) {
		if (data.water) {
			return;
		}
		var popup = L.popup();
		popup
		    .setLatLng(e.latlng)
		    .setContent('<h5>' + data.number + '</h5>' + data.name + '<br><a href="'+ data.planetmath + '">PlanetMath</a><br> <a target="_blank" href="' + data.zentralblatt + '">Zentralblatt</a>')
		    .openOn(map);
	}).error(function() {
		map.spin(false)
		if (!info._map) {
			info.addTo(map)
		}
		
		if (markers.length == 0) {
			info.update("<h4> No results </h4>")
		}
	});
}

// Query DB by msc name or number.
function mscsearch(term, composed) {
	z = map.getZoom()
	map.spin(true)
	$.getJSON("/search/" + term  + "/" + z + "/1", function(data) {
		markers = []
		for(var key in data) {
			entry = data[key]
			content = '<h5>' + entry.number + '</h5>' + entry.name + '<br><a href="'+ entry.planetmath + '">PlanetMath</a><br> <a target="_blank" href="' + entry.zentralblatt + '">Zentralblatt</a>'
			if (entry.position) {
				makeMarker(entry.position, content);
			}
		}
		if (markers.length == 0) {
			if (!info._map) {
				info.addTo(map)
			}
			info.update("<h4> No results </h4>")
		}
		rebuildMarkerLayer()
		map.spin(false)
	}).error(function() {
		map.spin(false)
		if (!info._map) {
			info.addTo(map)
		}
		
		if (markers.length == 0) {
			info.update("<h4> No results </h4>")
		}
	})
}

// Search authors in the db
function authorsearch(term, composed) {
	map.spin(true)
	$.getJSON("/searchAuthor/" + term, function(data) {
		if (!composed) {
			markers = []
		}
		for (var key in data) {
			var entry = data[key]
			var spacey = key.replace('.', ' ').trim()
			var name = L.Util.splitWords(spacey)
			content = entry.popup
			if (entry.largest.position) {
				makeMarker(entry.largest.position, content)
			}
		}
		updateAuthorLinkDiv(data);
		rebuildMarkerLayer()
		map.spin(false)
	}).error(function() {
		map.spin(false)
		if (!info._map) {
			info.addTo(map)
		}
		if (markers.length == 0) {
			info.update("<h4> No results </h4>")
		}
	})
}


// When buttons are pressed change type of search.
function updateSearch(str) {
	prefix = str[0];

	var term = $('.msc-search').val();
	var tokens = ["f:","c:", "a:", "t:"]
	if (term.trim().slice(0,2) == "f:" && prefix == "t") {

		if (term.indexOf("t:") == -1) {
			$('.msc-search').val(term + " t: ")
		}
	} else if (term.trim().slice(0,2) == "t:" && prefix == "f") {
		if (term.indexOf("f:") == -1) {
			$('.msc-search').val(term + " f: ")
		}
	} else if (tokens.indexOf(term.trim().slice(0,2)) > -1) {
		if (term.trim().indexOf("t:") > 0) {
			term = term.slice(0,term.indexOf("t:"))
		} else if (term.trim().indexOf("f:") > 0) {
			term = term.slice(0,term.indexOf("f:"))
		}
		$('.msc-search').val(prefix + ": " + term.trim().slice(2).trim())
		return
	} else {
		$('.msc-search').val(prefix + ": " + term.trim())
	}
	$('.msc-search').focus()
}

// Parse response just to get content
function get_content_mathml(latexml_response) {
	var hasContent = /<annotation-xml[^>]*\"MWS\-Query\"[^>]*>([\s\S]*)<\/annotation-xml>/;
	var m = hasContent.exec(latexml_response);
	var content = null;
	if (m != null) {
		content = m[1];
	}

	return content;
}; 

// Given a search tearm query API with previously gotten Latex 
function getArticles(data, text) {
	result = data.result
	content = get_content_mathml(result);
	send = {
		"text": text,
		"math": content,
		"from": 0,
		"size": 20,
	}
	var results = [];
	$.ajax({
	   type: 'GET',
	   url: "http://search.mathweb.org/zbl/php/tema_proxy.php",
	   data: send,
	}).done(function(data1) {
		allClasses = {}
		if (data1.hits.length == 0) {
			map.spin(false)

			if (!info._map) {
				info.addTo(map)
			}
			if (markers.length == 0) {
				info.update("<h4> No results </h4>")
			}
			return;
		}
		// Build object containing the title and class of result
		// Use it to query DB and display articles
	    for (var key in data1.hits) {
	    	var xhtml = $(jQuery.parseXML(data1.hits[key].xhtml))
	    	b = xhtml
	    	classes = xhtml.find(".class").text().split(" ")
	    	title = xhtml.find(".review > .title").text()
	    	number = xhtml.find(".number").text()
	    	for (var i in classes) {
	    		if (classes[i].indexOf("-") == -1) {
		    		classes[i] = classes[i].slice(0,3)
		    	}
	    		if (!allClasses[classes[i]]) {
	    			allClasses[classes[i]] = {}
	    		}
	    		allClasses[classes[i]][title] = number
	    	}
	    }

	    displayArticles(allClasses, markers)
		
		rebuildMarkerLayer()
		

	}).fail(function(data1){
		map.spin(false)
		console.error(data1); 
	}); 
}

// Given a term convert it to proper latexml
function convert(formula, text) {
	$.post("http://latexml.mathweb.org/convert", {
		profile: 'mwsq',
		tex: formula,
	}, function (data) {
		getArticles(data, text);
	}).fail(function(data) {
		map.spin(false)
	    console.error(data);
	})
}

// Given a term find all articles that contain it in abstract, using API
function mathsearch(formula, text) {

	markers = []
	map.spin(true);

	// displayArticles(JSON.parse(allClasses_backup), markers);
	// rebuildMarkerLayer()

	// map.spin(false)

	convert(formula, text);
}

function buildMenu() {
	$.getJSON('/get/first/', function(data) {
		$('.left-content').replaceWith(data.html);
	});
}