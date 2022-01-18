function notify(message) {
  let messageField = document.querySelector('#notification');
  messageField.textContent = message;
  messageField.style.display = 'block';

  messageField.addEventListener('click', function () {
    messageField.style.display = 'none'
  });
}