"use strict";

const searchParam = new URLSearchParams(location.search);
const agentname = `.*${searchParam.get(`agent`) ?? `secretarea`}.*`;
const banner = `${searchParam.get(`banner`) ?? ``}`;
const showPan = false
const LatLngToArrayString = (ll) => {
  return `[${ll.lat.toFixed(5)}, ${ll.lng.toFixed(5)}]`;
};
const iconProps = {
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  // shadowUrl: 'my-icon-shadow.png',
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
};

var map,
  lyrOSM,
  mrkCurrentLocation,
  popExample,
  ctlZoom,
  ctlAttribute,
  ctlScale,
  ctlPan,
  ctlZoomslider,
  ctlMeasure;

var OpenStreetMap_Mapnik = L.tileLayer(
  "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
);
map = L.map(`mapdiv`, {
  center: [13.765981, 100.570261],
  zoom: 14,
  zoomControl: false,
  // dragging:false,
  // minZoom:10,
  // maxZoom:14
  attributionControl: false,
  layers: [OpenStreetMap_Mapnik],
});

ctlZoomslider = L.control.zoomslider({ position: "topright" }).addTo(map);
ctlMeasure = L.control.polylineMeasure().addTo(map);
ctlAttribute = L.control.attribution({ position: "bottomleft" }).addTo(map);
ctlAttribute.addAttribution(
  `<a href="https://github.com/pinghuskar">Chadin Chaipornpisuth</a>`
);
ctlScale = L.control
  .scale({
    position: "bottomleft",
    metric: false,
    maxWidth: 200,
  })
  .addTo(map);

const AddDonut = (lat, lng, meter) => {
  L.donut([lat, lng], {
    radius: meter,
    innerRadius: 0,
    innerRadiusAsPercent: false,
  }).addTo(map);
};
var LeafIcon = L.Icon.extend({
  options: {
    // shadowUrl: 'leaf-shadow.png',
    iconSize: [50, 50],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  },
});

let delay = 300
// var markers = L.markerClusterGroup()
// alert(agentname)
// alert(RegExp(agentname,`i`))
for (let portal of data) {
  if (portal.late6 !== 1) {
    setTimeout(() => {
      let lat = portal.late6/10**6
      let lng = portal.lnge6/10**6
      L.marker([lat, lng])
      .bindPopup(`<h3>${portal.names}</h3>
      <p>${portal.description}</p>
      <p>${portal.address}</p>
      <p>
        ${portal.osm.town} =>
        ${portal.osm.county} =>
        ${portal.osm.state} =>
        ${portal.osm.postcode} =>
        ${portal.osm.country}
      </p>
      `)
      .addTo(map)
      map.panTo([lat,lng])
    }
      ,delay)
      delay += 100
  }
}

// map.addLayer(markers)
