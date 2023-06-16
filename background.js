import queryProfID from "./src/utils/queryProfID";
import queryProfData from "./src/utils/queryProfData";
import detectBrowserName from "./src/utils/detectBrowserName";

const browserName = detectBrowserName();

function Listener(request, sender, sendResponse) {
  switch (request.contentScriptQuery) {
    case "queryProfID":
      queryProfID(request.profName, sendResponse);
      return true;

    case "queryProfData":
      queryProfData(request.profID, sendResponse);
      return true;

    default:
      return true;
  }
}

if (browserName === "Firefox") {
  browser.runtime.onMessage.addListener(Listener);
} else if (browserName === "Chrome" || "Edge") {
  chrome.runtime.onMessage.addListener(Listener);
}
