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
        x = e.latlng.lat;
        y = e.latlng.lng;
		z = map.getZoom();
        latlng = e.latlng;
        $.ajax({
	   	    url: "http://map.mathweb.org:8080/MathService/mscquery/?lat=" + x + "&long=" + y + "&zoom=" + z,
		    headers: {
			jsonp: 'application/javascript'
		    },
	            accepts: 'application/javascript',
	            dataType: 'jsonp',
	            contentType: 'application/javascript',
	            crossDomain: true,
	            type: 'GET',
		    jsonpCallback: 'getMsc'
		});
    });

}

var getMsc = function (data) {
    var popup = L.popup();
	mscJson = data;
	if (data.name != 'null') {
		var name = mscJson.name.substring(3);
		var planetmath = "http://planetmath.org/msc_browser/"+ name;
		var zentralblatt = "http://www.zentralblatt-math.org/msc/en/search/?pa=" + name.replace("-XX","");
		popup
		    .setLatLng(latlng)
		    .setContent('<h5>' + mscJson.name + '</h5>' + mscJson.description + '<br><a href="'+ planetmath + '">PlanetMath</a><br> <a href="' + zentralblatt + '">Zentralblatt</a>')
		    .openOn(map);
	}
};



$(document).ready(main);

function main () {
	$('.browse').click(buildMenu);
	searchListen();

}

function buildMenu() {
	$.getJSON('/get/first/', function(data) {
		$('.left-content').replaceWith(data.html);
	});
}

function searchListen() {
	$('.msc-search').bind("enterKey",function(e) {
		// getPosition($.trim($('.msc-search').val()));
		console.log(Dajaxice.app.views.getPosition(Dajax.process,{'term':$.trim($('.msc-search').val())}))
		// $.trim($('.msc-search').val())
		// console.log($('.msc-search').val())
	});
	$('.msc-search').keyup(function(e){
		if(e.keyCode == 13) {
		  $(this).trigger("enterKey");
		}
	});
}

function getPosition(e) {
	if (e.length > 1) {
		marker = L.marker([0.5, 0.5]);
		marker.addTo(map);
	} else {
		map.removeLayer(marker);
	}
}

function my_js_callback(data){
    alert(data.message);
}