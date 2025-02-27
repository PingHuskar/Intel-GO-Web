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

const AddDonut = (lat, lng) => {
    L.donut([lat, lng], {
        radius: 500,
        innerRadius: 0,
        innerRadiusAsPercent: false,
    }).addTo(map)
}

var markers = L.markerClusterGroup()
const printNearbyStation = (CurrentStation) => {
    console.clear()
    console.log(`เลือก: ${CurrentStation}`)
    const CurrentStationDetail = POLICESTATIONS.filter(s => s.name === CurrentStation).at(0)
    // console.log(CurrentStationDetail)
    // console.log(CurrentStationDetail.geo)
    const CalculateDistFromCurrentStation = [
        
    ]
    for (let station of POLICESTATIONS.filter(s => s.name !== CurrentStation)) {
        // console.log(CurrentStationDetail.geo.at(0))
        CalculateDistFromCurrentStation.push({
            n: station.name, 
            d: parseFloat(dist(CurrentStationDetail.geo.at(0),CurrentStationDetail.geo.at(1),station.geo.at(0),station.geo.at(1),`km`).replace('km',''))})
    }
    const sortedNearest = CalculateDistFromCurrentStation.sort((a,b) => a.d - b.d)
    for (let station of sortedNearest) {
        console.log(`${CurrentStation} ห่างจาก ${station.n}: ${station.d} km`)
    }

}
let NAME = ``
fetch(`./data.json`)
.then(res => res.json())
.then(POLICESTATIONS => {
    for (let record of POLICESTATIONS) {
        if (record.geo.length > 0) {
            NAME = record.name
            markers.addLayer(
                L.marker(new L.LatLng(...record.geo))
                .bindPopup(`<h2>${NAME}</h2>
                <p>${record.addr}</p>
                <p>tel: ${record.tel}</p>
                <p>fax: ${record.fax}</p>
                <img src="../src/images/googlemaps.png" onclick="window.open('https://www.google.com/maps?daddr=${record.geo[0]},${record.geo[1]}', '_blank')">
                `).bindTooltip(`${record.name}`).openTooltip()
                .addEventListener("click", () => {
                    printNearbyStation(record.name)
                })
            )
            AddDonut(record.geo.at(0),record.geo.at(1))
        }
    }
})

map.addLayer(markers)
