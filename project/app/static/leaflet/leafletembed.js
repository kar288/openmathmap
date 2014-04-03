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

var prefix = ""

$(document).ready(main);

function main () {
	initmap()

	$('.browse').click(buildMenu);

	// search control
	$('.search-form').submit(search)

	// type of search controls.
	$('.search-by-class').click(function () {
		updateSearch("c: ");
	})
	$('.search-by-formula').click(function () {
		updateSearch("f: ");
	})

	$('.msc-search').val('f: P = NP')
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
	var drawControl = new L.Control.Draw({
		draw: {
			polyline: false,
			marker: false, 
			polygon: false, 
			rectangle: false,
		},
	    edit: {
	        featureGroup: drawnItems
	    }
	});
	map.addControl(drawControl);

	map.on('draw:created', function (e) {
		var type = e.layerType,
			layer = e.layer;

		drawnItems.addLayer(layer);
	});


	//filter button
	var btn = L.functionButtons([{ content: '<div class="map-button"><span class="glyphicon glyphicon-globe"></span></div>' , position: 'topleft', title: 'Select Markers'}]);
	btn.on('clicked', filterMarkers);
	map.addControl(btn);
}

// Given a change to the markers rebuild the layer that contains them
function rebuildMarkerLayer() {
	if (markerLayer) {
		markerLayer.clearLayers()
	}
	markerLayer = L.layerGroup(markers)
	markerLayer.addTo(map)
}


// For each marker check if it is inside of a user created polygon
// If it is not inside of any then remove it.
function filterMarkers() {
	var polygons = drawnItems._layers
    var ms = markerLayer._layers
    if ($.isEmptyObject(polygons)) {
    	console.log('returning, no polygons')
    	return;
    }

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
	    	markers = jQuery.grep(markers, function(value) {
			  return value != ms[i];
			});
	    }
    }

    //rebuild marker layer
	rebuildMarkerLayer()
}


// Search according to type of search. 
// If empty don't try anything
function search(event) {
	event.preventDefault()
	var term = $('.msc-search').val();
	if (!term) {
		return;
	}
	term = term.trim()
	if (prefix == "c" || term.slice(0,2) == "c:") {
		mscsearch(term.slice(2).trim());
	} else if (term.slice(0,2) == "f:") {
		//WHY IS IT GOING HERE? with: "General"
		mathsearch(term.slice(2).trim());
	} else {
		// mathsearch(term);
		mscsearch(term);			
	}
}


// Pull from database MSC data from given point
function getMscData (e) {
	a = e.latlng
	pos = L.CRS.EPSG900913.project(e.latlng);
	z = map.getZoom();
	$.getJSON("/getMSC/" + pos.x + "/" + pos.y + "/" + z, function(data) {
		if (data.water) {
			return;
		}
		var popup = L.popup();
		popup
		    .setLatLng(e.latlng)
		    .setContent('<h5>' + data.number + '</h5>' + data.name + '<br><a href="'+ data.planetmath + '">PlanetMath</a><br> <a href="' + data.zentralblatt + '">Zentralblatt</a>')
		    .openOn(map);
	});
}

// Query DB by msc name or number.
function mscsearch(term) {
	z = map.getZoom()
	$.getJSON("/search/" + term  + "/" + z + "/1", function(data) {
		markers = []
		for(var key in data) {
			entry = data[key]
			content = '<h5>' + entry.number + '</h5>' + entry.name + '<br><a href="'+ entry.planetmath + '">PlanetMath</a><br> <a href="' + entry.zentralblatt + '">Zentralblatt</a>'
			makeMarker(entry.position, content);
		}
		rebuildMarkerLayer()
	});
}

// When buttons are pressed change type of search.
function updateSearch(str) {
	prefix = str[0];
	var term = $('.msc-search').val();
	var tokens = ["f:","c:"]
	if (tokens.indexOf(term.trim().slice(0,2)) > -1) {
		$('.msc-search').val(str + term.trim().slice(2).trim())
	} else {
		$('.msc-search').val(str + term.trim())
	}
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

// Create a marker in position with title and possibly spiderfy
function makeMarker(position, title) {
	var marker = L.marker();
	marker
		.setLatLng(L.latLng(position[1], position[0]))
		.bindPopup(title)
	markers.push(marker)
	oms.addMarker(marker)
}

// Given articles put them in the map in respective mscs.
function displayArticles(allClasses, markers, z) {
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
				makeMarker(entry.position, title);
			}
		}
		// DOES THIS STILL WORK? CHECK WITH INTERNET
		rebuildMarkerLayer()
	});
}

// Given a search tearm query API with previously gotten Latex 
function getArticles(data, term) {
	result = data.result
	content = get_content_mathml(result);
	send = {
		"text": term,
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
			console.log('no results with formula search')
			return;
		}
		// Build object containing the title and class of result
		// Use it to query DB and display articles
	    for (var key in data1.hits) {
	    	xhtml = $(jQuery.parseXML(data1.hits[key].xhtml))
	    	classes = xhtml.find(".class").text().split(" ")
	    	title = xhtml.find(".review > .title").text()
	    	for (var i in classes) {
	    		if (classes[i].indexOf("-") == -1) {
		    		classes[i] = classes[i].slice(0,3)
		    	}
	    		if (!allClasses[classes[i]]) {
	    			allClasses[classes[i]] = {}
	    		}
	    		allClasses[classes[i]][title] = true
	    	}
	    }
	    displayArticles(allClasses, markers)
		
		//CHECK WITH INTERNET
		rebuildMarkerLayer()
		

	}).fail(function(data1){
		map.spin(false)
		console.log("BAD"); 
	}); 
}

// Given a term convert it to proper latexml
function convert(term) {
	$.post("http://latexml.mathweb.org/convert", {
		profile: 'mwsq',
		tex: term,
	}, function (data) {
		//
		getArticles(data, term);
	}).fail(function() {
		map.spin(false)
	    console.log("Unable to query server. ");
	})
}

// Given a term find all articles that contain it in abstract, using API
function mathsearch(term) {
	console.log('bla')
	markers = []
	map.spin(true);
	convert(term);
}

function buildMenu() {
	$.getJSON('/get/first/', function(data) {
		$('.left-content').replaceWith(data.html);
	});
}