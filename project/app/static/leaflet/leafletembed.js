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
var gradientBtn

var info;

var prefix = ""

$(document).ready(main);

var rainbow 

var yearcc = '{"24": {"count": 4, "year": 8006}, "25": {"count": 4, "year": 7995}, "26": {"count": 47464, "year": 94723384}, "27": {"count": 2, "year": 4024}, "20": {"count": 172678, "year": 344217752}, "21": {"count": 0, "year": 0}, "22": {"count": 39899, "year": 79469687}, "23": {"count": 1, "year": 2012}, "28": {"count": 36830, "year": 73377516}, "29": {"count": 1, "year": 2012}, "59": {"count": 1, "year": 2008}, "58": {"count": 66258, "year": 132162747}, "55": {"count": 42172, "year": 83951351}, "54": {"count": 105757, "year": 210682458}, "57": {"count": 70986, "year": 141458375}, "56": {"count": 2, "year": 4022}, "51": {"count": 37722, "year": 75123776}, "50": {"count": 1, "year": 2012}, "53": {"count": 135958, "year": 271198049}, "52": {"count": 32142, "year": 64142725}, "88": {"count": 0, "year": 0}, "89": {"count": 0, "year": 0}, "82": {"count": 77055, "year": 154217918}, "83": {"count": 77632, "year": 155433498}, "80": {"count": 37661, "year": 75300217}, "81": {"count": 166725, "year": 333696746}, "86": {"count": 18637, "year": 37256711}, "87": {"count": 0, "year": 0}, "84": {"count": 0, "year": 0}, "85": {"count": 13070, "year": 26143898}, "02": {"count": 2, "year": 4024}, "03": {"count": 138890, "year": 276902954}, "00": {"count": 60968, "year": 121724194}, "01": {"count": 56398, "year": 112477374}, "06": {"count": 36399, "year": 72531689}, "07": {"count": 3, "year": 6038}, "04": {"count": 2, "year": 4022}, "05": {"count": 188638, "year": 376652278}, "08": {"count": 16766, "year": 33387487}, "09": {"count": 0, "year": 0}, "39": {"count": 29860, "year": 59686931}, "38": {"count": 4, "year": 8032}, "33": {"count": 35443, "year": 70716954}, "32": {"count": 60831, "year": 121235628}, "31": {"count": 19054, "year": 37942450}, "30": {"count": 86421, "year": 172133014}, "37": {"count": 127912, "year": 255812858}, "36": {"count": 3, "year": 6035}, "35": {"count": 458418, "year": 915157473}, "34": {"count": 231487, "year": 461926475}, "60": {"count": 242328, "year": 483092062}, "61": {"count": 1, "year": 1949}, "62": {"count": 316570, "year": 631803583}, "63": {"count": 1, "year": 2011}, "64": {"count": 3, "year": 6026}, "65": {"count": 349638, "year": 697777596}, "66": {"count": 1, "year": 2012}, "67": {"count": 1, "year": 2011}, "68": {"count": 439399, "year": 878137809}, "69": {"count": 1, "year": 2012}, "99": {"count": 2, "year": 4024}, "98": {"count": 2, "year": 4019}, "91": {"count": 153534, "year": 306854922}, "90": {"count": 252970, "year": 505143524}, "93": {"count": 263884, "year": 526234376}, "92": {"count": 93161, "year": 186293780}, "95": {"count": 0, "year": 0}, "94": {"count": 97100, "year": 193879575}, "97": {"count": 4877, "year": 9789687}, "96": {"count": 1, "year": 2012}, "11": {"count": 180371, "year": 359719774}, "10": {"count": 4, "year": 8047}, "13": {"count": 51058, "year": 101796618}, "12": {"count": 19036, "year": 37924782}, "15": {"count": 68413, "year": 136516621}, "14": {"count": 116612, "year": 232713969}, "17": {"count": 48759, "year": 97289336}, "16": {"count": 103666, "year": 206749106}, "19": {"count": 6645, "year": 13299808}, "18": {"count": 32248, "year": 64252638}, "48": {"count": 3, "year": 6034}, "49": {"count": 90060, "year": 179606630}, "46": {"count": 161823, "year": 322334662}, "47": {"count": 175691, "year": 350528023}, "44": {"count": 14249, "year": 28370602}, "45": {"count": 43176, "year": 86002918}, "42": {"count": 54716, "year": 109142111}, "43": {"count": 19415, "year": 38654627}, "40": {"count": 14459, "year": 28779632}, "41": {"count": 67688, "year": 134795758}, "77": {"count": 2, "year": 4018}, "76": {"count": 303356, "year": 605396632}, "75": {"count": 12, "year": 24114}, "74": {"count": 306286, "year": 610627476}, "73": {"count": 98, "year": 194601}, "72": {"count": 0, "year": 0}, "71": {"count": 0, "year": 0}, "70": {"count": 77070, "year": 153655201}, "79": {"count": 2, "year": 4008}, "78": {"count": 35066, "year": 70180604}}'

var geojson;


