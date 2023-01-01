// 1234
// 2341
// 3412
// 4123
const FOUR_COLOR = ["lime", "cyan", "pink", "yellow"]
// https://fevgames.net/ingress/ingress-guide/ops/scores/
const region_th = [
	{
		regionName: "AS11-KILO-01",
		regionVertices: [[13376136, 99189905], [13320053, 100619655], [14786263, 100619655], [14847989, 99189905]],
		color: FOUR_COLOR[0]
	},
	{
		regionName: "AS11-LIMA-14",
		regionVertices: [[13320053, 100619655], [13254873, 102071828], [14714517, 102071828], [14786263, 100619655]],
		color: FOUR_COLOR[1]
	},
	{
		regionName: "AS11-KILO-00",
		regionVertices: 
		[[14847989, 99189905], [14786263, 100619655], [16266725, 100619655], [16333984, 99189905]],
		color: FOUR_COLOR[2]
	},
	{
		regionName: "AS11-LIMA-15",
		regionVertices: [[14786263, 100619655], [14714517, 102071828], [16188538, 102071828], [16266725, 100619655]],
		color: FOUR_COLOR[3]
	},
	{
		regionName: "AS11-LIMA-12",
		regionVertices: [[14714517, 102071828], [14632517, 103543691], [16099165, 103543691], [16188538, 102071828]],
		color: FOUR_COLOR[0]
	},
	{
		regionName: "AS11-LIMA-13",
		regionVertices: [[13254873, 102071828], [13180387, 103543691], [14632517, 103543691], [14714517, 102071828]],
		color: FOUR_COLOR[3]
	},
	{
		regionName: "AS11-LIMA-11",
		regionVertices: [[14632517, 103543691], [14540110, 105032363], [15998432, 105032363], [16099165, 103543691]],
		color: FOUR_COLOR[1]
	},
	{
		regionName: "AS11-LIMA-10",
		regionVertices: [[14540110, 105032363], [14437230, 106534837], [15886262, 106534837], [15998432, 105032363]],
		color: FOUR_COLOR[2]
	},
	{
		regionName: "AS12-LIMA-14",
		regionVertices: [[16099165, 103543691], [15998432, 105032363], [17468565, 105032363], [17577425, 103543691]],
		color: FOUR_COLOR[3]
	},
	{
		regionName: "AS12-LIMA-13",
		regionVertices: [[17577425, 103543691], [17468565, 105032363], [18947572, 105032363], [19064317, 103543691]],
		color: FOUR_COLOR[0]
	},
	{
		regionName: "AS12-LIMA-02",
		regionVertices: [[17673993, 102071828], [17577425, 103543691], [19064317, 103543691], [19167859, 102071828]],
		color: FOUR_COLOR[3]
	},
	{
		regionName: "AS12-LIMA-01",
		regionVertices: [[16188538, 102071828], [16099165, 103543691], [17577425, 103543691], [17673993, 102071828]],
		color: FOUR_COLOR[1]
	},
	{
		regionName: "AS12-LIMA-00",
		regionVertices: [[16266725, 100619655], [16188538, 102071828], [17673993, 102071828], [17758460, 100619655]],
		color: FOUR_COLOR[0]
	},
	{
		regionName: "AS12-KILO-15",
		regionVertices: [[16333984, 99189905], [16266725, 100619655], [17758460, 100619655], [17831110, 99189905]],
		color: FOUR_COLOR[1]
	},
]
// L.polygon().addTo(map)
const regionVerticesToPloygon = (d) => {
	return [d[0]/10**6, d[1]/10**6]
}

for (let region of region_th) {
	if (region.regionName !== "") {
		L.polygon(region.regionVertices.map(a => regionVerticesToPloygon(a)), {color: region.color}).addTo(map)
	}
}
