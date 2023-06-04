import csv
from time import sleep,time
t = time()
with open("rtddi\\data.js", 'w+', encoding='utf-8') as f:
    f.writelines(f'const data = [\n')
    with open(f"rtddi\\opendata-rtddi-54-65_12month.csv", 'r+', encoding='utf-8') as c:
        csv_reader = csv.DictReader(c)
        for row in csv_reader:
            if (row['Acc Latlong'] != '' 
                and row['Acclong'] != ''
                and row['Age'] != ''
                ):
                # print(row['Dead Year_ปีที่เสียชีวิต'])
                # print(row['Age'])
                # print(row['Acc Latlong'])
                # print(row['Acclong'])
                # print(row['Ncause'])
                # print(".....................")
                f.writelines(f"""{{
    DY: {row['Dead Year_ปีที่เสียชีวิต']},
    Age: {row['Age']},
    geo: [{row['Acc Latlong']},{row['Acclong']}],
    Ncause: `{row['Ncause']}`,
    }},""")
                print(row['Ncause'])
                # break
                # sleep(1)
        # for stop in stops:
        #     f.writelines('{'
        #         + f'id: `{stop[0]}`,'
        #         + f'local: `{stop[1].split(";")[0]}`,'
        #         + f'en: `{stop[1].split(";")[1]}`,'
        #         + f'geo: [{round(float(stop[2]),6)},{round(float(stop[3]),6)}]'
        #         +',}')
        #     f.writelines(f',\n')
        c.close()
    f.writelines(f']')
    f.close()
print(f"done {time()-t} seconds")