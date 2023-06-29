// Initialize the map
var map = L.map('map').setView([13.75, 100.5167], 6);
lyrOSM = L.tileLayer(`http://{s}.tile.osm.org/{z}/{x}/{y}.png`)
map.addLayer(lyrOSM)

// Create a layer group for the province polygons
var provinceLayer = L.featureGroup().addTo(map);

const polygonToMap = (polygon,name) => {
	let reversed = []
	for (let d of polygon.at(0)) {
		reversed.push(d.reverse())
	}
	L.polygon(reversed, {
		color: 'blue',
		fillColor: 'lightblue',
		fillOpacity: 0.4,
	})
	.bindPopup(name)
	.addTo(map)
}

// Loop through the province data and create polygons
data.features.forEach(function (province) {
	if (province.geometry.type === `Polygon`) {
		polygonToMap(province.geometry.coordinates,province.properties.name)
	} else {
		for (let polygon of province.geometry.coordinates) {
			polygonToMap(polygon,province.properties.name)
		}
	}
});

// Enable drawing control
var drawControl = new L.Control.Draw({
	draw: {
		polygon: true,
		polyline: false,
		rectangle: false,
		circle: false,
		marker: false
	},
	edit: {
		featureGroup: provinceLayer,
		remove: false
	}
});
map.addControl(drawControl);

// Initialize an empty array to store selected polygons
var selectedPolygons = [];

// Event handler for polygon creation
map.on(L.Draw.Event.CREATED, function (event) {
	var layer = event.layer;
	provinceLayer.addLayer(layer);
	selectedPolygons.push(layer);
	updateSelectedPolygons();
});

// Event handler for polygon removal
map.on(L.Draw.Event.DELETED, function () {
	selectedPolygons = [];
	updateSelectedPolygons();
});

// Update the selected polygons information
function updateSelectedPolygons() {
	var info = "";
	selectedPolygons.forEach(function (polygon) {
		info += polygon.getPopup().getContent() + "<br>";
	});
	document.getElementById("info").innerHTML = info;
}

// Add a control for displaying selected province information
var infoControl = L.control({ position: "topright" });
infoControl.onAdd = function (map) {
	this._div = L.DomUtil.create("div", "info");
	this.update();
	return this._div;
};
infoControl.update = function () {
	this._div.innerHTML = "<h4>Selected Provinces:</h4><div id='info'></div>";
};
infoControl.addTo(map);