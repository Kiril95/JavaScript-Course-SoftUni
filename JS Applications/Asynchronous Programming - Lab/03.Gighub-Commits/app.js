function loadCommits() {
    let usernameField = document.querySelector('#username').value;
    let repoField = document.querySelector('#repo').value;
    let listSection = document.querySelector('#commits');
    const baseUrl = `https://api.github.com/repos/${usernameField}/${repoField}/commits`;

    fetch(baseUrl)
        .then(response => {
            if (response.status == 404) {
                throw new Error(`Error: ${response.status} (Not Found)`);
            }

            return response.json();
        })
        .then(data => {
            while (listSection.firstChild) {
                listSection.removeChild(listSection.firstChild);
            }

            for (let commitInfo of data) {
                let liElement = document.createElement('li');

                liElement.textContent = `${commitInfo.commit.author.name}: ${commitInfo.commit.message}`;

                listSection.append(liElement);
            }
        })
        .catch(error => {
            let liElement = document.createElement('li');
            liElement.textContent = error.message;
            listSection.appendChild(liElement);
        })
}