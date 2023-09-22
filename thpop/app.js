const LOGDOMAPAPIKEY = localStorage.getItem(`longdokey`);
const plotShape = (geocode) => {
  const den = data.find((i) => i.ISO7.endsWith(geocode)).popdensity;
  const color = getColor(den);
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
          L.polygon(newArr, {
            color: color,
            fillColor: color,
          }).addTo(map);
        } else if (shape.length === 1) {
          let newArr = [];
          for (let mark of shape.at(0)) {
            newArr.push([mark.at(1), mark.at(0)]);
          }
          L.polygon(newArr, {
            color: color,
            fillColor: color,
          }).addTo(map);
        }
      }
    });
};
const provCode = [81,10,71,46,62,40,22,24,20,18,36,86,92,23,63,26,73,48,30,80,60,12,96,55,38,31,13,77,25,94,14,56,82,93,66,65,83,44,49,35,95,45,85,21,70,16,52,51,33,47,90,91,11,75,74,27,19,17,64,72,84,32,43,39,15,37,41,53,61,34,50,57,76,67,42,54,58]
provCode.map(plotShape)

const map = L.map("map").setView([13.744, 100.533142], 5);

const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// control that shows state info on hover
const info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create("div", "info");
  this.update();
  return this._div;
};

info.update = function (props) {
  const contents = props
    ? `<b>${props.name}</b><br />${props.density} people / mi<sup>2</sup>`
    : "Hover over a state";
//   this._div.innerHTML = `<h4>US Population Density</h4>${contents}`;
};

info.addTo(map);

// get color depending on population density value
function getColor(d) {
  const [max, min] = [3623, 23];
  const x = d3.scaleLinear([min, max], ["#FFEDA0", "#800026"]);
  return x(d);
}

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

/* global statesData */
const geojson = L.geoJson(data, {
  style,
  onEachFeature,
}).addTo(map);

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

// map.attributionControl.addAttribution(
//   'Population data &copy; <a href="http://census.gov/">US Census Bureau</a>'
// );

const legend = L.control({ position: "bottomright" });

legend.onAdd = function (map) {
  const div = L.DomUtil.create("div", "info legend");
  const grades = [0, 10, 20, 50, 100, 200, 500, 1000];
  const labels = [];
  let from, to;

  for (let i = 0; i < grades.length; i++) {
    from = grades[i];
    to = grades[i + 1];

    labels.push(
      `<i style="background:${getColor(from + 1)}"></i> ${from}${
        to ? `&ndash;${to}` : "+"
      }`
    );
  }

  div.innerHTML = labels.join("<br>");
  return div;
};

legend.addTo(map);
