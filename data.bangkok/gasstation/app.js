"use strict";
const searchParam = new URLSearchParams(location.search);
const type = searchParam.get(`type`)

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
    zoom: 12,
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

var markers = L.markerClusterGroup()
for (let gasstation of gasstations) {
    // console.log(gasstation)
    if (!type || gasstation.type === type) {
        markers.addLayer(
            L.marker([gasstation.lat,gasstation.lng])
            .bindPopup(`<h2>${gasstation.name}</h2>
            <p>${gasstation.address}</p>
            <p>${gasstation.type}</p>
            <p>${gasstation.tel}</p>
            `)
            .bindTooltip(`${gasstation.name}`)
            .openTooltip()
            )
        }
    }

map.addLayer(markers)