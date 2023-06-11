import { getProfessorID } from "./src/utils/GetProfessorID";

console.log("This is the background page.");
console.log("Put the background scripts here.");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.contentScriptQuery) {
    case "queryProfID":
      //   getProfessorID(request.profName, sendResponse);
      return true;

    // case "queryProfData":
    // 	queryProfData(request.profID, sendResponse);
    // 	return true;

    default:
      return true;
  }
});
