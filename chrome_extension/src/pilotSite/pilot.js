import { getMapOfFields } from "../selectorScraping/scrape.js";
import { DoStatFilters, DoFilters } from "./formatItemInfo.js";

function setInput1(inputElement, desiredValue) {
  inputElement.value = desiredValue; // Change the value
  inputElement.dispatchEvent(new Event("change")); // Trigger the change event
}

function typeOneLetter(inputElement, char) {
  // Set the value programmatically
  inputElement.value = inputElement.value + char; // Append "a"

  // Dispatch input and key events to simulate natural behavior
  inputElement.dispatchEvent(new InputEvent("input", { bubbles: true }));
  inputElement.dispatchEvent(
    new KeyboardEvent("keydown", { key: char, bubbles: true })
  );
  inputElement.dispatchEvent(
    new KeyboardEvent("keypress", { key: char, bubbles: true })
  );
  inputElement.dispatchEvent(new KeyboardEvent("keyup", { key: char, bubbles: true }));
}

function setInput(inputElement, desiredValue) {
  // Focus on the input to ensure typing works
  inputElement.focus();
  // desiredValue.split("").forEach((char) => {
  //   typeOneLetter(inputElement, char);
  // });
  inputElement.value = desiredValue;
  inputElement.dispatchEvent(new Event("change")); // Trigger the change event
}

function clearInput(inputElement) {
  inputElement.focus();
  inputElement.value = "";
  inputElement.dispatchEvent(new Event("change"));
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

  static getSiteStatTemplateToElement() {
    const siteStatTemplateToEle = {};
    const statTemplatesSelector = `#trade > div.top > div > div.search-bar.search-advanced > div > div.search-advanced-pane.brown > div.filter-group.expanded > div.filter-group-body > div > span > div > div.multiselect__content-wrapper > ul > li > span > span`;
    const statTemplatesEle = [...document.querySelectorAll(statTemplatesSelector)];
    statTemplatesEle.forEach((ele) => {
      const template = ele.innerText;
      if (siteStatTemplateToEle[template] === undefined) {
        siteStatTemplateToEle[template] = ele;
      }
    });
    return siteStatTemplateToEle;
  }

  static chooseFirstRemainingOption() {
    const optionsContainerSelector = `#trade > div.top > div > div.search-bar.search-advanced > div > div.search-advanced-pane.brown > div.filter-group.expanded > div.filter-group-body > div.filter.filter-padded > span > div > div.multiselect__content-wrapper > ul`;
    const optionsContainer = document.querySelector(optionsContainerSelector);
    const options = optionsContainer.querySelectorAll(`li > span > span`);
    const firstOfRemaining = options.length > 1 ? options[1] : options[0];
    return firstOfRemaining;
  }

  static waitForField(selector, expectedSize) {
    return new Promise((resolve) => {
      const checkerId = setInterval(() => {
        const items = document.querySelectorAll(selector);
        const expectedSizeMet = items.length >= expectedSize;
        // console.log("items", items, expectedSize);
        if (expectedSizeMet) {
          clearInterval(checkerId);
          resolve();
        }
      }, 50);
    });
  }

  fillMinMax = (addedField, values) => {
    const { minField, maxField } = this.getMinMaxFields(addedField);
    setInput(minField, values[0]);
    if (values.length === 2) {
      setInput(maxField, values[1]);
    }
  };

  async setStatFilters(itemInfo) {
    Piloter.resetAffixes();
    const stats = DoStatFilters.getStats(itemInfo);
    const siteStatTemplateToEle = Piloter.getSiteStatTemplateToElement();
    const statInputEleSelector = `#trade > div.top > div > div.search-bar.search-advanced > div > div.search-advanced-pane.brown > div.filter-group.expanded > div.filter-group-body > div.filter.filter-padded > span > div > div.multiselect__tags > input`;
    const statInputEle = document.querySelector(statInputEleSelector);

    statInputEle.click();
    const selectedFiltersSelector = `#trade > div.top > div > div.search-bar.search-advanced > div > div.search-advanced-pane.brown > div.filter-group.expanded > div.filter-group-body > div.full-span`;
    let selectedAmount = 0;
    stats.forEach(async (templateValuePair) => {
      const { template, values } = templateValuePair;
      const optionEle = siteStatTemplateToEle[template];
      if (optionEle) {
        optionEle.click();
        const fieldFound = Piloter.waitForField(
          selectedFiltersSelector,
          selectedAmount + 1
        );
        const _selectedAmount = selectedAmount;
        fieldFound.then((_) => {
          const allStatFields = document.querySelectorAll(selectedFiltersSelector);
          const addedField = allStatFields[_selectedAmount];
          this.fillMinMax(addedField, values);
        });

        selectedAmount += 1;
      }
    });
    console.log(`
      ${JSON.stringify(stats)}
      ${JSON.stringify(siteStatTemplateToEle)}`);
    /*
    fix parentheses traits not found in stat to ele dict.

    dict of stat templates to element.
    get list of matching ones.
    input each.
      select.
      fill in values.
    */
  }
  // setStatFilters(itemInfo) {
  //   Piloter.resetAffixes();
  //   const stats = DoStatFilters.getStats(itemInfo);
  //   const siteStatTemplateToEle = Piloter.getSiteStatTemplateToElement();
  //   const statInputEleSelector = `#trade > div.top > div > div.search-bar.search-advanced > div > div.search-advanced-pane.brown > div.filter-group.expanded > div.filter-group-body > div.filter.filter-padded > span > div > div.multiselect__tags > input`;
  //   const statInputEle = document.querySelector(statInputEleSelector);

  //   statInputEle.click();
  //   stats.map((templateValuePair) => {
  //     const { template, values } = templateValuePair;
  //     const optionEle = siteStatTemplateToEle[template];
  //     if (optionEle) {
  //       setInput(statInputEle, template);
  //       const option = Piloter.chooseFirstRemainingOption();
  //       option.click();
  //       clearInput(statInputEle);
  //       console.log("chosen");
  //       // optionEle.click();
  //     }
  //   });
  //   console.log(`
  //     ${JSON.stringify(stats)}
  //     ${JSON.stringify(siteStatTemplateToEle)}`);
  //   /*
  //   fix parentheses traits not found in stat to ele dict.

  //   dict of stat templates to element.
  //   get list of matching ones.
  //   input each.
  //     select.
  //     fill in values.
  //   */
  // }
}
