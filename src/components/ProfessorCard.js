import ProfessorPopover from "./ProfessorPopover";
import createRMPHref from "../utils/createRMPHref";

function getRatingColorClass(rating) {
  if (rating >= 5) {
    return "bg-gold-100 shiny";
  }
  if (rating >= 3.5) {
    return "bg-green-100 text-green-800";
  }
  if (rating >= 2.5) {
    return "bg-orange-100 text-orange-800";
  }
  if (rating == -1) {
    return "bg-gray-100 text-gray-800";
  }
  return "bg-red-100 text-red-800";
}

const ProfessorCard = (professor) => {
  const ratingColor = getRatingColorClass(professor.rating);
  const isNoData = professor.rating == -1;

  return `
    <li class="py-3 sm:py-4 popover-container relative">
      <div class="flex items-center space-x-3">
        <div class="relative inline-flex flex-shrink-0">
          <p class="${ratingColor} text-sm font-semibold inline-flex items-center p-1.5 rounded ">

        ${
          isNoData
            ? "No Data"
            : `
        <a href="${createRMPHref(
          professor.legacyId
        )}" target="_blank" rel="noopener noreferrer" class="hover:underline">
        ${professor.rating} 
        </a>
        `
        }
       
        ${
          professor.numRatings <= 5 && professor.rating != -1
            ? `
        <div class="space-x-3 space-y-3">
        <div class="relative before:z-10 before:absolute before:left-1/2 before:-top-3 before:w-max before:max-w-xs before:-translate-x-1/2 before:-translate-y-full before:rounded-lg before:bg-gray-700 before:px-2 before:py-1.5 before:text-white before:invisible before:content-[attr(data-tip)] after:z-10 after:absolute after:left-1/2 after:-top-3 after:h-0 after:w-0 after:-translate-x-1/2 after:border-8 after:border-t-gray-700 after:border-l-transparent after:border-b-transparent after:border-r-transparent after:invisible hover:before:visible hover:after:visible" data-tip="Might be inaccurate due to only ${professor.numRatings} review(s).">
         
        <div class="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-gray-500 border-2 border-white rounded-full -top-2 -right-2">?</div>
        </div>
        </div>
        `
            : ""
        }
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
      ${
        isNoData
          ? ""
          : `
        <div id="popover-professor" class="z-50 popover absolute left-full  t-1/2 ml-3 mr-3 invisible group-hover:visible min-w-full" style="top:-${
          1.4 * professor.index
        }rem">
        ${ProfessorPopover(professor, ratingColor)}
      </div>`
      }
    </li>
  `;
};

export default ProfessorCard;
