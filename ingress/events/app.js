"use strict";
moment.suppressDeprecationWarnings = true;
const searchParam = new URLSearchParams(location.search)
const lang = searchParam.get(`lang`) ?? `en`
const LatLngToArrayString = (ll) => {
    return `[${ll.lat.toFixed(5)}, ${ll.lng.toFixed(5)}]`
}

var map, mrkCurrentLocation, popExample, ctlZoom, ctlAttribute, ctlScale, ctlPan, ctlZoomslider, ctlMeasure
map = L.map(`mapdiv`, {
    center: [13.744256, 100.5334],
    zoom: 6,
    zoomControl: false,
    // dragging:false,
    // minZoom:10,
    // maxZoom:14
    attributionControl: false
})
map.addLayer(L.tileLayer(`http://{s}.tile.osm.org/{z}/{x}/{y}.png`))
// map.addLayer(L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
//     maxZoom: 20,
//     subdomains:['mt0','mt1','mt2','mt3']
// }))
// https://github.com/kartena/Leaflet.Pancontrol
// ctlPan = L.control.pan().addTo(map)
// https://github.com/kartena/Leaflet.zoomslider
ctlZoomslider = L.control.zoomslider({
    position: "topright"
}).addTo(map)
ctlMeasure = L.control.polylineMeasure().addTo(map);
ctlAttribute = L.control.attribution({
    position: 'bottomleft'
}).addTo(map)
ctlAttribute.addAttribution(`OSM`) //Open Street Map
ctlAttribute.addAttribution(`<a href="https://github.com/pinghuskar">Chadin Chaipornpisuth</a>`)
ctlScale = L.control.scale({
    position: 'bottomleft',
    metric: false,
    maxWidth: 200
    // https://leafletjs.com/reference.html#control-scale
}).addTo(map)

if (!localStorage.getItem(`data`)) {

    axios.get(`https://nianticweb-rel-wucm.appspot.com/_/pins?p=ing`)
	.then(res => res.data)
    .then(data => data.data)
    .then(items => {
        // console.log(items)
        localStorage.setItem(`data`,JSON.stringify(items))
    })
    .catch(err => alert(err))
}
    
const items = JSON.parse(localStorage.getItem(`data`))
console.log(items)
for (let item of items) {
    L.marker(new L.LatLng(item.coords.lat,item.coords.lng))
    .bindPopup(`<h2>${item.location}</h2>
    <a href="${item.discussions.at(0).url}" target="_blank">link</a>
    `).bindTooltip(`${item.location}`)
    .openTooltip()
    .addTo(map)
}