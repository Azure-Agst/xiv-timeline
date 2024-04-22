#!/usr/bin/env python3

import re
import os
import sys
import time
import requests
from bs4 import BeautifulSoup


CLASS = ''
CACHE_DIR = 'cache'
ICON_DIR = 'icons'


def main():
    """Main function"""
    global CLASS

    # get input
    if len(sys.argv) < 2:
        print("Need an argument!")
        return 1
    CLASS = sys.argv[-1]
    print(f"using class name '{CLASS}'...")

    # calculate cached names
    cached_file = f"{CACHE_DIR}/{CLASS}.html"

    # ensure dirs exists
    if not os.path.exists(CACHE_DIR):
        os.mkdir(CACHE_DIR)
    if not os.path.exists(ICON_DIR):
        os.mkdir(ICON_DIR)

    # cache website if needed
    if not os.path.exists(cached_file):
        print(f"fetching {cached_file}")
        res = requests.get(f"https://na.finalfantasyxiv.com/jobguide/{CLASS}/")
        if res.status_code != 200:
            print("Failed to get html!")
            return 1
        with open(cached_file, "w") as f:
            f.write(res.text)

    # more folder checking
    if not os.path.exists(f"{ICON_DIR}/{CLASS}"):
        os.mkdir(f"{ICON_DIR}/{CLASS}")

    # open file and parse
    with open(cached_file, "r") as f:
        print(f"loading {cached_file}")
        parse_html(f.read())

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
    groups = ["Job Actions", "Role Actions", "Trait"]
    for section in sections:
        secname = section.find("h3").getText().strip()

        # guard clause
        if secname not in groups:
            continue

        # get all skills in table
        table = section.find("tbody", {"class": "job__tbody"})
        items = table.find_all("td", {"class": "skill"})
        for item in items:
            download_icon(item)


def download_icon(item):
    """downloads icon"""

    # format metadata
    icon_name = item.find("strong").getText().strip()
    clean_name = sanitize_string(icon_name)
    src = item.find("img")['src']
    dest = f"{ICON_DIR}/{CLASS}/{clean_name}.png"

    # don't repeat
    if os.path.exists(dest):
        print(f"skipping {dest}")
        return

    # get icon
    print(f"downloading '{src}' icon to '{dest}'...")
    r = requests.get(src)
    open(dest, "wb").write(r.content)

    # sleep to prevent rate limiting
    time.sleep(0.2)


def sanitize_string(input):
    input = input.replace(" ", "_").lower()
    return re.sub("[^0-9a-zA-Z_\s]+", "", input)


if __name__ == "__main__":
    exit(main())