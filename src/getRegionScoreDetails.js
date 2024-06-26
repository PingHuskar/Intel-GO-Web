const FOUR_COLOR = ["lime", "cyan", "pink", "yellow","red"]
// https://fevgames.net/ingress/ingress-guide/ops/scores/
const REGIONS = [
	{
		regionName: "AS11-KILO-01",
		regionVertices: [[13376136, 99189905], [13320053, 100619655], [14786263, 100619655], [14847989, 99189905]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS11-LIMA-14",
		regionVertices: [[13320053, 100619655], [13254873, 102071828], [14714517, 102071828], [14786263, 100619655]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS11-KILO-00",
		regionVertices: 
		[[14847989, 99189905], [14786263, 100619655], [16266725, 100619655], [16333984, 99189905]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS11-LIMA-15",
		regionVertices: [[14786263, 100619655], [14714517, 102071828], [16188538, 102071828], [16266725, 100619655]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS11-LIMA-12",
		regionVertices: [[14714517, 102071828], [14632517, 103543691], [16099165, 103543691], [16188538, 102071828]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS11-LIMA-13",
		regionVertices: [[13254873, 102071828], [13180387, 103543691], [14632517, 103543691], [14714517, 102071828]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS11-LIMA-11",
		regionVertices: [[14632517, 103543691], [14540110, 105032363], [15998432, 105032363], [16099165, 103543691]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS11-LIMA-10",
		regionVertices: [[14540110, 105032363], [14437230, 106534837], [15886262, 106534837], [15998432, 105032363]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS12-LIMA-14",
		regionVertices: [[16099165, 103543691], [15998432, 105032363], [17468565, 105032363], [17577425, 103543691]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS12-LIMA-13",
		regionVertices: [[17577425, 103543691], [17468565, 105032363], [18947572, 105032363], [19064317, 103543691]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS12-LIMA-02",
		regionVertices: [[17673993, 102071828], [17577425, 103543691], [19064317, 103543691], [19167859, 102071828]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS12-LIMA-01",
		regionVertices: [[16188538, 102071828], [16099165, 103543691], [17577425, 103543691], [17673993, 102071828]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS12-LIMA-00",
		regionVertices: [[16266725, 100619655], [16188538, 102071828], [17673993, 102071828], [17758460, 100619655]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS12-KILO-15",
		regionVertices: [[16333984, 99189905], [16266725, 100619655], [17758460, 100619655], [17831110, 99189905]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS11-KILO-14",
		regionVertices: 
		[[11921340, 99189905], [11870979, 100619655], [13320053, 100619655], [13376136, 99189905]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS11-KILO-15",
		regionVertices: [[10486388, 99189905], [10441798, 100619655], [11870979, 100619655], [11921340, 99189905]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS10-KILO-10",
		regionVertices: [[9073922, 99189905], [9035120, 100619655], [10441798, 100619655], [10486388, 99189905]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS10-KILO-09",
		regionVertices: [[7686415, 99189905], [7653391, 100619655], [9035120, 100619655], [9073922, 99189905]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS10-KILO-06",
		regionVertices: [[6326159, 99189905], [6298875, 100619655], [7653391, 100619655], [7686415, 99189905]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS10-LIMA-09",
		regionVertices: [[6298875, 100619655], [6267176, 102071828], [7615023, 102071828], [7653391, 100619655]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS10-KILO-08",
		regionVertices: [[7714252, 97785140], [7686415, 99189905], [9073922, 99189905], [9106627, 97785140]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS10-KILO-11",
		regionVertices: [[9106627, 97785140], [9073922, 99189905], [10486388, 99189905], [10523970, 97785140]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS11-KILO-12",
		regionVertices: [[10523970, 97785140], [10486388, 99189905], [11921340, 99189905], [11963782, 97785140]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS11-LIMA-01",
		regionVertices: [[11870979, 100619655], [11812455, 102071828], [13254873, 102071828], [13320053, 100619655]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS11-LIMA-02",
		regionVertices: [[11812455, 102071828], [11745583, 103543691], [13180387, 103543691], [13254873, 102071828]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS12-KILO-14",
		regionVertices: [[16390650, 97785140], [16333984, 99189905], [17831110, 99189905], [17892312, 97785140]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS11-KILO-02",
		regionVertices: [[13423396, 97785140], [13376136, 99189905], [14847989, 99189905], [14899999, 97785140]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS11-KILO-03",
		regionVertices: [[14899999, 97785140], [14847989, 99189905], [16333984, 99189905], [16390650, 97785140]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS12-KILO-13",
		regionVertices: [[17892312, 97785140], [17831110, 99189905], [19336283, 99189905], [19401876, 97785140]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS12-KILO-08",
		regionVertices: [[19401876, 97785140], [19336283, 99189905], [20846381, 99189905], [20916196, 97785140]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS12-KILO-11",
		regionVertices: [[19336283, 99189905], [19258411, 100619655], [20763484, 100619655], [20846381, 99189905]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS12-KILO-12",
		regionVertices: [[17831110, 99189905], [17758460, 100619655], [19258411, 100619655], [19336283, 99189905]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS12-LIMA-03",
		regionVertices: [[17758460, 100619655], [17673993, 102071828], [19167859, 102071828], [19258411, 100619655]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS11-LIMA-00",
		regionVertices: [[10441798, 100619655], [10389984, 102071828], [11812455, 102071828], [11870979, 100619655]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS11-LIMA-03",
		regionVertices: [[10389984, 102071828], [10330786, 103543691], [11745583, 103543691], [11812455, 102071828]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS10-LIMA-04",
		regionVertices: [[8990037, 102071828], [8938532, 103543691], [10330786, 103543691], [10389984, 102071828]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS10-LIMA-05",
		regionVertices: [[9035120, 100619655], [8990037, 102071828], [10389984, 102071828], [10441798, 100619655]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: "AS10-LIMA-06",
		regionVertices: [[7653391, 100619655], [7615023, 102071828], [8990037, 102071828], [9035120, 100619655]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: `AS10-LIMA-07`,
		regionVertices: [[7615023, 102071828], [7571194, 103543691], [8938532, 103543691], [8990037, 102071828]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: `AS10-LIMA-08`,
		regionVertices: [[6267176, 102071828], [6230968, 103543691], [7571194, 103543691], [7615023, 102071828]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: `AS10-LIMA-11`,
		regionVertices: [[4948537, 102071828], [4919862, 103543691], [6230968, 103543691], [6267176, 102071828]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: `AS10-LIMA-10`,
		regionVertices: [[4973642, 100619655], [4948537, 102071828], [6267176, 102071828], [6298875, 100619655]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: `AS10-LIMA-12`,
		regionVertices: [[4919862, 103543691], [4887571, 105032363], [6190191, 105032363], [6230968, 103543691]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: `AS10-LIMA-15`,
		regionVertices: [[4887571, 105032363], [4851647, 106534837], [6144826, 106534837], [6190191, 105032363]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: `AS10-LIMA-14`,
		regionVertices: [[6190191, 105032363], [6144826, 106534837], [7466909, 106534837], [7521832, 105032363]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: `AS10-LIMA-13`,
		regionVertices: [[6230968, 103543691], [6190191, 105032363], [7521832, 105032363], [7571194, 103543691]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: `AS10-LIMA-02`,
		regionVertices: [[7571194, 103543691], [7521832, 105032363], [8880520, 105032363], [8938532, 103543691]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: `AS10-LIMA-01`,
		regionVertices: [[7521832, 105032363], [7466909, 106534837], [8815969, 106534837], [8880520, 105032363]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: `AS10-LIMA-00`,
		regionVertices: [[8880520, 105032363], [8815969, 106534837], [10189892, 106534837], [10264102, 105032363]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: `AS10-LIMA-03`,
		regionVertices: [[8938532, 103543691], [8880520, 105032363], [10264102, 105032363], [10330786, 103543691]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: `AS11-LIMA-04`,
		regionVertices: [[10330786, 103543691], [10264102, 105032363], [11670246, 105032363], [11745583, 103543691]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: `AS11-LIMA-05`,
		regionVertices: [[10264102, 105032363], [10189892, 106534837], [11586396, 106534837], [11670246, 105032363]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: `AS11-LIMA-06`,
		regionVertices: [[11670246, 105032363], [11586396, 106534837], [13003038, 106534837], [13096461, 105032363]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: `AS11-LIMA-07`,
		regionVertices: [[11745583, 103543691], [11670246, 105032363], [13096461, 105032363], [13180387, 103543691]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: `AS11-LIMA-08`,
		regionVertices: [[13180387, 103543691], [13096461, 105032363], [14540110, 105032363], [14632517, 103543691]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: `AS11-LIMA-09`,
		regionVertices: [[13096461, 105032363], [13003038, 106534837], [14437230, 106534837], [14540110, 105032363]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: `AS12-LIMA-15`,
		regionVertices: [[15998432, 105032363], [15886262, 106534837], [17347321, 106534837], [17468565, 105032363]],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: ``,
		regionVertices: [],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: ``,
		regionVertices: [],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: ``,
		regionVertices: [],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: ``,
		regionVertices: [],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: ``,
		regionVertices: [],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: ``,
		regionVertices: [],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: ``,
		regionVertices: [],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: ``,
		regionVertices: [],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: ``,
		regionVertices: [],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: ``,
		regionVertices: [],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: ``,
		regionVertices: [],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: ``,
		regionVertices: [],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: ``,
		regionVertices: [],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: ``,
		regionVertices: [],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: ``,
		regionVertices: [],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: ``,
		regionVertices: [],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: ``,
		regionVertices: [],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: ``,
		regionVertices: [],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: ``,
		regionVertices: [],
		color: FOUR_COLOR.at(-1)
	},
	{
		regionName: ``,
		regionVertices: [],
		color: FOUR_COLOR.at(-1)
	},
]
// L.polygon().addTo(map)
const regionVerticesToPloygon = (d) => {
	return [d[0]/10**6, d[1]/10**6]
}

const getCenter = (regionVertices) => {
	const cenLat = (regionVertices.map(a => a.at(0)).reduce((a, b) => a + b, 0)/regionVertices.length/10**6)
	const cenLng = (regionVertices.map(a => a.at(1)).reduce((a, b) => a + b, 0)/regionVertices.length/10**6)
	return [cenLat, cenLng]
}

