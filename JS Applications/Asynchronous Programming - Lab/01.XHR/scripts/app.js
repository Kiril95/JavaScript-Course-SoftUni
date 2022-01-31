function loadRepos() {
   let baseUrl = 'https://api.github.com/users/testnakov/repos';
   let resultField = document.querySelector('#res');
   var request = new XMLHttpRequest();

   request.addEventListener('readystatechange', function () {
      if (request.readyState == 4 && request.status == 200 && this.status) {
         resultField.textContent = request.responseText;
      }
   });
   
   request.open("GET", baseUrl);
   request.send();
}