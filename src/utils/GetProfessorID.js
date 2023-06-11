import AUTHORIZATION_TOKEN from "../constants/auth";
import SCHOOL_IDS from "../constants/school";

module.exports = getProfessorID = async (profName) => {
  const requests = SCHOOL_IDS.map(async (SCHOOL_ID) => {
    try {
      const rawResponse = await fetch(
        "https://www.ratemyprofessors.com/graphql",
        {
          method: "POST",
          headers: {
            Authorization: AUTHORIZATION_TOKEN,
          },
          body: JSON.stringify({
            query: PROFESSOR_ID,
            variables: {
              query: { text: profName, schoolID: SCHOOL_ID },
            },
          }),
        }
      );

      const jsonResponse = await rawResponse.json();

      // Destructure to get the length of teachers
      const {
        data: {
          newSearch: {
            teachers: { edges: teacherEdges },
          },
        },
      } = jsonResponse;
      if (teacherEdges.length !== 0) {
        return jsonResponse;
      }
    } catch (error) {
      console.error(
        `Fetch failed for SCHOOL_ID ${SCHOOL_ID} with error: ${error}`
      );
      return null;
    }
  });

  const results = await Promise.allSettled(requests);
  // Filter out null results and return the first non-null result
  const validResults = results.filter(
    (result) => result.status === "fulfilled" && result.value !== null
  );

  if (validResults.length > 0) {
    return validResults[0].value;
  } else {
    return null; // return null or an appropriate default value when no valid results found
  }
};
