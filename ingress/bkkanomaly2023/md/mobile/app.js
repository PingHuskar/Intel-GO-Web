const searchParam = new URLSearchParams(location.search);
const dfaultm = `11`
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
console.log(m)
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

axios
  .get(`data.json`)
  .then((res) => res.data)
  .then((missions) => {
    for (let mission of missions) {
      if (m != mission.index) continue
      document.title = `"${mission.missionName}" Mission Day Bangkok 2023`
      for (portal of mission.portals) {
        L.marker(portal.geo)
          .bindTooltip(`${portal.portalName}`)
          .openTooltip()
        .addTo(map)
      }
      map.flyTo(mission.center, 17)
      const url = new URL(window.location);
      url.searchParams.set('m', m);
      window.history.pushState(null, '', url.toString());
      break
    }
  }
);