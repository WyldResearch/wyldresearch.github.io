
var officeMap = L.map('mapid').setView([50.83, -0.16], 2).flyTo([50.83, -0.16], 13);

/*L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 13,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'mapbox.streets'
}).addTo(officeMap);*/


// thunderforest layer
L.tileLayer('https://{s}.tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey=0f885a7bee654a8e8246597d53fada7d', {
	attribution: 'Maps &copy; <a href="http://www.thunderforest.com">Thunderforest</a>, Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
	maxZoom: 22
}).addTo(officeMap);

// icon
var WyldIcon = L.Icon.extend({
	options: {
		iconUrl: 'images/icon-wyld-main.png',
		//shadowUrl: 'icon-wyld-shadow.png',
		iconSize:     [38, 42],
		shadowSize:   [60, 60],
		iconAnchor:   [20, 50],
		shadowAnchor: [20, 65],
		popupAnchor:  [5, -40]
	}
});

var officeIcon = new WyldIcon();

// popup
L.marker([50.836, -0.172], {icon: officeIcon}).addTo(officeMap)
	.bindPopup("<b>Wyld Technologies</b><br />Freedom Works Creative Hub,<br />Hove Business Centre, BN3 1TX").openPopup();

// watermark
L.Control.Watermark = L.Control.extend({
    onAdd: function(map) {
        var img = L.DomUtil.create('img');

        img.src = 'images/logo-main-wyld.png';
        img.style.width = '150px';

        return img;
    },
    onRemove: function(map) {
        // Nothing to do here
    }
});

L.control.watermark = function(opts) {
    return new L.Control.Watermark(opts);
};

L.control.watermark({ position: 'bottomleft' }).addTo(officeMap);