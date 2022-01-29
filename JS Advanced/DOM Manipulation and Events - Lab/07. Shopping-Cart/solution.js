function solve() {
   let productList = Array.from(document.querySelectorAll('.product'));
   let textArea = document.querySelector('textarea');
   let checkoutButton = document.querySelector('.checkout');
   let allButtons = Array.from(document.querySelectorAll('button'));
   let uniqueItems = new Set();
   let total = 0;

   for (const section of productList) {
      let current = section.children;
      let product = current[1].children[0].textContent;
      let button = current[2].firstElementChild;
      let price = Number(current[3].textContent);

      button.addEventListener('click', function(){
         uniqueItems.add(product);
         textArea.value += `Added ${product} for ${price.toFixed(2)} to the cart.\n`;
         total += price;
      });

   }
   checkoutButton.addEventListener('click', function(){
      allButtons.map(x => x.disabled = 'true');
      textArea.value += `You bought ${Array.from(uniqueItems).join(', ')} for ${total.toFixed(2)}.`;
   });
}