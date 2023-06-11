const convertLastNameFirstNameToFirstNameLastName = (fullName) => {
  const splitName = fullName.split(",");
  if (splitName.length !== 2) {
    throw new Error(
      `Invalid name format: "${fullName}". Expected format is "Last, First".`
    );
  }
  const firstName = splitName[1].trim();
  const lastName = splitName[0].trim();
  return `${firstName} ${lastName}`;
};

export default convertLastNameFirstNameToFirstNameLastName;
