function lockedProfile() {
    let allUsers = document.querySelectorAll('.profile');

    for (const div of allUsers) {
        let lockBtn = div.children[2];
        let unlockBtn = div.children[4];
        let hiddenDiv = div.children[9];
        let showMoreAndHideBtn = div.lastElementChild;

        showMoreAndHideBtn.addEventListener('click', function () {
            if (unlockBtn.checked) {
                hiddenDiv.style.display = 'block';
                showMoreAndHideBtn.textContent = 'Hide it';
            }

            showMoreAndHideBtn.addEventListener('click', function () {
                if (showMoreAndHideBtn.textContent == 'Hide it') {
                    if (lockBtn.checked) {
                        return true; // continue;
                    }
                    
                    hiddenDiv.style.display = 'none';
                    showMoreAndHideBtn.textContent = 'Show More';
                }
            });
        });
    }
}