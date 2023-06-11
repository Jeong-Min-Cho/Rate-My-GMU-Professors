import checkExecution from "./utils/checkExecution";
import convertLastNameFirstNameToFirstNameLastName from "./utils/convertLastNameFirstNameToFirstNameLastName.js";

import ProfessorList from "./components/ProfessorList";

window.addEventListener("load", function () {
  const observer = new MutationObserver((mutationsList, observer) => {
    if (document.getElementsByClassName("results-out-of").length > 0) {
      observer.disconnect();
      startObserver();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});

function startObserver() {
  const MutationObserver =
    window.MutationObserver || window.WebKitMutationObserver;

  function processInstructor(currentEmailArray) {
    // Avoid unnecessary nesting by checking condition early
    if (
      !currentEmailArray ||
      !currentEmailArray.innerText ||
      currentEmailArray.innerText === "Instructor"
    ) {
      return;
    }

    // Abstract repeated logic into a function
    function processName(professorname) {
      if (professorname) {
        const fullName = professorname.replace(/\(.*?\)/, "");
        console.log("fullName", fullName);
        // GetProfessorInfo(currentEmailArray, fullName, userSettings, false);
        // convert fullName which comes last name first name to first name last name

        console.log(
          "converted",
          convertLastNameFirstNameToFirstNameLastName(fullName)
        );
      }
    }

    // Select all 'a' elements that have class 'email'
    const emailElements = currentEmailArray.querySelectorAll("a.email");

    // <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 md:p-6">

    const professorObjects = [];

    emailElements.forEach((emailElement) => {
      const professorname = emailElement.textContent;
      processName(professorname);

      professorObjects.push({
        name: professorname,
        email: emailElement.getAttribute("href").replace("mailto:", ""),
        rating: "8.7",
        // only first preofessor is primary
        isPrimary: professorObjects.length === 0,
      });
    });

    const newDiv = document.createElement("div");
    newDiv.id = "ratemygmuprofessors";
    newDiv.innerHTML = ProfessorList(professorObjects);
    // replace the currentEmailArray with the newDiv
    currentEmailArray.parentNode.replaceChild(newDiv, currentEmailArray);
  }

  // Setup the observer
  const observer = new MutationObserver(async function (mutations, observer) {
    // const userSettings = await GetUserSettings();

    // if already executed, disconnect the observer
    if (checkExecution()) return;

    const query = document.querySelectorAll(`[data-property*="instructor"]`);
    const emailArray = Array.from(query);

    emailArray.forEach(processInstructor);

    // // Select the table row
    // let tableRow = document.querySelector("thead tr");

    // // Create a new table header
    // let newTH = document.createElement("th");
    // newTH.scope = "col";
    // newTH.setAttribute("data-sort-direction", "disabled");
    // newTH.className = "sort-disabled meeting-time-col ui-state-default";
    // newTH.setAttribute("data-property", "newColumn");
    // newTH.setAttribute("xe-field", "newColumn");
    // newTH.style.width = "15%";
    // newTH.setAttribute("data-hide", "phone");
    // newTH.textContent = "New Column"; // Name your new column

    // // <div class="column-visibility-menu" tabindex="0" title="Columns" style="height: 39px; top: 0px; left: 1454.5px;"></div>

    // // create a div
    // let newDiv = document.createElement("div");
    // newDiv.className = "column-visibility-menu";
    // newDiv.setAttribute("tabindex", "0");
    // newDiv.setAttribute("title", "Columns");
    // newDiv.style.height = "39px";
    // newDiv.style.top = "0px";
    // newDiv.style.left = "1454.5px";

    // // append the div to the new table header
    // newTH.appendChild(newDiv);

    // // Insert the new header after the 8th column (Instructor column)
    // tableRow.insertBefore(newTH, tableRow.children[8].nextSibling);

    // // Select the table body
    // let tableBody = document.querySelector("tbody");

    // // Iterate through each table row
    // tableBody.querySelectorAll("tr").forEach((row) => {
    //   // Create a new table cell
    //   let newTD = document.createElement("td");

    //   // Set the properties
    //   newTD.setAttribute("data-id", "523088"); // Adjust this as per your requirements
    //   newTD.setAttribute("data-property", "newColumn");
    //   newTD.setAttribute("xe-field", "newColumn");
    //   newTD.className = "readonly";
    //   newTD.style.width = "15%";

    //   // You can set text content for the cell as well
    //   newTD.textContent = "Placeholder"; // Placeholder text

    //   // Append the new cell to the row
    //   row.insertBefore(newTD, row.children[8].nextSibling);
    // });

    // var table = document.querySelector("table"); // Adjust this as needed to select your table
    // table.classList.add("grid");

    observer.disconnect();
  });

  observer.observe(document, {
    subtree: true,
    attributes: true,
  });
}

async function fetchProfIDFromName(name) {
  try {
    let response = await sendMessage({
      contentScriptQuery: "queryProfID",
      profName: name,
    });
    let profID = response.data.newSearch.teachers.edges[0].node.id;
    return profID;
  } catch (error) {
    return null;
  }
}

function sendMessage(message) {
  return new Promise((resolve, _) => {
    chrome.runtime.sendMessage(message, (res) => {
      resolve(res);
    });
  });
}

console.log("is here");

fetchProfIDFromName("Kevin Andrea").then((res) => console.log("fetch", res));

// // To find out any mutation
// MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

// let emailArray = [];
// let hereTEstValue = "None";
// let counter = 0;
// // fired when a mutation occurs
// const observer = new MutationObserver(async function (mutations, observer) {
//   if (mutations.length >= 100) {
//     // const userSettings = await GetUserSettings();

//     // // if there is any div with id:ratemygmuprofessors, it means already executed so that don't execute again
//     // if (CheckExecution()) return;

//     const query = document.querySelectorAll(`[data-property*="instructor"]`);
//     // Find instructor data fields
//     emailArray = query;
//     for (let i = 0; i < emailArray.length; i++) {
//       // Make sure the data field is not null nor undefined and it is not the Instructor field
//       const currentEmailArray = emailArray[i];
//       if (
//         currentEmailArray &&
//         currentEmailArray.innerText &&
//         currentEmailArray.innerText !== "Instructor"
//       ) {
//         // Delete (Primary) or possible other chars within brackets in the full name field
//         // Example) Doe, John (Primary) -> Doe, John

//         // check there are more than one professors in the data field
//         // No found new line means there is only one single professor which is most case
//         if (currentEmailArray.innerText.indexOf("\n") == -1) {
//           // since there is only one professor, just execute one time
//           const fullName = currentEmailArray.innerText.replace(/\(.*?\)/, "");
//           // GetProfessorInfo(currentEmailArray, fullName, userSettings, false);

//           console.log("fullName", fullName);
//         } else {
//           // if the string has at least one next line, it means there are more than one professor
//           // Split the text by new line(s)
//           const splitStrings = currentEmailArray.innerText.split("\n");

//           splitStrings.forEach((professorname) => {
//             // Make sure professorname is not empty
//             if (professorname) {
//               const fullName = professorname.replace(/\(.*?\)/, "");
//               console.log("fullName", fullName);
//               // GetProfessorInfo(
//               //   currentEmailArray,
//               //   fullName,
//               //   userSettings,
//               //   false
//               // );
//             }
//           });
//         }
//       }
//     }
//   }
// });

// // define what element should be observed by the observer
// // and what types of mutations trigger the callback
// observer.observe(document, {
//   subtree: true,
//   attributes: true,
// });
