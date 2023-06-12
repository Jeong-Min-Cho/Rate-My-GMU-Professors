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

  async function processInstructor(currentEmailArray) {
    if (
      !currentEmailArray ||
      !currentEmailArray.innerText ||
      currentEmailArray.innerText === "Instructor"
    ) {
      return;
    }

    async function processName(professorname) {
      if (!professorname) {
        return Promise.reject("Missing professor name");
      }

      const fullName = professorname.replace(/\(.*?\)/, "");
      const convertedName =
        convertLastNameFirstNameToFirstNameLastName(fullName);

      console.log("fullName", fullName);
      console.log("converted", convertedName);

      const id = await fetchProfIDFromName(fullName);

      const res = await fetchProfReviewFromID(id);

      console.log("res", res);

      return res;
    }

    const emailElements = currentEmailArray.querySelectorAll("a.email");

    function getEmailHref(emailElement) {
      return emailElement.getAttribute("href").replace("mailto:", "");
    }

    const professorPromises = Array.from(emailElements).map(
      async (emailElement) => {
        const professorname = emailElement.textContent;
        console.log("professorname", professorname);
        const profObj = await processName(professorname);

        // Check if the nextSibling of the <a> tag contains '(Primary)'
        const isPrimary =
          emailElement.nextSibling &&
          emailElement.nextSibling.nodeType === 3 && // check if it's a text node
          emailElement.nextSibling.textContent.includes("(Primary)");

        console.log("profObj", profObj);

        return {
          name: professorname,
          email: getEmailHref(emailElement),
          rating: parseFloat(profObj.avgRating).toFixed(1),
          isPrimary: isPrimary, // This will be set properly below
        };
      }
    );

    const professorObjects = await Promise.all(professorPromises);

    const newDiv = document.createElement("div");
    newDiv.id = "ratemygmuprofessors";
    newDiv.innerHTML = ProfessorList(professorObjects);

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

    // observer.disconnect();
  });

  observer.observe(document, {
    subtree: true,
    attributes: true,
  });
}

const EmptyProfessorObject = {
  avgDifficulty: -1,
  avgRating: -1,
  department: "N/A",
  firstName: "N/A",
  id: null,
  lastName: "N/A",
  legacyId: -1,
  numRatings: -1,
  wouldTakeAgainPercent: -1,
};

async function fetchProfIDFromName(name) {
  try {
    let response = await sendMessage({
      contentScriptQuery: "queryProfID",
      profName: name,
    });
    let profID = response.data.newSearch.teachers.edges[0].node.id;
    return profID ? profID : EmptyProfessorObject;
  } catch (error) {
    return EmptyProfessorObject;
  }
}

async function fetchProfReviewFromID(ID) {
  if (ID === null) {
    return EmptyProfessorObject;
  }
  try {
    let response = await sendMessage({
      contentScriptQuery: "queryProfData",
      profID: ID,
    });
    let profData = response.data.node;
    // No reviews
    if (profData && profData.numRatings === 0) {
      return EmptyProfessorObject;
    }

    return profData ? profData : EmptyProfessorObject;
  } catch (error) {
    return EmptyProfessorObject;
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

fetchProfIDFromName("Kevin Andrea").then((res) => {
  fetchProfReviewFromID(res).then((res2) => {
    console.log("fetchProfReviewFromID", res2);
  });
});

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
