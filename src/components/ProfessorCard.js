function getRatingColorClass(rating) {
  if (rating >= 5) {
    return "bg-blue-100 text-blue-800";
  }
  if (rating >= 3.5) {
    return "bg-green-100 text-green-800";
  }
  if (rating >= 2.5) {
    return "bg-yellow-100 text-yellow-800";
  }
  if (rating == -1) {
    return "bg-gray-100 text-gray-800";
  }
  return "bg-red-100 text-red-800";
}

const ProfessorCard = (professor) => {
  console.log("professor", professor);
  return `
    <li class="py-3 sm:py-4">
      <div class="flex items-center space-x-3">
        <div class="flex-shrink-0">
          <p class="${getRatingColorClass(
            professor.rating
          )} text-sm font-semibold inline-flex items-center p-1.5 rounded ">
        ${professor.rating == -1 ? "No Data" : professor.rating}
          </p>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold text-gray-900 truncate ">
            ${professor.name}
          </p>
          <p class="text-sm text-gray-500 truncate ">${professor.email}</p>
        </div>
        ${
          professor.isPrimary
            ? `<span class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ">
        <span class="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
        Primary
      </span>`
            : ""
        }
      </div>
    </li>
  `;
};

export default ProfessorCard;
