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
let countvps = 0

let err = ''

// const readJson500 = (filename) => {
//   axios.get(`data/${filename}.json`)
//   .then(res => res.data)
//   .then((data) => {
//     if (data.pois) return data.pois
//     return data
//   })
//   .then((pois) => {
//     // console.log(pois)
//     for (const poi of pois) {
//       if (!poi.vpsActivated) continue
//       if (poi.vpsLocalizability != `PRODUCTION`) continue
//       // console.log(poi)
//       L.marker([poi.lat,poi.lng])
//       .bindPopup(`${poi.title}
//       <br />
//       ${HTMLQRPORTALID(poi.id)}
//       `)
//       .bindTooltip(`${filename}, ${poi.title}`)
//       .addTo(map)
//       countvps++
//     }
//   })
//   .then(() => {
//     readJson500(filename + 1)
//   })
//   .catch((e) => {
//     err = e
//     console.log(err)
//     alert(`Found ${countvps} Active VPS`)
//   })
// }


// readJson500(1)

axios.get(`data/bundle.json`)
  .then(res => res.data)
  .then((portals) => {
    for (let poi of portals) {
      L.marker([poi.lat, poi.lng])
        .bindPopup(
          `${poi.title}
            <br />
            ${HTMLQRPORTALID(poi.id)}
            `
        )
        .bindTooltip(`${poi.title}`)
        .addTo(map);
      countvps++;
    }
  })
  .then(()=> {
    alert(`Found ${countvps} Active VPS`)
  })