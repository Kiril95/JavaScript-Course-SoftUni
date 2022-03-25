export function updateNavigation(){
    let email = sessionStorage.getItem('userEmail');

    if(sessionStorage.getItem('authToken')){
        document.querySelector('#user > span').textContent = `Welcome, ${email}`;

        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    }else{
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}