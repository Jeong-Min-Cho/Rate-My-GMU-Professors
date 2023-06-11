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
        const splitName = fullName.split(",");
        const firstName = splitName[1].trim();
        const lastName = splitName[0].trim();
        const name = firstName + " " + lastName;
        console.log("name", name);
      }
    }

    const splitStrings = currentEmailArray.innerText.split("\n");

    // Use Array.prototype.forEach for brevity and clarity
    splitStrings.forEach(processName);
  }

  // Setup the observer
  const observer = new MutationObserver(async function (mutations, observer) {
    // const userSettings = await GetUserSettings();

    // if (CheckExecution()) return;

    const query = document.querySelectorAll(`[data-property*="instructor"]`);
    const emailArray = Array.from(query);

    emailArray.forEach(processInstructor);
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
