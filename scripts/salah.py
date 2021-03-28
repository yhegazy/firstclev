import requests
import pandas as pd
import re
from bs4 import BeautifulSoup

source = requests.get('https://www.islamicfinder.org/world/united-states/5150529/cleveland-prayer-times/').text

soup = BeautifulSoup(source, 'lxml')
prayerTable = soup.find_all("table", {"class" : "table table-pt"})

master_data = []
for prayer in prayerTable:
    data_dict = {}
    tBody = prayer.find('tbody')
        
    trActive = tBody.find("tr", {"class": "tr-active"})
    data_dict['rows'] = trActive.text 
    data_dict['header'] = prayer.find('').text.strip()
        
    master_data.append(data_dict)

df = pd.DataFrame(master_data)
df.to_json('dailyPrayerTimes.json')


