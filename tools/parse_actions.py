#!/usr/bin/env python3

import csv
import json

outActions = {}
outClasses = {}
moveLUT = {}

def parseCastType(i):
    print(f"Unknown cast type: {i}")
    return i

def parseCJCat(i):
    print(f"Unknown cast type: {i}")
    return i

def parseCategory(i):
    if i == '0': return "PVP Ability"
    if i == '2': return "Spell"
    if i == '3': return "Weaponskill"
    if i == '4': return "Ability"
    if i == '15': return "PVP LB"
    print(f"Unknown category: {i}")
    return i

def buildClassLut():
    global classLut
    with open("cache/ClassJob.csv", "r") as f:
        classes = csv.DictReader(f)
        classes.__next__()
        classes.__next__()

        for row in classes:
            id = int(row['\ufeffkey'])
            if id <= 0:
                continue
            if id >= 8 and id <= 18:
                continue
            
            outClasses[id] = {}
            outClasses[id]['name'] = row['0']
            outClasses[id]['abbrev'] = row['1']
            outClasses[id]['actions'] = []

def main():
    buildClassLut()
    actionfile = open("cache/Action.csv", "r")
    actions = csv.DictReader(actionfile)
    actions.__next__()
    actions.__next__()

    for row in actions:
        cjcat = int(row['49'])
        if cjcat < 0:
            continue
        id = int(row['\ufeffkey'])
        name = row['0']
        moveLUT[name] = id
    with open("action_to_id.json", "w") as f:
        json.dump(moveLUT, f, indent=2)

    return

    #print(actions.fieldnames)
    for row in actions:

        # important mappings:
        # '\ufeffkey' - key
        # 0 - name
        # 3 - actioncategory
        # 10 - classjob
        # 12 - classjoblevel
        # 27 - cast type
        # 35 - combo action
        # 37 - cast time (in 100ms)
        # 39 - recast time (in 100ms)
        # 49 - classjob category
        # 55 - ispvp

        # ensure its a player ability
        classjob = int(row['10'])
        cjcat = int(row['49'])

        # skip enemy actions
        if not classjob > 0:
            continue

        # skip classes & craft/gather
        # craft/gather = 8-18; 11 total
        if classjob >= 8 and classjob <= 18:
            continue

        # Skip PVP
        if row['55'] == "True":
            continue

        # format entry
        id = int(row['\ufeffkey'])
        cjcat = int(row['49'])
        act = {
            "id": int(row['\ufeffkey']),
            "class": outClasses[classjob]['abbrev'],
            "name": row['0'],
            "type": parseCategory(row['3']),
            "level": int(row['12']),
            #"casttype": parseCastType(row['27']),
            "combo": int(row['35']),
            "cjcat": cjcat,
            "cast": int(row['37'])/10,
            "recast": int(row['39'])/10,
        }

        outActions[id] = act
        outClasses[classjob]['actions'].append(id)
    
    actionfile.close()

    # classfile merging shit
    #gla -> pld
    outClasses[19]['actions'] = outClasses[1]['actions'] + outClasses[19]['actions']

    # save
    with open("parsed_data.json", "w") as f:
        json.dump(outActions, f, indent=2)
    with open("parsed_classes.json", "w") as f:
        json.dump(outClasses, f, indent=2)
        

if __name__ == "__main__":
    exit(main())