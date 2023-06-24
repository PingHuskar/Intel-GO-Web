"use strict";
const LatLngToArrayString = (ll) => {
    return `[${ll.lat.toFixed(5)}, ${ll.lng.toFixed(5)}]`
}
const iconProps = {
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    // shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
}

var map, lyrOSM, mrkCurrentLocation, popExample, ctlZoom, ctlAttribute, ctlScale, ctlPan, ctlZoomslider, ctlMeasure

var OpenStreetMap_Mapnik = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
map = L.map(`mapdiv`,{
    center:[ 13.765981, 100.570261 ],
    zoom: 6,
    zoomControl:false,
    // dragging:false,
    // minZoom:10,
    // maxZoom:14
    attributionControl:false,
    layers: [OpenStreetMap_Mapnik]
})

ctlZoomslider = L.control.zoomslider({position:"topright"}).addTo(map)
ctlMeasure = L.control.polylineMeasure().addTo(map);
ctlAttribute = L.control.attribution({position:'bottomleft'}).addTo(map)
ctlAttribute.addAttribution(`<a href="https://github.com/pinghuskar">Chadin Chaipornpisuth</a>`)
ctlScale = L.control.scale({
    position:'bottomleft',
    metric:false,
    maxWidth:200
}).addTo(map)

const AddDonut = (lat, lng, meter) => {
    L.donut([lat, lng], {
        radius: meter,
        innerRadius: 0,
        innerRadiusAsPercent: false,
    }).addTo(map)
}

// var markers = L.markerClusterGroup()

fetch('data.json')
.then(res => res.json())
.then((data) => {
    for (let record of data) {
        if (record.geo.length > 0) {
            const NAME = record.name
            // markers.addLayer(
                L.marker(new L.LatLng(...record.geo))
            .bindPopup(`<h2>${NAME}</h2>
            <img src="../../src/images/googlemaps.png" onclick="window.open('https://www.google.com/maps?daddr=${record.geo[0]},${record.geo[1]}', '_blank')">
            `).bindTooltip(`${NAME}`).openTooltip().addTo(map)
            // )
            AddDonut(record.geo.at(0), record.geo.at(1), 300)
        }
    }
})

// map.addLayer(markers)
