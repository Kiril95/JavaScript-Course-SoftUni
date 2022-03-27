export function updateNavigation(){
    let email = sessionStorage.getItem('userEmail');

    if(sessionStorage.getItem('authToken')){
        document.querySelector('.profile > span').textContent = `Welcome, ${email}`;

        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
    }else{
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}