function main () {
	initmap()

	$('.browse').click(buildMenu);

	// type of search controls.
	$('.search-by-class').click(function () {
		updateSearch("c: ");
	})
	$('.search-by-formula').click(function () {
		updateSearch("f: ");
	})

	rainbow = new Rainbow();
	rainbow.setSpectrum('red', 'yellow');

	
}
var b
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
	    },
	    position: "topright"
	});

	L.drawLocal.draw.toolbar.buttons.circle = 'Select markers.';

	L.drawLocal.draw.handlers.circle.tooltip.start += "<br> Select the markers you want to keep.";
	map.addControl(drawControl);

	map.on('draw:created', function (e) {
		var type = e.layerType,
			layer = e.layer;

		drawnItems.addLayer(layer);

		if (markers.length) {
			filterMarkers(false)
		}
	});


	//filter button
	var btn = L.functionButtons([{ content: '<div class="map-button"><span class="glyphicon glyphicon-ok-circle"></span></div>' , position: 'topright', title: 'Select Markers'}]);
	btn.on('clicked', filterMarkers);
	map.addControl(btn);

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
		$('.msc-search').val('f: P = NP')
		$(".search-form").on('mouseover', controlEnter)
		$(".search-form").on('mouseout', controlLeave);

		$('.search-type').click(function () {
			updateSearch(this.id)
		})
	})
	

	//gradient button
	gradientBtn = L.functionButtons([{ content: '<div class="timeline map-button not-selected"><span class="glyphicon glyphicon-arrow-right">Timeline</span></div>' , position: 'bottomleft', title: 'Gradient'}]);

	gradientBtn.on('clicked', gradient);
	map.addControl(gradientBtn);
	map.zoomControl.setPosition("bottomleft")



	info = L.control({position: 'topleft'})

	info.update = function (properties, general) {
		

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
				this._div.innerHTML = '<h4>' + name[1] + ' ' + name[0] + '</h4>'
		    	if (type == "time") {
			    	this._div.innerHTML +=  "Average year " + properties.year + " in " + properties.className
			    } else {
			    	this._div.innerHTML += properties.count + " publications in " + properties.className
			    }
			    return;
			} else {
				this._div.innerHTML = '<h4>' + name[1] + ' ' + name[0] + '</h4>'
			    this._div.innerHTML += '<h5>' + type + ' information</h5>'
				if (min == max) {
					return;
				}
			}
		} else {
			if (general) {
				this._div.innerHTML = "<h4> Average publication year per MSC</h4>"
			} else {
				this._div.innerHTML = "<h4> MSC" + num + "</h4>"
				this._div.innerHTML += "<span>" + Math.round(properties.count/1000) + "k publications.</span><br>"
				this._div.innerHTML += "<span> Average year: " + properties.year + "</span>"
				return
			}
		}


		step = 25;
		first = 0;


		for (var i = 0; i < 5; i++) {
			current =  Math.round(min + (max-min)*i*step/100)
			next = Math.round(min + (max-min)*(i+1)*step/100) 
			this._div.innerHTML +=
	          '<i class="legend-i" style="background:' + "#" + rainbow.colourAt(step*i) + '"></i> <span class="legend-label">' +
	          current + (i != 4 ? '&ndash;' + next  + '</span><br>' : '+');

		}

	};

	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
	    return this._div;
	}

	geojson = L.geoJson(null,{
		style: style,
		onEachFeature: onEachFeature
	}).addTo(map);


}

function style(feature) {
	return {
		fillColor: "#" + rainbow.colourAt(feature.properties.colorCode),
		color: "#" + rainbow.colourAt(feature.properties.colorCode),
	};
}

 function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
      fillColor: '#78A700',
      dashArray: '',
      fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
      layer.bringToFront();
    }
	info.update(layer.feature.properties, false);
}

function resetHighlight(e) {
	geojson.resetStyle(e.target);
	info.update(e.target.feature.properties, true);
}

function onEachFeature(feature, layer) {
	layer.on({
  		mouseover: highlightFeature,
  		mouseout: resetHighlight,
	});
}


function controlEnter(e) {
    map.dragging.disable();
    $('.tip').fadeIn()
}
function controlLeave() {
    map.dragging.enable();
    $('.tip').fadeOut()
}


function gradient() {
	$('.timeline').toggleClass("not-selected").toggleClass("selected")
	if (geojson) {
		geojson.clearLayers()
	}
	if (info._map) {
		info.removeFrom(map)
		return
	}

	information = JSON.parse(yearcc)
	total = 0;
	for (var i in information) {
		total += information[i].count
	}
	map.spin(true)
	$.getJSON("/getWay/,/1/", function(data) {
		var max = 0
		var min = Number.POSITIVE_INFINITY

		for (var i in data) {
			num = i.slice(0,2)
	   		if (!information[num]) {
	   			continue;
	   		}
	   		amount = information[num].year/information[num].count
	   		min = Math.min(min, amount)
	   		max = Math.max(max, amount)
		}

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

			properties = {}
			properties.count = information[num].count
			properties.year = Math.round(information[num].year/information[num].count)
			properties.min = min
			properties.max = max
			properties.colorCode = amount
			properties.term = ""
			properties.class = i
			makePolygon(l, amount, properties)
		}
		if (info._map) {
			info.removeFrom(map)
		}

		info.addTo(map)

		info.update(geojson.getLayers()[0].feature.properties, true);

		// rebuildGradientLayer()
		map.spin(false)
	}, function(data) {
		map.spin(false)
	});
}


