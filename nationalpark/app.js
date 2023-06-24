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
.then(nationalParks => {
    for (let park of nationalParks) {
        if (/^\d{1,2}\s.+\s2\d{3}$/.test(park.announced)) {
            markers.addLayer(L.marker(new L.LatLng(...park.geo))
            .bindPopup(`อุทยานแห่งชาติ<h2>${park.name}</h2>
            จังหวัด<h3>${park.province}</h3>
            <a href="https://th.wikipedia.org/wiki/อุทยานแห่งชาติ${park.name}" target="_blank"><img src="../src/images/wikipedia.png"></a>
            <img src="../src/images/googlemaps.png" onclick="window.open('https://www.google.com/maps?daddr=${park.geo[0]},${park.geo[1]}', '_blank')">
            `).bindTooltip(`อุทยานแห่งชาติ${park.name}`).openTooltip()
            )
        } 
    }
    markers.addLayer(L.marker(new L.LatLng(15.298283, 98.4484919), { title: `เขตรักษาพันธุ์สัตว์ป่าทุ่งใหญ่นเรศวร` })
            .bindPopup(`เขตรักษาพันธุ์สัตว์ป่าทุ่งใหญ่นเรศวร<h3>Black Panther Killed Here by เปรมชัย</h3>
            จังหวัด<h4>กาญจนบุรี</h4>
            <img src="../src/images/googlemaps.png" onclick="window.open('https://www.google.com/maps?daddr=15.298283,98.4484919', '_blank')">
            <img src="https://ichef.bbci.co.uk/news/800/cpsprodpb/15041/production/_99918068_044554722.jpg" onclick="window.open('https://www.bbc.com/thai/thailand-47620949', '_blank')" style="width:${150}px;">
            `))
})


map.addLayer(markers)
