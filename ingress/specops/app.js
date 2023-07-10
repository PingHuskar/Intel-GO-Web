"use strict";

const searchParam = new URLSearchParams(location.search);
const agentname = `.*${searchParam.get(`agent`) ?? `secretarea`}.*`;
const banner = `${searchParam.get(`banner`) ?? ``}`;
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
// var markers = L.markerClusterGroup()
// alert(agentname)
// alert(RegExp(agentname,`i`))

let pages = 5;

const COUNTRY = `Thailand`;
let showplot = false;

let cache = [];

const getDataAndPlot = (page, showplot) => {
  let url = `https://specops.quest/api/b/search?mode=banners&sort=createdAt&sortReverse=true&page=${page}&title=&requireFavorited=0&excludeCompleted=0&requireToDo=0&pageSize=50&geo=%5B%22${COUNTRY}%22%5D`;
  axios
    .get(url)
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
      cache = [...cache, ...data.results];
      if (showplot) {
        for (let banner of data.results) {
          // let createdBy = specopsAgents.find(a => a.id === banner.createdBy) || banner.createdBy
          // let createdByType = typeof createdBy
          // if (createdByType === `object`) {
          //   createdBy = createdBy.name
          //   console.log(createdBy)
          // }
          L.marker([banner.point.lat, banner.point.lng])
            .bindPopup(
              `<h6>${banner.title}</h6>
                      <a href="https://specops.quest/banner/${
                        banner.slug
                      }/missions" target="_blank" >
                          <img class="banner" style="height: ${
                            Math.ceil(banner.numMissions / 6) * 50
                          }px" src="https://specops.quest/static/images/${
                banner.images.medium
              }" />
                          </a>
                      
                      <p>numMissions: ${banner.numMissions || ``}</p>
                      <p>${banner.description || ``}</p>
                      <p>Distance last-first: ${banner.distanceEndsBegins.toFixed(
                        2
                      )} meters</p>
                      <p>created by: ${banner.createdBy}</p>
                      <p>created at: ${new Date(
                        banner.createdAt
                      ).toLocaleDateString()}</p>
                      `
            )
            .bindTooltip(`${banner.title}`)
            .openTooltip()
            .addTo(map);

          if (showPan) {
            map.panTo([banner.point.lat, banner.point.lng]);
          }
        }
      }
    });
};

if (localStorage.getItem(`bannercache`)) {
  cache = JSON.parse(localStorage.getItem(`bannercache`))
} else {
  for (let currentPage = 1; currentPage < pages + 1; currentPage++) {
    getDataAndPlot(currentPage, showplot);
  }
  localStorage.setItem(`bannercache`,cache)
}


let delaydone = 1000

setTimeout(() => {
  const sortDone = DONE.reverse()
  for (let d of sortDone) {
    setTimeout(() => {
      let banner = cache.find(c => c.title === d)
      L.marker([banner.point.lat, banner.point.lng])
            .bindPopup(
              `<h6>${banner.title}</h6>
                      <a href="https://specops.quest/banner/${
                        banner.slug
                      }/missions" target="_blank" >
                          <img class="banner" style="height: ${
                            Math.ceil(banner.numMissions / 6) * 50
                          }px" src="https://specops.quest/static/images/${
                banner.images.medium
              }" />
                          </a>
                      
                      <p>numMissions: ${banner.numMissions || ``}</p>
                      <p>${banner.description || ``}</p>
                      <p>Distance last-first: ${banner.distanceEndsBegins.toFixed(
                        2
                      )} meters</p>
                      <p>created at: ${new Date(
                        banner.createdAt
                      ).toLocaleDateString()}</p>
                      `
            )
            .bindTooltip(`${banner.title}`)
            .openTooltip()
            .addTo(map);
            L.popup()
            .setLatLng([banner.point.lat, banner.point.lng])
            .setContent(`<h6>${banner.title}</h6>
            <a href="https://specops.quest/banner/${
              banner.slug
            }/missions" target="_blank" >
                <img class="banner" style="height: ${
                  Math.ceil(banner.numMissions / 6) * 50
                }px" src="https://specops.quest/static/images/${
      banner.images.medium
    }" />
                </a>
            
            <p>numMissions: ${banner.numMissions || ``}</p>
            <p>${banner.description || ``}</p>
            <p>Distance last-first: ${banner.distanceEndsBegins.toFixed(
              2
            )} meters</p>
            <p>created at: ${new Date(
              banner.createdAt
            ).toLocaleDateString()}</p>
            `).openOn(map)
      map.panTo([banner.point.lat+0.07, banner.point.lng]);
    },delaydone)
    delaydone += 1000
  }
},3000)

// map.addLayer(markers)
