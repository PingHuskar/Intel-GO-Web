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

var map, lyrOSM, mrkCurrentLocation, ctlZoom, ctlScale, ctlZoomslider, ctlMeasure

lyrOSM = L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
map = L.map(`mapdiv`,{
    center:[ 13.769028, 100.540186],
    zoom: 13,
    zoomControl:false,
    attributionControl:false,
    layers: [lyrOSM]
})
ctlZoomslider = L.control.zoomslider({position:"topright"}).addTo(map)
ctlMeasure = L.control.polylineMeasure().addTo(map);
ctlScale = L.control.scale({
    position:'bottomleft',
    metric:false,
    maxWidth:200
}).addTo(map)
const BRANDS = {
    "Gold Curry Bangkok": {
        "FB": "https://www.facebook.com/GoldCurryBangkok/",
        "branches" : [
            {name: "Rama9", tel: "098 898 6222",geo: [13.742658, 100.632240]},
            {name: "CentralPlaza Westgate", tel: "098 898 6222",geo: [13.877627, 100.410561]},
            {name: "town in town", tel: "094 695 5259",geo: [13.76904, 100.60597]},
            {name: "sukumvit39", tel: "02 662 5003",geo: [13.73226, 100.57111]},
            {name: "Rangsit", tel: "02 086 2516",geo: [13.96327, 100.58849]},
            {name: "Siam Squea 4F", tel: "",geo: [13.74516, 100.53356]},
            {name: "MRT Phetchaburi", tel: "097 067 0147",geo: [13.74943, 100.56386]},
            {name: "Asoke", tel: "02 082 5455",geo: [13.74072, 100.56179]},
            {name: "Rest Area", tel: "02 101 8854",geo: [13.84185, 100.53321]},
            {name: "Seacon Square", tel: "02 170 7498",geo: [13.69478, 100.64883]},
            {name: "Silom Thaniya", tel: "02 238 1134",geo: [13.72936, 100.53432]},
            {name: "Chong Nonsi", tel: "06-5001-0606",geo: [13.72352, 100.52980]},
            {name: "Bang Pakong", tel: "033 020 302",geo: [13.53970, 101.00780]},
            {name: "Chidlom", tel: "02 118 2429",geo: [13.74317, 100.54423]},
            // {name: "", tel: "",geo: []},
        ]
    }
}
var markers = L.markerClusterGroup()

const DISPLAYBRANDS = [
    'Gold Curry Bangkok'
]

const ADDMARKER = (brand) => {
    for (let branch of BRANDS[brand]['branches']) {
        markers.addLayer(L.marker(new L.LatLng(...branch.geo))
        .bindPopup(`<h2>Gold Curry ${branch.name}</h2>
        TEL: ${branch.tel}
        `).bindTooltip(`Gold Curry ${branch.name}`).openTooltip()
        )
    }
}

DISPLAYBRANDS.map(ADDMARKER)


map.addLayer(markers)
