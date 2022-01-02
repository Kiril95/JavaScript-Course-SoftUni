function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
      let getTableRows = document.querySelectorAll('tbody tr');
      let getSearchField = document.querySelector('#searchField').value;

      for(let row of getTableRows) {
         row.removeAttribute('class', 'select');
      }
      
      for(let row of getTableRows) {
         if (row.innerHTML.includes(getSearchField)) {
            row.setAttribute('class', 'select');
         }
      }

      document.querySelector('#searchField').value = '';
   }
}