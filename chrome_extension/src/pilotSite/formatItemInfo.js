export class Formatter {
  constructor(listOfSiteFieldNames) {
    this.validMap = this.getCopyInfoToValidMap(listOfSiteFieldNames);
  }

  getNameToName = (listOfSiteFieldNames) => {
    const nameToName = {};
    listOfSiteFieldNames.forEach((name) => (nameToName[name] = name));
    return nameToName;
  };

  getCopyInfoToValidMap = (listOfSiteFieldNames) => {
    const nameToName = this.getNameToName(listOfSiteFieldNames);
    const copyInfoThatNeedsTranslation = {
      ...nameToName,
      [`Item Class`]: `Item Category`,
      [`Critical Hit Chance`]: `Critical Chance`,
    };
    return copyInfoThatNeedsTranslation;
  };

  formatItemInfo = (itemInfo) => {
    const lines = itemInfo.split("\n");
    const relevantParts = {};
    console.log(equipmentFilters, requirements);
  };
}

var s = `Item Class: Foci
Rarity: Rare
Morbid Spell
Expert Plumed Focus
--------
Energy Shield: 230 (augmented)
--------
Requirements:
Level: 75
Int: 139
--------
Sockets: S 
--------
Item Level: 83
--------
+69 to maximum Energy Shield
74% increased Energy Shield
+170 to maximum Mana
+40% to Fire Resistance
+40% to Cold Resistance
+41% to Lightning Resistance`;
formatItemInfo(s);
