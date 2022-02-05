function attachEvents() {
    let [sendBtn, refreshBtn] = document.querySelectorAll('input[type=button]');
    
    sendBtn.addEventListener('click', sendMessage)
    refreshBtn.addEventListener('click', showAllMessages)
}

async function sendMessage() {
    try {
        let nameField = document.getElementsByName('author')[0];
        let messageField = document.getElementsByName('content')[0];

        if (nameField == '' || messageField == '') {
            alert('Please fill the required fields!');
            return;
        }

        // Put the newly written messages in the JSON object
        const response = await fetch('http://localhost:3030/jsonstore/messenger', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                author: nameField.value, 
                content: messageField.value,
            })
        });
        const data = await response.json();
        
        if (!response.ok || response.status != 200) {
            let parse = JSON.parse(data);
            throw new Error(parse.message);
        }

        nameField.value = '';
        messageField.value = '';

    } catch (error) {
        alert(error.message);
    }
}

async function showAllMessages() {
    let textarea = document.querySelector('#messages');
    let list = [];

    try {
        const response = await fetch('http://localhost:3030/jsonstore/messenger');
        const data = await response.json();
        
        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }

        Object.values(data).forEach(info =>{
            list.push(`${info.author}: ${info.content}`);
        });

        textarea.textContent = list.join('\n');

    } catch (error) {
        alert(error.message);
    }
}

attachEvents();