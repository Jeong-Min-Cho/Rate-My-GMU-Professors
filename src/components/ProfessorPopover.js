function ConvertDifficultyToPercent(difficulty) {
  return (difficulty / 5) * 100;
}

const ProfessorPopover = (professor, ratingColor) => {
  return `
  <div class="items-center rounded-lg bg-gray-50 shadow sm:flex">
  <div class="min-w-full border-8 border-green-600 p-5">
    <h3 class="text-xl font-bold tracking-tight text-gray-900">
      <a href="#">${professor.name}</a>
    </h3>
    <span class="text-gray-500">${professor.department}</span>

    <div class="mb-5 mt-3 flex items-center">
      <p class="inline-flex items-center rounded p-1.5 text-sm font-semibold ${ratingColor}">${
    professor.rating
  }</p>


      <p class="ml-2 font-medium text-gray-900">Excellent</p>
      <span class="mx-2 h-1 w-1 rounded-full bg-gray-900"></span>
      <p class="text-sm font-medium text-gray-500 hover:underline">${
        professor.numRatings
      } review(s)</p>
    </div>
    <div class="mb-4 border-b-2 border-gray-200"></div>
    <div class="gap-8">
      <div>
        <dl>
          <dt class="text-sm font-bold text-black">Level of Difficulty</dt>
          <dd class="mb-3 flex items-center">
            <div class="mr-2 h-2.5 w-full rounded bg-gray-300">
              <div class="h-2.5 rounded bg-blue-600" style="width: ${ConvertDifficultyToPercent(
                professor.difficulty
              )}%"></div>
            </div>
            <span class="text-sm font-medium text-black min-w-max">${
              professor.difficulty
            } / 5.0</span>
          </dd>
        </dl>
        <dl>
          <dt class="text-sm font-bold text-black">Would take again</dt>
          <dd class="mb-3 flex items-center">
            <div class="mr-2 h-2.5 w-full rounded bg-gray-300">
              <div class="h-2.5 rounded bg-blue-600" style="width: ${
                professor.wouldTakeAgainPercent
              }%"></div>
            </div>
            <span class="text-sm font-medium text-black min-w-max">${professor.wouldTakeAgainPercent.toFixed(
              0
            )} / 100</span>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</div>


    `;
};

export default ProfessorPopover;
