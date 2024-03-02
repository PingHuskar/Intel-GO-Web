"use strict";

const searchParam = new URLSearchParams(location.search);

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

var LeafIcon = L.Icon.extend({
  options: {
    // shadowUrl: 'leaf-shadow.png',
    iconSize: [50, 50],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  },
});

let path = []
let countportal = 0


axios.get(`decode.json`)
  .then(res => res.data)
  .then((portals) => {
    $.each(portals, function(key, data) {
          L.marker(data.geo)
          .bindPopup(`${key+1}`)
          .addTo(map);
          path.push(data.geo)
    });
  })
  .then(() => {
    L.polygon(path, {
      color: `blue`,
      fillColor: `none`,
      opacity: 1,
    }).addTo(map);
    console.log(countportal)
  })

map.flyTo([13.730825,100.557347],18)

const resdom = document.querySelector('#res')
const classdecode = document.querySelectorAll(`.decode`)

classdecode[0].placeholder = "Char"
classdecode[1].placeholder = "Char"
classdecode[2].placeholder = "Char"
classdecode[3].placeholder = "Num"
classdecode[4].placeholder = "Num"
classdecode[5].placeholder = "KEYWORD"
classdecode[6].placeholder = "Num"
classdecode[7].placeholder = "Num"
classdecode[8].placeholder = "Num"
classdecode[9].placeholder = "Char"
classdecode[10].placeholder = "Char"

const updateres = () => {
  let r = ''
  for (let i of classdecode) {
    r += i.value
  }
  resdom.innerText = r
}