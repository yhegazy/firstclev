#!/usr/bin/env python
# coding: utf-8


from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager

import time
import re
import pandas as pd
from bs4 import BeautifulSoup

options = webdriver.ChromeOptions()
options.add_argument('--ignore-certificate-errors')
options.add_argument('--incognito')
options.add_argument('headless')
options.add_argument('--no-sandbox')

browser = webdriver.Chrome(ChromeDriverManager().install(), options=options)
browser.get('https://www.youtube.com/channel/UCYYBYUfJwI3YjmQt_qigTmQ/videos')


for _ in range(10):
    browser.find_element_by_tag_name('body').send_keys(Keys.END)
    time.sleep(3)
    
html = browser.page_source
soup = BeautifulSoup(html, 'html.parser')

videos = soup.find_all("div", {"id": "dismissable"})

master_list = []
i = 0

for video in videos:
    
    data_dict               = {}
    data_dict['id']         = i
    
    
    single_entity           = {}
    single_entity['title']      = video.find('a', {"id": 'video-title'}).text
    single_entity['url']   = 'https://www.youtube.com'+video.find('a', {"id": 'video-title'})['href']
    meta                    = video.find('div', {"id": 'metadata-line'}).find_all('span')
    single_entity['views']       = meta[0].text
    single_entity['videoAge']   = meta[1].text
    
    data_dict.update(single_entity)
    i+=1
    
    master_list.append(data_dict)
    
df = pd.DataFrame(master_list)
df.to_csv('archives.csv')




