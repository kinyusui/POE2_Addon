import { getMapOfFields } from "../selectorScraping/scrape.js";
import { DoStatFilters, DoFilters } from "./formatItemInfo.js";

function setInput(inputElement, desiredValue) {
  inputElement.value = desiredValue; // Change the value
  inputElement.dispatchEvent(new Event("change")); // Trigger the change event
}

export class Piloter {
  constructor() {
    const containersIndexMapping = getMapOfFields();
    this.selectors = {
      options: {
        itemCategory: `#trade > div.top > div > div.search-bar.search-advanced > div > div.search-advanced-pane.blue > div:nth-child(1) > div.filter-group-body > div:nth-child(1) > span > div.multiselect.filter-select.modified > div.multiselect__content-wrapper > ul > li > span > span`,
      },
      inputsContainer: {
        minMaxSelectors: {
          min: `span > input[placeholder='min']`,
          max: `span > input[placeholder='max']`,
        },
        containers: `.filter.filter-property`,
        containersIndexMapping,
      },
    };
    this.doFilters = new DoFilters(containersIndexMapping);
  }

  getMinMaxFields = (inputContainer) => {
    const { min, max } = this.selectors.inputsContainer.minMaxSelectors;
    const minField = inputContainer.querySelector(min);
    const maxField = inputContainer.querySelector(max);
    return {
      minField,
      maxField,
    };
  };

  setField = (fieldName, value) => {
    const inputContainerSelectors = this.selectors.inputsContainer.containers;
    const inputContainers = document.querySelectorAll(inputContainerSelectors);
    const indexOfTarget =
      this.selectors.inputsContainer.containersIndexMapping[fieldName];
    const targetInputContainer = inputContainers[indexOfTarget];

    const { minField, maxField } = this.getMinMaxFields(targetInputContainer);
    setInput(minField, value);
  };

  static resetAffixes() {
    const resetSelector = `#trade > div.top > div > div.search-bar.search-advanced > div > div.search-advanced-pane.brown > div.filter-group.expanded > div.filter-group-header > div > span:nth-child(3) > button`;
    document.querySelector(resetSelector).click();
  }

  setStatFilters(itemInfo) {
    Piloter.resetAffixes();
    const stats = DoStatFilters.getStats(itemInfo);
    console.log(stats);
  }
}
