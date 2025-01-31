export class DoStatFilters {
  // Right side of trade site filters.
  static matchNumberRegex = /\d+(\.\d+)?/g;

  static getStatValues(potentialStats) {
    const { matchNumberRegex } = DoStatFilters;
    // const strsToNums = (numStrs) => numStrs.map(parseFloat);
    const getNumValues = (line) => {
      const matchesRaw = line.match(matchNumberRegex);
      const matches = matchesRaw !== null ? matchesRaw : [];
      return matches.map(parseFloat);
    };
    const statNumValues = potentialStats.map(getNumValues);
    return statNumValues;
  }

  static parenthesesTraits = ["(enchant)", "(implicit)", "(rune)"];
  static formatParenthesesTraits(statTemplate) {
    DoStatFilters.parenthesesTraits.forEach((parenthesisTrait) => {
      const traitFound = statTemplate.search(parenthesisTrait) !== -1;
      if (traitFound) {
        const templateWithoutTrait = statTemplate.split(parenthesisTrait)[0];
        const lenMinus1 = templateWithoutTrait.length - 1;
        const templateNoEndingSpace = templateWithoutTrait.substring(0, lenMinus1);
        statTemplate = `${parenthesisTrait} ${templateNoEndingSpace}`;
      }
    });
    return statTemplate;
  }

  static getStatTemplates(potentialStats) {
    const { matchNumberRegex } = DoStatFilters;
    const replaceNumWithHashtag = (line) => line.replaceAll(matchNumberRegex, "#");
    const statNumReplaced = potentialStats.map(replaceNumWithHashtag);
    const removeSign = (line) => line.replaceAll(/[+-]/g, "");
    const statSignRemoved = statNumReplaced.map(removeSign);
    const { formatParenthesesTraits } = DoStatFilters;
    const parenthesesTraitFormatted = statSignRemoved.map(formatParenthesesTraits);
    return parenthesesTraitFormatted;
  }

  static getStats(itemInfo) {
    const lines = itemInfo.split("\n");
    const indexOfItemLevel = lines.findIndex((line) => {
      const matchingCharacters = line.slice(0, 10);
      return matchingCharacters === "Item Level";
    });

    const potentialStats = lines.slice(indexOfItemLevel + 1);
    const statTemplates = DoStatFilters.getStatTemplates(potentialStats);
    const statValues = DoStatFilters.getStatValues(potentialStats);
    const templateValuePair = statTemplates
      .map((template, i) => {
        return { template, values: statValues[i] };
      })
      .filter((pair) => pair.template !== "");
    return templateValuePair;
  }
}

function getInputables(itemInfo) {
  const lines = itemInfo.split("\n");
  const potentialInputables = lines.map((line) => line.split(":"));
  const inputables = potentialInputables.filter((arr) => arr.length > 1);
  const inputablesWithNum = inputables.map(([name, numStr]) => [
    name,
    parseInt(numStr),
  ]);
  const onlyValidNums = inputablesWithNum.filter((arr) => !isNaN(arr[1]));
  return onlyValidNums;
}

function getItemClass(itemInfo) {
  const firstLine = itemInfo.split("\n")[0];
  const secondTerm = firstLine.split(":")[1];
  return secondTerm;
}

export class DoFilters {
  // left side of trade site filters.
  constructor(dictOfSiteFieldNames) {
    this.validMap = this.getCopyInfoToValidMap(dictOfSiteFieldNames);
  }

  getNameToName = (dictOfSiteFieldNames) => {
    const nameToName = {};
    Object.keys(dictOfSiteFieldNames).forEach((name) => (nameToName[name] = name));
    return nameToName;
  };

  getCopyInfoToValidMap = (dictOfSiteFieldNames) => {
    const nameToName = this.getNameToName(dictOfSiteFieldNames);
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
  };
}
