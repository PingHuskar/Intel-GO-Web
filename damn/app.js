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
// fetch(`https://app.rid.go.th/reservoir/api/damsGeojson`)
// .then(res => res.json())
// .then(data => {
//     console.log(data)
// })
async function loadGeo () {
    const data = await fetch(`https://app.rid.go.th/reservoir/api/damsGeojson`)
    const j = await data.json()
    console.log(j)
    const d = await L.geoJSON(j, {
        style: function (feature) {
            return {color: `red`};
        }
    }).bindPopup(function (layer) {
        const props = layer.feature.properties
        return `<h2>${props.name}</h2>
        <p>date: ${props.date}</p>
        <p>max_capacity: ${props.max_capacity}</p>
        <p>active_storage: ${props.active_storage}</p>
        <p>avalible_storage: ${props.avalible_storage}</p>
        <p>dead_storage: ${props.dead_storage}</p>
        <p>volume: ${props.volume}</p>
        <p>${props.percent} %</p>
        <p>inflow: ${props.inflow}</p>
        <p>outflow: ${props.outflow}</p>
        `;
    }).addTo(map);
}
loadGeo()


map.addLayer(markers)
