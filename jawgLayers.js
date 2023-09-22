const jawgTOKEN = searchParam.get(`jawg`) || localStorage.getItem(`jawg`);
const thunderforest = searchParam.get(`thunderforest`) || localStorage.getItem(`thunderforest`);

if (!plot && jawgTOKEN && !mapGotLayer) {
  switch (LAYER) {
    case `dark`:
      var Jawg_Dark = L.tileLayer(
        "https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token={accessToken}",
        {
          attribution:
            '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          minZoom: 0,
          maxZoom: 22,
          subdomains: "abcd",
          accessToken: jawgTOKEN,
        }
      );
      addLayerToMap(Jawg_Dark)
      break;
    case `opnvkarte`:
      var OPNVKarte = L.tileLayer(
        "https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png",
        {
          maxZoom: 18,
          attribution:
            'Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          accessToken: jawgTOKEN,
        }
      );
      addLayerToMap(OPNVKarte);
      break;
    case `streets`:
      var Jawg_Streets = L.tileLayer(
        "https://{s}.tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token={accessToken}",
        {
          attribution:
            '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          minZoom: 0,
          maxZoom: 22,
          subdomains: "abcd",
          accessToken: jawgTOKEN,
        }
      );
      addLayerToMap(Jawg_Streets)
      break;
    case `sunny`:
      var Jawg_Sunny = L.tileLayer(
        "https://{s}.tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token={accessToken}",
        {
          attribution:
            '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          minZoom: 0,
          maxZoom: 22,
          subdomains: "abcd",
          accessToken: jawgTOKEN,
        }
      );
      addLayerToMap(Jawg_Sunny)
      break;
    case `matrix`:
      var Jawg_Matrix = L.tileLayer(
        "https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}",
        {
          attribution:
            '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          minZoom: 0,
          maxZoom: 22,
          subdomains: "abcd",
          accessToken: jawgTOKEN,
        }
      );
      addLayerToMap(Jawg_Matrix)
      break;
    
  }
}
// https://manage.thunderforest.com/dashboard
if (!plot && thunderforest && !mapGotLayer) {
    switch (LAYER) {
        case `spinal`:
            let Thunderforest_SpinalMap = L.tileLayer('https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey={apikey}', {
                attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                apikey: thunderforest,
                maxZoom: 22
            });
            addLayerToMap(Thunderforest_SpinalMap)
            break;
        case `landscape`:
            let Thunderforest_Landscape = L.tileLayer('https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey={apikey}', {
                attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                apikey: thunderforest,
                maxZoom: 22
            });
            addLayerToMap(Thunderforest_Landscape)
            break;
        case `transport`:
            let Thunderforest_Transport = L.tileLayer('https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey={apikey}', {
                attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                apikey: thunderforest,
                maxZoom: 22
            });
            addLayerToMap(Thunderforest_Transport)
            break;
    }
}