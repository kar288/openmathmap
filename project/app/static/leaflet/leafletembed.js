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
var markers = [];
var markerLayer;
var mathSearchUrl = 'http://search.mathweb.org/zbl/php/tema_proxy.php'

function initmap() {
    // set up the map
    map = new L.Map('map');

    // create the tile layer with correct attribution
    var osmUrl='/static/Political/Tiles/{z}/{x}/{y}.png';
    var osmAttrib='Map data (c) OpenStreetMap contributors';
    var osm = new L.TileLayer(osmUrl, {minZoom: 10, maxZoom: 14, attribution: osmAttrib});

    // start the map in the center with zoom level 10
    map.setView(new L.LatLng(0.5, 0.5), 10);
    map.addLayer(osm);
    var x, y;
    map.on('click', function (e) {
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
    });

}


$(document).ready(main);

function main () {
	$('.browse').click(buildMenu);
	$('.search-form').submit(function (event) {
		event.preventDefault()
		var term = $('.msc-search').val();
		if (!term) {
			return;
		}
		mathsearch(term);
		z = map.getZoom()
		// $.getJSON("/search/" + term  + "/" + z + "/1", function(data) {
		// 	markers = []
  //   		for(var key in data) {
  //   			entry = data[key]
  //   			var marker = L.marker();
  //   			marker
  //   				.setLatLng(L.latLng(entry.position[1], entry.position[0]))
  //   				.addTo(map)
  //   			marker._icon.title = entry.name
  //   			markers.push(marker)
  //   		}
  //   		if (markerLayer) {
	 //    		markerLayer.clearLayers()
	 //    	}
  //   		markerLayer = L.layerGroup(markers)
  //   		markerLayer.addTo(map)
  //   	});
	})

}

function get_content_mathml(latexml_response) {
	var hasContent = /<annotation-xml[^>]*\"MWS\-Query\"[^>]*>([\s\S]*)<\/annotation-xml>/;
	var m = hasContent.exec(latexml_response);
	var content = null;
	if (m!= null) {
		content = m[1];
	}

	return content;
}; 

var r;

function getMSCFromArticle(title, numbers, markers, z) {
	$.getJSON("/search/" + numbers  + "/" + z + "/2", function(data) {
		for(var key in data) {
			entry = data[key]
			var marker = L.marker();
			marker
				.setLatLng(L.latLng(entry.position[1], entry.position[0]))
				.addTo(map)
			marker._icon.title = title
			markers.push(marker)
		}
	});
}

function mathsearch(term) {
	var result;
	$.post("http://search.mathweb.org/zbl/php/latexml_proxy.php", {
		profile: 'mwsq',
		tex: term,
	}, function (data) {
		result = data.result
	}).fail(function() {
	    error_callback("Unable to query server. ");
	});
	content = get_content_mathml(result);
	var data = {
		"text": term,
		"math": content,
		"from": 0,
		"size": 20,
	}
	var results = {};
	$.ajax({
	   type: 'GET',
	   url: "http://search.mathweb.org/zbl/php/tema_proxy.php",
	   data: data,
	}).done(function(data) {
	    for (var key in data.hits) {
	    	xhtml = $(jQuery.parseXML(data.hits[key].xhtml))
	    	classes = xhtml.find(".class").text().split(" ")
	    	for (var i in classes) {
	    		classes[i] = classes[i].slice(0,3)
	    	}
	    	number = classes.join(" ")
	    	title = xhtml.find(".review > .title").text()
	    	results[title] = number
	    }
		for (var title in results) {
			getMSCFromArticle(title, results[title], markers, z)
		}
		if (markerLayer) {
    		markerLayer.clearLayers()
    	}
		markerLayer = L.layerGroup(markers)
		markerLayer.addTo(map)

	}).fail(function(){
		console.log("BAD"); 
	}); 



}

function buildMenu() {
	$.getJSON('/get/first/', function(data) {
		$('.left-content').replaceWith(data.html);
	});
}

function search() {
	console.log('bla')
}

function getPosition(e) {
	if (e.length > 1) {
		marker = L.marker([0.5, 0.5]);
		marker.addTo(map);
	} else {
		map.removeLayer(marker);
	}
}
