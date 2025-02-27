const POLICESTATIONS = [
  {
    name: "สถานีตำรวจนครบาลโคกคราม",
    addr: "777 หมู่ที่11 ถนนนวลจันทร์ แขวงคลองกุ่ม เขตบึงกุ่ม   กทม.10230",
    tel: "0 2509 0666  0 2509 0377",
    fax: "0 2509 3777, 0 2509 0542",
    geo: [13.831428, 100.643199],
  },
  {
    name: "สถานีตำรวจนครบาลมีนบุรี",
    addr: "57 หมู่ 1  ถนนสีหบุรานุก จ แขวงมีนบุรี  เขตมีนบุรี  กทม. 10510",
    tel: "0 2540 7311 - 3",
    fax: "0 2540 7215",
    geo: [13.81559, 100.734615],
  },
  {
    name: "สถานีตำรวจนครบาลเตาปูน",
    addr: "655  ถนนกรุงเทพ-นนทบุรี  แขวงบางซื่อ  เขตบางซื่อ  กทม.10800",
    tel: "0 2587 0461 - 5, 0 2911 2901",
    fax: "0 2911 2905",
    geo: [13.814567, 100.531384],
  },
  {
    name: "สถานีตำรวจนครบาลบางโพ",
    addr: "109  ซอยวัดบางโพโอมาวาส  ถนนประชาราษฎร์ 1  แขวงบางซื่อ  เขตบางซื่อ  กทม.10800",
    tel: "0 2585 0638, 0 2585 7460",
    fax: "0 2586 0099",
    geo: [13.808405, 100.518958],
  },
  {
    name: "สถานีตำรวจนครบาลบางชัน",
    addr: "165 หมู่ 3  ถนนเสรีไทย  แขวงคันนายาว  เขตคันนายาว  กทม.10230",
    tel: "0 2517 1717, 0 2517 3717, 0 2518 0480 , 0 2518 1510 - 13",
    fax: "0 2906 0034",
    geo: [13.802236, 100.686692],
  },
  {
    name: "สถานีตำรวจนครบาลสุทธิสาร",
    addr: "225  ถนนรัชดาภิเษก  แขวงดินแดง  เขตดินแดง  กทม.10400",
    tel: "0 2275 2151 - 5",
    fax: "0 2277 9119",
    geo: [13.791423, 100.573963],
  },
  {
    name: "สถานีตำรวจนครบาลบางซื่อ",
    addr: "442  ถนนพหลโยธิน  แขวงสามเสนใน  เขตพญาไท  กทม.10400",
    tel: "0 2278 2130, 0 2278 4082, 0 2278 5297, 02279 1500",
    fax: "0 2278 5086, 0 2279 3746",
    geo: [13.786909, 100.547609],
  },
  {
    name: "สถานีตำรวจนครบาลบึงกุ่ม",
    addr: "666  ถนนเสรีไทย  แขวงคลองกุ่ม  เขตบึงกุ่ม  กทม.10240",
    tel: "0 2374 9700 - 4",
    fax: "0 2374 9706",
    geo: [13.780113, 100.659613],
  },
  {
    name: "สถานีตำรวจนครบาลสามเสน",
    addr: "544  ถนนสามเสน  แขวงดุสิต  เขตดุสิต  กทม.10300",
    tel: "0 2241 1664, 0 2241 1461, 0 2241 1257",
    fax: "0 2243 6072",
    geo: [13.780612, 100.509718],
  },
  {
    name: "สถานีตำรวจนครบาลตลิ่งชัน",
    addr: "77 หมู่ 2  ถนนบรมราชชนนี  แขวงฉิมพลี  เขตตลิ่งชัน  กทม.10170",
    tel: "0 2448 6360, 0 2448-6621",
    fax: "0 2448 6761",
    geo: [13.780603, 100.446271],
  },
  {
    name: "สถานีตำรวจนครบาลห้วยขวาง",
    addr: "2000  ถนนประชาสงเคราะห์  แขวงดินแดง  เขตดินแดง  กทม.10320",
    tel: "0 2277 0630",
    fax: "",
    geo: [13.777091, 100.570056],
  },
  {
    name: "สถานีตำรวจนครบาลดุสิต",
    addr: "75  ถนนพระราม 5  แขวงดุสิต  เขตดุสิต  กทม.10300",
    tel: "0 2241 5043 - 4",
    fax: "0 2241 2361",
    geo: [13.777367, 100.520846],
  },
  {
    name: "สถานีตำรวจนครบาลบวรมงคล",
    addr: "649  ถนนจรัญสนิทวงศ์ 46  แขวงบางยี่ขัน  เขตบางพลัด  กทม 10700",
    tel: "0 2883 5131 - 3, 0 24247725",
    fax: "0 2435 1756",
    geo: [13.774276, 100.497446],
  },
  {
    name: "สถานีตำรวจนครบาลดินแดง",
    addr: "ถนนมิตรไมตรี  แขวงดินแดง  เขตดินแดง  กทม.10400",
    tel: "0 2246 7706 - 9",
    fax: "0 2245 8997",
    geo: [13.771808, 100.556966],
  },
  {
    name: "สถานีตำรวจนครบาลวังทองหลาง",
    addr: "48/49  ซอยลาดพร้าว 114  แขวงวังทองหลาง  เขตวังทองหลาง  กทม.10310",
    tel: "0 2539 0171",
    fax: "0 2539 0172",
    geo: [13.770821, 100.61993],
  },
  {
    name: "สถานีตำรวจนครบาลลาดพร้าว",
    addr: "1  ถนนนวมินทร์  แขวงคลองจั่น  เขตบางกะปิ  กทม.10240",
    tel: "0 2377 7243 - 5",
    fax: "0 2906 0034",
    geo: [13.768282, 100.647372],
  },
  {
    name: "สถานีตำรวจนครบาลบางยี่ขัน",
    addr: "226  ซอยวัดดาวดึงษ์  ถนนปิ่นเกล้า แขวงบางยี่ขัน  เขตบางพลัด  กทม.10700",
    tel: "0 2883 3502 - 9",
    fax: "0 2883 3802 - 9",
    geo: [13.765497, 100.491582],
  },
  {
    name: "สถานีตำรวจนครบาลร่มเกล้า",
    addr: "9 หมู่ 4  แขวงคลองสองต้นนุ่น  เขตลาดกระบัง  กทม.10520",
    tel: "0 2557 1100 - 7",
    fax: "0 2557 1108",
    geo: [13.762627, 100.734591],
  },
  {
    name: "สถานีตำรวจนครบาลหัวหมาก",
    addr: "2090  ถนนรามคำแหง  แขวงหัวหมาก  เขตบางกะปิ  กทม.10240",
    tel: "0 2314 0696 , 0 2314 3340 - 41, 0 2314 0030, 0 2314 0955",
    fax: "0 2282 3166",
    geo: [13.76032, 100.627131],
  },
  {
    name: "สถานีตำรวจนครบาลชนะสงคราม",
    addr: "74  ถนนจักรพงษ์  แขวงตลาดยอด  เขตพระนคร  กทม.10200",
    tel: "0 2282 2323, 0 2281 8786, 0 2281 8574",
    fax: "",
    geo: [13.75998, 100.496044],
  },
  {
    name: "สถานีตำรวจนครบาลบางกอกน้อย",
    addr: "258/4  ซอยจรัญสนิทวงศ์ 30/1  แขวงบ้านช่างหล่อ  เขตบางกอกน้อย  กทม.10700",
    tel: "0 2411 3035 - 8, 0 2864 4366 - 8",
    fax: "0 2418 0717",
    geo: [13.759976, 100.471663],
  },
  {
    name: "สถานีตำรวจนครบาลพญาไท",
    addr: "320  ถนนศรีอยุธยา  แขวงทุ่งพญาไท  เขตราชเทวี  กทม.10400",
    tel: "0 2246 8301 - 02, 02246 1200 01, 0 2241 1196 - 99",
    fax: "0 2246 8300",
    geo: [13.759391, 100.530361],
  },
  {
    name: "สถานีตำรวจนครบาลนางเลิ้ง",
    addr: "2  ถนนกะออม  แขวงวัดโสมนัส  เขตป้อมปราบศัตรูพ่าย  กทม.10100",
    tel: "0 2281 3002",
    fax: "0 2282 3294",
    geo: [13.757542, 100.507678],
  },
  {
    name: "สถานีตำรวจนครบาลบางขุนนนท์",
    addr: "63/5   ซอยจรัญสนิทวงศ์ 33  แขวงบางขุนศรี  เขตบางกอกน้อย  กทม.10700",
    tel: "0 2424 0541 - 3",
    fax: "0 2424 0302",
    geo: [13.757347, 100.466594],
  },
  {
    name: "สถานีตำรวจนครบาลฉลองกรุง",
    addr: "111 หมู่ 7  ถนนฉลองกรุง   แขวงลำปลาทิว  เขตลาดกระบัง  กทม.10520",
    tel: "0 2326 1742 - 6",
    fax: "0 2326 1742 - 6 ต่อ 106",
    geo: [13.755085, 100.800281],
  },
  {
    name: "สถานีตำรวจนครบาลสำราญราษฎร์",
    addr: "200  ถนนบำรุงเมือง  แขวงสำราญราษฎร์  เขตพระนคร  กทม.10200",
    tel: "0 2226 2136 - 40",
    fax: "0 2225 7430",
    geo: [13.751672, 100.503934],
  },
  {
    name: "สถานีตำรวจนครบาลมักกะสัน",
    addr: "3  ซอยศูนย์วิจัย  ถนนเพชรบุรีตัดใหม่  แขวงบางกะปิ  เขตห้วยขวาง  กทม.10310",
    tel: "0 2318 1821, 0 2318 1821",
    fax: "0 2319 3000",
    geo: [13.746591, 100.582457],
  },
  {
    name: "สถานีตำรวจนครบาลพลับพลาไชย 1",
    addr: "447  ถนนพลับพลาไชย  แขวงป้มปราบ  เขตป้อมปราบศัตรูพ่าย  กทม.10100",
    tel: "0 2221 1835, 0 2224 2512, 0 22242589, 0 2224 2610",
    fax: "0 2225 7433",
    geo: [13.744067, 100.510741],
  },
  {
    name: "สถานีตำรวจนครบาลพระราชวัง",
    addr: "79  ถนนมหาราช  แขวงพระบรมมหาราชวัง  เขตพระนคร  กทม.10200",
    tel: "0 2224 5050, 0 2223 1930",
    fax: "0 2225 7432",
    geo: [13.743081, 100.494436],
  },
  {
    name: "สถานีตำรวจนครบาลบางเสาธง",
    addr: "1209   ซอยจรัญสนิทวงศ์ 13  ถนนบางแวก   แขวงคูหาสวรรค์  เขตภาษีเจริญ  กทม.10160",
    tel: "0 2410 8260 - 5",
    fax: "0 2865 7466",
    geo: [13.743255, 100.459852],
  },
  {
    name: "สถานีตำรวจนครบาลบางกอกใหญ่",
    addr: "50  ถนนวังเดิม    แขวงวัดอรุณ  เขตบางกอกใหญ่  กทม.10600",
    tel: "0 2466 6691, 0 2466 6696",
    fax: "0 2472 1110",
    geo: [13.741639, 100.486809],
  },
  {
    name: "สถานีตำรวจนครบาลคลองตัน",
    addr: "247  ถนนพัฒนาการ  (ซอย 13)  แขวงสวนหลวง  เขตสวนหลวง  กทม.10250",
    tel: "0 2314 0041 - 3, 0 2314 0035 - 7, 0-2314 0310",
    fax: "",
    geo: [13.740746, 100.617471],
  },
  {
    name: "สถานีตำรวจนครบาลจักรวรรดิ์",
    addr: "324  ถนนจักรวรรดิ  แขวงจักรวรรดิ์  เขตสัมพันธวงศ์  กทม.10100",
    tel: "0 2225 4077 - 78",
    fax: "0 2225 3884",
    geo: [13.740728, 100.502195],
  },
  {
    name: "สถานีตำรวจนครบาลทองหล่อ",
    addr: "800  ถนนสุขุมวิท 55  แขวงคลองตันเหนือ  เขตวัฒนา  กทม.10110",
    tel: "0 2390 2240 - 8",
    fax: "0 2390 2254",
    geo: [13.736023, 100.5836],
  },
  {
    name: "สถานีตำรวจนครบาลบุปผาราม",
    addr: "489  ถนนเทศบาล สาย2  แขวงวัดกัลยาณ์  เขตธนบุรี  กทม.10600",
    tel: "0 2466 1150, 0 2466 7555",
    fax: "",
    geo: [13.736238, 100.489868],
  },
  {
    name: "สถานีตำรวจนครบาลท่าพระ",
    addr: "1310/9  ซอยจรัญสนิทวงศ์ 3  แขวงท่าพระ  เขตบางกอกใหญ่  กทม.10600",
    tel: "0 2457 8662 - 4",
    fax: "0 2457 6591",
    geo: [13.729506, 100.465662],
  },
  {
    name: "สถานีตำรวจนครบาลลุมพินี",
    addr: "139  ถนนวิทยุ  แขวงลุมพินี  เขตปทุมวัน  กทม.10300",
    tel: "0 2255 5993 - 7",
    fax: "0 2251 0579",
    geo: [13.731559, 100.545998],
  },
  {
    name: "สถานีตำรวจนครบาลสมเด็จเจ้าพระย",
    addr: "1421  ซอยลาดหญ้า 21  ถนนลาดหญ้า  แขวงคลองสาน  เขตคลองสาน  กทม.10600",
    tel: "0 2438-1030 - 2, 0 2437 2164, 0 2437 5410, 0 2437 6653",
    fax: "0 2439 2910",
    geo: [13.731024, 100.509869],
  },
  {
    name: "สถานีตำรวจนครบาลบางรัก",
    addr: "50  ถนนนเรศ  แขวงสี่พระยา  เขตบางรัก  กทม.10500",
    tel: "0 2631 8014, 0 2235 9123 - 24, 0 2234 0242",
    fax: "0 2237 2601",
    geo: [13.729868, 100.523188],
  },
  {
    name: "สถานีตำรวจนครบาลบางยี่เรือ",
    addr: "2  ถนนเทอดไท  แขวงบางยี่เรือ  เขตธนบุรี  กทม.10600",
    tel: "0 2466 7557 - 9, 0 2465 0523, 0 2466 1799",
    fax: "0 2466 7919",
    geo: [13.726771, 100.486774],
  },
  {
    name: "สถานีตำรวจนครบาลประเวศ",
    addr: "215  ถนนพัฒนาการ  แขวงประเวศ  เขตประเวศ  กทม.10250",
    tel: "0 2328  6971 - 2",
    fax: "0 2322 9598",
    geo: [13.724479, 100.697959],
  },
  {
    name: "สถานีตำรวจนครบาลสำเหร่",
    addr: "258  ถนนเจริญนคร  แขวงคลองต้นไทร  เขตคลองสาน  กทม.10600",
    tel: "0 2460 1454, 0 2460 1465, 0 2460 1480",
    fax: "0 2477 2535",
    geo: [13.722538, 100.500421],
  },
  {
    name: "สถานีตำรวจนครบาลตลาดพลู",
    addr: "45  ซอยวุฒากาศ 1  ถนนวุฒากาศ  แขวงตลาดพูล  เขตธนบุรี  กทม.10600",
    tel: "0 2472 6108 - 9, 0 2472 6622, 0 2472 6624",
    fax: "0 2472 6616",
    geo: [13.717491, 100.4741],
  },
  {
    name: "สถานีตำรวจนครบาลยานนาวา",
    addr: "1522  ซอยเจริญกรุง50  แขวงสีลม  เขตบางรัก  กทม.10500",
    tel: "0 2233 7148, 0 2233 7297, 0 2236 7083, 0 2630 0170 -1",
    fax: "0 2236 7074",
    geo: [13.720265, 100.519481],
  },
  {
    name: "สถานีตำรวจนครบาลทุ่งมหาเมฆ",
    addr: "505  ซอยสาทร 3 (สวนพลู)  แขวงทุ่งมหาเมฆ  เขตสาทร  กทม.10120",
    tel: "0 2287 3004 - 8, 0-2213 - 1907, 0 2286 0717, 0 2679 4013",
    fax: "0 2287 3007",
    geo: [13.718732, 100.539469],
  },
  {
    name: "สถานีตำรวจนครบาลบางโพงพาง",
    addr: "505  ซอยสาทร 3 (สวนพลู)  แขวงทุ่งมหาเมฆ  เขตสาทร  กทม.10120",
    tel: "0 2286 1218, 0 2228 6812 - 5",
    fax: "0 2287 3132",
    geo: [13.718444, 100.539413],
  },
  {
    name: "สถานีตำรวจนครบาลภาษีเจริญ",
    addr: "20 หมู่ 9  ซอยเพชรเกษม 54  แขวงคลองขวาง  เขตภาษีเจริญ  กทม.10160",
    tel: "0 2413 1114 - 6",
    fax: "0 2805 1599",
    geo: [13.715071, 100.43692],
  },
  {
    name: "สถานีตำรวจนครบาลวัดพระยาไกร",
    addr: "2595  ถนนเจริญกรุง  แขวงวัดพระยาไกร  เขตบางคอแหลม  กทม.10120",
    tel: "0 2291 5867 - 72",
    fax: "0 2289 1300",
    geo: [13.701941, 100.502606],
  },
  {
    name: "สถานีตำรวจนครบาลบุคคโล",
    addr: "258  ถนนเจริญนคร  แขวงดาวคะนอง  เขตธนบุรี  กทม.10600",
    tel: "0 2468 1638 -, 0 2877 5635, 0 2477 2819, 0 2468 8003 - 39",
    fax: "0 2476 1004",
    geo: [13.700122, 100.489218],
  },
  {
    name: "สถานีตำรวจนครบาลบางคอแหลม",
    addr: "57/4 หมู่ 9  ซอยราษฏร์บูรณะ17  แขวงบางปะกอก  เขตราษฎร์บูรณะ  กทม.10140",
    tel: "0 2427 6286 - 7, 0 2428 4538",
    fax: "0 2427 6288",
    geo: [13.68503, 100.498852],
  },
  {
    name: "สถานีตำรวจนครบาลราษฎร์บูรณะ",
    addr: "58 หมู่ 9  ซอยโรงกระดูก  ถนนราษฎร์บูรณะ  แขวงบางปะกอก เขตราษฎณ์บูรณะ  กทม.10140",
    tel: "0 2428 3994, 0 2427 6235, 0 2427 5421",
    fax: "",
    geo: [13.684208, 100.498499],
  },
  {
    name: "สถานีตำรวจนครบาลท่าข้าม",
    addr: "74 หมู่ 7  ถนนพระราม 2  แขวงแสมดำ  เขตบางขุนเทียน  กทม.10150",
    tel: "0 2416 2841 - 2",
    fax: "0 2415 1574",
    geo: [13.639238, 100.44698],
  },
  {
    name: "สถานีตำรวจนครบาลทุ่งครุ",
    addr: "7 หมู่ 2  ถนนประชาอุทิศ 93  แขวงทุ่งครุ  เขตทุ่งครุ   กทม. 10140",
    tel: "0 2426 0108 - 9, 0 2426 1110, 0 2426 1991",
    fax: "0 2426 1112",
    geo: [13.6275, 100.506937],
  },
  {
    name: "สถานีตำรวจนครบาลเทียนทะเล",
    addr: "9/22 - 26  หมู่7  ถนนบางขุนเทียน - ชายทะเล  แขวงท่าข้าม  เขตบางขุนเทียน  กทม.10150",
    tel: "0 2897 3271 - 5",
    fax: "",
    geo: [13.619991, 100.437713],
  },
  {
    name: "สถานีตำรวจนครบาลสายไหม",
    addr: "49/51 - 55   ถนนสายไหม  แขวงสายไหม  เขตสายไหม  กทม.10220",
    tel: "0 2531 5017, 0 2531 1921",
    fax: "0 2533 7297",
    geo: [13.919012, 100.645656],
  },
  {
    name: "สถานีตำรวจนครบาลบางเขน",
    addr: "41 หมู่ 3  ถนนพหลโยธิน  แขวงอนุสาวรีย์  เขตบางเขน  กทม.10220",
    tel: "0 2521 1193, 0 2521 2231, 0 2521 0070, 0 2521 0041",
    fax: "0 2970 6533, 0 2521 2233",
    geo: [13.874952, 100.598057],
  },
  {
    name: "สถานีตำรวจนครบาลพหลโยธิน",
    addr: "95  ถนนรัชดาภิเษก  แขวงจอมพล  เขตจตุจักร  กทม.10900",
    tel: "0 2512 2447 - 9",
    fax: "0 2512 2450",
    geo: [13.825846, 100.569851],
  },
  {
    name: "สถานีตำรวจนครบาลบางมด",
    addr: "107 หมู่ 10  ถนนพระราม 2  แขวงบางมด  เขตจอมทอง  กทม.10150",
    tel: "0 2416 7711 - 2, 0 2416 4713 - 4",
    fax: "0 2416 7710",
    geo: [13.673788, 100.455011],
  },
  {
    name: "สถานีตำรวจนครบาลบางขุนเทียน",
    addr: "123 หมู่ 3  ถนนเอกชัย   แขวงบางขุนเทียน  เขตจอมทอง  กทม.10150",
    tel: "0 2415 3004, 0 2415 0671, 0 2415 3475",
    fax: "0 2415 2826",
    geo: [13.685628, 100.444581],
  },
  {
    name: "สถานีตำรวจนครบาลบางบอน",
    addr: "62/11 - 16  ถนนบางบอน 5  แขวงบางบอน  เขตบางบอน  กทม.10150",
    tel: "0 2892 4271 - 5",
    fax: "0 2892 4279",
    geo: [13.640536, 100.370531],
  },
  {
    name: "สถานีตำรวจนครบาลหลักสอง",
    addr: "164/1  หมู่ 1  ถนนเพชรเกษม  98   แขวงบางแคเหนือ  เขตบางแค  กทม.10160",
    tel: "0 2421 7922 - 7",
    fax: "0 2421 1086",
    geo: [13.711699, 100.382217],
  },
  {
    name: "สถานีตำรวจนครบาลเพชรเกษม",
    addr: "50  หมู่ 1  ถนนเพชรเกษม   แขวงหลักสอง  เขตบางแค  กทม.10160",
    tel: "0 2455 1718 - 9, 0 2455 1791",
    fax: "",
    geo: [13.695774, 100.392384],
  },
  {
    name: "สถานีตำรวจนครบาลหนองแขม",
    addr: "44 หมู่ 8  ถนนเพชรเกษม 81  แขวงหนองแขม  เขตหนองแขม  กทม.10160",
    tel: "0 2429 3568 - 72",
    fax: "",
    geo: [13.676775, 100.345334],
  },
  {
    name: "สถานีตำรวจนครบาลศาลาแดง",
    addr: "23 หมู่ 6   ถนนเลียบคลองทวีวัฒนา  แขวงบางไผ่  เขตบางแค  กทม.10160",
    tel: "0 2421 7929 - 31, 0 2421 1951",
    fax: "0 2421 1951",
    geo: [13.751582, 100.353075],
  },
  {
    name: "สถานีตำรวจนครบาลหนองค้างพลู",
    addr: "116 - 118 หมู่ 11  แขวงหนองค้างพลู  เขตหนองแขม  กทม.10160",
    tel: "0 2421 5879 - 84",
    fax: "",
    geo: [13.713328, 100.351667],
  },
  {
    name: "สถานีตำรวจนครบาลลำหิน",
    addr: "72  หมู่ 8  ถนนคลองสิบ - สิบสี  ่แขวงคู้ฝั่งเหนือ  เขตหนองจอก  กทม.10530",
    tel: "0 2988 6622, 0 2988 6633, 0 2988 6054, 0 2988 6688",
    fax: "0 2988 6611",
    geo: [13.893986, 100.824547],
  },
  {
    name: "สถานีตำรวจนครบาลหนองจอก",
    addr: "152 หมู่ 8  ถนนผดุงพันธ์  แขวงหนองจอก  เขตหนองจอก  กทม.10530",
    tel: "0 2543 1155 - 7, 0 2543 1084 - 5",
    fax: "0 2543 1846",
    geo: [13.856727, 100.868148],
  },
  {
    name: "สถานีตำรวจนครบาลดอนเมือง",
    addr: "210  หมู่ 10  ถนนเตชะตุงคะ  แขวงสีกัน  เขตดอนเมือง  กทม.10210",
    tel: "0 2566 1381 - 2, 0 2566 1938, 0 2566 1940",
    fax: "0 2566 1491",
    geo: [13.934553, 100.605323],
  },
  {
    name: "สถานีตำรวจนครบาลทุ่งสองห้อง",
    addr: "444 หมู่ 1  ถนนวิภาวดีรังสิต  แขวงทุ่งสองห้อง  เขตหลักสี่  กทม.10210",
    tel: "0 2574 6464",
    fax: "0 2576 1940",
    geo: [13.88592, 100.576214],
  },
  {
    name: "สถานีตำรวจนครบาลบางพลัด",
    addr: "1848  ถนนจรัญสนิทวงศ์ 75  แขวงบางพลัด  เขตบางพลัด  กทม.10700",
    tel: "0 2424 1108, 0 2424 9239, 0 2424 3286",
    fax: "0 2435 1758",
    geo: [13.794624, 100.490507],
  },
  {
    name: "สถานีตำรวจนครบาลลาดกระบัง",
    addr: "171 หมู่ 3  แขวงลาดกระบัง  เขตลาดกระบัง  กทม. 10520",
    tel: "0 2326 8390 - 2",
    fax: "0 2326 8107",
    geo: [13.7215, 100.763506],
  },
  {
    name: "สถานีตำรวจนครบาลบางนา",
    addr: "90  หมู่  2  ถนนศรีนครินทร์  แขวงหนองบอน  เขต ประเวศ  กทม.10560",
    tel: "0 2396 1656 - 8, 0 2393 7151, 0 2396 0736, 0 2393 8219, 0 2393 9765",
    fax: "",
    geo: [13.673284, 100.644756],
  },
  {
    name: "สถานีตำรวจนครบาลพระโขนง",
    addr: "2007  ถนนสุขุมวิท 77 (อ่อนนุช)  แขวงพระโขนงเหนือ  เขตวัฒนา กทม. 10110",
    tel: "0 2332 2361 - 5",
    fax: "0 2331 8400",
    geo: [13.708872, 100.59968],
  },
  {
    name: "สถานีตำรวจนครบาลอุดมสุข",
    addr: "12 หมู่ 8  แขวงดอกไม้  เขตประเวศ  กทม.10260",
    tel: "0 2337 5544 - 46",
    fax: "0 2337 5547",
    geo: [13.675837, 100.683899],
  },
  {
    name: "สถานีตำรวจนครบาลธรรมศาลา",
    addr: "420 - 423 หมู่ 12  ถนนพุทธมณฑล สาย 3  แขวงศาลาธรรมสพน์  เขตทวีวัฒนา  กทม.10170",
    tel: "0 2441 3546",
    fax: "0 2441 3576",
    geo: [13.775547, 100.364478],
  },
  {
    name: "สถานีตำรวจนครบาลคันนายาว",
    addr: "1 หมู่ 13  ถนนคู้บอน แขวงคันนายาว  เขตคันนายาว    กทม.10230",
    tel: "0 2510 3619 - 22, 0-2510-3621",
    fax: "0 2510 9791",
    geo: [13.853285, 100.670392],
  },
  {
    name: "สถานีตำรวจนครบาลนิมิตรใหม่",
    addr: "99 หมู่ 12  ถนนไมตรีจิต  แขวงมีนบุรี  เขตมีนบุรี    กทม.10510",
    tel: "0 2569 1930, 0 2993 1502, 0 2569 1830 - 1",
    fax: "0 2569 1931",
    geo: [13.905641, 100.748427],
  },
  {
    name: "สถานีตำรวจนครบาลโชคชัย",
    addr: "ปากซอยโชคชัย 4  ถนนลาดพร้าว  แขวงวังทองหลาง  เขตวังทองหลาง  กทม.10310",
    tel: "0 2538 1599, 0 2538 3897",
    fax: "0 2538 7154",
    geo: [13.795343, 100.59337],
  },
  {
    name: "สถานีตำรวจนครบาลแสมดำ",
    addr: "76/19 - 21 หมู่ 5  ถนนพระราม 2  แขวงแสมดำ  เขตบางขุนเทียน  กทม.10150",
    tel: "0 2451 3245 - 6",
    fax: "",
    geo: [13.633747, 100.399966],
  },
  {
    name: "สถานีตำรวจนครบาลท่าเรือ",
    addr: "229  ถนนอาจณรงค์  แขวงคลองเตย  เขตคลองเตย  กทม.10110",
    tel: "02249 8888 90",
    fax: "0 2249 891",
    geo: [13.709242, 100.580728],
  },
  {
    name: "สถานีตำรวจนครบาลลำผักชี",
    addr: "68  หมู่ 9 ถนนสุวินทวงศ์  แขวงลำผักช ี เขตหนองจอ ก กทม.10530",
    tel: "0 2543 1086 - 7, 0 2543 1744",
    fax: "0 2988 0926",
    geo: [13.809499, 100.845977],
  },
  {
    name: "สถานีตำรวจนครบาลประชาชื่น",
    addr: "53  ถนนเทศบาลสงเคราะห์  แขวงลาดยาว  เขตจตุจักร  กทม.10900",
    tel: "0 2588 4246 - 9",
    fax: "0 2580 2125",
    geo: [13.842147, 100.546875],
  },
  {
    name: "สถานีตำรวจนครบาลปากคลองสาน",
    addr: "1421  ซอยลาดหญ้า21  ถนนลาดหญ้า  แขวงคลองสาน  เขตคลองสาน  กทม.10600",
    tel: "0 2438 1034 - 5, 0 2437 2111, 0 2437 1671",
    fax: "0 2438 1036",
    geo: [13.731141, 100.509806],
  },
  {
    name: "สถานีตำรวจนครบาลสุวินทวงศ์",
    addr: "10 - 12/10  หมู่ 12  ถนนสุวินทวงศ์  แขวงกระทุ่มราย  เขตหนองจอก  กทม.10530",
    tel: "0 2988 2460 - 1",
    fax: "0 2988 2454",
    geo: [13.806481, 100.929351],
  },
  {
    name: "สถานีตำรวจนครบาลปทุมวัน",
    addr: "1775  ซอยจุฬาฯ 5  ถนนบรรทัดทอง  แขวงวังใหม่  เขตปทุมวัน  กทม.10330",
    tel: "0 2221 5291 - 93, 0 2214 1042, 0 2214 1050, 0 2216 8821",
    fax: "0 2215 9104",
    geo: [13.736746, 100.523039],
  },
  {
    name: "สถานีตำรวจนครบาลจรเข้น้อย",
    addr: "555 หมู่ 1  แขวงทับยาว  เขตลาดกระบัง  กทม.10520",
    tel: "0 2326 9056, 0 2326 9991, 0 2326 9993, 0 2326 8085",
    fax: "0 2326 8120",
    geo: [13.717732, 100.791123],
  },
  {
    name: "สถานีตำรวจนครบาลประชาสำราญ",
    addr: "77  หมู่  9  ถนนแสนเกษม  แขวงคลองสิบสอง  เขตหนองจอก  กทม.10530",
    tel: "0 2543 1993 - 4",
    fax: "0 2543 1990",
    geo: [13.895139, 100.87659],
  },
  {
    name: "สถานีตำรวจนครบาลพลับพลาไชย 2",
    addr: "447  ถนนพลับพลาไชย  แขวงป้อมปราบ  เขตป้อมปราบศัตรูพ่าย  กทม.10100",
    tel: "0 2226 2148 - 52, 0 2222 4881",
    fax: "0 2225 7434",
    geo: [13.743778, 100.510631],
  },
];