// For each marker check if it is inside of a user created polygon
// If it is not inside of any then remove it.
function filterMarkers(removeMode) {
	if (typeof removeMode == 'undefined') {
		removeMode = true
	} 
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
	    	if (removeMode) {
		    	markers = jQuery.grep(markers, function(value) {
				  return value != ms[i];
				});
		    } else {
		    	ms[i].setOpacity(0.5)
		    	k = oms.markers.indexOf(ms[i])
		    	oms.markers[k].setOpacity(0.5)
		    }
	    }
    }

    //rebuild marker layer
	rebuildMarkerLayer()

	if (removeMode) {
		drawnItems.clearLayers()
	}
}


// Search according to type of search. 
// If empty don't try anything
function search(event) {
	event.preventDefault()

	if (geojson) {
		geojson.clearLayers()
	}
	if (info._map) {
		info.removeFrom(map)
	}

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
	} else if (term.slice(0,2) == "a:") {
		//searching an author
		authorsearch(term.slice(2).trim());
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

function authorsearch(term) {
	map.spin(true)
	$.getJSON("/searchAuthor/" + term, function(data) {
		markers = []
		for (var key in data) {
			entry = data[key]
			spacey = key.replace('.', ' ')
			var name = L.Util.splitWords(spacey)
			content = '<div class="authorPopup"><h5>' + name[1] + ' ' + name[0] + '</h5>'
			content += '<div class="row"><div class="col-sm-6"><button type="submit" author="' + key + '" class="timeline btn btn-primary btn-xs">Timeline</button></div>'
			content += '<div class="col-sm-6"><button type="submit" author="' + key + '" class="classes btn btn-primary btn-xs">Classes</button></div></div></div>'
			makeMarker(entry.largest.position, content)
		}
		rebuildMarkerLayer()
		map.spin(false)
	}, function(data) {
		map.spin(false)
	});
}


function searchAuthorGradient(term, type) {
	if (geojson) {
		geojson.clearLayers()
	}

	map.spin(true)
	$.getJSON("/searchAuthorTimeline/" + term, function(data) {

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
			properties.colorCode = amount
			properties.term = term
			properties.min = min
			properties.max = max
			properties.class = i
			properties.className = cc[3]
			makePolygon(l, amount, properties)

		}


		// rebuildGradientLayer()


		if (info._map) {
			info.removeFrom(map)
		}

		info.addTo(map)

		info.update(geojson.getLayers()[0].feature.properties, true);
		map.spin(false)
		
		
	});
}

// When buttons are pressed change type of search.
function updateSearch(str) {
	prefix = str[0];
	
	var term = $('.msc-search').val();
	var tokens = ["f:","c:", "a:"]
	if (tokens.indexOf(term.trim().slice(0,2)) > -1) {
		$('.msc-search').val(prefix + ": " + term.trim().slice(2).trim())
	} else {
		$('.msc-search').val(prefix + ": " + term.trim())
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
		.on('click', function () {
			$('.timeline').click(function (e) {
				searchAuthorGradient(this.attributes['author'].value, "time")
			})
			$('.classes').click(function (e) {
				searchAuthorGradient(this.attributes['author'].value, "amount")
			})
		})
	markers.push(marker)
	oms.addMarker(marker)
}


// Create a marker in position with title and possibly spiderfy
function makePolygon(l, colorCode, properties) {
	for (var i in l) {
	   l[i][1] += l[i][0]
	   l[i][0] = l[i][1] - l[i][0]
	   l[i][1] -= l[i][0]
	}

	polygon = L.polygon(l)

	polygon.setStyle({color: "#" + rainbow.colourAt(colorCode)})
	polyJson = polygon.toGeoJSON()


	polyJson.properties = properties

	geojson.addData(polyJson)
}

// Given a change to the markers rebuild the layer that contains them
function rebuildGradientLayer() {
	if (gradientLayer && gradientLayer.getLayers().length > 0) {
		gradientLayer.clearLayers()
		gradientPolygons = []
	} else {
		gradientLayer = L.layerGroup(gradientPolygons)
		gradientLayer.addTo(map)
	}
}

// Given a change to the markers rebuild the layer that contains them
function rebuildMarkerLayer() {
	if (markerLayer) {
		markerLayer.clearLayers()
		// markers = []
	}
	markerLayer = L.layerGroup(markers)
	markerLayer.addTo(map)
}


// Given articles put them in the map in respective mscs.
function displayArticles(allClasses, markers, z) {
	console.log('display articles')
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
	console.log('getARTICLES')
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
	markers = []
	map.spin(true);
	convert(term);
}

function buildMenu() {
	$.getJSON('/get/first/', function(data) {
		$('.left-content').replaceWith(data.html);
	});
}