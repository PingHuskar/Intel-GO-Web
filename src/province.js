const PROVINCE = [
    {name:'กรุงเทพมหานคร', geo:['13.7278956', '100.52412349999997']},
    {name:'กระบี่', geo:['8.0862997', '98.90628349999997']},
    {name:'กาญจนบุรี',geo:[ '14.0227797', '99.53281149999998']},
    {name:'กาฬสินธุ์', geo:['16.4314078', '103.5058755']},
    {name:'กำแพงเพชร',geo:[ '16.4827798', '99.52266179999992']},
    {name:'ขอนแก่น',geo:[ '16.4419355', '102.8359921']},
    {name:'จันทบุรี',geo:[ '12.61134', '102.10385459999998']},
    {name:'ฉะเชิงเทรา',geo:[ '13.6904194', '101.07795959999999']},
    {name:'ชลบุรี',geo:[ '13.3611431', '100.98467170000004']},
    {name:'ชัยนาท',geo:[ '15.1851971', '100.12512500000003']},
    {name:'ชัยภูมิ',geo:[ '15.8068173', '102.03150270000003']},
    {name:'ชุมพร',geo:[ '10.4930496', '99.18001989999993']},
    {name:'เชียงราย',geo:[ '19.9071656', '99.83095500000002']},
    {name:'เชียงใหม่', geo:['18.7877477', '98.99313110000003']},
    {name:'ตรัง', geo:['7.5593851', '99.61100650000003']},
    {name:'ตราด', geo:['12.2427563', '102.51747339999997']},
    {name:'ตาก', geo:['16.8839901', '99.12584979999997']},
    {name:'นครนายก',geo:[ '14.2069466', '101.21305110000003']},
    {name:'นครปฐม',geo:[ '13.8199206', '100.06216760000007']},
    {name:'นครพนม',geo:[ '17.392039', '104.76955079999993']},
    {name:'นครราชสีมา', geo:['14.9798997', '102.09776929999998']},
    {name:'นครศรีธรรมราช', geo:['8.4303975', '99.96312190000003']},
    {name:'นครสวรรค์',geo:[ '15.6930072', '100.12255949999997']},
    {name:'นนทบุรี',geo:[ '13.8621125', '100.51435279999998']},
    {name:'นราธิวาส', geo:['6.4254607', '101.82531429999995']},
    {name:'น่าน',geo:[ '18.7756318', '100.77304170000002']},
    {name:'บุรีรัมย์',geo:[ '14.9930017', '103.10291910000001']},
    {name:'ปทุมธานี',geo:[ '14.0208391', '100.52502759999993']},
    {name:'ประจวบคีรีขันธ์',geo:[ '11.812367', '99.79732709999996']},
    {name:'ปราจีนบุรี', geo:['14.0509704', '101.37274389999993']},
    {name:'ปัตตานี',geo:[ '6.869484399999999', '101.25048259999994']},
    {name:'พระนครศรีอยุธยา', geo:['14.3532128', '100.56895989999998']},
    {name:'พะเยา',geo:[ '19.1664789', '99.9019419']},
    {name:'พังงา', geo:['8.4407456', '98.51930319999997']},
    {name:'พัทลุง',geo:[ '7.6166823', '100.07402309999998']},
    {name:'พิจิตร',geo:[ '16.4429516', '100.34823289999997']},
    {name:'พิษณุโลก',geo:[ '16.8298048', '100.26149150000003']},
    {name:'เพชรบุรี',geo:[ '13.1111601', '99.93913069999996']},
    {name:'เพชรบูรณ์', geo:['16.4189807', '101.15509259999999']},
    {name:'แพร่',geo:[ '18.1445774', '100.14028310000003']},
    {name:'ภูเก็ต',geo:[ '7.9810496', '98.36388239999997']},
    {name:'มหาสารคาม',geo:[ '16.1850896', '103.30264609999995']},
    {name:'มุกดาหาร',geo:[ '16.542443', '104.72091509999996']},
    {name:'แม่ฮ่องสอน', geo:['19.2990643', '97.96562259999996']},
    {name:'ยโสธร', geo:['15.792641', '104.14528270000005']},
    {name:'ยะลา', geo:['6.541147', '101.28039469999999']},
    {name:'ร้อยเอ็ด',geo:[ '16.0538196', '103.65200359999994']},
    {name:'ระนอง', geo:['9.9528702', '98.60846409999999']},
    {name:'ระยอง', geo:['12.6833115', '101.23742949999996']},
    {name:'ราชบุรี',geo:[ '13.5282893', '99.81342110000003']},
    {name:'ลพบุรี', geo:['14.7995081', '100.65337060000002']},
    {name:'ลำปาง', geo:['18.2888404', '99.49087399999996']},
    {name:'ลำพูน', geo:['18.5744606', '99.0087221']},
    {name:'เลย', geo:['17.4860232', '101.72230020000006']},
    {name:'ศรีสะเกษ',geo:[ '15.1186009', '104.32200949999992']},
    {name:'สกลนคร', geo:['17.1545995', '104.1348365']},
    {name:'สงขลา',geo:[ '7.1756004', '100.61434699999995']},
    {name:'สตูล', geo:['6.6238158', '100.06737440000006']},
    {name:'สมุทรปราการ',geo:[ '13.5990961', '100.59983190000003']},
    {name:'สมุทรสงคราม', geo:['13.4098217', '100.00226450000002']},
    {name:'สมุทรสาคร', geo:['13.5475216', '100.27439559999993']},
    {name:'สระแก้ว',geo:[ '13.824038', '102.0645839']},
    {name:'สระบุรี',geo:[ '14.5289154', '100.91014210000003']},
    {name:'สิงห์บุรี', geo:['14.8936253', '100.39673140000002']},
    {name:'สุโขทัย', geo:['17.0055573', '99.82637120000004']},
    {name:'สุพรรณบุรี', geo:['14.4744892', '100.11771279999994']},
    {name:'สุราษฎร์ธานี', geo:['9.1382389', '99.32174829999997']},
    {name:'สุรินทร์',geo:[ '14.882905', '103.49371070000007']},
    {name:'หนองคาย', geo:['17.8782803', '102.74126380000007']},
    {name:'หนองบัวลำภู',geo:[ '17.2218247', '102.42603680000002']},
    {name:'อ่างทอง',geo:[ '14.5896054', '100.45505200000002']},
    {name:'อำนาจเจริญ', geo:['15.8656783', '104.62577740000006']},
    {name:'อุดรธานี',geo:[ '17.4138413', '102.78723250000007']},
    {name:'อุตรดิตถ์',geo:[ '17.6200886', '100.09929420000003']},
    {name:'อุทัยธานี', geo:['15.3835001', '100.02455269999996']},
    {name:'อุบลราชธานี', geo:['15.2286861', '104.85642170000006']},
    {name:'บึงกาฬ', geo:['18.3609104', '103.64644629999998']},
]