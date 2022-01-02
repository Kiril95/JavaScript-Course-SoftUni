function search() {
   let getList = document.querySelectorAll('li');
   let getTextField = document.querySelector('#searchText');
   let getResultField = document.querySelector('#result');
   let count = 0;
   
   for (const item of getList) {
      item.removeAttribute('style');
   }

   for (const item of getList) {
      if (item.textContent.includes(getTextField.value)) {
         item.style.textDecoration = 'underline';
         item.style.fontWeight = 'bold';
         count++;
      }
   }
   
   getResultField.textContent = `${count} matches found`;
}