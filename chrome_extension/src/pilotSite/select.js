import { getMapOfFields } from "../selectorScraping/scrape";

export const selectors = {
  options: {
    itemCategory: `#trade > div.top > div > div.search-bar.search-advanced > div > div.search-advanced-pane.blue > div:nth-child(1) > div.filter-group-body > div:nth-child(1) > span > div.multiselect.filter-select.modified > div.multiselect__content-wrapper > ul > li > span > span`,
  },
  inputsContainer: {
    minMaxSelectors: {
      min: `span > input[placeholder='min']`,
      max: `span > input[placeholder='max']`
    },
    containers: `.filter.filter-property`,
    containersIndexMapping: getMapOfFields(),
  }
}

const getMinMaxFields = (inputContainer) => {
  const { min, max } = selectors.inputsContainer.minMaxSelectors;
  const minField = inputContainer.querySelector(min);
  const maxField = inputContainer.querySelector(max);
  return {
    minField,
    maxField
  }
}

function setInput(inputElement, desiredValue) {
  inputElement.value = desiredValue; // Change the value
  inputElement.dispatchEvent(new Event('change')); // Trigger the change event
}

export const setField = (fieldName, value) => {
  const inputContainerSelectors = selectors.inputsContainer.containers;
  const inputContainers = document.querySelectorAll(inputContainerSelectors);
  const indexOfTarget = selectors.inputsContainer.containersIndexMapping[fieldName];
  const targetInputContainer = inputContainers[indexOfTarget];

  const { minField, maxField } = getMinMaxFields(targetInputContainer);
  console.log(minField, fieldName, value)
  setInput(minField, value);
}
