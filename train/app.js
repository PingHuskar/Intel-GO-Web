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
const BTSgoldline = L.icon({
        iconUrl: '../src/images/marker-icon-2x-gold.png',...iconProps
})
const MRTblueline = L.icon({
        iconUrl: '../src/images/marker-icon-2x-blue.png',...iconProps
        // สายเฉลิมรัชมงคล
})
const MRTpurpleline = L.icon({
        iconUrl: '../src/images/marker-icon-2x-purple.png',...iconProps
        // สายฉลองรัชธรรม
})
const ARLicon = L.icon({
        iconUrl: '../src/images/marker-icon-2x-red.png',...iconProps
})
const SRTredline = L.icon({
        iconUrl: '../src/images/marker-icon-2x-softred.png',...iconProps
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

    const sucksTransport = [
        {
            name: "คูคต",
            en: "Khu Khot",
            id: "N24",
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
			latlng: [13.802573, 100.553741],
            type: "BTS",
            bannergress: [
                {
                    path: "ชมพูพันธุ-ทิพย-จตุจักร-a015",
                    bg: "b6a7b882b41aafbc995675af93a99315",
                    w: 480,
                    h: 160
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "สะพานควาย",
            en: "Saphan Khwai",
            id: "N7",
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
			latlng: [13.743072, 100.54916],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "นานา",
            en: "Nana",
            id: "E3",
			latlng: [13.740655, 100.555345],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "อโศก",
            en: "Asok",
            id: "E4",
			latlng: [13.737003, 100.560409],
            type: "BTS",
            bannergress: [
                {
                    path: "asoke-is-the-best-place-in-bangkok-961c",
                    bg: "7168c6b9620a07b66e22b777b82b2484",
                    w: 480,
                    h: 480,
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "พร้อมพงษ์",
            en: "Phrom Phong",
            id: "E5",
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
			latlng: [13.705656, 100.601088],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "บางจาก",
            en: "Bang Chak",
            id: "E10",
			latlng: [13.696725, 100.605283],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "ปุณณวิถี",
            en: "Punnawithi",
            id: "E11",
			latlng: [13.689291, 100.608979],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "อุดมสุข",
            en: "Udom Suk",
            id: "E12",
			latlng: [13.679857, 100.609413],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "บางนา",
            en: "Bang Na",
            id: "E13",
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
            en: "Bearing",
            id: "E14",
			latlng: [13.661123, 100.601796],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "สำโรง",
            en: "Samrong",
            id: "E15",
			latlng: [13.6465, 100.595734],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "ปู่เจ้า",
            en: "Pu Chao",
            id: "E16",
			latlng: [13.637352, 100.592043],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "ช้างเอราวัณ",
            en: "Chang Erawan",
            id: "E17",
			latlng: [13.621582, 100.590134],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "โรงเรียนนายเรือ",
            en: "Royal Thai Naval Academy",
            id: "E18",
			latlng: [13.608383, 100.594897],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "ปากน้ำ",
            en: "Pak Nam",
            id: "E19",
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
            en: "Srinagarindra",
            id: "E20",
			latlng: [13.591999, 100.609043],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "แพรกษา",
            en: "Phraek Sa",
            id: "E21",
			latlng: [13.584187, 100.607911],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "สายลวด",
            en: "Sai Luat",
            id: "E22",
			latlng: [13.577783, 100.605449],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "เคหะฯ",
            en: "Kheha",
            id: "E23",
			latlng: [13.567689, 100.607697],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: BTSlightgreenline
        },
        {
            name: "บางโพ",
            en: "",
            id: "",
			latlng: [13.806387, 100.521083],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "บางอ้อ",
            en: "",
            id: "",
			latlng: [13.798976, 100.509818],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "บางพลัด",
            en: "",
            id: "",
			latlng: [13.792393, 100.504877],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "สิรินธร",
            en: "Sirindhorn",
            id: "BL06",
			latlng: [13.783817, 100.493242],
            type: "MRT",
            bannergress: [
                {
                    path: "rama-viii-bridge-eb7c",
                    bg: "40e48b43c0aa050d2d17b2240c646305",
                    w: 480,
                    h: 240
                }
            ],
            icon: MRTblueline
        },
        {
            name: "บางยี่ขัน",
            en: "Bang Yi Khan",
            id: "BL05",
			latlng: [13.777456, 100.485334],
            type: "MRT",
            bannergress: [
                {
                    path: "changchui-9324",
                    bg: "0207e1a3cf8d9c685946ab7d58191655",
                    w: 480,
                    h: 240,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "บางขุนนนท์",
            en: "Bang Khun Non",
            id: "BL04",
			latlng: [13.763331, 100.473372],
            type: "MRT",
            bannergress: [
                {
                    path: "siriraj-hospital-e852",
                    bg: "0b6961c513651c02d4fa6a5a96473f26",
                    w: 480,
                    h:  80
                }
            ],
            icon: MRTblueline
        },
        {
            name: "ไฟฉาย",
            original_name: "แยกไฟฉาย",
            en: "Fai Chai",
            id: "BL03",
			latlng: [13.755794, 100.469327],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "จรัญฯ 13",
            original_name: "จรัญสนิทวงศ์ 13",
            en: "Charan 13",
            id: "BL02",
			latlng: [13.740113, 100.470722],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "ท่าพระ",
            en: "Tha Phra",
            id: "BL01-L",
			latlng: [13.729659, 100.474074],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "วัดมังกร",
            original_name: "วัดมังกรกมลาวาส",
            en: "Wat Mangkon",
            id: "BL29",
			latlng: [13.742198, 100.509882],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "สามยอด",
            original_name: "วังบูรพา",
            en: "Sam Yot",
            id: "BL30",
			latlng: [13.747052, 100.502157],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "สนามไชย",
            en: "Sanam Chai",
            id: "BL31",
			latlng: [13.744324, 100.49469],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "อิสรภาพ",
            en: "Itsaraphap",
            id: "BL32",
			latlng: [13.738306, 100.485721],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "บางไผ่",
            en: "Bang Phai",
            id: "BL33",
			latlng: [13.72465, 100.465207],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "บางหว้า",
            en: "Bang Wa",
            id: "BL34",
			latlng: [13.720248, 100.457026],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "เพชรเกษม 48",
            en: "Phetkasem 48",
            id: "BL35",
			latlng: [13.715535, 100.44538],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "ภาษีเจริญ",
            en: "Phasi Charoen",
            id: "BL36",
			latlng: [13.712848, 100.434287],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "บางแค",
            en: "Bang Khae",
            id: "BL37",
			latlng: [13.711895, 100.422276],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "หลักสอง",
            en: "Lak Song",
            id: "BL38",
			latlng: [13.710857, 100.409439],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "สุวรรณภูมิ",
            en: "Suvarnabhumi Airport",
            id: "",
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
			latlng: [13.727719, 100.748599],
            type: "ARL",
            bannergress: [
                {
                    path: "タイの桜-b601",
                    bg: "1cb4935c390b542d58371673f1619626",
                    w: 480,
                    h: 480,
                }
            ],
            icon: ARLicon
        },
        {
            name: "บ้านทับช้าง",
            en: "Ban Thap Chang",
            latlng: [13.73285, 100.690808],
            type: "ARL",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: ARLicon
        },
        {
            name: "หัวหมาก",
            en: "Hua Mark",
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
            latlng: [13.743009, 100.600165],
            type: "ARL",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: ARLicon
        },
        {
            name: "มักกะสัน",
            en: "Makkasan",
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
            latlng: [13.755103, 100.542149],
            type: "ARL",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: ARLicon
        },
        {
            name: "พญาไท",
            en: "Phayathai",
            latlng: [13.756725, 100.534923],
            type: "ARL",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: ARLicon
        },
        {
            name: "สนามกีฬาแห่งชาติ",
            en: "National Stadium",
            id: "W1",
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
            latlng: [13.73945, 100.539467],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: BTSdarkgreenline
        },
        {
            name: "ศาลาแดง",
            en: "Sala Daeng",
            id: "S2",
			latlng: [13.728554, 100.534338],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: BTSdarkgreenline
        },
        {
            name: "ช่องนนทรี",
            en: "Chong Nonsi",
            id: "S3",
			latlng: [13.723802, 100.529339],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: BTSdarkgreenline
        },
        {
            name: "เซนต์หลุยส์",
            en: "Saint Louis",
            id: "S4",
			latlng: [13.720811, 100.526689],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: BTSdarkgreenline
        },
        {
            name: "สุรศักดิ์",
            en: "Surasak",
            id: "S5",
			latlng: [13.719326, 100.52156],
            type: "BTS",
            bannergress: [
                {
                    path: "chaozhou-cemetery-tour-e11e",
                    bg: "1b774ceb5c236066432c1c2cd69afd30",
                    w: 240,
                    h: 480,
                }
            ],
            icon: BTSdarkgreenline
        },
        {
            name: "สะพานตากสิน",
            en: "Saphan Taksin",
            id: "S6",
			latlng: [13.718794, 100.514211],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: BTSdarkgreenline
        },
        {
            name: "กรุงธนบุรี",
            en: "Krung Thon Buri",
            id: "S7",
			latlng: [13.720926, 100.50272],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: BTSdarkgreenline
        },
        {
            name: "วงเวียนใหญ่",
            en: "Wongwian Yai",
            id: "S8",
			latlng: [13.72106, 100.495226],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: BTSdarkgreenline
        },
        {
            name: "โพธิ์นิมิตร",
            en: "Pho Nimit",
            id: "S9",
			latlng: [13.719236, 100.485924],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: BTSdarkgreenline
        },
        {
            name: "ตลาดพลู",
            en: "Talat Phlu",
            id: "S10",
			latlng: [13.714074, 100.476354],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: BTSdarkgreenline
        },
        {
            name: "วุฒากาศ",
            en: "Wutthakat",
            id: "S11",
			latlng: [13.71301, 100.468962],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: BTSdarkgreenline
        },
        {
            name: "บางหว้า",
            en: "Bang Wa",
            id: "S12",
			latlng: [13.720788, 100.457804],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: BTSdarkgreenline
        },
        {
            name: "กรุงธนบุรี",
            en: "Krung Thon Buri",
            id: "G1",
			latlng: [13.721093, 100.503713],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: BTSgoldline
        },
        {
            name: "เจริญนคร",
            en: "Charoen Nakhon",
            id: "G2",
			latlng: [13.726463, 100.50905],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: BTSgoldline
        },
        {
            name: "คลองสาน",
            en: "Khlong San",
            id: "G3",
			latlng: [13.730368, 100.507618],
            type: "BTS",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: BTSgoldline
        },
        {
            name: "หัวลำโพง",
            en: "Hua Lamphong",
            id: "BL28",
			latlng: [13.737538, 100.517156],
            type: "MRT",
            bannergress: [
                {
                    path: "hua-lamphong-railway-station-b746",
                    bg: "236afe1255edb02b6afaa659fd451813",
                    w: 480,
                    h: 160
                }
            ],
            icon: MRTblueline
        },
        {
            name: "สามย่าน",
            en: "Sam Yan",
            id: "BL27",
			latlng: [13.732229, 100.530331],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "สีลม",
            en: "Si Lom",
            id: "BL26",
			latlng: [13.72931, 100.537348],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "ลุมพินี",
            en: "Lumphini",
            id: "BL25",
			latlng: [13.725576, 100.545738],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "คลองเตย",
            en: "Khlong Toei",
            id: "BL24",
			latlng: [13.722343, 100.553977],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "ศูนย์การประชุมแห่งชาติสิริกิติ์",
            en: "QSNCC",
            id: "BL23",
			latlng: [13.722573, 100.559943],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "สุขุมวิท",
            en: "Sukhumvit",
            id: "BL22",
			latlng: [13.737383, 100.561348],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "เพชรบุรี",
            en: "Phetchaburi",
            id: "BL21",
			latlng: [13.749201, 100.563344],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "พระราม 9",
            en: "Phra Ram 9",
            id: "BL20",
			latlng: [13.757839, 100.565237],
            type: "MRT",
            bannergress: [
                {
                    path: "g-tower-7e1f",
                    bg: "838f6f6188ff69657989e679b80d4a01",
                    w: 96,
                    h: 112,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "ศูนย์วัฒนธรรมแห่งประเทศไทย",
            en: "Thailand Cultural Centre",
            id: "BL19",
			latlng: [13.766293, 100.570087],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "ห้วยขวาง",
            en: "Huai Khwang",
            id: "BL18",
			latlng: [13.778693, 100.573493],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "สุทธิสาร",
            en: "Sutthisan",
            id: "BL17",
			latlng: [13.789433, 100.574019],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "รัชดาภิเษก",
            en: "Ratchadaphisek",
            id: "BL16",
			latlng: [13.798964, 100.574475],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "ลาดพร้าว",
            en: "Lat Phrao",
            id: "BL15",
			latlng: [13.806504, 100.572887],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "พหลโยธิน",
            en: "Phahon Yothin",
            id: "BL14",
			latlng: [13.812956, 100.561579],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "สวนจตุจักร",
            en: "Chatuchak Park",
            id: "BL13",
			latlng: [13.80294, 100.553371],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "กำแพงเพชร",
            en: "Kamphaeng Phet",
            id: "BL12",
			latlng: [13.797925, 100.547926],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "บางซื่อ",
            en: "Bang Sue",
            id: "BL11",
			latlng: [13.802366, 100.540996],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "เตาปูน",
            en: "Tao Poon",
            id: "PP16",
			latlng: [13.806118, 100.530782],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTblueline
        },
        {
            name: "บางซ่อน",
            en: "Bang Son",
            id: "PP15",
			latlng: [13.820057, 100.532477],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTpurpleline
        },
        {
            name: "วงศ์สว่าง",
            en: "Wong Sawang",
            id: "PP14",
			latlng: [13.829862, 100.526517],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTpurpleline
        },
        {
            name: "แยกติวานนท์",
            en: "Yaek Tiwanon",
            id: "PP13",
			latlng: [13.83954, 100.514967],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTpurpleline
        },
        {
            name: "กระทรวงสาธารณสุข",
            en: "Ministry of Public Health",
            id: "PP12",
			latlng: [13.848479, 100.51471],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTpurpleline
        },
        {
            name: "ศูนย์ราชการนนทบุรี",
            en: "Nonthaburi Civic Center",
            id: "PP11",
			latlng: [13.860152, 100.513068],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTpurpleline
        },
        {
            name: "บางกระสอ",
            en: "Bang Krasor",
            id: "PP10",
			latlng: [13.861653, 100.504657],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTpurpleline
        },
        {
            name: "แยกนนทบุรี 1",
            en: "Yaek Nonthaburi 1",
            id: "PP09",
			latlng: [13.865967, 100.494078],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTpurpleline
        },
        {
            name: "สะพานพระนั่งเกล้า",
            en: "Phra Nang Klao Bridge",
            id: "PP08",
			latlng: [13.870271, 100.48012],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTpurpleline
        },
        {
            name: "ไทรม้า",
            en: "Sai Ma",
            id: "PP07",
			latlng: [13.87048, 100.466677],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTpurpleline
        },
        {
            name: "บางรักน้อย-ท่าอิฐ",
            en: "Bang Rak Noi Tha It",
            id: "PP06",
			latlng: [13.874805, 100.45597],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTpurpleline
        },
        {
            name: "บางรักใหญ่",
            en: "Bang Rak Yai",
            id: "PP05",
			latlng: [13.876608, 100.44494],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTpurpleline
        },
        {
            name: "บางพลู",
            en: "Bang Phlu",
            id: "PP04",
			latlng: [13.875774, 100.433782],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTpurpleline
        },
        {
            name: "สามแยกบางใหญ่",
            en: "Sam Yaek Bang Yai",
            id: "PP03",
			latlng: [13.87468, 100.419309],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTpurpleline
        },
        {
            name: "ตลาดบางใหญ่",
            en: "Talad Bang Yai",
            id: "PP02",
			latlng: [13.881016, 100.409278],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTpurpleline
        },
        {
            name: "คลองบางไผ่",
            en: "Khlong Bang Phai",
            id: "PP01",
			latlng: [13.892434, 100.408237],
            type: "MRT",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: MRTpurpleline
        },
        {
            name: "ตลิ่งชัน",
            en: "Taling Chan",
            id: "",
			latlng: [13.789666, 100.439619],
            type: "SRTR",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: SRTredline
        },
        {
            name: "บางบำหรุ",
            en: "Bang Bamru",
            id: "",
			latlng: [13.792204, 100.477481],
            type: "SRTR",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: SRTredline
        },
        {
            name: "บางซ่อน",
            en: "Bang Son",
            id: "",
			latlng: [13.822126, 100.534215],
            type: "SRTR",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: SRTredline
        },
        {
            name: "บางซื่อ",
            en: "Bang Sue",
            id: "",
			latlng: [13.804138, 100.539944],
            type: "SRTR",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: SRTredline
        },
        {
            name: "จตุจักร",
            en: "Chatuchak",
            id: "",
			latlng: [13.826619, 100.549477],
            type: "SRTR",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: SRTredline
        },
        {
            name: "	วัดเสมียนนารี",
            en: "Wat Samian Nari",
            id: "",
			latlng: [13.841593, 100.557486],
            type: "SRTR",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: SRTredline
        },
        {
            name: "บางเขน",
            en: "Bang Khen",
            id: "",
			latlng: [13.847022, 100.560629],
            type: "SRTR",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: SRTredline
        },
        {
            name: "ทุ่งสองห้อง",
            en: "Thung Song Hong",
            id: "",
			latlng: [13.86019, 100.567528],
            type: "SRTR",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: SRTredline
        },
        {
            name: "หลักสี่",
            en: "Lak Si",
            id: "",
			latlng: [13.883728, 100.580692],
            type: "SRTR",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: SRTredline
        },
        {
            name: "การเคหะ",
            en: "Khan Keha",
            id: "",
			latlng: [13.898502, 100.588889],
            type: "SRTR",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: SRTredline
        },
        {
            name: "ดอนเมือง",
            en: "Don Mueang",
            id: "",
			latlng: [13.914686, 100.59788],
            type: "SRTR",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: SRTredline
        },
        {
            name: "หลักหก",
            en: "Lak Hok",
            id: "",
			latlng: [13.965722, 100.605326],
            type: "SRTR",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: SRTredline
        },
        {
            name: "รังสิต",
            en: "Rangsit",
            id: "",
			latlng: [13.990563, 100.602166],
            type: "SRTR",
            bannergress: [
                {
                    path: "rangsit-university-33ce",
                    bg: "fb299eebec658ec9d06958a403858b8f",
                    w: 480,
                    h: 180,
                }
            ],
            icon: SRTredline
        },
        {
            name: "",
            en: "",
            id: "",
			latlng: [],
            type: "SRTR",
            bannergress: [
                {
                    path: "",
                    bg: "",
                    w: 240,
                    h: 480,
                }
            ],
            icon: SRTredline
        },
        
    ]
    
    for (let station of sucksTransport) {
        if (station.name !== "" && station.latlng.length > 1 ) {
            if (station.type === "BTS" || station.type === "MRT") {
                L.marker(station.latlng, 
                    {icon: station.icon}
                )
                .addTo(mymap).bindPopup(`
                <h3>${station.name} (${station.en||""})</h3>
                <a href="../src/images/${station.type}/${station.id}.png" target="_blank">
                    <img alt="${station.id}" src="../src/images/${station.type}/${station.id}.png" style="width:200px;height:150px;">
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