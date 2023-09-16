const map = new longdo.Map({
  placeholder: document.getElementById("map"),
  language: 'en',
});
const searchParams = new URL(document.location).searchParams

map.Event.bind("ready", function () {
  map.location(longdo.LocationMode.Geolocation);
  map.zoom(12, true);
  map.Layers.add(longdo.Layers.TRAFFIC);
  var o1 = new longdo.Overlays.Object(searchParams.get(`code`) || `10`, "IG",
    {
      fillColor: `transparent`,
      lineColor: `red`
      // https://api.longdo.com/map3/doc.html#GeometryOptions
    }
  );
  map.Overlays.load(o1);
});
