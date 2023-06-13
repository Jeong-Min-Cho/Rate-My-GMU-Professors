import { AUTHORIZATION_TOKEN } from "../constants/auth.js";
import { SCHOOL_IDS } from "../constants/school.js";
import { QueryProfessorID } from "../gql/QueryProfessorID.js";

import { API_URL } from "../constants/api.js";

async function fetchProfessorIdFromSchool(profName, schoolId) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: AUTHORIZATION_TOKEN,
    },
    body: JSON.stringify({
      query: QueryProfessorID,
      variables: {
        query: { text: profName, schoolID: schoolId },
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Fetch failed for SCHOOL_ID ${schoolId}`);
  }

  const jsonResponse = await response.json();

  const {
    data: {
      newSearch: {
        teachers: { edges: teacherEdges },
      },
    },
  } = jsonResponse;

  return teacherEdges.length !== 0 ? jsonResponse : null;
}

async function getProfessorID(profName) {
  const schoolRequests = SCHOOL_IDS.map((schoolId) =>
    fetchProfessorIdFromSchool(profName, schoolId).catch((error) => {
      console.error(error);
      return null;
    })
  );

  const results = await Promise.allSettled(schoolRequests);

  const validResults = results.filter(
    (result) => result.status === "fulfilled" && result.value
  );

  return validResults.length > 0 ? validResults[0].value : null;
}

const profIDCache = new Map();

const fetchProfID = async (profName) => {
  if (!profIDCache.has(profName)) {
    profIDCache.set(profName, getProfessorID(profName));
  }
  return profIDCache.get(profName);
};

const queryProfID = async (profName, sendResponse) => {
  try {
    const response = await fetchProfID(profName);
    sendResponse(response);
  } catch (error) {
    sendResponse(new Error(error));
  }
};

export default queryProfID;
