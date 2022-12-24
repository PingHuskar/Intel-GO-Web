"use strict";
const LatLngToArrayString = (ll) => {
    return `[${ll.lat.toFixed(5)}, ${ll.lng.toFixed(5)}]`
}
const iconProps = {
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    // shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
}
const BTSlightgreenline = L.icon({
        iconUrl: '../src/images/marker-icon-2x-lightgreen.png',...iconProps
})
const BTSdarkgreenline = L.icon({
        iconUrl: '../src/images/marker-icon-2x-green.png',...iconProps
})
const ARLicon = L.icon({
        iconUrl: '../src/images/marker-icon-2x-red.png',...iconProps
})
var mymap, lyrOSM, mrkCurrentLocation, popExample, ctlZoom, ctlAttribute, ctlScale, ctlPan, ctlZoomslider, ctlMeasure
$(document).ready(function(){
    mymap = L.map(`mapdiv`,{
        center:[ 13.769028, 100.540186],
        zoom:13,
        zoomControl:false,
        // dragging:false,
        // minZoom:10,
        // maxZoom:14
        attributionControl:false
    })
    lyrOSM = L.tileLayer(`http://{s}.tile.osm.org/{z}/{x}/{y}.png`)
    mymap.addLayer(lyrOSM)

    // https://github.com/kartena/Leaflet.Pancontrol
    // ctlPan = L.control.pan().addTo(mymap)

    // https://github.com/kartena/Leaflet.zoomslider
    ctlZoomslider = L.control.zoomslider({position:"topright"}).addTo(mymap)

    ctlMeasure = L.control.polylineMeasure().addTo(mymap);

    ctlAttribute = L.control.attribution({position:'bottomleft'}).addTo(mymap)
    ctlAttribute.addAttribution(`OSM`) //Open Street Map
    ctlAttribute.addAttribution(`<a href="https://github.com/pinghuskar">Chadin Chaipornpisuth</a>`)

    ctlScale = L.control.scale({
        position:'bottomleft',
        metric:false,
        maxWidth:200
        // https://leafletjs.com/reference.html#control-scale
    }).addTo(mymap)

    const stations = [
        {
            name: "คูคต",
            en: "Khu Khot",
            id: "N24",
			radius: 500,
            latlng: [13.932369, 100.64653],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 480,
                    h:  80
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "แยก คปอ.",
            en: "Yaek Kor Por Aor",
            id: "N23",
			radius: 500,
            latlng: [13.924996, 100.625855],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 480,
                    h:  80
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "พิพิธภัณฑ์กองทัพอากาศ",
            en: "Royal Thai Air Force Museum",
            id: "N22",
			radius: 500,
			latlng: [13.917874, 100.621655],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 480,
                    h:  80
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "โรงพยาบาลภูมิพลอดุลยเดช",
            en: "Bhumibol Adulyadej Hospital",
            id: "N21",
			radius: 500,
			latlng: [13.910707, 100.617385],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 480,
                    h:  80
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "สะพานใหม่",
            en: "Saphan Mai",
            id: "N20",
			radius: 500,
			latlng: [13.896523, 100.609016],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 480,
                    h:  80
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "สายหยุด",
            en: "Sai Yud",
            id: "N19",
			radius: 500,
			latlng: [13.888483, 100.604296],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 480,
                    h:  80
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "พหลโยธิน 59",
            en: "Phahon Yothin 59",
            id: "N18",
			radius: 500,
			latlng: [13.882526, 100.600841],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 480,
                    h:  80
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "วัดพระศรีมหาธาตุ",
            en: "Wat Phra Sri Mahathat",
            id: "N17",
			radius: 500,
			latlng: [13.875278, 100.596748],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 480,
                    h:  80
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "กรมทหารราบที่ 11",
            en: "11th Infantry Regiment",
            id: "N16",
			radius: 500,
			latlng: [13.867673, 100.592081],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 480,
                    h:  80
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "บางบัว",
            en: "Bang Bua",
            id: "N15",
			radius: 500,
			latlng: [13.856002, 100.585193],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 480,
                    h:  80
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "กรมป่าไม้",
            en: "Royal Forest Department",
            id: "N14",
			radius: 500,
			latlng: [13.850304, 100.581851],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 480,
                    h:  80
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "มหาวิทยาลัยเกษตรศาสตร์",
            en: "Kasetsart University",
            id: "N13",
			radius: 500,
			latlng: [13.842268, 100.57713],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 480,
                    h:  80
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "เสนานิคม",
            en: "Sena Nikhom",
            id: "N12",
			radius: 500,
			latlng: [13.836399, 100.573633],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 480,
                    h:  80
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "รัชโยธิน",
            en: "Ratchayothin",
            id: "N11",
			radius: 500,
			latlng: [13.829738, 100.569697],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 480,
                    h:  80
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "พหลโยธิน 24",
            en: "Phahon Yothin 24",
            id: "N10",
			radius: 500,
			latlng: [13.82416, 100.566477],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 480,
                    h:  80
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "ห้าแยกลาดพร้าว",
            en: "Ha Yaek Lat Phrao",
            id: "N9",
			radius: 500,
			latlng: [13.81668, 100.562078],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 480,
                    h:  80
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "หมอชิต",
            en: "Mo Chit",
            id: "N8",
			radius: 500,
			latlng: [13.802573, 100.553741],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 480,
                    h:  80
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "สะพานควาย",
            en: "Saphan Khwai",
            id: "N7",
			radius: 500,
			latlng: [13.793858, 100.549724],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 480,
                    h:  80
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "อารีย์",
            en: "Ari",
            id: "N5",
			radius: 500,
			latlng: [13.779578, 100.544622],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 480,
                    h:  80
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "สนามเป้า",
            en: "Sanam Pao",
            id: "N4",
			radius: 500,
			latlng: [13.772544, 100.542036],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 480,
                    h:  80
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "อนุสาวรีย์ชัยสมรภูมิ",
            en: "Victory Monument",
            id: "N3",
			radius: 500,
			latlng: [13.762723, 100.537074],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 480,
                    h:  80
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "พญาไท",
            en: "Phaya Thai",
            id: "N2",
			radius: 500,
			latlng: [13.756982, 100.533834],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 480,
                    h:  80
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "ราชเทวี",
            en: "Ratchathewi",
            id: "N1",
			radius: 500,
			latlng: [13.751848, 100.531517],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 480,
                    h:  80
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "สยาม",
            en: "Siam",
            id: "CEN",
			radius: 500,
			latlng: [13.745615, 100.53421],
            type: "BTS",
            bannergress: [
                {
                    path: "we-love-thailand-banner-5280",
                    bg: "bd429af0c315c2031aa587ef35e6bc89",
                    w: 480,
                    h:  80
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "ชิดลม",
            en: "Chit Lom",
            id: "E1",
			radius: 500,
			latlng: [13.744114, 100.542991],
            type: "BTS",
            bannergress: [
                {
                    path: "welcome-to-bangkok-dbaa",
                    bg: "f0e6745754c4ccf6ccfdf15c773e20ff",
                    w: 480,
                    h: 160
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "เพลินจิต",
            en: "Phloen Chit",
            id: "E2",
			radius: 500,
			latlng: [13.743072, 100.54916],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "นานา",
            en: "Nana",
            id: "E3",
			radius: 500,
			latlng: [13.740655, 100.555345],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "อโศก",
            en: "Asok",
            id: "E4",
			radius: 500,
			latlng: [13.737003, 100.560409],
            type: "BTS",
            bannergress: [
                {
                    path: "asoke-is-the-best-place-in-bangkok-961c",
                    bg: "7168c6b9620a07b66e22b777b82b2484",
                    w: 480,
                    h: 480
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "พร้อมพงษ์",
            en: "Phrom Phong",
            id: "E5",
			radius: 500,
			latlng: [13.730499, 100.569577],
            type: "BTS",
            bannergress: [
                {
                    path: "the-way-of-destroyer-2cc5",
                    bg: "6510f81211c7064fd4e45afd54194074",
                    w: 400,
                    h:  80
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "ทองหล่อ",
            en: "Thong Lo",
            id: "E6",
			radius: 500,
			latlng: [13.724256, 100.578445],
            type: "BTS",
            bannergress: [
                {
                    path: "thonglor-fe9a",
                    bg: "ad3ef5385bbfe200714a75fba3565045",
                    w: 480,
                    h: 240
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "เอกมัย",
            en: "Ekkamai",
            id: "E7",
			radius: 500,
			latlng: [13.719534, 100.585123],
            type: "BTS",
            bannergress: [
                {
                    path: "ekkamai-02d6",
                    bg: "63595349b70289854da4c8e053646434",
                    w: 480,
                    h: 240
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "พระโขนง",
            en: "Phra Khanong",
            id: "E8",
			radius: 500,
			latlng: [13.715243, 100.591158],
            type: "BTS",
            bannergress: [
                {
                    path: "w-market-visitation-229e",
                    bg: "ce566e48030845ade868f1682a669e21",
                    w: 400,
                    h:  80
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "อ่อนนุช",
            en: "On Nut",
            id: "E9",
			radius: 500,
			latlng: [13.705656, 100.601088],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "บางจาก",
            en: "Bang Chak",
            id: "E10",
			radius: 500,
			latlng: [13.696725, 100.605283],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "ปุณณวิถี",
            en: "Punnawithi",
            id: "E11",
			radius: 500,
			latlng: [13.689291, 100.608979],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "อุดมสุข",
            id: "E12",
			radius: 500,
			latlng: [13.679857, 100.609413],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "บางนา",
            id: "E13",
			radius: 500,
			latlng: [13.668106, 100.604612],
            type: "BTS",
            bannergress: [
                {
                    path: "วัดบางนาใน-5902",
                    bg: "5ad94a93d38be315a381b04865ca6e01",
                    w: 480,
                    h: 160
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "แบริ่ง",
            id: "E14",
			radius: 500,
			latlng: [13.661123, 100.601796],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "สำโรง",
            id: "E15",
			radius: 500,
			latlng: [13.6465, 100.595734],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "ปู่เจ้า",
            id: "E16",
			radius: 500,
			latlng: [13.637352, 100.592043],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "ช้างเอราวัณ",
            id: "E17",
			radius: 500,
			latlng: [13.621582, 100.590134],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "โรงเรียนนายเรือ",
            id: "E18",
			radius: 500,
			latlng: [13.608383, 100.594897],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "ปากน้ำ",
            id: "E19",
			radius: 500,
			latlng: [13.602146, 100.597107],
            type: "BTS",
            bannergress: [
                {
                    path: "samut-prakan-province-39ad",
                    bg: "95fccd83ac34d92fe095d7f15088ac56",
                    w: 480,
                    h: 240
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "ศรีนครินทร์",
            id: "E20",
			radius: 500,
			latlng: [13.591999, 100.609043],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "แพรกษา",
            id: "E21",
			radius: 500,
			latlng: [13.584187, 100.607911],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "สายลวด",
            id: "E22",
			radius: 500,
			latlng: [13.577783, 100.605449],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "เคหะฯ",
            id: "E23",
			radius: 500,
			latlng: [13.567689, 100.607697],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "",
            id: "",
			radius: 500,
			latlng: [],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "",
            id: "",
			radius: 500,
			latlng: [],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "สุวรรณภูมิ",
            en: "Suvarnabhumi Airport",
            id: "",
			radius: 500,
			latlng: [13.694218, 100.751324],
            type: "ARL",
            bannergress: [
                {
                    path: "suvarnabhumi-international-airport-0e44",
                    bg: "e4d1fec47e50a6f1f69a6d8a5d813461",
                    w: 480,
                    h: 240
                }
            ],
            icon: ARLicon
        },
        {
            name: "ลาดกระบัง",
            en: "Lad Krabang",
            id: "",
			radius: 500,
			latlng: [13.727719, 100.748599],
            type: "ARL",
            bannergress: [
                {
                    path: "タイの桜-b601",
                    bg: "1cb4935c390b542d58371673f1619626",
                    w: 480,
                    h: 480
                }
            ],
            icon: ARLicon
        },
        {
            name: "บ้านทับช้าง",
            en: "Ban Thap Chang",
            id: "",
			radius: 500,
            latlng: [13.73285, 100.690808],
            type: "ARL",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: ARLicon
        },
        {
            name: "หัวหมาก",
            en: "Hua Mark",
            id: "",
			radius: 500,
            latlng: [13.737996, 100.645269],
            type: "ARL",
            bannergress: [
                {
                    path: "shoping-plaza-banner-1433",
                    bg: "bc9ee7ee45fd79da571448bd952af088",
                    w: 480,
                    h:  80
                }
            ],
            icon: ARLicon
        },
        {
            name: "รามคำแหง",
            en: "Ramkhamhaeng",
            id: "",
			radius: 500,
            latlng: [13.743009, 100.600165],
            type: "ARL",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: ARLicon
        },
        {
            name: "มักกะสัน",
            en: "Makkasan",
            id: "",
			radius: 500,
            latlng: [13.750945, 100.561155],
            type: "ARL",
            bannergress: [
                {
                    path: "srinakharinwirot-university-prasarnmit-4629",
                    bg: "7db2dbdbcd7f9eda11146e997795726b",
                    w: 480,
                    h: 160
                }
            ],
            icon: ARLicon
        },
        {
            name: "ราชปรารภ",
            en: "Ratchaprarop",
            id: "",
			radius: 500,
            latlng: [13.755103, 100.542149],
            type: "ARL",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: ARLicon
        },
        {
            name: "พญาไท",
            en: "Phayathai",
            id: "",
			radius: 500,
            latlng: [13.756725, 100.534923],
            type: "ARL",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: ARLicon
        },
        {
            name: "สนามกีฬาแห่งชาติ",
            en: "National Stadium",
            id: "W1",
			radius: 500,
			latlng: [13.746531, 100.529087],
            type: "BTS",
            bannergress: [
                {
                    path: "exploring-pathum-wan-district-6bfe",
                    bg: "b37540b143584c88dc2ed2db8d4d73ce",
                    w: 480,
                    h: 320
                }
            ],
            icon: BTSdarkgreenline
        },
        {
            name: "ราชดำริ",
            en: "Ratchadamri",
            id: "S1",
			radius: 500,
            latlng: [13.73945, 100.539467],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: BTSdarkgreenline
        },
        {
            name: "ศาลาแดง",
            en: "Sala Daeng",
            id: "S2",
			radius: 500,
			latlng: [13.728554, 100.534338],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: BTSdarkgreenline
        },
        {
            name: "ช่องนนทรี",
            en: "Chong Nonsi",
            id: "S3",
			radius: 500,
			latlng: [13.723802, 100.529339],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: BTSdarkgreenline
        },
        {
            name: "เซนต์หลุยส์",
            en: "Saint Louis",
            id: "S4",
			radius: 500,
			latlng: [13.720811, 100.526689],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: BTSdarkgreenline
        },
        {
            name: "สุรศักดิ์",
            en: "Surasak",
            id: "S5",
			radius: 500,
			latlng: [13.719326, 100.52156],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: BTSdarkgreenline
        },
        {
            name: "สะพานตากสิน",
            en: "Saphan Taksin",
            id: "S6",
			radius: 500,
			latlng: [13.718794, 100.514211],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: BTSdarkgreenline
        },
        {
            name: "กรุงธนบุรี",
            en: "Krung Thon Buri",
            id: "S7",
			radius: 500,
			latlng: [13.720926, 100.50272],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: BTSdarkgreenline
        },
        {
            name: "วงเวียนใหญ่",
            en: "Wongwian Yai",
            id: "S8",
			radius: 500,
			latlng: [13.72106, 100.495226],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: BTSdarkgreenline
        },
        {
            name: "โพธิ์นิมิตร",
            en: "Pho Nimit",
            id: "S9",
			radius: 500,
			latlng: [13.719236, 100.485924],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: BTSdarkgreenline
        },
        {
            name: "ตลาดพลู",
            en: "Talat Phlu",
            id: "S10",
			radius: 500,
			latlng: [13.714074, 100.476354],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: BTSdarkgreenline
        },
        {
            name: "วุฒากาศ",
            en: "Wutthakat",
            id: "S11",
			radius: 500,
			latlng: [13.71301, 100.468962],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: BTSdarkgreenline
        },
        {
            name: "บางหว้า",
            en: "Bang Wa",
            id: "S12",
			radius: 500,
			latlng: [13.720788, 100.457804],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: BTSdarkgreenline
        },
        {
            name: "",
            en: "",
            id: "S",
			radius: 500,
			latlng: [],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480
                }
            ],
            icon: BTSdarkgreenline
        },
    ]
    
    for (let station of stations) {
        if (station.name !== "" && station.latlng !== [] ) {
            if (station.type === "BTS") {
                L.marker(station.latlng, 
                    {icon: station.icon}
                )
                .addTo(mymap).bindPopup(`
                <h3>${station.name} (${station.en||""})</h3>
                <p>Radius: ${station.radius} meters</p>
                <a href="../src/images/BTS/${station.id}.png" target="_blank">
                    <img alt="${station.id}" src="../src/images/BTS/${station.id}.png" style="width:200px;height:150px;">
                </a>
                <a href="https://bannergress.com/banner/${station.bannergress[0].path}" target="_blank">
                    <img alt="${station.name}" src="https://api.bannergress.com/bnrs/pictures/${station.bannergress[0].bg}" style="width:${station.bannergress[0].w}px;height:${station.bannergress[0].h}px;">
                </a>
                `)
            } else {
                L.marker(station.latlng, 
                    {icon: station.icon}
                )
                .addTo(mymap).bindPopup(`
                <h3>${station.name} (${station.en||""})</h3>
                <a href="https://bannergress.com/banner/${station.bannergress[0].path}" target="_blank">
                    <img alt="${station.name}" src="https://api.bannergress.com/bnrs/pictures/${station.bannergress[0].bg}" style="width:${station.bannergress[0].w}px;height:${station.bannergress[0].h}px;">
                </a>
                `)
            }

            if (station.radius) {
                L.donut(station.latlng,{
                    radius: station.radius,
                    innerRadius: 0,
                    innerRadiusAsPercent: false,
                }).addTo(mymap)
            } else {
                console.log(station.name)
            }
        }
    }

    mymap.on('contextmenu', function(e) {
        var dtCurrentTime = new Date()
        var lat = e.latlng.lat.toFixed(6)
        var lng = e.latlng.lng.toFixed(6)
        const z = 17
        const windy_zoom = 8
        L.marker(e.latlng).addTo(mymap).bindPopup(
            `
            ${e.latlng.toString()}
            <br>${dtCurrentTime.toString()}
            <br><h6>Open in <a href="https://pinghuskar.github.io/X-Marks-Leaflet/?lat=${lat}&lng=${lng}" target="_blank">X Marks Leaflet</a></h6>
            <br>
            <img src="../src/images/intel.webp" onclick="window.open('https://intel.ingress.com/intel?ll=${lat},${lng}&z=${z}', '_blank')">
            <img src="../src/images/bannergress.png" onclick="window.open('https://bannergress.com/map?lat=${lat}&lng=${lng}&zoom=${z}', '_blank')">
            <img src="../src/images/googlemaps.png" onclick="window.open('https://www.google.com/maps?daddr=${lat},${lng}', '_blank')">
            <img src="../src/images/NO2.jpg" onclick="window.open('https://www.windy.com/-NO2-no2?cams,no2,${lat},${lng},${windy_zoom}', '_blank')">
            <img src="../src/images/pm.jpg" onclick="window.open('https://www.windy.com/-PM2-5-pm2p5?cams,pm2p5,${lat},${lng},${windy_zoom}', '_blank')">
            `
            )
            // https://pinghuskar.github.io/Mark-Center-by-Province/js/configData.js
    })
    mymap.on('keypress',function(e) {
        if (e.originalEvent.key === "l") {
            mymap.locate()
        }
    })
})