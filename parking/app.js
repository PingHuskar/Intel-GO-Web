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
    zoom: 14,
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

const genParkingDetail = (detail) => {
    let retHtml = `<ul>`
    for (let item of detail) {
        retHtml += `<li>${item}</li>`
    }
    retHtml += `</ul>`
    return retHtml
}

let markers = L.markerClusterGroup()
fetch(`data.json`)
.then(res => res.json())
.then(parkings => {
    for (let parking of parkings) {
        if (!parking.geo.at(0)) continue
        if (!parking.geo.at(1)) continue
        if (!parking.name) continue
        markers.addLayer(L.marker(new L.LatLng(...parking.geo))
            .bindPopup(`<h2>${parking.name}</h2>
            ${genParkingDetail(parking.detail)}
            `).bindTooltip(`${parking.name}`).openTooltip()
            )
    }
})


map.addLayer(markers)
