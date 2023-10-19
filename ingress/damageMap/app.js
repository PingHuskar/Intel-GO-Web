"use strict";

const searchParam = new URLSearchParams(location.search);
const agent = searchParam.get(`agent`) || "^.+$"
const showPan = false;
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
  zoom: 12,
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

let delay = 300;

const imgpath = `https://lh3.googleusercontent.com/`
const deployID = `AKfycbwl4KQXYWLBiGZbW3Jg4Y4pK-ZDxiTP8BMzsRWlH0wZBKI8oPlRzAoI3viswNb16jvr`
const url = `https://script.google.com/macros/s/${deployID}/exec`

const agents = []

axios.get(url)
.then(res => res.data.user)
.then(data => {
  console.log(data)
  for (let damage of data) {
    if (!damage.time) break
    if (!damage.epoch) continue
    if (damage.agent.match(agent)) {
      if (!agents.includes(damage.agent)) {
        agents.push(damage.agent)
      }
      let [lat,lng] = damage.geo.split(`,`)
      L.marker([lat,lng])
      .bindPopup(`<h2>${damage.agent}</h2>
      <h3>${new Date(damage.epoch).toLocaleDateString()} ${new Date(damage.epoch).toLocaleTimeString()}</h3>
      <h3>
        ${damage.owner}
      </h3>
      <img src="${imgpath}${damage.img}">
      `)
      .bindTooltip(`${damage.agent}`)
      .openTooltip()
      .addTo(map)
    }
  }


// alert(agentname)
// alert(RegExp(agentname,`i`))
}
)
.then(() => {
  let agentmenu = document.querySelector(`#agents`)
  console.log(agents)
  for (let ag of agents) {
    let li = document.createElement('li')
    li.appendChild(document.createTextNode(ag))
    agentmenu.appendChild(li)
  }
})
