import checkExecution from "./utils/checkExecution";
import ProfessorList from "./components/ProfessorList";
import { EMPTY_PROFESSOR_OBJECT } from "./constants/emptyProfessorObject.js";

import detectBrowserName from "./utils/detectBrowserName";

const browserName = detectBrowserName();
// Initial width for the instructor column
const INITIAL_COLUMN_WIDTH = "300px";

switch (browserName) {
  case "Firefox":
    if (document.readyState === "loading") {
      window.addEventListener("DOMContentLoaded", startInitialObserver);
    } else {
      startInitialObserver();
    }
    break;
  case "Chrome" || "Edge":
    window.addEventListener("load", startInitialObserver);
    break;
  default:
    break;
}

function startInitialObserver() {
  const observer = new MutationObserver((mutationsList, observer) => {
    if (document.getElementsByClassName("results-out-of").length > 0) {
      observer.disconnect();
      startObserver();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

async function startObserver() {
  // Resize the instructor column to fit the new content
  const thElement = document.querySelector(".instructor-col");
  thElement.style.width = INITIAL_COLUMN_WIDTH;

  function getEmailHref(emailElement) {
    return emailElement.getAttribute("href").replace("mailto:", "");
  }

  async function processInstructor(currentEmailArray, index) {
    if (
      !currentEmailArray ||
      !currentEmailArray.innerText ||
      currentEmailArray.innerText === "Instructor"
    ) {
      return;
    }

    async function processName(professorName) {
      if (!professorName) {
        throw new Error("Missing professor name");
      }

      const fullName = professorName.replace(/\(.*?\)/, "");

      const id = await fetchProfIDFromName(fullName);
      const res = await fetchProfReviewFromID(id);

      return res;
    }

    const emailElements = currentEmailArray.querySelectorAll("a.email");

    const professorPromises = Array.from(emailElements).map(
      async (emailElement) => {
        const professorName = emailElement.textContent;
        const profObj = await processName(professorName);

        const isPrimary =
          emailElement.nextSibling &&
          emailElement.nextSibling.nodeType === 3 &&
          emailElement.nextSibling.textContent &&
          emailElement.nextSibling.textContent.includes("(Primary)");

        return {
          name: professorName,
          email: getEmailHref(emailElement),
          rating: parseFloat(profObj.avgRating).toFixed(1),
          isPrimary,
          numRatings: profObj.numRatings,
          difficulty: parseFloat(profObj.avgDifficulty).toFixed(1),
          department: profObj.department,
          wouldTakeAgainPercent: profObj.wouldTakeAgainPercent,
          index,
          legacyId: profObj.legacyId,
        };
      }
    );

    const professorObjects = await Promise.all(professorPromises);

    const newDiv = document.createElement("div");
    newDiv.id = "ratemygmuprofessors";
    newDiv.innerHTML = ProfessorList(professorObjects);

    if (currentEmailArray.parentNode) {
      currentEmailArray.parentNode.replaceChild(newDiv, currentEmailArray);
    }
  }

  const observer = new MutationObserver(async (mutations, observer) => {
    if (checkExecution()) return;

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
    const response = await sendMessage({
      contentScriptQuery: "queryProfID",
      profName: name,
    });

    // if response is null, return empty object
    if (!response) {
      return EMPTY_PROFESSOR_OBJECT;
    }
    const profID = response.data.newSearch.teachers.edges[0].node.id;
    return profID ? profID : EMPTY_PROFESSOR_OBJECT;
  } catch (error) {
    console.error("Error fetching professor ID:", error);
    return EMPTY_PROFESSOR_OBJECT;
  }
}

async function fetchProfReviewFromID(ID) {
  if (ID === null) {
    return EMPTY_PROFESSOR_OBJECT;
  }

  try {
    const response = await sendMessage({
      contentScriptQuery: "queryProfData",
      profID: ID,
    });
    const profData = response.data.node;

    if (profData && profData.numRatings === 0) {
      return EMPTY_PROFESSOR_OBJECT;
    }

    return profData ? profData : EMPTY_PROFESSOR_OBJECT;
  } catch (error) {
    console.error("Error fetching professor review:", error);
    return EMPTY_PROFESSOR_OBJECT;
  }
}

function sendMessage(message) {
  return new Promise((resolve) => {
    switch (browserName) {
      case "Firefox":
        browser.runtime.sendMessage(message, (res) => {
          resolve(res);
        });
        break;
      case "Chrome" || "Edge":
        chrome.runtime.sendMessage(message, (res) => {
          resolve(res);
        });
        break;
    }
  });
}
