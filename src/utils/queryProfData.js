import { AUTHORIZATION_TOKEN } from "../constants/auth.js";
import { SCHOOL_IDS } from "../constants/school.js";
import { QueryProfessorID } from "../gql/QueryProfessorID.js";
import { QueryProfessorData } from "../gql/QueryProfessorData.js";

const API_URL = "https://www.ratemyprofessors.com/graphql";

async function fetchProfessorData(profID) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: AUTHORIZATION_TOKEN,
    },
    body: JSON.stringify({
      query: QueryProfessorData,
      variables: {
        id: profID,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Fetch failed for profID ${profID}`);
  }

  return response.json();
}

const profDataCache = new Map();

const getCachedProfData = async (profID) => {
  if (!profDataCache.has(profID)) {
    const profDataFetch = fetchProfessorData(profID).catch((error) => {
      console.error(error);
      return null;
    });

    profDataCache.set(profID, profDataFetch);
  }

  return profDataCache.get(profID);
};

const queryProfData = async (profID, sendResponse) => {
  try {
    const response = await getCachedProfData(profID);
    sendResponse(response);
  } catch (error) {
    console.error(
      `Failed to query professor data for profID ${profID}: ${error}`
    );
    sendResponse(new Error(error));
  }
};

export default queryProfData;
