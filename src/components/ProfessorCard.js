const ProfessorCard = (professor) => {
  console.log("professor", professor);
  return `
    <li class="py-3 sm:py-4">
      <div class="flex items-center space-x-3">
        <div class="flex-shrink-0">
          <p class="bg-blue-100 text-blue-800 text-sm font-semibold inline-flex items-center p-1.5 rounded ">
            ${professor.rating}
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
