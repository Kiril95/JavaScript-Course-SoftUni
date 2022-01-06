function create(words = []) {
   let mainDiv = document.querySelector('#content');
   
   for (const section of words) {
      let div = document.createElement('div');
      let paragraph = document.createElement('p');
      paragraph.textContent = section;
      paragraph.style.display = 'none';

      div.appendChild(paragraph);
      mainDiv.appendChild(div);
   }
   
   mainDiv.addEventListener('click', function(e){
      e.target.children[0].style.display = 'block';
   });
}