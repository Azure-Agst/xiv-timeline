#!/usr/bin/env python3

import re
import os
import sys
import time
import json
import requests
from bs4 import BeautifulSoup

CLASS = ''
PREFIX = ''
CACHE_DIR = 'cache'
DATA_DIR = 'data'

DATA = {}
ID_LUT = {}

def load_id_lut():
    global ID_LUT
    with open("action_to_id.json", "r") as f:
        ID_LUT = json.load(f)
    print("Loaded ID LUT")

def main():
    """Main function"""
    global CLASS
    global PREFIX

    load_id_lut()

    # get input
    if len(sys.argv) < 3:
        print("Need more arguments!")
        print(f"{sys.argv[0]} [class] [prefix]")
        return 1
    CLASS = sys.argv[-2]
    PREFIX = sys.argv[-1]
    print(f"using class name '{CLASS}'...")
    print(f"using prefix '{PREFIX}'...")

    # calculate cached names
    cached_file = f"{CACHE_DIR}/{CLASS}.html"

    # ensure dirs exists
    if not os.path.exists(CACHE_DIR):
        os.mkdir(CACHE_DIR)
    if not os.path.exists(DATA_DIR):
        os.mkdir(DATA_DIR)

    # cache website if needed
    if not os.path.exists(cached_file):
        print(f"fetching {cached_file}")
        res = requests.get(f"https://na.finalfantasyxiv.com/jobguide/{CLASS}/")
        if res.status_code != 200:
            print("Failed to get html!")
            return 1
        with open(cached_file, "w") as f:
            f.write(res.text)

    # open file and parse
    with open(cached_file, "r") as f:
        print(f"loading {cached_file}")
        parse_html(f.read())

    # write out data
    with open(f"{DATA_DIR}/{CLASS}.json", "w") as f:
        json.dump(DATA, f, indent=4)
    print(DATA.keys())

    # done!
    print("done!")
    return 0


def parse_html(html):
    """Parses icons from HTML"""

    # get first three job wrappers
    print("parsing html...")
    soup = BeautifulSoup(html, 'lxml')
    pve_tab = soup.find("div", {"class": "job__content--battle"})
    sections = pve_tab.find_all("div", {"class": "job__content__wrapper"})

    # for each of the first three groups
    groups = ["Job Actions", "Role Actions"]
    for section in sections:
        secname = section.find("h3").getText().strip()

        # guard clause
        if secname not in groups:
            continue

        # get all skills in table
        table = section.find("tbody", {"class": "job__tbody"})
        items = table.find_all("tr")
        print("==========")
        for item in items:
            parse_item(item)


def parse_item(item):
    global DATA

    # guard clause
    if not item.has_attr("id"):
        return

    # format metadata
    item_name = item.find("strong").getText().strip()
    clean_name = sanitize_string(item_name)
    item_level = item.find("div", {"class": "jobclass__wrapper"}) \
        .find("p").getText().strip().replace("Lv. ", "")
    #print(item)
    item_type = item.find("td", {"class": "classification"}).getText().strip()
    item_cast = item.find("td", {"class": "cast"}).getText().strip()
    item_recast = item.find("td", {"class": "recast"}).getText().strip()

    icon_href = f"icon/{CLASS}/{clean_name}.png"
    id = ID_LUT[item_name]

    DATA[id] = {
        "name": item_name,
        "icon": icon_href,
        "class": PREFIX,
        "level": int(item_level),
        "type": item_type,
        "cast": 0 if item_cast == "Instant" else float(item_cast.replace("s", "")),
        "recast": float(item_recast.replace("s", ""))
    }


def sanitize_string(input):
    input = input.replace(" ", "_").lower()
    return re.sub("[^0-9a-zA-Z_\s]+", "", input)


if __name__ == "__main__":
    exit(main())
