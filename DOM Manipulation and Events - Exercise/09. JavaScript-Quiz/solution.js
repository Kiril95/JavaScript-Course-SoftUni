function solve() {
  let correctAnswers = ['onclick', 'JSON.stringify()', 'A programming API for HTML and XML documents'];
  let points = 0;
  let index = 0;
  let questionField = document.getElementsByTagName('section');
  let resultField = document.querySelector('#results > li > h1');
  let results = document.querySelector("#results");

  Array.from(document.querySelectorAll('.quiz-answer'))
    .forEach((x) => x.addEventListener('click', function (event) {
      if (correctAnswers.includes(event.target.textContent)) {
        points++;
      };
      questionField[index].style.display = 'none';
      questionField[index].classList.add('hidden');
      index++;

      if (index === 3) {
        results.style.display = 'block';

        if (points === 3) {
          resultField.textContent = 'You are recognized as top JavaScript fan!';
        } else {
          resultField.textContent = `You have ${points} right answers`;
        }
      }
      else {
        questionField[index].style.display = 'block';
      }
    }));
}