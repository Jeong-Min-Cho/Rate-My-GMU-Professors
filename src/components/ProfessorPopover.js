const ProfessorPopover = ({ professor }) => {
  return `
    <div class="items-center rounded-lg bg-gray-50 shadow sm:flex">
  <div class="p-5">
    <h3 class="text-xl font-bold tracking-tight text-gray-900">
      <a href="#">Bonnie Green</a>
    </h3>
    <span class="text-gray-500">CEO & Web Developer</span>

    <div class="mb-5 mt-3 flex items-center">
      <p class="inline-flex items-center rounded bg-blue-100 p-1.5 text-sm font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">8.7</p>
      <p class="ml-2 font-medium text-gray-900">Excellent</p>
      <span class="mx-2 h-1 w-1 rounded-full bg-gray-900"></span>
      <p class="text-sm font-medium text-gray-500">376 reviews</p>
      <a href="#" class="ml-5 text-sm font-medium text-blue-600 hover:underline">Read all reviews</a>
    </div>
    <div class="gap-8">
      <div>
        <dl>
          <dt class="text-sm font-medium text-gray-500">Would take again</dt>
          <dd class="mb-3 flex items-center">
            <div class="mr-2 h-2.5 w-full rounded bg-gray-200">
              <div class="h-2.5 rounded bg-blue-600" style="width: 88%"></div>
            </div>
            <span class="text-sm font-medium text-gray-500">8.8</span>
          </dd>
        </dl>
        <dl>
          <dt class="text-sm font-medium text-gray-500">Level of Difficulty</dt>
          <dd class="mb-3 flex items-center">
            <div class="mr-2 h-2.5 w-full rounded bg-gray-200">
              <div class="h-2.5 rounded bg-blue-600" style="width: 89%"></div>
            </div>
            <span class="text-sm font-medium text-gray-500">8.9</span>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</div>

    `;
};

export default ProfessorPopover;
