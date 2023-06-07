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
document.title = `${searchParam.get(`agent`) ?? `secretarea`}'s missions`
// var markers = L.markerClusterGroup()
// alert(agentname)
// alert(RegExp(agentname,`i`))
for (let agent of data) {
  for (let mission of agent.mission) {
    // console.log(mission.player)
    console.log(banner)
    console.log(mission.banner_name)
    if (banner && mission.banner_name !== `unsorted` && banner === mission.banner_name) {
        // if (!new RegExp(agentname,`i`).exec(mission.player)) {
        //   continue
        // }
        let lat = mission.location.coordinates.at(1);
        let lng = mission.location.coordinates.at(0);
        setTimeout(() => {
          const milliseconds = mission.updated['$date']
          const dateObject = new Date(milliseconds).toLocaleString()
            if (mission.img) {
                L.marker([lat, lng], {
                    icon: new LeafIcon({
                        iconUrl: `${mission.img}`,
                      }),
                  })
                  .bindPopup(
                      `<h6>${mission.name}</h6>
                      <a href="https://intel.ingress.com/mission/${
                          mission.mguid
                      }" target="_blank" >
                      <img src="${mission.img}" />
                      </a>
                      <p>${mission.description ?? ``}</p>
                      <p>completed: ${mission.completed ?? 0}</p>
                      <p>completion: ${mission.completion / 10**5 ?? 0}%</p>
                      <p>created by: ${mission.player}</p>
                      <p>updated: ${dateObject}</p>
                      `
                      )
            .bindTooltip(`${mission.name}`)
            .openTooltip()
            .addTo(map);
            map.panTo([lat, lng]);
          } else {
              L.marker([lat, lng])
              .bindPopup(
                  `<h6>${mission.name}</h6>
                  <a href="https://intel.ingress.com/mission/${
                          mission.mguid
                      }" target="_blank" >
                      <img src="${mission.img}" />
                      </a>
                  <p>${mission.description ?? ``}</p>
                  <p>completed: ${mission.completed ?? 0}</p>
                  <p>completion: ${mission.completion / 10**5 ?? 0}%</p>
                      <p>created by: ${mission.player}</p>
                      <p>updated: ${dateObject}</p>
                  `
                  )
                  .bindTooltip(`${mission.name}`)
                  .openTooltip()
                  .addTo(map);
              }
              if (showPan) {
                  map.panTo([lat, lng]);
              }
          }
        ,delay)
    }
    else if (new RegExp(agentname,`i`).exec(mission.player)) {
      try {
        console.log(mission)
        console.log(mission.banner_name)
        let lat = mission.location.coordinates.at(1);
        let lng = mission.location.coordinates.at(0);
        setTimeout(() => {
          const milliseconds = mission.updated['$date']
          const dateObject = new Date(milliseconds).toLocaleString()
            if (mission.img && false) {
                L.marker([lat, lng], {
                    icon: new LeafIcon({
                        iconUrl: `${mission.img}`,
                      }),
                  })
                  .bindPopup(
                      `<h6>${mission.name}</h6>
                      <a href="https://intel.ingress.com/mission/${
                          mission.mguid
                      }" target="_blank" >
                      <img src="${mission.img}" />
                      </a>
                      <p>${mission.description ?? ``}</p>
                      <p>completed: ${mission.completed ?? 0}</p>
                      <p>completion: ${mission.completion / 10**5 ?? 0}%</p>
                      <p>created by: ${mission.player}</p>
                      <p>updated: ${dateObject}</p>
                      `
                      )
            .bindTooltip(`${mission.name}`)
            .openTooltip()
            .addTo(map);
          } else {
              L.marker([lat, lng])
              .bindPopup(
                  `<h6>${mission.name}</h6>
                  <a href="https://intel.ingress.com/mission/${
                          mission.mguid
                      }" target="_blank" >
                      <img src="${mission.img}" />
                      </a>
                  <p>${mission.description ?? ``}</p>
                  <p>completed: ${mission.completed ?? 0}</p>
                  <p>completion: ${mission.completion / 10**5 ?? 0}%</p>
                      <p>created by: ${mission.player}</p>
                      <p>updated: ${dateObject}</p>
                  `
                  )
                  .bindTooltip(`${mission.name}`)
                  .openTooltip()
                  .addTo(map);
              }
              if (showPan) {
                  map.panTo([lat, lng]);
              }
          }
        ,delay)
      } catch (e) {
        console.info(mission)
      }
      
      delay += 100
      // break
    }
  }
//   break;
}

// map.addLayer(markers)
