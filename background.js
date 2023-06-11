import queryProfID from "./src/utils/queryProfID";
import queryProfData from "./src/utils/queryProfData";

console.log("This is the background page.");
console.log("Put the background scripts here.");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
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
});
