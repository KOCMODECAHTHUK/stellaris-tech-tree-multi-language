var selectedLanguage = "english";

const translations = {};

document.querySelector("#drop").onclick = function() {
  document.getElementById("drop_down").classList.toggle("show");
}

function setLang(language) {
    selectedLanguage = language;
    load_tree();
}

function OpenToLanguage(data, selectedLanguage) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../localization/' + selectedLanguage + '.json', false);
    xhr.onload = function () {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        Object.assign(translations, response);
      } else {
        console.error('Error loading translations:', xhr.status, xhr.statusText);
      }
    };
    xhr.send();
    return translateJSON(data);
}

function translateJSON(jsonOrig) {
  for (const key in jsonOrig) {
    if (typeof jsonOrig[key] === "string") {
      if (translations[jsonOrig[key]]) {
        jsonOrig[key] = translations[jsonOrig[key]];
      }
    } else if (typeof jsonOrig[key] === "object") {
      translateJSON(jsonOrig[key]);
    }
  }
}