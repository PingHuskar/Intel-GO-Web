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
    center:[ 13.73911896,100.5085245 ],
    zoom: 15,
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

axios.get(`data.json`)
.then(res => res.data)
.then(places => {
    for (let place of places) {
        L.marker([place.lat,place.lng])
        .bindPopup(`<h2>${place.nname}</h2>
        <p>
            ${place.lat},${place.lng}
        </p>
        <p>
            ${place.oc_time}
        </p>
        <p>
        ${place.history}
        </p>
        <img src="../../src/images/googlemaps.png" onclick="window.open('https://www.google.com/maps?daddr=${place.lat},${place.lng}', '_blank')">
        `).bindTooltip(`${place.nname}`).openTooltip().addTo(map)
    }
})