document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.getElementById('toggleBtn');
  const skeletonContainer = document.querySelector('.skeleton-container');
  const content = document.getElementById('content');

  let isShowingSkeletons = true;

  toggleBtn.addEventListener('click', function () {
    isShowingSkeletons = !isShowingSkeletons;

    if (isShowingSkeletons) {
      skeletonContainer.style.display = 'grid';
      content.classList.add('hidden');
      toggleBtn.textContent = 'Hide Skeletons';
    } else {
      skeletonContainer.style.display = 'none';
      content.classList.remove('hidden');
      toggleBtn.textContent = 'Show Skeletons';
    }
  });

  // Simulate loading completion after 3 seconds (optional)
  // setTimeout(() => {
  //   if (isShowingSkeletons) {
  //     toggleBtn.click();
  //   }
  // }, 3000);
});
