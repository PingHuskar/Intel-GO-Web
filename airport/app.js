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

lyrOSM = L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
map = L.map(`mapdiv`,{
    center:[ 13.769028, 100.540186],
    zoom: 6,
    zoomControl:false,
    // dragging:false,
    // minZoom:10,
    // maxZoom:14
    attributionControl:false,
    layers: [lyrOSM]
})
// map.addLayer(lyrOSM)
// https://github.com/kartena/Leaflet.Pancontrol
// ctlPan = L.control.pan().addTo(map)
// https://github.com/kartena/Leaflet.zoomslider
ctlZoomslider = L.control.zoomslider({position:"topright"}).addTo(map)
ctlMeasure = L.control.polylineMeasure().addTo(map);
ctlAttribute = L.control.attribution({position:'bottomleft'}).addTo(map)
ctlAttribute.addAttribution(`Cyclosm`) //Open Street Map
ctlAttribute.addAttribution(`<a href="https://github.com/pinghuskar">Chadin Chaipornpisuth</a>`)
ctlScale = L.control.scale({
    position:'bottomleft',
    metric:false,
    maxWidth:200
    // https://leafletjs.com/reference.html#control-scale
}).addTo(map)


let markers = L.markerClusterGroup()
fetch(`data.json`)
.then(res => res.json())
.then(airports => {
    for (let airport of airports) {
        markers.addLayer(L.marker([airport.lat,airport.lng])
            .bindPopup(`<h2>${airport.name}</h2>
            Region: <h3>${airport.region}</h3>
            Type: <h3>${airport.type}</h3>
            `).bindTooltip(`${airport.name}`).openTooltip()
            )
    }
})


map.addLayer(markers)
