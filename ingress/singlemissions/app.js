"use strict";

const searchParam = new URLSearchParams(location.search);
const agentname = `.*${searchParam.get(`agent`) ?? `secretarea`}.*`;
const filter = `${searchParam.get(`filter`) ?? `undone`}`
const banner = `${searchParam.get(`banner`) ?? ``}`;
const showPan = false
const LatLngToArrayString = (ll) => {
  return `[${ll.lat.toFixed(5)}, ${ll.lng.toFixed(5)}]`;
};
const iconProps = {
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
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

let delay = 300
let c = []
let MaxC

axios.get(`data.json`)
.then(res => res.data)
.then((missions) => {
  for (const m of missions) {
    // console.log(m)
    c.push(m.CompletedOrder)
  }
  MaxC = Math.max(...c)
  for (const mission of missions) {
    let missionfilter = filter == `done` ? mission.CompletedOrder > 0 : mission.CompletedOrder == -1
    if (missionfilter) {
      if (!mission.Name) continue
      if (mission.Status == "Terminate") continue
      L.marker(mission.Geo)
      .bindPopup(`<h3>#${mission.CompletedOrder} | ${mission.Name}</h3>
      <p>
        ${mission.Desc}
      </p>
      <a href="https://intel.ingress.com/mission/${mission.Intel}.1c" target="_blank">
        Intel
      </a>
      <p>
        Completed: ${mission.CompletedOrder != -1 ? `Completed #${mission.CompletedOrder}` : `Not Completed`}
      </p>
      `)
      .bindTooltip(`#${mission.CompletedOrder} | ${mission.Name} - ${mission.Author}`)
      .openTooltip()
      .addTo(map)
      if (mission.CompletedOrder == MaxC) {
        map.flyTo(mission.Geo,17)
      }
    }
  }
})