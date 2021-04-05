import requests
import pandas as pd
from bs4 import BeautifulSoup

source = requests.get('https://www.islamicfinder.org/world/united-states/5150529/cleveland-prayer-times/').text

soup = BeautifulSoup(source, 'html.parser')

master_data = []
prayerTable = soup.find_all("table", {"class" : "table table-pt"})

for prayer in prayerTable:
    data_dict = {}
    tBody = prayer.find('tbody')
    trActive = tBody.find("tr", {"class": "tr-active"})
    data_dict['rows'] = trActive.text
    data_dict['header'] = prayer.find("th", {"scope": "col"}).text.strip()
    data_dict['hijra'] = prayer.find("th", {"scope": "col"}).parent.find_all('th')[1].text

    master_data.append(data_dict)

df = pd.DataFrame(master_data)
df.to_json('dailyPrayerTimes.json')

