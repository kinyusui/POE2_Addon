function getAllFields() {
  var selector = `.filter.filter-property`;
  return document.querySelectorAll(selector);
}

function getTitle(element) {
  var name = element.querySelector(`span > div.filter-title`).innerText;
  var nameNoFluff = name.trim();
  return nameNoFluff;
}

export function getMapOfFields() {
  var elesRaw = getAllFields();
  var elesIndexWithName = [...elesRaw].map((ele, i) => [getTitle(ele), i]);
  var map = {};
  elesIndexWithName.forEach(([name, index]) => (map[name] = index));
  return map;
}
