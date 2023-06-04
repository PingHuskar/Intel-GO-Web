import csv
from time import sleep,time
t = time()
with open("rtddi\\ICD10.js", 'w+', encoding='utf-8') as f:
    f.writelines(f'const ICD10 = [\n')
    with open(f"rtddi\\ICD10.csv", 'r+', encoding='utf-8') as c:
        csv_reader = csv.DictReader(c)
        for row in csv_reader:
            f.writelines(f"""{{
    ID: `{row[csv_reader.fieldnames[0]]}`,
    INFO: `{row['INFO']}`,
    }},""")
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