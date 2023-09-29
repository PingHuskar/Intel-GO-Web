const searchParam = new URLSearchParams(location.search);
const LOGDOMAPAPIKEY = localStorage.getItem(`longdokey`);
const p = searchParam.get(`p`)
const plotShape = (geocode, color) => {
  axios
    .get(
      `https://api.longdo.com/map/services/object?mode=geojson&id=${geocode}&dataset=IG&key=${LOGDOMAPAPIKEY}`
    )
    .then((res) => {
      console.log(res);
      return res.data.features.at(0).geometry.coordinates;
    })
    .then((shapes) => {
      // console.log(shapes)
      for (let shape of shapes) {
        // console.log(shape)
        if (shape.length > 1) {
          let newArr = [];
          for (let mark of shape) {
            newArr.push([mark.at(1), mark.at(0)]);
          }
          // console.log(province.geometry.coordinates)
          L.polygon(newArr, {
            color: color,
            fillColor: color,
          }).addTo(map);
        } else if (shape.length === 1) {
          let newArr = [];
          for (let mark of shape.at(0)) {
            newArr.push([mark.at(1), mark.at(0)]);
          }
          // console.log(province.geometry.coordinates)
          L.polygon(newArr, {
            color: color,
            fillColor: color,
          }).addTo(map);
        }
      }
    });
};

const map = L.map("map").setView([13.744, 100.533142], 5);

const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);


function style(feature) {
  console.log(getColor(feature.popdensity));
  return {
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7,
    fillColor: getColor(feature.popdensity),
  };
}

function highlightFeature(e) {
  const layer = e.target;

  layer.setStyle({
    weight: 5,
    color: "#666",
    dashArray: "",
    fillOpacity: 0.7,
  });

  layer.bringToFront();

  info.update(layer.feature.properties);
}

// https://regex101.com/library/gDgi4I
if (!p || !/^0(2\d{7}|3[2-9]\d{6}|4[2-5]\d{6}|5[3-6]\d{6}|7[3-7]\d{6})$/.test(p)) {
  alert(`Invalid Format`)
} else if (!LOGDOMAPAPIKEY) {
  alert(`LOGDOMAPAPIKEY Not Set`)
} else {
  axios.get(`data.json`)
  .then(res => res.data)
  .then(data => {
    const telno = p.slice(0, 3)
    console.log(telno)
    const telno2 = telno.slice(0, 2)
    console.log(telno2)
    const zones = data.find(i => i.pre == telno2).zones
    console.log(zones)
    const zone = telno2 == `02` ? zones.find(zone => zone.pres == telno.slice(0, 2)).pro_code : zones.find(zone => zone.pres == telno.slice(0, 3)).pro_code
    console.log(zone)
    zone.forEach(plotShape)
  })
  .catch(e => {
    alert(e)
  })
}
// const geojson = L.geoJson(data, {
//   style,
//   onEachFeature,
// }).addTo(map);

function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update();
}

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature,
  });
}
