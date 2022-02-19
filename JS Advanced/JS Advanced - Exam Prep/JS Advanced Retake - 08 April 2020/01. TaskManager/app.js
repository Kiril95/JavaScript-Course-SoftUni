function solve() {
    let addButton = document.querySelector('#add');
    let descriptionField = document.querySelector('#description');
    let [taskField, dateField] = document.querySelectorAll('input[type=text]');
    let [_, openDiv, progressDiv, completeDiv] = document.querySelectorAll('div:nth-child(2)');

    addButton.addEventListener('click', addCourse);

    function addCourse(event) {
        event.preventDefault();

        if (taskField.value && descriptionField.value && dateField.value) {
            let articleEl = createElement('article', '', '', openDiv);

            let headingEl = createElement('h3', taskField.value, '', articleEl);
            let p1El = createElement('p', `Description: ${descriptionField.value}`, '', articleEl);
            let p2El = createElement('p', `Due Date: ${dateField.value}`, '', articleEl);

            let divEl = createElement('div', '', 'flex', articleEl);
            let startBtn = createElement('button', 'Start', 'green', divEl);
            let deleteBtn = createElement('button', 'Delete', 'red', divEl);

            startBtn.addEventListener('click', startCourse); 
            deleteBtn.addEventListener('click', deleteCourse);

            taskField.value = '';
            descriptionField.value = '';
            dateField.value = '';
        }
    }

    function deleteCourse(event) {
        event.target.parentNode.parentNode.remove();
    }

    function startCourse(event) {
        let targetArticle = event.target.parentNode.parentNode;
        let btnsDiv = event.target.parentNode.parentNode.querySelector('.flex');

        progressDiv.appendChild(targetArticle);
        btnsDiv.innerHTML = '';

        let deleteBtn = createElement('button', 'Delete', 'red', btnsDiv);
        let finishBtn = createElement('button', 'Finish', 'orange', btnsDiv);

        finishBtn.addEventListener('click', finishCourse);
        deleteBtn.addEventListener('click', deleteCourse);
    }

    function finishCourse(event) {
        let targetArticle = event.target.parentNode.parentNode;
        event.target.parentNode.parentNode.querySelector('.flex').remove();

        completeDiv.appendChild(targetArticle);
    }

    function createElement(type, textCon, classList, parent) {
        const element = document.createElement(type);

        if (textCon) {
            element.textContent = textCon;
        }
        if (classList) {
            element.classList = classList;
        }
        if (parent) {
            parent.appendChild(element);
        }

        return element;
    }
}