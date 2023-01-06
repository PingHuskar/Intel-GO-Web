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
    zoom: 14,
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
const CIVILIZATIONS = [
    {name:'ลาเบล',en: 'La Belle', geo: [13.749255, 100.566057]},
    {name:'ยูโทเปีย',en: 'UTOPIA', geo: [13.760655, 100.57227]},
    {name:'',en: 'Alaina', geo: [13.772212, 100.573112]},
    {name:'คาร์เวียร์',en: 'Caviar', geo: [13.773775, 100.570735],img_ext: 'webp'},
    {name:'โพไซดอน',en: 'Poseidon', geo: [13.785376, 100.5736]},
    {name:'',en: '', geo: []},
    {name:'',en: '', geo: []},
    {name:'',en: '', geo: []},
    {name:'',en: '', geo: []},
]

var markers = L.markerClusterGroup()
for (let CIVILIZATION of CIVILIZATIONS) {
    if (CIVILIZATION.geo.length > 0) {
        const NAME = CIVILIZATION.name || CIVILIZATION.en
        markers.addLayer(L.marker(new L.LatLng(...CIVILIZATION.geo))
        .bindPopup(`อารยธรรม<h2>${NAME}</h2>
        <img src="../src/images/googlemaps.png" onclick="window.open('https://www.google.com/maps?daddr=${CIVILIZATION.geo[0]},${CIVILIZATION.geo[1]}', '_blank')">
        <img src="../src/images/${CIVILIZATION.en}.${CIVILIZATION.img_ext}" alt="${CIVILIZATION.en}">
        `).bindTooltip(`${CIVILIZATION.en}`).openTooltip()
        )
    }
}

map.addLayer(markers)
