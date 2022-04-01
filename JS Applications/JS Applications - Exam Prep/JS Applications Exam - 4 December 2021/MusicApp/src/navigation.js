export function updateNavigation(){
    const nav = document.querySelector('nav');

    if (sessionStorage.getItem('authToken')) {
        [...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'inline-block');
        [...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'none');
    } else {
        [...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'none');
        [...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'inline-block');
    }
}