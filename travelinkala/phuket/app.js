const searchParam = new URLSearchParams(location.search);
const TO = searchParam.get(`to`)
const TOdata = locations.find(lo => lo.name == TO)
let longdomap = new longdo.Map({
  placeholder: document.getElementById("map"),
});
longdomap.Route.placeholder(document.getElementById("result"));

longdomap.Route.add(
  new longdo.Marker(
    { lon: AIRPORT.at(1), lat: AIRPORT.at(0) },
    {
      title: `Phuket International Airport – HKT`,
    }
  )
);
longdomap.location( { lon: AIRPORT.at(1), lat: AIRPORT.at(0) }, true);
longdomap.Route.add({ lon: TOdata.geo.at(1), lat: TOdata.geo.at(0) });
console.log(longdomap.Route.search())
