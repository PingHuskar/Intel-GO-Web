const LOGDOMAPAPIKEY = localStorage.getItem(`longdokey`);
const plotShape = (geocode) => {
  // const den = data.find((i) => i.ISO7.endsWith(geocode)).popdensity;
  // const color = getColor(den);
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


const map = L.map("map").setView([
  // 41.442726,258.046875
  35,-100
], 4);

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
  const [min, max] = [-76381,76381];
  const x = d3.scaleLinear([min, max], ["red", "green"]);
  return x(d);
}

function style(feature) {
  return {
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7,
    fillColor: getColor(feature.properties.density),
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
axios.get(`./sales.json`)
.then(res => res.data)
.then(data => {
  // console.log(data)
  for (let item of data) {
    // console.log(item.State)
    let color = getColor(item.Profit)
    let feature = statesData.features.find(s => s.properties.name === item.State)
    // console.log(feature)
    if (feature.geometry.coordinates.length === 1) {
      let arr = []
      for (let mark of feature.geometry.coordinates.at(0)) {
        // console.log(mark)
        arr.push([mark.at(1),mark.at(0)])
        // arr.push([mark.at(0),mark.at(1)])
      }
      // console.log(arr)
      L.polygon(arr, {
        color: color,
        fillColor: color,
      }).addTo(map)
    } else {
      for (let shapes of feature.geometry.coordinates) {
        for (let shape of shapes) {
          let arr = []
          for (let mark of shape) {
            // console.log(mark)
            arr.push([mark.at(1),mark.at(0)])
            // arr.push([mark.at(0),mark.at(1)])
            // console.log(arr)
          }
          L.polygon(arr, {
            color: color,
            fillColor: color,
          }).addTo(map)
        }
      }
    }
    // break
  }
})

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
  const grades = [-25729.3563,0,25000,50000,76381.3871];
  const labels = [];
  let from, to;

  for (let grade of grades) {

    labels.push(
      `<i style="background:${getColor(grade)}"></i> ${Math.round(grade)}`
    );
  }

  div.innerHTML = labels.join("<br>");
  return div;
};

legend.addTo(map);
