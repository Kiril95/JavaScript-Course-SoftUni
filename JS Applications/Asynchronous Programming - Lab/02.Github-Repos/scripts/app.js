function loadRepos() {
    let usernameField = document.querySelector('#username').value;
    let listSection = document.querySelector('#repos');
    const baseUrl = `https://api.github.com/users/${usernameField}/repos`;

    fetch(baseUrl)
	.then(response => {  // This opens up the Reponse interface of the Fetch API
	    if (response.status == 404) {   // Or !response.ok
		throw new Error(`Username ${usernameField} cannot be found. Error: ${response.status}!`);
	    }
	    
	    return response.json(); // Returns another Promise(parsed) if the response is in JSON format
	 })
	.then(data => {
	     while (listSection.firstChild) {
		    listSection.removeChild(listSection.firstChild); // Remove all list elements with this, instead of innerHTML!
	     }

	     for (let repo of data) {
		   let anchorElement = document.createElement('a');
		   let liElement = document.createElement('li');

		   anchorElement.setAttribute('href', repo.html_url); // The parsed data has a large spectre of properties
		   anchorElement.textContent = repo.full_name;

		   liElement.append(anchorElement);
		   listSection.append(liElement);
	     }
	  })
	  .catch(error => {
		 listSection.textContent = `${error.message}`;  // Catches the thrown error
	  })
}
