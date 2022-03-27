const element = document.querySelector('#errorBox');

export function alert(error) {
    document.querySelector('#errorBox > span').textContent = error;
    element.style.display = 'block';

    setTimeout(() => element.style.display = 'none', 3000);
}