const hotels = [
  {hotel_id:"100101",name:"โรงแรม นูโว ซืตี้",dcode:"1001",dname:"เขตพระนคร",tel:"0 2282 7500",address:"2 ถนน สามเสนซอย 2 แขวงบางลำพู เขตพระนคร กรุงเทพฯ 10200",url:"www.nouvocityhotel.com",room:"72",grade:"4",name_e:"Nouvo City Hotel",lat:13.76281762,lon:100.4993206},
{hotel_id:"100102",name:"โรงแรม ศิริ เฮอริเทจ แบงค็อก",dcode:"1001",dname:"เขตพระนคร",tel:"0 2224 0095",address:"10 ซอยศิริอำมาตย์ แขวงศาลเจ้าพ่อเสือ เขตพระนคร กรุงเทพฯ 10200",url:"www.siriheritagebangkok.com/blank",room:"-",grade:"3",name_e:"SiRi Heritage Bangkok Hotel",lat:13.75551166,lon:100.4966941},
{hotel_id:"100103",name:"โรงแรม ไอบิส สไตล์ กรุงเทพ ข้าวสาร เวียงใต้",dcode:"1001",dname:"เขตพระนคร",tel:"0 2280 5434",address:"42 ซอยรามบุตรี ถนนตานี แขวงตลาดยอด เขตพระนคร กรุงเทพ 10200",url:"www.facebook.com/ibisStylesKhaosan/",room:"-",grade:"3",name_e:"ibis Styles Bangkok Khaosan Viengtai",lat:13.75993547,lon:100.4976007},
{hotel_id:"100104",name:"โรงแรม ศิริ โอเรียนเต็ล แบงค็อก โฮเต็ล",dcode:"1001",dname:"เขตพระนคร",tel:"0 2622 2935",address:"120 ถนน บุญศิริ แขวง ศาลเจ้าพ่อเสือ เขตพระนคร กรุงเทพมหานคร 10200",url:"www.facebook.com/TWHBKK/",room:"-",grade:"3",name_e:"Siri Oriental Bangkok Hotel",lat:13.75442029,lon:100.4977876},
{hotel_id:"100105",name:"โรงแรม ศิริ พอชเทล แบงค็อก",dcode:"1001",dname:"เขตพระนคร",tel:"09 4481 1681",address:"114 ถนนแพร่งสรรพศาสตร์ แขวงศาลเจ้าพ่อเสือ เขตพระนคร กรุงเทพฯ",url:"www.facebook.com/siriposhtelbangkok/",room:"-",grade:"3",name_e:"SiRi Poshtel Bangkok",lat:13.75315555,lon:100.4976593},
{hotel_id:"100401",name:"โรงแรม รอยัล ออคิด เชอราตัน โฮเทล แอนด์ ทาวเวอร์",dcode:"1004",dname:"เขตบางรัก",tel:"0 2665 3165",address:"2 ถนนเจริญกรุง ซอย 30 แขวงสี่พยา เขตบางรัก กรุงเทพฯ 10500",url:"www.marriott.com/en-us/hotels",room:"755",grade:"5",name_e:"Royal Orchid Sheraton Hotel & Towers",lat:13.72919466,lon:100.5135312},
{hotel_id:"100402",name:"โรงแรม แชงกรี - ลา",dcode:"1004",dname:"เขตบางรัก",tel:"0 2236 7777",address:"89 ซอยวัดสวนพูล แขวงบางรัก เขตบางรัก กรุงเทพฯ 10500",url:"www.shangri-la.com/bangkok",room:"890",grade:"5",name_e:"Shangri-La Hotel Bangkok",lat:13.72150849,lon:100.513972},
{hotel_id:"100403",name:"โรงแรม พูลแมน จี กรุงเทพ",dcode:"1004",dname:"เขตบางรัก",tel:"0 2352 4000",address:"188 ถนนสีลม แขวงสุริยวงศ์ เขตบางรัก กรุงเทพฯ 10500",url:"www.pullmanbangkokhotelg.com/th/",room:"469",grade:"5",name_e:"Pullman Bangkok Hotel G",lat:13.72622627,lon:100.5258467},
{hotel_id:"100404",name:"โรงแรม ฮอลิเดย์ อินน์ กรุงเทพฯ สีลม",dcode:"1004",dname:"เขตบางรัก",tel:"0 2207 4300",address:"981 ถนน สีลม แขวงสีลม เขตบางรัก กรุงเทพ  10500",url:"www.ihg.com/holidayinn/hotels/us/en/bangkok/bnkth",room:"727",grade:"4",name_e:"Holiday Inn Bangkok Silom",lat:13.72246627,lon:100.5199234},
{hotel_id:"100405",name:"โรงแรม นารายณ์",dcode:"1004",dname:"เขตบางรัก",tel:"0 2237 0100",address:"222 ถนนสีลม แขวงสุริยวงศ์ เขตบางรัก กรุงเทพ 10500",url:"https://www.naraihotel.co.th/",room:"500",grade:"4",name_e:"Narai Hotel",lat:13.72596361,lon:100.5244674},
{hotel_id:"100406",name:"โรงแรม แบงค็อก แมริออท เดอะ สุรวงศ์",dcode:"1004",dname:"เขตบางรัก",tel:"0 2088 5666",address:"262 ซอยสุรวงศ์ แขวงสี่พระยา เขตบางรัก กรุงเทพฯ 10500",url:"www.marriott.com",room:"-",grade:"5",name_e:"Bangkok Marriott Hotel The Surawongse",lat:13.72742342,lon:100.5222762},
{hotel_id:"100407",name:"โรงแรม โซ แบงคอก",dcode:"1004",dname:"เขตบางรัก",tel:"0 2624 0000",address:"2 ถนนสาธรเหนือ แขวงสีลม เขตบางรัก กรุงเทพ 10500",url:"https://www.so-bangkok.com/th/",room:"-",grade:"5",name_e:"So Bangkok",lat:13.72620945,lon:100.5431001},
{hotel_id:"100408",name:"โรงแรม บัญดารา สวีท สีลม กรุงเทพฯ",dcode:"1004",dname:"เขตบางรัก",tel:"0 2266 0505",address:"75/1 ซอยศาลาแดง 1 ถนนศาลาแดง แขวงสีลม เขตบางรัก กรุงเทพฯ 10500",url:"www.bandaragroup.com/bandara-suites-silom-bangkok",room:"-",grade:"4",name_e:"Bandara Suites Silom, Bangkok",lat:13.72587818,lon:100.5382437},
{hotel_id:"100409",name:"โรงแรม ฮอลิเดย์ อินน์ เอ็กซ์เพรส กรุงเทพ สาทร",dcode:"1004",dname:"เขตบางรัก",tel:"0 2660 2800",address:"51 ซอยพิพัฒน์ แขวงสีลม เขตบางรัก กรุงเทพฯ 10500",url:"www.ihg.com/holidayinnexpress/hotels/th/th/bangkok",room:"-",grade:"3",name_e:"Holiday Inn Express Bangkok Sathorn",lat:13.72402677,lon:100.5307053},
{hotel_id:"100410",name:"โรงแรม เดอะรายา สุรวงศ์ กรุงเทพ",dcode:"1004",dname:"เขตบางรัก",tel:"0 2238 0969",address:"24-30 ซอยสุรวงศ์ แขวงสี่พระยา เขตบางรัก กรุงเทพฯ 10500",url:"https://therayabangkok.com/en/",room:"-",grade:"3",name_e:"The Raya Surawong Bangkok Hotel",lat:13.73052276,lon:100.5326891},
{hotel_id:"100601",name:"โรงแรม อเล็กซานเดอร์ กรุงเทพฯ",dcode:"1006",dname:"เขตบางกะปิ",tel:"0 2715 8888",address:"1 ซอยรามคำแหง 83/3 (อเล็กซานเดอร์) แขวงหัวหมาก เขตบางกะปิ กรุงเทพฯ 10240",url:"www.alexanderhotel.co.th",room:"308",grade:"3",name_e:"Alexander Hotel Bangkok",lat:13.76373857,lon:100.6385581},
{hotel_id:"100602",name:"โรงแรม เดอะ แกรนด์ โฟร์วิงส์ คอนเวนชั่น โฮเทล",dcode:"1006",dname:"เขตบางกะปิ",tel:"0 2378 8000",address:"333 ถนนศรีนครินทร์ แขวงหัวหมาก เขตบางกะปิ กรุงเทพ 10240",url:"https://www.grandfourwings.com/",room:"450",grade:"4",name_e:"The Grand Fourwings Convention Hotel Bangkok",lat:13.75437103,lon:100.647185},
{hotel_id:"100603",name:"โรงแรม เดอะ พันธุ์ทิพย์ โฮเต็ล ลาดพร้าว",dcode:"1006",dname:"เขตบางกะปิ",tel:"0 2184 4899",address:"3191,38 ซอยลาดพร้าว 127 แขวงคลองจั่น เขตบางกะปิ กรุงเทพฯ 10240",url:"www.thepantiphotels.com/th",room:"-",grade:"3",name_e:"The Pantip Hotel Ladprao Bangkok",lat:13.76711971,lon:100.6465991},
{hotel_id:"100701",name:"โรงแรม คอนราด กรุงเทพ",dcode:"1007",dname:"เขตปทุมวัน",tel:"0 2690 9999",address:"87/3 ถนนวิทยุ แขวงลุมพินี เขตปทุมวัน กทม. 10330",url:"www.hilton.com/en/conrad/",room:"500",grade:"5",name_e:"Conrad Bangkok Hotel",lat:13.73928288,lon:100.548447},
{hotel_id:"100702",name:"โรงแรม อินเตอร์คอนติเนนตัล กรุงเทพฯ",dcode:"1007",dname:"เขตปทุมวัน",tel:"0 2656 0444",address:"973 ถนน เพลินจิต แขวง ลุมพินี เขตปทุมวัน กรุงเทพมหานคร 10330",url:"https://bangkok.intercontinental.com/",room:"381",grade:"5",name_e:"InterContinental Bangkok",lat:13.74466065,lon:100.5413252},
{hotel_id:"100703",name:"โรงแรม ปทุมวัน ปริ๊นเซส",dcode:"1007",dname:"เขตปทุมวัน",tel:"0 2216 3700",address:"444 MBK Center ถนนพญาไท แขวงวังใหม่ เขตปทุมวัน กรุงเทพฯ 10330",url:"www.pprincess.com",room:"455",grade:"5",name_e:"Pathumwan Princess Hotel",lat:13.74328667,lon:100.5297114},
{hotel_id:"100704",name:"โรงแรม เซ็นทารา แกรนด์ แอท เซ็นทรัลเวิลด์",dcode:"1007",dname:"เขตปทุมวัน",tel:"0 2102 1234",address:"999/99 ถนนพระราม1 เขตปทุมวัน กทม. 10330",url:"www.centarahotelsresorts.com/centaragrand/cgcw",room:"505",grade:"5",name_e:"Centara Grand at CentralWorld",lat:13.74593695,lon:100.5395951},
{hotel_id:"100705",name:"โรงแรม แกรนด์ เซ็นเตอร์พอยต์ ราชดำริ",dcode:"1007",dname:"เขตปทุมวัน",tel:"0 2091 9000",address:"153/2 ถนนราชดำริ แขวงลุมพินี เขตปทุมวัน กรุงเทพฯ 10330",url:"https://grandecentrepointratchadamri.com/",room:"497",grade:"5",name_e:"Grande Centre Point Ratchadamri",lat:13.74186073,lon:100.5409648},
{hotel_id:"100706",name:"โรงแรม อนันตรา สยาม กรุงเทพฯ",dcode:"1007",dname:"เขตปทุมวัน",tel:"0 2126 8866",address:"155 ถนนราชดำริ แขวงลุมพินี เขตปทุมวัน กรุงเทพฯ 10330",url:"www.anantara.com/th/siam-bangkok",room:"354",grade:"5",name_e:"Anantara Siam Bangkok Hotel",lat:13.74096163,lon:100.5401914},
{hotel_id:"100707",name:"โรงแรม ดิ แอทธินี โฮเทล แบงค็อก อะลักซ์ชูรี คอลเล็คชั่น โฮเทล",dcode:"1007",dname:"เขตปทุมวัน",tel:"0 2650 8800",address:"61 ถนนวิทยุ แขวงลุมพินี เขตปทุมวัน กรุงเทพฯ 10330",url:"https://th.theatheneebangkok.com/",room:"-",grade:"5",name_e:"The Athenee Hotel, a Luxury Collection Hotel, Bangkok",lat:13.74127312,lon:100.5481919},
{hotel_id:"100708",name:"โรงแรม สินธร มิดทาวน์",dcode:"1007",dname:"เขตปทุมวัน",tel:"0 2796 8888",address:"6565 ซอยหลังสวน 2 แขวงลุมพินี เขตปทุมวัน กรุงเทพฯ10330",url:"www.ihg.com/vignettecollection/hotels",room:"-",grade:"4",name_e:"Sindhorn Midtown Hotel Bangkok",lat:13.73796348,lon:100.5426222},
{hotel_id:"100709",name:"โรงแรม ดิ โอกุระ เพรสทีจ กรุงเทพ",dcode:"1007",dname:"เขตปทุมวัน",tel:"0 2687 9000",address:"57 ถนนวิทยุ แขวงลุมพินี เขตปทุมวัน กรุงเทพฯ 10330",url:"www.okurabangkok.com/",room:"-",grade:"5",name_e:"The Okura Prestige Bangkok",lat:13.74262976,lon:100.5480714},
{hotel_id:"100710",name:"โรงแรม แกรนด์ เซ็นเตอร์พอยต์ เพลินจิต",dcode:"1007",dname:"เขตปทุมวัน",tel:"0 2055 9000",address:"100 ถนนวิทยุ แขวงลุมพินี เขตปทุมวัน กรุงเทพฯ 10330",url:"www.facebook.com/gcpploenchit/",room:"-",grade:"4",name_e:"Grande Centre Point Ploenchit",lat:13.74236596,lon:100.5468953},
{hotel_id:"100801",name:"โรงแรม รอยัลปริ๊นเซส หลานหลวง",dcode:"1008",dname:"เขตป้อมปราบศัตรูพ่าย",tel:"0 2281 3088",address:"269 ถนนหลานหลวง แขวงวัดโสมนัส เขตป้อมปราบศัตรูพ่าย กรุงเทพฯ 10100",url:"www.royalprincesslarnluang.com/",room:"167",grade:"4",name_e:"Royal Princess Larn Luang",lat:13.75740201,lon:100.5127969},
{hotel_id:"101501",name:"โรงแรม อนันตรา กรุงเทพริเวอร์ไซต์ รีสอร์ทแอนท์สปา",dcode:"1015",dname:"เขตธนบุรี",tel:"0 2476 0022",address:"257/1-3 ถนนเจริญนคร แขวงสำเหร่ เขตธนบุรี กทม. 10600",url:"www.anantara.com/th/riverside-bangkok",room:"376",grade:"5",name_e:"Anantara Bangkok Riverside Resort & Spa",lat:13.7045533,lon:100.4927096},
{hotel_id:"101701",name:"โรงแรม สวิสโฮเต็ล กรุงเทพฯ รัชดา",dcode:"1017",dname:"เขตห้วยขวาง",tel:"0 2694 2222",address:"204 ถนนรัชดาภิเษก แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพฯ 10320",url:"https://www.swissotelbangkok.com/th/",room:"407",grade:"5",name_e:"Swissotel Bangkok Ratchada",lat:13.77609075,lon:100.5740751},
{hotel_id:"101702",name:"โรงแรม เอ-วัน กรุงเทพ",dcode:"1017",dname:"เขตห้วยขวาง",tel:"0 2718 1030-43",address:"9 ซอยศูนย์วิจัย 4 ถนนเพชรบุรีตัดใหม่ กรุงเทพฯ 10310",url:"https://www.a-onehotel.com/",room:"218",grade:"4",name_e:"A-One Bangkok Hotel",lat:13.74627033,lon:100.5868213},
{hotel_id:"101703",name:"โรงแรม โกลเด้นทิวลิป ซอฟเฟอริน กรุงเทพ",dcode:"1017",dname:"เขตห้วยขวาง",tel:"0 2641 4777",address:"92 ซอยโรงพยาบาลพระราม 9 แขวงบางกะปิ เขตห้วยขวาง กรุงเทพ 10310",url:"https://sovereign-bangkok.goldentulip.com/en-us/",room:"448",grade:"4",name_e:"Golden Tulip Sovereign Hotel Bangkok",lat:13.75341514,lon:100.5721018},
{hotel_id:"101704",name:"โรงแรม อวานี เอเทรียม กรุงเทพฯ",dcode:"1017",dname:"เขตห้วยขวาง",tel:"0 2718 2000-1",address:"1880 ถนนเพชรบุรีตัดใหม่ กรุงเทพฯ 10310",url:"https://www.avanihotels.com/th/atrium-bangkok",room:"592",grade:"4",name_e:"Avani Atrium Bangkok",lat:13.74764011,lon:100.5705283},
{hotel_id:"101705",name:"โรงแรม มีสไตล์ เพลส",dcode:"1017",dname:"เขตห้วยขวาง",tel:"0 2690 5885",address:"22 ซอย 20 มิถุนา แขวงสามเสนนอก เขตห้วยขวาง กรุงเทพฯ 10310",url:"www.facebook.com/mestyleplacehotel/",room:"-",grade:"3",name_e:"MeStyle Place Hotel",lat:13.78434368,lon:100.5838967},
{hotel_id:"101801",name:"โรงแรม รามาดา พลาซ่า บาย วินด์แฮม แบงคอก แม่น้ำ ริเวอร์ไซด์",dcode:"1018",dname:"เขตคลองสาน",tel:"0  2688 1000",address:"2074 ถนนเจริญกรุง แขวงวัดพระยาไกร เขตบางคอแหลม กรุงเทพฯ 1012",url:"www.wyndhamhotels.com/ramada",room:"722",grade:"5",name_e:"Ramada Plaza By Wyndham Bangkok Menam Riverside",lat:13.70754767,lon:100.5057464},
{hotel_id:"102501",name:"โรงแรม เอส.ดี. อเวนิว",dcode:"1025",dname:"เขตบางพลัด",tel:"0 2813 3111",address:"94 ถนนบรมราชชนนี  แขวงบางบำหรุ เขตบางพลัด กรุงเทพฯ 10700",url:"https://www.sdavenue.com/",room:"315",grade:"3",name_e:"S.D. Avenue Hotel",lat:13.77613136,lon:100.4801226},
{hotel_id:"102801",name:"โรงแรม สุโขทัย กรุงเทพฯ",dcode:"1028",dname:"เขตสาทร",tel:"0 2344 8888",address:"13/3 ถนนสาทรใต้ แขวงทุ่งมหาเมฆ เขตสาทร กรุงเทพฯ 10120",url:"www.sukhothai.com/bangkok/en",room:"210",grade:"5",name_e:"The Sukhothai Bangkok",lat:13.72333247,lon:100.5406034},
{hotel_id:"102802",name:"โรงแรม พินนาเคิล ลุมพินี พาร์ค โฮเทล",dcode:"1028",dname:"เขตสาทร",tel:"0 2287 0112",address:"17 ซอยงามดูพลี แขวงทุ่งมหาเมฆ เขตสาทร กรุงเทพฯ 10120",url:"www.facebook.com/pinnaclelumpineeparkhotel/",room:"179",grade:"3",name_e:"Pinnacle Lumpinee Park Hotel",lat:13.72355565,lon:100.5482791},
{hotel_id:"102803",name:"โรงแรม มาเลเซีย",dcode:"1028",dname:"เขตสาทร",tel:"0 2679 7127",address:"54 ซอยงามดูพลี แขวงทุ่งมหาเมฆ เขตสาทร กรุงเทพ 10120",url:"www.malaysiahotelbkk.com",room:"120",grade:"3",name_e:"Malaysia Hotel",lat:13.72212263,lon:100.5461616},
{hotel_id:"103001",name:"โรงแรม เซ็นทารา แกรนด์ เซ็นทรัลพลาซา ลาดพร้าว กรุงเทพฯ",dcode:"1030",dname:"เขตจตุจักร",tel:"0 2541 1234",address:"1695 ถนนพหลโยธิน แขวงลาดพร้าว เขตจตุจักร กทม. 10900",url:"www.centarahotelsresorts.com/centaragrand/",room:"565",grade:"5",name_e:"Centara Grand at Central Plaza Ladprao Bangkok",lat:13.81803142,lon:100.5600378},
{hotel_id:"103002",name:"โรงแรม มารวยการ์เด้น",dcode:"1030",dname:"เขตจตุจักร",tel:"0 261 0510 -47",address:"1 ถนนพหลโยธิน แขวงเสนานิคม เขตจตุจักร กรุงเทพฯ 10900",url:"www.maruaygardenhotel.com/",room:"-",grade:"4",name_e:"Maruay Garden Hotel",lat:13.84547213,lon:100.5801099},
{hotel_id:"103003",name:"โรงแรม ศิริ รัชดา แบงค็อค",dcode:"1030",dname:"เขตจตุจักร",tel:"0 2117 2800",address:"296 ซอยรัชดาภิเษก 32 แขวงจันทรเกษม เขตจตุจักร กรุงเทพฯ 10900",url:"www.siriratchadabangkok.com/index.php/th/",room:"-",grade:"3",name_e:"SiRi Ratchada Bangkok",lat:13.81735319,lon:100.5812706},
{hotel_id:"103301",name:"โรงแรม เซนต์เจมส์",dcode:"1033",dname:"เขตคลองเตย",tel:"0 2261 0890-7",address:"18 ซอยสุขุมวิท26 ถนนสุขุมวิท แขวงคลองตัน เขตคลองเตย กรุงเทพฯ 10110",url:"http://www.stjamesbangkok.com",room:"78",grade:"3",name_e:"St. James Hotel",lat:13.72784902,lon:100.5697954},
{hotel_id:"103302",name:"โรงแรม แบงค็อก แมริออท มาร์คีส์ ควีนส์ปาร์ค",dcode:"1033",dname:"เขตคลองเตย",tel:"0 2059 5555",address:"199 ซอยสุขุมวิท 22 แขวงคลองตัน เขตคลองเตย กรุงเทพฯ 10110",url:"www.marriott.com",room:"196",grade:"5",name_e:"Bangkok Marriott Marquis Queen's Park",lat:13.73022582,lon:100.5656042},
{hotel_id:"103303",name:"โรงแรม เดอะ โฟร์วิงส์ กรุงเทพ",dcode:"1033",dname:"เขตคลองเตย",tel:"0 2260 2100",address:"40 สุขุมวิท 26 แขวงคลองตัน เขตคลองเตย กรุงเทพฯ 10110",url:"www.fourwingshotel.com/",room:"327",grade:"4",name_e:"The Four Wings Hotel Bangkok",lat:13.72478564,lon:100.568231},
{hotel_id:"103401",name:"โรงแรม บางกอก รามา",dcode:"1034",dname:"เขตสวนหลวง",tel:"0 2722 6602",address:"1788 ซอยพัฒนาการ 48 แขวงสวนหลวง แขวงสวนหลวง กรุงเทพ 10240",url:"www.bangkok-hotel.com",room:"78",grade:"3",name_e:"Bangkok Rama Hotel",lat:13.73548593,lon:100.6326659},
{hotel_id:"103601",name:"โรงแรม อมารี ดอนเมือง แอร์พอร์ต กรุงเทพฯ",dcode:"1036",dname:"เขตดอนเมือง",tel:"0 2566 1020",address:"333 ถนนเชิดวุฒากาศ แขวงดอนเมือง เขตดอนเมือง กรุงเทพฯ10210",url:"https://www.amari.com/donmuang",room:"449",grade:"4",name_e:"Amari Don Muang Airport Bangkok",lat:13.92072535,lon:100.6003765},
{hotel_id:"103701",name:"โรงแรม อมารีวอเตอร์เกท กรุงเทพ",dcode:"1037",dname:"เขตราชเทวี",tel:"0 2653 9000",address:"847 ถนนเพชรบุรี แขวงประตูน้ำ เขตราชเทวี กทม. 10400",url:"https://th.amari.com/watergate",room:"569",grade:"5",name_e:"Amari Watergate Bangkok",lat:13.75126655,lon:100.5401663},
{hotel_id:"103702",name:"โรงแรม เดอะ สุโกศล กรุงเทพ",dcode:"1037",dname:"เขตราชเทวี",tel:"0 2247 0123",address:"477 ถนนศรีอยุธยา แขวงถนนพญาไท เขตราชเทวี กรุงเทพฯ 10400",url:"https://www.thesukosol.com/th/",room:"518",grade:"5",name_e:"The Sukosol Bangkok",lat:13.75816093,lon:100.536235},
{hotel_id:"103703",name:"โรงแรม เซ็นจูรี่ พาร์ค กรุงเทพ",dcode:"1037",dname:"เขตราชเทวี",tel:"0 2246 7800",address:"9 ถนนราชปรารภ แขวงมักกะสัน เขตราชเทวี กรุงเทพฯ 10400",url:"www.centuryparkhotel.com",room:"380",grade:"4",name_e:"Century Park Hotel Bangkok",lat:13.76209568,lon:100.5430392},
{hotel_id:"103704",name:"โรงแรม อินทรา รีเจนท์",dcode:"1037",dname:"เขตราชเทวี",tel:"0 2208 0022-33",address:"120/126 ถนนราชปรารภ แขวงถนนพญาไท เขตราชเทวี กรุงเทพ 10400",url:"https://www.indrahotel.com/",room:"439",grade:"4",name_e:"Indra Regent Hotel",lat:13.75315784,lon:100.5412791},
{hotel_id:"103705",name:"โรงแรม อีสติน มักกะสัน กรุงเทพฯ",dcode:"1037",dname:"เขตราชเทวี",tel:"0 2651 7600",address:"1091/343 ถนนเพชรบุรีตัดใหม่ แขวงมักกะสัน เขตราชเทวี กรุงเทพฯ 10400",url:"www.eastinhotelsresidences.com/",room:"280",grade:"4",name_e:"Eastin Hotel Makkasan Bangkok",lat:13.75312251,lon:100.5469197},
{hotel_id:"103706",name:"โรงแรม เอเชีย กรุงเทพ กรุงเทพมหานคร",dcode:"1037",dname:"เขตราชเทวี",tel:"0 2217 0808",address:"296 ถ. พญาไท แขวง ถนนเพชรบุรี เขตราชเทวี กรุงเทพฯ 10400",url:"www.asiahotel.co.th/asia_bangkok/",room:"638",grade:"4",name_e:"Asia Hotel Bangkok",lat:13.7514154,lon:100.5307813},
{hotel_id:"103707",name:"โรงแรม แกรนด์ ไดมอนด์ สวีท โฮเทล",dcode:"1037",dname:"เขตราชเทวี",tel:"0 2656 6888",address:"888 ถนนเพชรบุรี  แขวงประตูน้ำ เขตราชเทวี กรุงเทพฯ 10400",url:"www.granddiamondsuites.com",room:"176",grade:"4",name_e:"Grand Diamond Suites Hotel",lat:13.75055337,lon:100.5385711},
{hotel_id:"103708",name:"โรงแรม พูลแมน คิง เพาเวอร์ กรุงเทพ",dcode:"1037",dname:"เขตราชเทวี",tel:"0 2680 9999",address:"8/2 ถนนรางน้ำ แขวงถนนพญาไท เขตราชเทวี กรุงเทพฯ 10400",url:"https://www.pullmanbangkokkingpower.com/",room:"366",grade:"5",name_e:"Pullman Bangkok King Power",lat:13.75941646,lon:100.5378338},
{hotel_id:"103709",name:"โรงแรม วีกรุงเทพ - เอ็มแกลเลอรี่",dcode:"1037",dname:"เขตราชเทวี",tel:"0 2309 3939",address:"117, 39-40 ถนนพญาไท แขวง ถนนเพชรบุรี",url:"https://www.viehotelbangkok.com/th/",room:"154",grade:"5",name_e:"Vie Hotel Bangkok",lat:13.7505938,lon:100.5320799},
{hotel_id:"103710",name:"โรงแรม เดอะ เบอร์เคลีย์ โฮเต็ล ประตูน้ำ",dcode:"1037",dname:"เขตราชเทวี",tel:"0 2309 9999",address:"559 ถนนราชปรารภ แขวงมักกะสัน เขตราชเทวี กรุงเทพฯ 10400",url:"www.berkeleypratunam.com/",room:"-",grade:"5",name_e:"The Berkeley Hotel Pratunam",lat:13.74998243,lon:100.5431447},
{hotel_id:"103901",name:"โรงแรม เดอะ เวสทิน แกรนด์ สุขุมวิท",dcode:"1039",dname:"เขตวัฒนา",tel:"0 2207 8000",address:"259 ถนนสุขุมวิท แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพฯ 10110",url:"https://th.westingrandesukhumvit.com/",room:"368",grade:"5",name_e:"The Westin Grande Sukhumvit",lat:13.7384896,lon:100.559584},
{hotel_id:"103902",name:"โรงแรม บูเลอวาร์ด กรุงเทพฯ สุขุมวิท",dcode:"1039",dname:"เขตวัฒนา",tel:"0 2255 2930",address:"2 ซอยสุขุมวิท 5 แขวงคลองเตย เขตวัฒนา กรุงเทพฯ 10110",url:"www.facebook.com/boulevardhotelbangkok/",room:"315",grade:"4",name_e:"Boulevard Hotel Bangkok",lat:13.74204736,lon:100.5544386},
{hotel_id:"103903",name:"โรงแรม แบงค็อก โฮเทล โลตัส สุขุมวิท",dcode:"1039",dname:"เขตวัฒนา",tel:"0 2610 0111",address:"1 ซอยสุขุมวิท 33 แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพฯ 10110",url:"www.hotellotussukhumvit.com",room:"224",grade:"4",name_e:"Bangkok Hotel Lotus Sukhumvit",lat:13.73338077,lon:100.5669844},
{hotel_id:"103904",name:"โรงแรม แอมบาสซาเดอร์ กรุงเทพฯ",dcode:"1039",dname:"เขตวัฒนา",tel:"0 2254 0444",address:"171 สุขุมวิท ซอย 11 ถนนสุขุมวิท แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพฯ 10110",url:"https://www.ambassadorbkk.com/th/",room:"764",grade:"4",name_e:"Ambassador Hotel Bangkok",lat:13.74221216,lon:100.5569733},
{hotel_id:"103905",name:"โรงแรม ไฮแอท รีเจนซี่ กรุงเทพฯ สุขุมวิท",dcode:"1039",dname:"เขตวัฒนา",tel:"0 2098 1234",address:"1 ซอยสุขุมวิท 13 แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพมหานคร 10110",url:"www.hyatt.com/",room:"-",grade:"5",name_e:"Hyatt Regency Bangkok Sukhumvit",lat:13.741306,lon:100.557328},
{hotel_id:"103906",name:"โรงแรม ไทปัน",dcode:"1039",dname:"เขตวัฒนา",tel:"0 2260 9888",address:"25 ซอยสุขุมวิท 23 แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพฯ 10110",url:"www.taipanhotel.com/index.html",room:"-",grade:"3",name_e:"Tai-Pan Hotel",lat:13.73856086,lon:100.5626081},
{hotel_id:"103907",name:"โรงแรม แกรนด์ เซ็นเตอร์พอยท์ สุขุมวิท 55",dcode:"1039",dname:"เขตวัฒนา",tel:"0 2020 8000",address:"300 ซอยสุขุมวิท 55 แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพฯ 10110",url:"www.facebook.com/gcpsukhumvit55/",room:"-",grade:"5",name_e:"Grande Centre Point Sukhumvit 55",lat:13.73138478,lon:100.5823107},
{hotel_id:"103908",name:"โรงแรม แกรนด์ เซ็นเตอร์พอยต์ เทอมินัล 21",dcode:"1039",dname:"เขตวัฒนา",tel:"0 2056 9000",address:"2 ซอยสุขุมวิท 19 ถนนสุขุมวิท แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพฯ 10110",url:"www.facebook.com/gcpterminal21/",room:"-",grade:"5",name_e:"Grande Centre Point Terminal 21",lat:13.73803164,lon:100.5605334},
{hotel_id:"104101",name:"โรงแรม รามาการ์เด้นส์",dcode:"1041",dname:"เขตหลักสี่",tel:"0 2558 7888",address:"9/9 ถนนวิภาวดีรังสิต เขตหลักสี่ กรุงเทพฯ 10210",url:"http://www.ramagardenshotel.com/",room:"500",grade:"4",name_e:"Rama Gardens Hotel Bangkok",lat:13.85962895,lon:100.5714261},
{hotel_id:"104102",name:"โรงแรม ไมด้า ดอนเมือง แอร์พอร์ต",dcode:"1041",dname:"เขตหลักสี่",tel:"0 2574 1648",address:"99/401-486 ซอยแจ้งวัฒนะ 10 แขวงทุ่งสองห้อง เขตหลักสี่ กรุงเทพฯ 10210",url:"www.midahoteldonmueangairport.com/th/",room:"-",grade:"4",name_e:"Mida Hotel Don Mueang Airport",lat:13.88941169,lon:100.5785845},
{hotel_id:"104103",name:"โรงแรม ทีเค. พาเลซ แอนด์ คอนเวนชั่น",dcode:"1041",dname:"เขตหลักสี่",tel:"0 2574 1588",address:"54/7 ซอยแจ้งวัฒนะ 15 ถนนแจ้งวัฒนะ แขวงทุ่งสองห้อง เขตหลักสี่ กรุงเทพฯ 10210",url:"www.tkpalace.com/th/",room:"-",grade:"4",name_e:"TK. Palace Hotel",lat:13.89160026,lon:100.5615375},
{hotel_id:"104301",name:"โรงแรม คิว-บ็อกซ์ บลอสซัม",dcode:"1043",dname:"เขตคันนายาว",tel:"06 1417 3999",address:"90/1 ถนนรามอินทรา แขวงรามอินทรา เขตคันนายาว กรุงเทพฯ 10230",url:"www.qboxblossom.com/",room:"-",grade:"3",name_e:"Q-Box Hotel Bangkok Blossom",lat:13.81850125,lon:100.6805439},
{hotel_id:"104501",name:"โรงแรม เอสซี ปาร์ค",dcode:"1045",dname:"เขตวังทองหลาง",tel:"0 2530 0565",address:"474 ซอยประดิษฐ์มนูญธรรม แขวงวังทองหลาง เขตวังทองหลาง กรุงเทพฯ 10310",url:"www.scparkhotel.com/th/",room:"237",grade:"4",name_e:"SC Park Hotel",lat:13.76803352,lon:100.6040114},
]