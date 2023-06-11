import ProfessorCard from "./ProfessorCard";

const ProfessorList = (professors) => {
  return `<ul role="list" class="max-w-sm divide-y divide-gray-200 p-3">
    ${professors.map((professor) => ProfessorCard(professor)).join("")}
</ul>`;
};

export default ProfessorList;
