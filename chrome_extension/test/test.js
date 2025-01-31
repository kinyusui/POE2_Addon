import { DoStatFilters } from "../src/pilotSite/formatItemInfo.js";
import { templates } from "./template.js";

function test() {
  for (let itemName in templates) {
    var itemInfo = templates[itemName];
    var affixes = DoStatFilters.getStats(itemInfo);
    console.log(affixes);
  }
}

test();
