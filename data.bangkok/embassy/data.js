const embassys = [
  {
    id: "1",
    name: "สถานเอกอัครราชทูตสาธารณรัฐประชาชนบังกลาเทศ",
    name_e: "The Embassy of the People's Republic of Bangladesh",
    address: "47/8 ถนนสุขุมวิท63 (เอกมัย) แขวงคลองตันเหนือ เขตวัฒนา กทม. 10110",
    dcode: "1039",
    dname: "วัฒนา",
    tel: "0 2390 5107-8",
    fax: "0 2390 5106",
    url: "www.bdembassybangkok.org",
    OfficeHour: "วันจันทร์-วันศุกร์ เวลา 09.00 - 17.00 น.",
    mail: "mission.bangkok@mofa.gov.bd",
    lat: 13.73885391,
    lng: 100.591709,
  },
  {
    id: "2",
    name: "สถานเอกอัครราขทูตอินเดีย ประจำประเทศไทย",
    name_e: "The Embassy of the Republic of India",
    address:
      "46 ถนนสุขุมวิท 23 (ประสานมิตร) ถนนสุขุมวิท แขวงคลองเตยเหนือ เขตวัฒนา กทม. 10110",
    dcode: "1039",
    dname: "วัฒนา",
    tel: "0 2258 0300-6",
    fax: "0 2258 4627",
    url: "www.indianembassy.in.th",
    OfficeHour: "วันจันทร์-วันศุกร์เวลา 08.30 - 17.00 น.",
    mail: "indiaemb@indianembassy.in.th",
    lat: 13.74229489,
    lng: 100.5638997,
  },
  {
    id: "3",
    name: "สถานทูตญี่ปุ่น ประจำประเทศไทย",
    name_e: "The Embassy of Japan",
    address: "177 ถนนวิทยุ ลุมพินี เขตปทุมวัน กทม. 10110",
    dcode: "1017",
    dname: "ห้วยขวาง",
    tel: "0 2207 8500,0 2696 3000",
    fax: "0 2207 8510",
    url: "www.th.emb-japan.go.jp",
    OfficeHour: "วันจันทร์-วันศุกร์ เวลา 08.30 - 17.45 น.",
    mail: "-",
    lat: 13.72936394,
    lng: 100.5460241,
  },
  {
    id: "4",
    name: "สถานทูตเนปาน ประจำประเทศไทย",
    name_e: "The Embassy of Nepal",
    address:
      "4/1 ซ. 27 ปรีดีพนมยงค์ ถ. สุขุมวิท 71 แขวงคลองตัน เขตวัฒนา กรุงเทพมหานคร 10110",
    dcode: "1039",
    dname: "วัฒนา",
    tel: "0 2391 7240,0 2390 2280",
    fax: "0 2381 2406",
    url: "www.th.nepalembassy.gov.np",
    OfficeHour: "วันจันทร์-วันศุกร์ เวลา 09.00 - 17.00 น.",
    mail: "eonbangkok@mofa.gov.np",
    lat: 13.71839197,
    lng: 100.5955189,
  },
  {
    id: "5",
    name: "สถานทูตตุรกี ประจำประเทศไทย",
    name_e: "The Embassy of the Republic of Turkey",
    address: "61/1 ซอยจัดสรร ถนนสุทธิสาร แขวงสามเสนนอก เขตห้วยขวาง กทม. 10310",
    dcode: "1017",
    dname: "ห้วยขวาง",
    tel: "0 2355 5486-87",
    fax: "0 2274 7261",
    url: "http://bangkok.emb.mfa.gov.tr",
    OfficeHour: "วันจันทร์-วันศุกร์ เวลา 09.00 - 18.00 น.",
    mail: "embassy.bangkok@mfa.gov.tr",
    lat: 13.78806793,
    lng: 100.5866778,
  },
  {
    id: "6",
    name: "สถานเอกอัครราชทูตสาธารณรัฐเกาหลี ประจำประเทศไทย",
    name_e: "The Embassy of the Republic of Korea",
    address: "23 ถนนเทียมร่วมมิตร แขวงห้วยขวาง เขตห้วยขวาง กทม. 10320",
    dcode: "1017",
    dname: "ห้วยขวาง",
    tel: "0 2247 7537-39",
    fax: "0 2247 7535",
    url: "-",
    OfficeHour: "วันจันทร์ - วันศุกร์ เวลา 08.30น. - 17.00น.",
    mail: "koembth@mofa.go.kr",
    lat: 13.76795797,
    lng: 100.5779325,
  },
  {
    id: "7",
    name: "สถานทูตสาธารณรัฐประชาชนจีน ประจำประเทศไทย",
    name_e: "The Embassy of the People's Republic of China",
    address: "57 ถนนรัชดาภิเษก แขวงดินแดง เขตดินแดง กทม. 10310",
    dcode: "1026",
    dname: "ดินแดง",
    tel: "0 2245 0088",
    fax: "0 2246 8247",
    url: "www.chinaembassy.or.th",
    OfficeHour: "วันจันทร์ - วันศุกร์ เวลา08.30น. - 12.00น., 13.00น. - 17.00น.",
    mail: "-",
    lat: 13.76321152,
    lng: 100.5667481,
  },
  {
    id: "8",
    name: "สถานทูตสวิสเซอร์แลนด์ ประจำประเทศไทย",
    name_e: "The Embassy of Switzerland",
    address: "35 ถนนวิทยุ แขวงลุมพินี เขตปทุมวัน กทม. 10330",
    dcode: "1007",
    dname: "ปทุมวัน",
    tel: "0 2674 6900",
    fax: "0 2674 6901",
    url: "www.eda.admin.ch/bangkok",
    OfficeHour:
      "วันจันทร์-วันพฤหัสบดี เวลา 07.45 - 16.45 น. และวันศุกร์ เวลา 07.45 - 14.00 น.",
    mail: "bangkok@eda.admin.ch",
    lat: 13.74554786,
    lng: 100.5483217,
  },
  {
    id: "9",
    name: "สถานทูตอังกฤษ ประจำประเทศไทย",
    name_e: "The British Embassy",
    address: "14 ถนนวิทยุ เขตปทุมวัน กทม. 10330",
    dcode: "1007",
    dname: "ปทุมวัน",
    tel: "0 2305 8333",
    fax: "0 2305 8372",
    url: "www.gov.uk/world/thailand",
    OfficeHour:
      "วันจันทร์-วันพฤหัสบดี เวลา 07.45 - 16.30 น. และวันศุกร์ เวลา 07.45 - 13.15 น.",
    mail: "Info.Bangkok@fco.gov.uk",
    lat: 13.72011919,
    lng: 100.5267411,
  },
  {
    id: "10",
    name: "สถานทูตอิสราเอล ประจำประเทศไทย",
    name_e: "The Embassy of Israel",
    address:
      "75 อาคารโอเซี่ยนทาวเวอร์ 2 ชั้น 25 ซอยวัฒนา สุขุมวิทซอย 19 (อโศก) แขวงคลองเตยเหนือ เขตวัฒนา กทม.10110",
    dcode: "1039",
    dname: "วัฒนา",
    tel: "0 2204 9200",
    fax: "0 2204 9255",
    url: "www.embassies.gov.il/Bangkok",
    OfficeHour:
      "วันจันทร์-วันพฤหัสบดี เวลา 08.30 - 16.30 น. และวันศุกร์ เวลา 08.30 - 15.30 น.",
    mail: "info@bangkok.mfa.gov.il",
    lat: 13.74289823,
    lng: 100.5614071,
  },
  {
    id: "11",
    name: "สถานทูตปากีสถาน ประจำประเทศไทย",
    name_e: "The Embassy of the Islamic Republic of Pakistan",
    address:
      "31 ซอยสุขุมวิท 3 (นานาเหนือ) ถนนสุขุมวิท แขวงคลองเตยเหนือ เขตวัฒนา กทม. 10110",
    dcode: "1039",
    dname: "วัฒนา",
    tel: "0 2253 0288-9",
    fax: "0 2253 0290",
    url: "-",
    OfficeHour: "วันจันทร์-วันศุกร์ เวลา 09.00 - 17.00 น.",
    mail: "parepbangkok@mofa.gov.pk",
    lat: 13.7456703,
    lng: 100.5532882,
  },
  {
    id: "12",
    name: "สถานทูตบราซิล ประจำประเทศไทย",
    name_e: "The Embassy of the Federative Republic of Brazil",
    address:
      "1168/101 อาคารลุมพินีทาวเวอร์ ชั้น 34 ถ.พระรามที่ 4 แขวงทุ่งมหาเมฆ เขตสาทร กทม.10120",
    dcode: "1028",
    dname: "สาทร",
    tel: "0 2679 8567-8",
    fax: "0 2679 8569",
    url: "http://bangkok.itamaraty.gov.br",
    OfficeHour: "วันจันทร์-วันศุกร์ เวลา 09.00 - 17.00 น.",
    mail: "brasemb.bangkok@itamaraty.gov.br",
    lat: 13.72309762,
    lng: 100.5492469,
  },
  {
    id: "13",
    name: "สถานทูตสหรัฐอเมริกา ประจำประเทศไทย",
    name_e: "The Embassy of the United States of America",
    address: "120-122 ถนนวิทยุ แขวงลุมพินี เขตปทุมวัน กทม. 10330",
    dcode: "1007",
    dname: "ปทุมวัน",
    tel: "0 2205 4000",
    fax: "0 2205 4131",
    url: "www.buyusa.gov/thailand/th/",
    OfficeHour: "วันจันทร์-วันศุกร์เวลา 07.00 - 16.00 น.",
    mail: "-",
    lat: 13.74078028,
    lng: 100.5460619,
  },
  {
    id: "14",
    name: "สถานทูตเวียดนาม ประจำประเทศไทย",
    name_e: "The Embassy of the Socialist Republic of Vietnam",
    address: "83/1 ถนนวิทยุ แขวงลุมพินี เขตปทุมวัน กทม. 10330",
    dcode: "1007",
    dname: "ปทุมวัน",
    tel: "0 2251 5838",
    fax: "0 2251 7201",
    url: "http://vnembassybangkok.mofa.gov.vn",
    OfficeHour: "วันจันทร์ - วันศุกร์ เวลา 08.30 - 16.30 น.",
    mail: "vnemb.th@mofa.gov.vn",
    lat: 13.7406437,
    lng: 100.5476607,
  },
  {
    id: "15",
    name: "สถานทูตเนเธอร์แลนด์ ประจำประเทศไทย",
    name_e: "The Embassy of the Kingdom of the Netherlands",
    address: "15 ซอยต้นสน ถนนเพลินจิต แขวงลุมพินี เขตปทุมวัน กทม. 10330",
    dcode: "1007",
    dname: "ปทุมวัน",
    tel: "0 2309 5200",
    fax: "0 2309 5225",
    url: "www.netherlandsworldwide.nl/countries/thailand",
    OfficeHour:
      "วันจันทร์-วันพฤหัสบดี เวลา 08.30 - 17.00 น. และวันศุกร์ เวลา 08.30 - 12.00 น.",
    mail: "ban@minbuza.nl",
    lat: 13.73898548,
    lng: 100.5454214,
  },
  {
    id: "16",
    name: "สถานทูตอียิปต์ ประจำประเทศไทย",
    name_e: "The Embassy of the Arab Republic of Egypt",
    address:
      "23/122-125 อาคารสรชัย ชั้น 31 ถนนสุขุมวิท 63 (เอกมัย) คลองตันเหนือ เขตวัฒนา กทม.10110",
    dcode: "1012",
    dname: "ยานนาวา",
    tel: "0 2726 9831-3",
    fax: "0 2726 9834",
    url: "-",
    OfficeHour: "วันจันทร์-วันศุกร์เวลา 09.00 - 15.30 น.",
    mail: "egy.emb.bkk@gmail.com",
    lat: 13.72375257,
    lng: 100.5842197,
  },
  {
    id: "17",
    name: "สถานทูตสุลต่านโอมาน ประจำประเทศไทย",
    name_e: "The Embassy of the Sultanate of Oman",
    address:
      "82 อาคารแสงทองธานี ชั้น 32 ถนนสาทรเหนือ แขวงสีลม เขตบางรัก กทม. 10500",
    dcode: "1004",
    dname: "บางรัก",
    tel: "0 2639 9380-2",
    fax: "0 2639 9390",
    url: "-",
    OfficeHour: "วันจันทร์-วันศุกร์เวลา 09.00 - 16.00 น.",
    mail: "embassyoman@yahoo.com",
    lat: 13.72300397,
    lng: 100.5323814,
  },
  {
    id: "18",
    name: "สถานทูตนิวซีแลนด์ ประจำประเทศไทย",
    name_e: "The New Zealand Embassy",
    address:
      "อาคารเอ็มไทยทาวเวอร์ ชั้น 14 ถนนวิทยุ แขวงลุมพินี เขตปทุมวัน กทม. 10330",
    dcode: "1007",
    dname: "ปทุมวัน",
    tel: "0 2254 2530",
    fax: "0 2253 9045",
    url: "www.nzembassy.com/thailand",
    OfficeHour: "วันจันทร์-วันศุกร์ เวลา 09.00 - 16.30 น.",
    mail: "info@newzealandembassybkk.com",
    lat: 13.73954282,
    lng: 100.5473576,
  },
  {
    id: "19",
    name: "สถานทูตฝรั่งเศส ประจำประเทศไทย",
    name_e: "The French Embassy",
    address: "35 ถนนเจริญกรุง ซอย 36 แขวงบางรัก เขตบางรัก กทม.10500",
    dcode: "1004",
    dname: "บางรัก",
    tel: "0 2657 5100",
    fax: "0 2657 5111",
    url: "wwww.ambafranceth.org",
    OfficeHour:
      "วันจันทร์-วันพฤหัสบดี เวลา 08.30 - 17.30 น. และวันศุกร์ เวลา 08.30 - 16.00 น.",
    mail: "-",
    lat: 13.72459859,
    lng: 100.5141952,
  },
  {
    id: "20",
    name: "สถานทูตสโลวัก ประจำประเทศไทย",
    name_e: "The Embassy of the Slovak Republic",
    address: "25/9 อาคาร BKI/YWCA ชั้น 49 แขวงทุ่งมหาเมฆ เขตสาทร กทม. 10120",
    dcode: "1028",
    dname: "สาทร",
    tel: "0 2677 3445-6",
    fax: "0 2677 3447",
    url: "www.mzv.sk/bangkok",
    OfficeHour: "วันจันทร์ - วันศุกร์ เวลา 09.00 - 16.00 น.",
    mail: "emb.bangkok@mzv.sk",
    lat: 13.72353629,
    lng: 100.5398095,
  },
  {
    id: "21",
    name: "สถานทูตกัมพูชา ประจำประเทศไทย",
    name_e: "The Royal Embassy of Cambodia",
    address: "518/4 ถนนประชาอุทิศ (ซอยรามคำแหง 39) เขตวังทองหลาง กทม. 10310",
    dcode: "1007",
    dname: "ปทุมวัน",
    tel: "0 2957 5851-2",
    fax: "0 2957 5850",
    url: "-",
    OfficeHour:
      "วันจันทร์ - วันศุกร์ เวลา 08.30น. - 12.00น., 14.00น. - 17.30น.",
    mail: "camemb.tha@mfaic.gov.kh",
    lat: 13.76829979,
    lng: 100.5964209,
  },
  {
    id: "22",
    name: "สถานทูตฟิลิปปินส์ ประจำประเทศไทย",
    name_e: "The Embassy of the Republic of the Philippines",
    address:
      "760 ซอยฟิลิปินส์ (สุขุมวิท 30/1) ถนนสุขุมวิท เขตพระโขนง กทม. 10110",
    dcode: "1009",
    dname: "พระโขนง",
    tel: "0 2259 0139-40 , 0 2258 5401",
    fax: "0 2259 2809",
    url: "www.bangkokpe.dfa.gov.ph",
    OfficeHour: "วันจันทร์-วันศุกร์ เวลา 09.00 - 17.00 น.",
    mail: "bangkok.pe@dfa.gov.ph",
    lat: 13.72681031,
    lng: 100.5739308,
  },
  {
    id: "23",
    name: "สถานทูตสิงคโปร์ ประจำประเทศไทย",
    name_e: "The Embassy of the Republic of Singapore",
    address: "129 ถนนสาทรใต้ แขวงทุ่งมหาเมฆ เขตสาทร กทม. 10120",
    dcode: "1028",
    dname: "สาทร",
    tel: "0 2348 6700",
    fax: "0 2348 6703",
    url: "-",
    OfficeHour: "วันจันทร์-วันศุกร์เวลา 09.00 - 17.00 น.",
    mail: "singemb_bkk@mfa.sg",
    lat: 13.72223141,
    lng: 100.5330606,
  },
  {
    id: "24",
    name: "สถานทูตรัสเซีย ประจำประเทศไทย",
    name_e: "The Embassy of the Russian Federation",
    address: "78 ถนนสุรวงศ์ แขวงสี่พระยา เขตบางรัก กทม. 10500",
    dcode: "1004",
    dname: "บางรัก",
    tel: "0 2234 9824",
    fax: "0 2237 8488",
    url: "www.thailand.mid.ru",
    OfficeHour: "วันจันทร์ - วันศุกร์ เวลา 09.00 - 12.00 น.",
    mail: "rusembbangkok@yandex.ru",
    lat: 13.72957911,
    lng: 100.5274311,
  },
  {
    id: "25",
    name: "สถานทูตคิวบา ประจำประเทศไทย",
    name_e: "The Embassy of the Republic of Cuba",
    address:
      "5 เมลาแมนชั่น, อพาร์ทเมน 3B ชั้น 3 ซอยสุขุมวิท 27 ถนนสุขุมวิท แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพฯ 10110",
    dcode: "1039",
    dname: "วัฒนา",
    tel: "0 2665 2803",
    fax: "0 2661 6560",
    url: "embacuba.cubaminrex.cu/tailandiaing",
    OfficeHour: "วันจันทร์ - วันศุกร์ เวลา09.00น. - 13.00น., 14.00น. - 17.00น.",
    mail: "embajada@th.embacuba.cu",
    lat: 13.73221523,
    lng: 100.5979239,
  },
  {
    id: "26",
    name: "สถานทูตเดนมาร์ก ประจำประเทศไทย",
    name_e: "The Royal Danish Embassy",
    address:
      "10 ซ.อัตถากรประสิทธิ์ ถนนสาทรใต้ 1 แขวงทุ่งมหาเมฆ เขตสาทร กทม. 10120",
    dcode: "1028",
    dname: "สาทร",
    tel: "0 2343 1100",
    fax: "0 2213 1752",
    url: "www.thailand.um.dk",
    OfficeHour:
      "วันจันทร์-วันพฤหัสบดี เวลา 09.00 - 15.30 น. และวันศุกร์ เวลา 09.00 - 15.00 น.",
    mail: "bkkamb@um.dk",
    lat: 13.72294473,
    lng: 100.5433469,
  },
  {
    id: "27",
    name: "สถานทูตออสเตเลีย ประจำประเทศไทย",
    name_e: "The Australian Embassy",
    address: "181 ถนนวิทยุ แขวงลุมพินี เขตปทุมวัน กรุงเทพมหานคร 10330",
    dcode: "1008",
    dname: "ป้อมปราบศัตรูพ่าย",
    tel: "0 2344 6300",
    fax: "0 2344 6593",
    url: "https://thailand.embassy.gov.au/",
    OfficeHour: "วันจันทร์-วันศุกร์เวลา 08.00 - 17.00 น.",
    mail: "austembassy.bangkok@dfat.gov.au",
    lat: 13.72925594,
    lng: 100.5473918,
  },
  {
    id: "28",
    name: "สถานทูตเยอรมนี ประจำประเทศไทย",
    name_e: "The Embassy of the Federal Republic of Germany",
    address: "9 ถนนสาทรใต้ แขวงทุ่งมหาเมฆ เขตสาทร กทม. 10120",
    dcode: "1028",
    dname: "สาทร",
    tel: "0 2287 9000",
    fax: "0 2287 1776",
    url: "www.bangkok.diplo.de",
    OfficeHour:
      "วันจันทร์-วันพฤหัสบดี เวลา 07.00 - 15.40 น. และวันศุกร์ เวลา 07.00 - 13.00 น.",
    mail: "-",
    lat: 13.72323952,
    lng: 100.5424612,
  },
  {
    id: "29",
    name: "สถานทูตออสเตรีย ประจำประเทศไทย",
    name_e: "The Austrian Embassy",
    address:
      "14 ซ. นันทา - โมสาร์ทสาทรซอย 1 ถนนสาทรใต้ แขวงทุ่งมหาเมฆ เขตสาทร กรุงเทพมหานคร 10120",
    dcode: "1028",
    dname: "สาทร",
    tel: "0 2105 6700-09",
    fax: "0 2024 9558",
    url: "-",
    OfficeHour:
      "วันจันทร์-วันพฤหัสบดี เวลา 08.00 - 16.30 น. และวันศุกร์ เวลา 08.00 - 14.00 น.",
    mail: "Bangkok-ob@bmeia.gv.at",
    lat: 13.72208869,
    lng: 100.542916,
  },
  {
    id: "30",
    name: "สถานทูตมาเลเซีย ประจำประเทศไทย",
    name_e: "The Embassy of Malaysia",
    address: "33-35 ถนนสาทรใต้ แขวงทุ่งมหาเมฆ เขตสาทร กทม. 10120",
    dcode: "1028",
    dname: "สาทร",
    tel: "0 2629 6800",
    fax: "0 2679 2208",
    url: "http://www.kln.gov.my/web/tha_bangkok/home",
    OfficeHour: "วันจันทร์ - วันศุกร์ เวลา 08.00 - 16.00 น.",
    mail: "mwbangkok@kln.gov.my",
    lat: 13.72207452,
    lng: 100.5393932,
  },
  {
    id: "31",
    name: "สถานทูตเบลเยี่ยม ประจำประเทศไทย",
    name_e: "The Embassy of the Kingdom of Belgium",
    address:
      "ชั้น16 อาคารสาทรสแควร์ 98 ถนนสาทรเหนือ แขวงสีลม เขตบางรัก กรุงเทพฯ 10500",
    dcode: "1004",
    dname: "บางรัก",
    tel: "0 2108 1800",
    fax: "0 2108 1808",
    url: "www.diplomatie.be/bangkok",
    OfficeHour: "วันจันทร์-วันศุกร์ เวลา 08.00 - 16.00 น.",
    mail: "bangkok@diplobel.fed.be",
    lat: 13.72248924,
    lng: 100.5293823,
  },
  {
    id: "32",
    name: "สถานทูตโปรตุเกส ประจำประเทศไทย",
    name_e: "The Embassy of Portugal",
    address: "26 ซอยกัปตันบุชเลน ถนนสี่พระยา แขวงบางรัก เขตบางรัก กทม. 10500",
    dcode: "1004",
    dname: "บางรัก",
    tel: "0 2234 2123",
    fax: "0 2238 4275",
    url: "www.banguecoque.embaixadaportugal.mne.pt/en/",
    OfficeHour: "วันจันทร์-วันศุกร์ เวลา 08.30 - 16.30 น.",
    mail: "Bangkok@mne.pt",
    lat: 13.72818736,
    lng: 100.514172,
  },
  {
    id: "33",
    name: "สถานทูตโฮรีซี่ ประจำประเทศไทย",
    name_e: "Apostolic Nunciature",
    address: "217/1 ถนนสาทรใต้ แขวงยานนาวา เขตสาทร กทม. 10120",
    dcode: "1028",
    dname: "สาทร",
    tel: "0 2212 5853-4",
    fax: "0 2212 0932",
    url: "-",
    OfficeHour: "วันจันทร์-วันศุกร์เวลา 08.30 - 17.00 น.",
    mail: "na.thailand@diplomat.va",
    lat: 13.71912698,
    lng: 100.5234709,
  },
  {
    id: "34",
    name: "สถานทูตสเปน ประจำประเทศไทย",
    name_e: "The Embassy of Spain",
    address:
      "98-99 อาคารเลครัชดาคอมเพล็ก ชั้น 23 ถนนรัชดาภิเษก แขวงคลองเตย เขตคลองเตย กทม. 10110",
    dcode: "1033",
    dname: "คลองเตย",
    tel: "0 2661 8284-6",
    fax: "0 2661 9220",
    url: "www.exteriores.gob.es/Embajadas/Bangkok",
    OfficeHour:
      "วันจันทร์-วันพฤหัสบดี เวลา 08.00 - 16.15 น. และวันศุกร์ เวลา 08.00 - 15.00 น.",
    mail: "emb.bangkok@maec.es",
    lat: 13.73072751,
    lng: 100.5606053,
  },
  {
    id: "35",
    name: "สถานทูตอินโดนีเซีย ประจำประเทศไทย",
    name_e: "The Embassy of the Republic of Indonesia",
    address: "600-602 ถนนเพชรบุรี แขวงถนนเพชรบุรี เขตราชเทวี กทม. 10400",
    dcode: "1037",
    dname: "ราชเทวี",
    tel: "0 2252 3135-40",
    fax: "0 2255 1267",
    url: "www.kemlu.go.id/bangkok",
    OfficeHour: "วันจันทร์-วันศุกร์เวลา 08.00 - 16.00 น.",
    mail: "bangkok.kbri@kemlu.go.id",
    lat: 13.75033249,
    lng: 100.5363041,
  },
  {
    id: "36",
    name: "สถานทูตโปแลนด์ ประจำประเทศไทย",
    name_e: "The Embassy of the Republic of Poland",
    address:
      "63 อาคารแอทธินีทาวเวอร์ชั้น 10 ถ.เพลินจิต แขวงลุมพินี เขตปทุมวัน กทม.10330",
    dcode: "1007",
    dname: "ปทุมวัน",
    tel: "0 2079 7300",
    fax: "0 2079 7303",
    url: "www.bangkok.msz.gov.pl",
    OfficeHour: "วันจันทร์-วันศุกร์ เวลา 08.00 - 16.20 น.",
    mail: "bangkok.amb.sekretariat@msz.gov.pl",
    lat: 13.74121662,
    lng: 100.5485522,
  },
  {
    id: "37",
    name: "สถานเอกอัครราชทูตสาธารณรัฐแอฟริกาใต้",
    name_e: "The Embassy of the Republic of South Africa",
    address:
      "87 อาคารเอ็มไทยทาวเวอร์ ออซีซั่นเพลส ชั้น 12A ถนนวิทยุ เขตปทุมวัน กทม. 10330",
    dcode: "1007",
    dname: "ปทุมวัน",
    tel: "0 2659 2900",
    fax: "0 2685 3500",
    url: "www.dirco.gov.za/bangkok",
    OfficeHour:
      "วันจันทร์-วันพฤหัสบดี เวลา 08.00 - 16.30 น. และวันศุกร์ เวลา 08.00 - 14.00 น.",
    mail: "saembassy.bangkok@dirco.gov.za",
    lat: 13.73953285,
    lng: 100.5475055,
  },
  {
    id: "38",
    name: "สถานทูตเปรู ประจำประเทศไทย",
    name_e: "The Embassy of the Republic of Peru",
    address:
      "1 อาคารกลาสเฮ้าส์ ชั้น 16 ซอยสุขุมวิท 25 แขวงคลองเตยเหนือ เขตวัฒนา กทม. 10110",
    dcode: "1039",
    dname: "วัฒนา",
    tel: "0 2260 6243",
    fax: "0 2260 6244",
    url: "www.peruthai.or.th",
    OfficeHour: "วันจันทร์-วันศุกร์ เวลา 09.00 - 17.00 น.",
    mail: "info@peruthai.or.th",
    lat: 13.73556456,
    lng: 100.563291,
  },
  {
    id: "39",
    name: "สถานทูตสาธารณรัฐแห่งสหภาพเมียนมาร์ ประจำประเทศไทย",
    name_e: "The Embassy of the Republic of the Union of Myanmar",
    address: "110 ถนนสาทรเหนือ แขวงสีสม เขตบางรัก กทม. 10500",
    dcode: "1004",
    dname: "บางรัก",
    tel: "0 2233 2237",
    fax: "0 2236 6898",
    url: "-",
    OfficeHour: "วันจันทร์-วันศุกร์เวลา 09.00 - 16.30 น.",
    mail: "myanmarembassybkk@gmail.com",
    lat: 13.72100996,
    lng: 100.5244816,
  },
  {
    id: "40",
    name: "สถานทูตนอร์เวย์ ประจำประเทศไทย",
    name_e: "The Royal Norwegian Embassy",
    address:
      "591 อาคารยูบีซี 2 ชั้น 18 ซอยสุขุมวิท 33 ถนนสุขุมวิท แขวงคลองตันเหนือ เขตวัฒนา กทม. 10110",
    dcode: "1039",
    dname: "วัฒนา",
    tel: "0 2204 6500",
    fax: "0 2262 0218",
    url: "www.emb-norway.or.th",
    OfficeHour: "วันจันทร์-วันศุกร์ เวลา 09.00 - 16.00 น.",
    mail: "emb.bangkok@mfa.no",
    lat: 13.73274448,
    lng: 100.5675442,
  },
  {
    id: "41",
    name: "สถานทูตโรมาเนีย ประจำประเทศไทย",
    name_e: "The Embassy of Romania",
    address:
      "388/41 ถนนพระรามสี่ อาคารสิรินรัตน์ชั้น 12 เขตคลองเตย กรุงเทพฯ 10110",
    dcode: "1033",
    dname: "คลองเตย",
    tel: "0 2240 2522",
    fax: "0 2240 2550",
    url: "http://bangkok.mae.ro",
    OfficeHour: "วันจันทร์ - วันศุกร์ เวลา 09.00 - 16.30 น.",
    mail: "Bangkok@mae.ro",
    lat: 13.71687951,
    lng: 100.5705823,
  },
  {
    id: "42",
    name: "สถานทูตสาธารณรัฐเชค ประจำประเทศไทย",
    name_e: "The Embassy of the Czech Republic",
    address: "71/6 ซอยร่วมฤดี 2 ถนนเพลินจิต แขวงลุมพินี เขตปทุมวัน กทม. 10330",
    dcode: "1007",
    dname: "ปทุมวัน",
    tel: "0 2250 9223-4",
    fax: "0 2255 4978",
    url: "www.mzv.cz/bangkok",
    OfficeHour: "วันจันทร์-วันศุกร์เวลา 08.30 - 17.00 น.",
    mail: "bangkok@embassy.mzv.cz",
    lat: 13.73748701,
    lng: 100.5508578,
  },
  {
    id: "43",
    name: "สถานทูตโมรอคโค ประจำประเทศไทย",
    name_e: "The Embassy of the Kingdom of Morocco",
    address: "175 สาทรซิตี้ทาวเวอร์ ชั้น 12 ถนนสาทรใต้ เขตสาทร กทม. 10120",
    dcode: "1028",
    dname: "สาทร",
    tel: "0 2679 5604-6",
    fax: "0 2679 5603",
    url: "-",
    OfficeHour: "วันจันทร์ - วันศุกร์ เวลา 09.00 - 16.30 น.",
    mail: "ambmaroc@truemail.co.th",
    lat: 13.72162302,
    lng: 100.5320488,
  },
  {
    id: "44",
    name: "สถานทูตฟินแลนด์ ประจำประเทศไทย",
    name_e: "The Embassy of Finland",
    address:
      "63 อาคารแอทธินีทาวเวอร์ชั้น 10 ถ.เพลินจิต แขวงลุมพินี เขตปทุมวัน กทม.10330",
    dcode: "1007",
    dname: "ปทุมวัน",
    tel: "0 2207 8700",
    fax: "0 2207 8702",
    url: "www.finlandabroad.fi",
    OfficeHour:
      "วันจันทร์-วันพฤหัสบดี เวลา 07.30 - 15.45 น. และวันศุกร์ เวลา 07.30 - 13.15 น.",
    mail: "sanomat.ban@formin.fi",
    lat: 13.74107281,
    lng: 100.5484218,
  },
  {
    id: "45",
    name: "สถานทูตคูเวต ประจำประเทศไทย",
    name_e: "The Embassy of the State of Kuwait",
    address:
      "100/44 อาคารสาทรนคร ชั้น 24A ถนนสาทรเหนือ แขวงสีลม เขตบางรัก กทม. 10500",
    dcode: "1004",
    dname: "บางรัก",
    tel: "0 2636 6600 , 0 2636 7461-3",
    fax: "0 2636 7461-3",
    url: "-",
    OfficeHour: "วันจันทร์-วันศุกร์ เวลา 09.30 - 15.30 น.",
    mail: "kuemb.bkk@gmail.com",
    lat: 13.72318043,
    lng: 100.5301635,
  },
  {
    id: "46",
    name: "สถานทูตปานามา ประจำประเทศไทย",
    name_e: "The Embassy of the Republic of Panama",
    address:
      "1168/37 อาคารลุมพินีทาวเวอร์ ชั้น 16 ถนนพระราม 3 แขวงทุ่งมหาเมฆ เขตสาทร กทม. 10120",
    dcode: "1028",
    dname: "สาทร",
    tel: "0 2679 7988",
    fax: "0 2679 7991",
    url: "http://panathai.com",
    OfficeHour: "วันจันทร์-วันศุกร์ เวลา 09.00 - 17.00 น.",
    mail: "embajada@panathai.com",
    lat: 13.72345002,
    lng: 100.5492677,
  },
  {
    id: "47",
    name: "สถานทูตสหรัฐอเมริกาเม็กซิโก ประจำประเทศไทย",
    name_e: "The Embassy of the United Mexican States",
    address:
      "ชั้น 11 ยูนิต 1101 อาคารคิวเฮ้าส์ลุมพินี 1 ถนนสาทรใต้ แขวงทุ่งมหาเมฆ เขตสาทรกรุงเทพมหานคร 10120",
    dcode: "1028",
    dname: "สาทร",
    tel: "0 2006 0734",
    fax: "0 2285 0667",
    url: "www.sre.gob.mx/tailandia",
    OfficeHour:
      "วันจันทร์-วันพฤหัสบดี เวลา 08.00 - 16.00 น. และวันศุกร์ เวลา 08.00 - 14.00 น.",
    mail: "infotai@sre.gob.mx",
    lat: 13.72409762,
    lng: 100.5396652,
  },
  {
    id: "48",
    name: "สถานทูตฮังการี ประจำประเทศไทย",
    name_e: "The Embassy of Hungary",
    address:
      "อาคารปาร์คเวนเชอร์ชั้น 14 (1401, 1411-1412) 57 ถนนวิทยุ แขวงลุมพินี เขตปทุมวัน กรุงเทพ 10330",
    dcode: "1007",
    dname: "ปทุมวัน",
    tel: "0 2118 9600",
    fax: "0 2117 4901",
    url: "www.mfa.gov.hu/emb/bangkok.",
    OfficeHour: "วันจันทร์-วันศุกร์เวลา 08.00 - 16.00 น.",
    mail: "mission.bgk@mfa.gov.hu",
    lat: 13.74279356,
    lng: 100.5478968,
  },
  {
    id: "49",
    name: "สถานทูตแคนนาดา ประจำประเทศไทย",
    name_e: "The Embassy of Canada",
    address:
      "990 อาคารอับดุลราฮิม ชั้น 15 ถ.พระรามที่ 4 แขวงสีลม เขตบางรัก กทม. 10500",
    dcode: "1004",
    dname: "บางรัก",
    tel: "0 2646 4300",
    fax: "0 2646 4312",
    url: "www.thailande.gc.ca",
    OfficeHour:
      "วันจันทร์ - วันพฤหัสบดี เวลา07.30น. - 16.15น. วันศุกร์ เวลา 07.30น. - 13.00น.",
    mail: "bngkk@international.gc.ca",
    lat: 13.72757479,
    lng: 100.5386893,
  },
  {
    id: "50",
    name: "สถานทูตเคนย่า ประจำประเทศไทย",
    name_e: "The Embassy of the Republic of Kenya",
    address: "62 ซอยทองหล่อ 5 ถนนสุขุมวิท 55 แขวงคลองตัน เขตวัฒนา กทม. 10110",
    dcode: "1039",
    dname: "วัฒนา",
    tel: "0 2712 5721",
    fax: "0 2712 5720",
    url: "www.kenyaembassy.or.th",
    OfficeHour:
      "วันจันทร์ - วันพฤหัสบดี เวลา09.00น. - 17.00 น. วันศุกร์ เวลา 08.00น. - 13.00น.",
    mail: "bangkok@mfa.go.ke",
    lat: 13.72925977,
    lng: 100.579615,
  },
  {
    id: "51",
    name: "สถานทูตภูฏาน ประจำประเทศไทย",
    name_e: "The Royal Bhutanese Embassy",
    address:
      "375/1 ซอยรัชดานิเวศน์ ถ.ประชาอุทิศ แขวงสามเสนนอก เขตห้วยขวาง กทม. 10310",
    dcode: "1017",
    dname: "ห้วยขวาง",
    tel: "0 2274 4740-2",
    fax: "0 2274 4743",
    url: "-",
    OfficeHour: "วันจันทร์-วันศุกร์ เวลา 09.00 - 17.00 น.",
    mail: "st.rbe.reception@gmail.com",
    lat: 13.77793385,
    lng: 100.5868776,
  },
  {
    id: "52",
    name: "สถานทูตมองโกเลีย ประจำประเทศไทย",
    name_e: "The Embassy of Mongolia",
    address:
      "Athenee Tower, 63 ถ.วิทยุ แขวงลุมพินี เขตปทุมวัน กรุงเทพมหานคร 10330",
    dcode: "1039",
    dname: "วัฒนา",
    tel: "0 2381 1400",
    fax: "0 2392 4199",
    url: "www.bangkok.mfa.gov.mn",
    OfficeHour: "วันจันทร์-วันศุกร์ เวลา 08.00 - 17.00 น.",
    mail: "bangkok@mfa.gov.mn",
    lat: 13.74136356,
    lng: 100.5481833,
  },
  {
    id: "53",
    name: "สถานเอกอัครราชทูตสาธารณรัฐประชาธิปไตยประชาชนลาว",
    name_e: "The Embassy of the Lao People’s Democratic Republic",
    address:
      "520,502/1-3 ซอยสหการประมูล ถนนประชาอุทิศ แขวงวังทองหลาง เขตวังทองหลาง กทม. 10310",
    dcode: "1045",
    dname: "วังทองหลาง",
    tel: "0 2539 6679",
    fax: "0 2539 3827",
    url: "http://laoembassybkk.com",
    OfficeHour: "วันจันทร์-วันศุกร์ เวลา 08.00 - 16.00 น.",
    mail: "laoembassyinbkk@gmail.com",
    lat: 13.76939994,
    lng: 100.5954296,
  },
  {
    id: "54",
    name: "สถานทูตคาซัคสถาน ประจำประเทศไทย",
    name_e: "The Embassy of the Republic of Kazakhstan",
    address:
      "อาคาร จีพีเอฟ วิทยุทาวเวอร์ สำนักงาน 804A ชั้น 8 ตึก A 93/1 ถนนวิทยุ ลุมพินี เขตปทุมวัน กรุงเทพฯ 10330",
    dcode: "1007",
    dname: "ปทุมวัน",
    tel: "0 2254 3043-5",
    fax: "0 2254 3042",
    url: "-",
    OfficeHour: "วันจันทร์ - วันศุกร์ เวลา 09.00น. - 17.30น.",
    mail: "thailand@mfa.kz",
    lat: 13.7372995,
    lng: 100.5476111,
  },
  {
    id: "55",
    name: "สถานทูตไนจีเรีย ประจำประเทศไทย",
    name_e: "The Embassy of the Federal Republic of Nigeria",
    address:
      "79/1 ซ. สุขุมวิท 61 แขวงคลองต้นเหนือ เขตวัฒนา กรุงเทพมหานคร 10110",
    dcode: "1039",
    dname: "วัฒนา",
    tel: "0 2391 0833-35",
    fax: "0 2391 0836",
    url: "-",
    OfficeHour: "วันจันทร์-วันศุกร์ เวลา 09.00 - 16.00 น.",
    mail: "nigeriabkk@hotmail.com",
    lat: 13.72226658,
    lng: 100.5960074,
  },
  {
    id: "56",
    name: "สถานทูตกาตาร์ ประจำประเทศไทย",
    name_e: "The Embassy of the State of Qatar",
    address:
      "63 ถนนวิทยุ อาคารแอทธินีทาวเวอร์ชั้น 18 ห้อง 1807 แขวงลุมพินี เขตปทุมวัน กรุงเทพ 10330",
    dcode: "1007",
    dname: "ปทุมวัน",
    tel: "0 2660 1111",
    fax: "0 2660 1122",
    url: "www.qatarembassy.or.th",
    OfficeHour:
      "วันจันทร์-วันพฤหัสบดี เวลา 09.00 - 16.00 น. และวันศุกร์ เวลา 09.00 - 15.00 น.",
    mail: "Bangkok@mofa.gov.qa",
    lat: 13.7411957,
    lng: 100.5490051,
  },
  {
    id: "57",
    name: "สถานทูตยูเครน ประจำประเทศไทย",
    name_e: "The Embassy of Ukraine",
    address:
      "87 อาคารออซีซั่นเพลส ซีอาร์ซีทาวเวอร์ ชั้น 33 ถนนวิทยุ แขวงลุมพินี เขตปทุมวัน กทม. 10330",
    dcode: "1007",
    dname: "ปทุมวัน",
    tel: "0 2685 3216",
    fax: "0 2685 3217",
    url: "http://thailand.mfa.gov.ua",
    OfficeHour: "วันจันทร์ - วันศุกร์ เวลา09.00น. - 13.00น., 14.00น. - 17.00น.",
    mail: "emb_th@mfa.gov.ua",
    lat: 13.73888796,
    lng: 100.5480006,
  },
  {
    id: "58",
    name: "สถานทูตสหภาพยุโรป ประจำประเทศไทย",
    name_e: "Delegation of the European Union",
    address:
      "63 อาคารแอทธินีทาวเวอร์ชั้น 10 ถนนวิทยุ แขวงลุมพินี เขตปทุมวัน กทม. 10330",
    dcode: "1007",
    dname: "ปทุมวัน",
    tel: "0 2305 2600",
    fax: "0 2305 2799",
    url: "-",
    OfficeHour: "วันจันทร์-วันศุกร์เวลา 09.00 - 17.30 น.",
    mail: "Delegation-Thailand@eeas.europa.eu",
    lat: 13.74117931,
    lng: 100.5487369,
  },
  {
    id: "59",
    name: "สถานทูตบรูไน ประจำประเทศไทย",
    name_e: "The Embassy of Brunei Darussalam",
    address:
      "12 เอกมัยซอย 2 สุขุมวิท 63 ถนน แขวงพระโขนงเหนือ เขตวัฒนา กรุงเทพฯ 10110",
    dcode: "1039",
    dname: "วัฒนา",
    tel: "0 2714 7395-9",
    fax: "0 2714 7392",
    url: "-",
    OfficeHour: "วันจันทร์-วันศุกร์ เวลา 08.30 - 16.00 น.",
    mail: "bangkok.thailand@mfa.gov.bn",
    lat: 13.72267656,
    lng: 100.5856825,
  },
  {
    id: "60",
    name: "สถานทูตอาร์เจนตินา ประจำประเทศไทย",
    name_e: "The Embassy of the Argentine Republic",
    address:
      "ห้อง1601 อาคารกลาสเฮ้าส์ ซ.สุขุมวิท 25 แขวงคลองเตยเหนือ เขตวัฒนา กทม. 10110",
    dcode: "1039",
    dname: "วัฒนา",
    tel: "0 2259 0401",
    fax: "0 2259 0402",
    url: "-",
    OfficeHour: "วันจันทร์-วันศุกร์เวลา 09.00 - 16.00 น.",
    mail: "etail@mrecic.gov.ar",
    lat: 13.73532069,
    lng: 100.5632617,
  },
  {
    id: "61",
    name: "สถานทูตอาหรับอามิเรศ ประจำประเทศไทย",
    name_e: "The Embassy of the United Arab Emirates",
    address: "87/2 อาคารCRC ออซีซั่นเพลส ชั้น29 ถนนวิทยุ เขตปทุวัน กทม.10330",
    dcode: "1007",
    dname: "ปทุมวัน",
    tel: "0 2402 4000",
    fax: "0 2402 4005",
    url: "-",
    OfficeHour:
      "วันจันทร์-วันพฤหัสบดี เวลา 09.00 - 16.00 น. และวันศุกร์ เวลา 09.00 - 15.00 น.",
    mail: "bangkokemb@mofaic.gov.ae",
    lat: 13.73874084,
    lng: 100.5483972,
  },
  {
    id: "62",
    name: "สถานทูตสาธารณรัฐซิลี ประจำประเทศไทย",
    name_e: "The Embassy of the Republic of Chile",
    address:
      "193/67 เลครัชดาออฟฟิศคอมเพล็กซ์ชั้น 17 ถนนรัชดาภิเษก แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110",
    dcode: "1033",
    dname: "คลองเตย",
    tel: "0 2260 0045-8",
    fax: "0 2260 0049",
    url: "http://chile.gob.cl/tailandia/en/",
    OfficeHour: "วันจันทร์ - วันศุกร์ เวลา09.00น. - 12.30น., 13.30น. - 16.00น.",
    mail: "embassychilethai@minrel.gob.cl",
    lat: 13.73139802,
    lng: 100.5603508,
  },
  {
    id: "63",
    name: "สถานทูตกรีช ประจำประเทศไทย",
    name_e: "The Embassy of the Hellenic Republic",
    address:
      "100/41 ชั้น 23 สาธรนคร ทาวเวอร์ 100 ถ.สาทรเหนือ แขวงสีลม เขตบางรัก กรุงเทพฯ 10500",
    dcode: "1004",
    dname: "บางรัก",
    tel: "0 2667 0090-2",
    fax: "0 2667 0093",
    url: "www.mfa.gr/bangkok",
    OfficeHour: "วันจันทร์ - วันศุกร์ เวลา 09.30น. - 17.30น.",
    mail: "gremb.ban@mfa.gr",
    lat: 13.72282722,
    lng: 100.5302722,
  },
  {
    id: "64",
    name: "สถานทูตมอลตา ประจำประเทศไทย",
    name_e: "The Embassy of Sovereign Military Order of Malta",
    address: "11/133 ถ. ปั้น แขวงสีลม เขตบางรัก กรุงเทพมหานคร 10500",
    dcode: "1004",
    dname: "บางรัก",
    tel: "0 2635 3735",
    fax: "0 2771 7595",
    url: "0 2635 3737",
    OfficeHour: "วันจันทร์-วันศุกร์ เวลา 09.00 - 12.00 น.",
    mail: "embassythailand@orderofmalta.int",
    lat: 13.72528125,
    lng: 100.528106,
  },
  {
    id: "65",
    name: "สถานทูตซาอุดิอาระเบีย ประจำประเทศไทย",
    name_e: "The Royal Embassy of Saudi Arabia",
    address:
      "82 อาคารแสงทองธานี ชั้น 23-24 ถนนสาทรเหนือ แขวงสีลม เขตสาทร กทม. 10500",
    dcode: "1004",
    dname: "บางรัก",
    tel: "0 2639 2999 , 0 2639 2960-3",
    fax: "0 2639 2950",
    url: "-",
    OfficeHour: "วันจันทร์-วันศุกร์ เวลา 09.00 - 16.00 น.",
    mail: "-",
    lat: 13.7229217,
    lng: 100.5325288,
  },
  {
    id: "66",
    name: "สถานทูตศรีลังกา ประจำประเทศไทย",
    name_e: "The Embassy of the Democratic Socialist Republic of Sri Lanka",
    address:
      "75/6-7 อาคารโอเซียนทาวเวอร์ 2 ชั้น 13 ซอยสุขุมวิท 19 แขวงคลองเตยเหนือ เขตวัฒนา กทม. 10110",
    dcode: "1039",
    dname: "วัฒนา",
    tel: "0 2261 1938",
    fax: "0 2261 1936",
    url: "www. slembbkk.com",
    OfficeHour: "วันจันทร์ - วันศุกร์ เวลา 08.30 - 16.15 น.",
    mail: "slemb.bangkok@mfa.gov.lk",
    lat: 13.74284295,
    lng: 100.5615731,
  },
  {
    id: "67",
    name: "สถานทูตสวีเดน ประจำประเทศไทย",
    name_e: "The Embassy of Sweden",
    address:
      "140 อาคารแปซิฟิกเพลส ชั้น20 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กทม. 10110",
    dcode: "1033",
    dname: "คลองเตย",
    tel: "0 2263 7200",
    fax: "0 2263 7260",
    url: "www.swedenabroad.com/bangkok",
    OfficeHour:
      "วันจันทร์-วันพฤหัสบดี เวลา 07.30 - 16.15 น. และวันศุกร์ เวลา 07.30 - 13.00 น.",
    mail: "ambassaden.bangkok@gov.se",
    lat: 13.74025849,
    lng: 100.5542974,
  },
  {
    id: "68",
    name: "สถานทูตติมอร์-เลสเต ประจำประเทศไทย",
    name_e: "The Embassy of the Democratic Republic of Timor-Leste",
    address:
      "1550 ธนภูมิ ชั้น 7ถนนเพชรบุรีตัดใหม่ แขวงมักกะสัน เขตราชเทวี กทม.10110",
    dcode: "1037",
    dname: "ราชเทวี",
    tel: "0 2654 7501-2",
    fax: "0 2654 7504",
    url: "-",
    OfficeHour: "วันจันทร์-วันศุกร์ เวลา 08.30 - 17.00 น.",
    mail: "embdrtl.bkk@gmail.com",
    lat: 13.74928181,
    lng: 100.5568166,
  },
  {
    id: "69",
    name: "สถานเอกอัครราชทูตแห่งราชอาณาจักรบาห์เรน",
    name_e: "The Embassy of the Kingdom of Bahrain",
    address:
      "สกุลไทย สุรวงศ์ ทาวเวอร์ 141 ถ. สุรวงศ์ แขวงสุริยวงศ์ เขตบางรัก กรุงเทพมหานคร 10500",
    dcode: "1004",
    dname: "บางรัก",
    tel: "0 2266 6565",
    fax: "0 2266 6566",
    url: "-",
    OfficeHour: "วันจันทร์-วันศุกร์ เวลา 08.30 - 16.00 น.",
    mail: "bangkok.mission@mofa.gov.bh",
    lat: 13.72885318,
    lng: 100.5293404,
  },
  {
    id: "70",
    name: "สถานทูตอิตาลี ประจำประเทศไทย",
    name_e: "The Embassy of Italy",
    address:
      "อาคารซีอาร์ซีทาวเวอร์ชั้น 40 ซีซั่นเพลส 87 ถนนวิทยุ แขวงลุมพินี กรุงเทพมหานคร 10330",
    dcode: "1007",
    dname: "ปทุมวัน",
    tel: "0 2250 4970",
    fax: "0 2250 4985",
    url: "www.ambbangkok.esteri.it",
    OfficeHour: "วันจันทร์-วันศุกร์เวลา 09.00 - 16.00 น.",
    mail: "ambasciata.bangkok@esteri.it",
    lat: 13.73898814,
    lng: 100.547881,
  },
  {
    id: "71",
    name: "สถานทูตราชรัฐลักเซมเบิร์ก ประจำประเทศไทย",
    name_e: "The Embassy of the Grand Duchy of Luxembourg",
    address:
      "1 อาคารคิวเฮาส์ลุมพินี ชั้น 17 ถนนสาทรใต้ แขวงทุ่งมหาเมฆ เขตสาทร กทม. 10120",
    dcode: "1028",
    dname: "สาทร",
    tel: "0 2677 7360",
    fax: "0 2677 7364",
    url: "-",
    OfficeHour: "วันจันทร์ - วันศุกร์ เวลา 08.30 - 17.00 น.",
    mail: "bangkok.amb@mae.etat.lu",
    lat: 13.72547813,
    lng: 100.5444083,
  },
  {
    id: "72",
    name: "สถานทูตโคลัมเบีย ประจำประเทศไทย",
    name_e: "The Embassy of the Republic of Colombia",
    address:
      "63 ถนนวิทยุ อาคารแอทธินีทาวเวอร์ชั้น 18 ห้อง 1807 แขวงลุมพินี เขตปทุมวัน กรุงเทพ 10330",
    dcode: "1007",
    dname: "ปทุมวัน",
    tel: "0 2168 8715",
    fax: "0 2168 8721",
    url: "http://tailandia.embajada.gov.co/",
    OfficeHour: "วันจันทร์-วันศุกร์ เวลา 09.00 - 17.00 น.",
    mail: "etailandia@cancilleria.gov.co",
    lat: 13.74136525,
    lng: 100.5479151,
  },
  {
    id: "73",
    name: "สถานทูตไอร์แลนด์ ประจำประเทศไทย",
    name_e: "The Embassy of Ireland",
    address:
      "208 อาคารยูนิต 1201 ชั้น 12 ถนนวิทยุ อาคารแอทธินีทาวเวอร์ชั้น 23 แขวงลุมพินี เขตปทุมวัน กรุงเทพ 10330",
    dcode: "1007",
    dname: "ปทุมวัน",
    tel: "0 2016 1360",
    fax: "0 2675 3933",
    url: "dfa.ie/irish-embassy/thailand",
    OfficeHour:
      "วันจันทร์-วันพฤหัสบดี เวลา 09.30 - 15.30 น. และวันศุกร์ เวลา 09.30 - 12.00 น.",
    mail: "IrishEmbassyThailand@dfa.ie",
    lat: 13.74124716,
    lng: 100.5480068,
  },
  {
    id: "74",
    name: "สถานทูตลิเบีย ประจำประเทศไทย",
    name_e: "The Embassy of the State of Libya",
    address:
      "898/28 อาคารเอสวีซิตี้ออฟฟิศทาวเวอร์ 2 ชั้น 17 ถนนพระราม 3 แขวงบางโพงพาง เขตยานนาวา กรุงเทพมหานคร 10120",
    dcode: "1012",
    dname: "ยานนาวา",
    tel: "0 2002 4015",
    fax: "0 2002 4003",
    url: "-",
    OfficeHour: "วันจันทร์ - วันศุกร์ เวลา 09.00 - 15.30 น.",
    mail: "libya_emb_th@foreign.gov.ly",
    lat: 13.69842396,
    lng: 100.5414487,
  },
  {
    id: "75",
    name: "สถานเอกอัครราชทูตสาธารณรัฐกัวเตมาลา",
    name_e: "The Embassy of the Republic of Guatemala",
    address:
      "87 ถ. วิทยุ ชั้น 23 อาคารเอ็มไทยทาวเวอร์ ออลซีซั่นเพลส แขวงลุมพินี เขตปทุมวัน กรุงเทพมหานคร 10330",
    dcode: "1007",
    dname: "ปทุมวัน",
    tel: "0 2627 9545",
    fax: "-",
    url: "-",
    OfficeHour: "-",
    mail: "embassythai@minex.gob.gt",
    lat: 13.73953221,
    lng: 100.5476072,
  },
  {
    id: "76",
    name: "สถานเอกอัครราชทูตสาธารณรัฐโคโซโว",
    name_e: "The Embassy of the Republic of Kosovo",
    address: "112 ซอย เอกมัย 22 แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพมหานคร 10110",
    dcode: "1039",
    dname: "วัฒนา",
    tel: "0 2381 2134",
    fax: "-",
    url: "http://mfa-ks.net/en/",
    OfficeHour: "วันจันทร์ - วันศุกร์ เวลา09.00น. - 17.00น.",
    mail: "embassy.thailand@rks-gov.net",
    lat: 13.7358511,
    lng: 100.5919939,
  },
  {
    id: "77",
    name: "สถานเอกอัครราชทูตมัลดีฟส์ ประจำประเทศไทย",
    name_e: "The Embassy of the Republic of Maldives",
    address:
      "20 ถ. สาทร ตึกบุบจิตชั้น 11 A แขวงเหนือสีลม เขตบางรัก กรุงเทพมหานคร 10500",
    dcode: "1004",
    dname: "บางรัก",
    tel: "0 2234 6489",
    fax: "0 2234 6492",
    url: "www.maldivesembassy.or.th",
    OfficeHour: "วันจันทร์ - วันศุกร์ เวลา09.00น. - 16.00น.",
    mail: "admin@maldivesembassy.or.th",
    lat: 13.72567084,
    lng: 100.5410532,
  },
  {
    id: "78",
    name: "สถานทูตอิหร่าน ประจำประเทศไทย",
    name_e: "The Embassy of the Islamic Republic of Iran",
    address:
      "215 ซอยสุขุมวิท 49/11 ถนนสุขุมวิท แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพฯ 10110",
    dcode: "1039",
    dname: "วัฒนา",
    tel: "0 2390 0871-3",
    fax: "0 2390 0868",
    url: "https://thailand.mfa.gov.ir/en",
    OfficeHour: "วันจันทร์ - วันศุกร์ เวลา08.30น. - 16.30น.",
    mail: "iranemb.bkk@mfa.gov.ir",
    lat: 13.73741521,
    lng: 100.5764519,
  },
];
