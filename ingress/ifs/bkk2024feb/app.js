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


axios.get(`path.json`)
  .then(res => res.data)
  .then((missions) => {
    $.each(missions, function(key, data) {
        let steps = missions[key].steps
        for (let step of steps) {
          L.marker([step.poi.latitude, step.poi.longitude])
          .bindPopup(
            `${step.poi.title}
              <br />
              ${HTMLQRPORTALID(step.id)}
              `
          )
          .bindTooltip(`${step.poi.title}`)
          .addTo(map);
          path.push([step.poi.latitude, step.poi.longitude])
          countportal++
        }
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

map.flyTo([13.73088,100.567324],18)

const RESTOCKPORTAL = {
  id: `3d24622784644b65a73b4117b10bb296.16`,
  name: `Angel Statue`,
  geo: [13.737204,100.560784],
}

L.marker(RESTOCKPORTAL.geo)
          .bindPopup(
            `${RESTOCKPORTAL.name}
              <br />
              ${HTMLQRPORTALID(RESTOCKPORTAL.id)}
              `
          )
.bindTooltip(`RESTOCK PORTAL: ${RESTOCKPORTAL.name}`)
.addTo(map);