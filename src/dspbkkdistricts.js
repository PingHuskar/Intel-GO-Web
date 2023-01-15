// Source
// https://en.wikipedia.org/wiki/List_of_districts_of_Bangkok
// Data
// https://docs.google.com/spreadsheets/d/1GBfT2yif3d7wGWK1ZP7HHovSybWSKsUwIoMNBG3UK38/edit?usp=sharing
var textMarkersBigs = [{
    html: 'Bang Bon',
    latlng: {
        lat: 13.6592,
        lng: 100.3991
    }
},
{
    html: 'Bang Kapi',
    latlng: {
        lat: 13.765833,
        lng: 100.647778
    }
},
{
    html: 'Bang Khae',
    latlng: {
        lat: 13.696111,
        lng: 100.409444
    }
},
{
    html: 'Bang Khen',
    latlng: {
        lat: 13.873889,
        lng: 100.596389
    }
},
{
    html: 'Bang Kho Laem',
    latlng: {
        lat: 13.693333,
        lng: 100.5025
    }
},
{
    html: 'Bang Khun Thian',
    latlng: {
        lat: 13.660833,
        lng: 100.435833
    }
},
{
    html: 'Bang Na',
    latlng: {
        lat: 13.680081,
        lng: 100.5918
    }
},
{
    html: 'Bang Phlat',
    latlng: {
        lat: 13.793889,
        lng: 100.505
    }
},
{
    html: 'Bang Rak',
    latlng: {
        lat: 13.730833,
        lng: 100.524167
    }
},
{
    html: 'Bang Sue',
    latlng: {
        lat: 13.809722,
        lng: 100.537222
    }
},
{
    html: 'Bangkok Noi',
    latlng: {
        lat: 13.770867,
        lng: 100.467933
    }
},
{
    html: 'Bangkok Yai',
    latlng: {
        lat: 13.722778,
        lng: 100.476389
    }
},
{
    html: 'Bueng Kum',
    latlng: {
        lat: 13.785278,
        lng: 100.669167
    }
},
{
    html: 'Chatuchak',
    latlng: {
        lat: 13.828611,
        lng: 100.559722
    }
},
{
    html: 'Chom Thong',
    latlng: {
        lat: 13.677222,
        lng: 100.484722
    }
},
{
    html: 'Din Daeng',
    latlng: {
        lat: 13.769722,
        lng: 100.552778
    }
},
{
    html: 'Don Mueang',
    latlng: {
        lat: 13.913611,
        lng: 100.589722
    }
},
{
    html: 'Dusit',
    latlng: {
        lat: 13.776944,
        lng: 100.520556
    }
},
{
    html: 'Huai Khwang',
    latlng: {
        lat: 13.776667,
        lng: 100.579444
    }
},
{
    html: 'Khan Na Yao',
    latlng: {
        lat: 13.8271,
        lng: 100.6743
    }
},
{
    html: 'Khlong Sam Wa',
    latlng: {
        lat: 13.859722,
        lng: 100.704167
    }
},
{
    html: 'Khlong San',
    latlng: {
        lat: 13.730278,
        lng: 100.509722
    }
},
{
    html: 'Khlong Toei',
    latlng: {
        lat: 13.708056,
        lng: 100.583889
    }
},
{
    html: 'Lak Si',
    latlng: {
        lat: 13.8875,
        lng: 100.578889
    }
},
{
    html: 'Lat Krabang',
    latlng: {
        lat: 13.722317,
        lng: 100.759669
    }
},
{
    html: 'Lat Phrao',
    latlng: {
        lat: 13.803611,
        lng: 100.6075
    }
},
{
    html: 'Min Buri',
    latlng: {
        lat: 13.813889,
        lng: 100.748056
    }
},
{
    html: 'Nong Chok',
    latlng: {
        lat: 13.855556,
        lng: 100.8625
    }
},
{
    html: 'Nong Khaem',
    latlng: {
        lat: 13.704722,
        lng: 100.348889
    }
},
{
    html: 'Pathum Wan',
    latlng: {
        lat: 13.744942,
        lng: 100.5222
    }
},
{
    html: 'Phasi Charoen',
    latlng: {
        lat: 13.714722,
        lng: 100.437222
    }
},
{
    html: 'Phaya Thai',
    latlng: {
        lat: 13.78,
        lng: 100.542778
    }
},
{
    html: 'Phra Khanong',
    latlng: {
        lat: 13.702222,
        lng: 100.601667
    }
},
{
    html: 'Phra Nakhon',
    latlng: {
        lat: 13.764444,
        lng: 100.499167
    }
},
{
    html: 'Pom Prap Sattru Phai',
    latlng: {
        lat: 13.758056,
        lng: 100.513056
    }
},
{
    html: 'Prawet',
    latlng: {
        lat: 13.716944,
        lng: 100.694444
    }
},
{
    html: 'Rat Burana',
    latlng: {
        lat: 13.682222,
        lng: 100.505556
    }
},
{
    html: 'Ratchathewi',
    latlng: {
        lat: 13.758889,
        lng: 100.534444
    }
},
{
    html: 'Sai Mai',
    latlng: {
        lat: 13.919167,
        lng: 100.645833
    }
},
{
    html: 'Samphanthawong',
    latlng: {
        lat: 13.731389,
        lng: 100.514167
    }
},
{
    html: 'Saphan Sung',
    latlng: {
        lat: 13.77,
        lng: 100.684722
    }
},
{
    html: 'Sathon',
    latlng: {
        lat: 13.708056,
        lng: 100.526389
    }
},
{
    html: 'Suan Luang',
    latlng: {
        lat: 13.730278,
        lng: 100.651389
    }
},
{
    html: 'Taling Chan',
    latlng: {
        lat: 13.776944,
        lng: 100.456667
    }
},
{
    html: 'Thawi Watthana',
    latlng: {
        lat: 13.7878,
        lng: 100.3638
    }
},
{
    html: 'Thon Buri',
    latlng: {
        lat: 13.725,
        lng: 100.485833
    }
},
{
    html: 'Thung Khru',
    latlng: {
        lat: 13.6472,
        lng: 100.4958
    }
},
{
    html: 'Wang Thonglang',
    latlng: {
        lat: 13.7864,
        lng: 100.6087
    }
},
{
    html: 'Watthana',
    latlng: {
        lat: 13.742222,
        lng: 100.585833
    }
},
{
    html: 'Yan Nawa',
    latlng: {
        lat: 13.696944,
        lng: 100.543056
    }
},
]

for (let textMarkersBig of textMarkersBigs) {
    L.marker(textMarkersBig.latlng, {
        icon: L.divIcon({
            className: 'parallax-marker label big',
            html: textMarkersBig.html,
            iconSize: [200, 36],
            iconAnchor: [100, 18]
        })
    }).addTo(map)
}