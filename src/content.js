import checkExecution from "./utils/checkExecution";
import convertLastNameFirstNameToFirstNameLastName from "./utils/convertLastNameFirstNameToFirstNameLastName.js";

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

    emailElements.forEach((emailElement) => {
      const professorname = emailElement.textContent;
      processName(professorname);

      // Create a new div, set its innerHTML to the emailElement's outerHTML
      const newDiv = document.createElement("div");
      newDiv.id = "ratemygmuprofessors";
      newDiv.className =
        "p-2 flex items-center rounded-lg shadow bg-white border-2 border-gray-100 hover:border-gray-200";
      // newDiv.innerHTML =
      //   emailElement.outerHTML +
      //   (emailElement.nextSibling ? emailElement.nextSibling.nodeValue : "");

      // emailElement.outerHTML.a.href
      // within above div, create a div to store the professor's name
      const professorRatingDiv = document.createElement("div");
      professorRatingDiv.id = "ratemygmuprofessors-name";
      professorRatingDiv.innerText = "🔥 5.0 ";
      professorRatingDiv.className =
        "bg-green-100 text-green-800 text-sm font-medium px-2.5 inline-flex items-center py-0.5 rounded mr-2";
      newDiv.appendChild(professorRatingDiv);

      // <span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">Default</span>

      const primaryMarkDiv = document.createElement("div");
      primaryMarkDiv.id = "ratemygmuprofessors-name";
      primaryMarkDiv.innerText = "Primary";
      primaryMarkDiv.className =
        "bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full";
      newDiv.appendChild(primaryMarkDiv);

      const professorNameDiv = document.createElement("div");
      professorNameDiv.id = "ratemygmuprofessors-name";
      professorNameDiv.innerText = professorname;
      professorNameDiv.className =
        "text-xs font-medium inline-flex items-center py-0.5 rounded mr-2";
      newDiv.appendChild(professorNameDiv);

      const emailButton = document.createElement("div");
      // emailButton.id = "ratemygmuprofessors-email";
      // emailButton.innerText = "📧";
      // emailButton.className =
      //   "w-25 h-25 ml-2 font-medium inline-flex items-center py-0.5 rounded hover:scale-125 transform transition-all duration-100 ease-in-out";

      emailButton.innerHTML = `
      <button type="button" class="relative inline-flex items-center p-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
  <svg class="w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
</button>`;

      newDiv.appendChild(emailButton);

      // Replace the emailElement with the newDiv
      emailElement.parentNode.replaceChild(newDiv, emailElement);
    });

    // // Create a div to mark that the script has already executed
    // const div = document.createElement("div");
    // div.id = "ratemygmuprofessors";
    // div.className = "p-2 flex items-center";
    // currentEmailArray.appendChild(div);

    // // within above div, create a div to store the professor's name
    // const professorNameDiv = document.createElement("div");
    // professorNameDiv.id = "ratemygmuprofessors-name";
    // professorNameDiv.innerText = "🔥 5.0";
    // professorNameDiv.className =
    //   "bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 inline-flex items-center py-0.5 rounded dark:bg-green-200 dark:text-green-900";
    // div.appendChild(professorNameDiv);

    // currentEmailArray.className =
    //   "bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 inline-flex items-center py-0.5 rounded dark:bg-green-200 dark:text-green-900";
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
