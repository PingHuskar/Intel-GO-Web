const stops = [
    {
        name: "Opposite Charoen Krung Hospital ",
        geo: [13.69403200,100.49345100,],
        bus: [
            
        ]
    },
    {
        name: "เอเชียทีค เดอะรีเวอร์ฟร้อนท์",
        en: "Asiatique The Riverfront",
        geo: [13.703472, 100.503933]
    },
]

console.log(stops.find((stop) => (stop.name=="เอเชียทีค เดอะรีเวอร์ฟร้อนท์")).geo)
// for (let stop of stops) {
//     L.marker(stop.geo,)
//     .addTo(map).bindPopup(`${stop.name}`)
// }