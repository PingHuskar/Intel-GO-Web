const searchParam = new URLSearchParams(location.search);
const dfaultm = `11`

const map = L.map(`mapdiv`, {
  center: [13.749181, 100.5],
  zoom: 17,
  zoomControl: true,
  minZoom: 15,
  maxZoom: 18,
  attributionControl: false,
});
L.control.polylineMeasure().addTo(map);
let lyrOSM = L.tileLayer(`http://{s}.tile.osm.org/{z}/{x}/{y}.png`);
map.addLayer(lyrOSM);

let icon = new L.Icon.Default();
icon.options.shadowSize = [0,0];

const clearallmarker = () => map._panes.markerPane.remove();

const plotportals = () => {
  axios
  .get(`../mobile/data.json`)
  .then((res) => res.data)
  .then((missions) => {
    for (let mission of missions) {
      for (portal of mission.portals) {
        let marker = L.marker(portal.geo
          // ,{icon : icon}
          )
        .bindTooltip(`${portal.portalName}`)
        .openTooltip()
        .addTo(map)
        L.DomUtil.addClass(marker._icon, `m${18-mission.index}`);
      }
    }
  }
  );
}

plotportals()

const getM = () => {
  const searchParam = new URLSearchParams(location.search);
  let m = searchParam.get(`m`) || dfaultm
  try {
    if (parseInt(m) > 18 || parseInt(m) < 1) {
      m = dfaultm
    } else if (!(/^\d+$/.exec(m))) {
      m = dfaultm
    }
  } catch (e) {
    m = dfaultm
  }
  return parseInt(m)
}
const updateM = (m) => {
  if (m == 19) m = 1
  if (m == 0) m = 18
  // console.log(m)
  const url = new URL(window.location);
    url.searchParams.set('m', m);
    window.history.pushState(null, '', url.toString());
}
let line

const linemission = () => {
  try {
    line.remove()
  } catch (e) {
  }
  let m = getM()
  axios
  .get(`../mobile/data.json`)
  .then((res) => res.data)
  .then((missions) => {
    let mission = missions.at(parseInt(m)-1)
    let ps = []
    for (let portal of mission.portals) {
      ps.push(portal.geo)
    }
    line = L.polyline(ps, {color: mission.polylineColor || `red`}).addTo(map)
    map.flyTo(mission.center, 17)
  })
}
linemission()

const polylinenextmission = () => {
  let m = getM()
  updateM(m+1)
  linemission()
}

const polylineprevmission = () => {
  let m = getM()
  updateM(m-1)
  linemission()
}