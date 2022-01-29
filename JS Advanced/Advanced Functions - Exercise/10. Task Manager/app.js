function solve() {
    let addButton = document.querySelector('#add');
    let descriptionField = document.querySelector('#description');
    let [taskField, dateField] = document.querySelectorAll('input[type=text]');
    let [_, openDiv, progressDiv, completeDiv] = document.querySelectorAll('div:nth-child(2)');
    //let [__, openSection, progressSection, completeSection] = document.querySelectorAll('section');

    addButton.addEventListener('click', addCourse);

    function addCourse(event) {
        event.preventDefault();

        if (taskField.value && descriptionField.value && dateField.value) { 
            
            let articleElement = document.createElement('article');
            let headingElement = document.createElement('h3');
            let p1Element = document.createElement('p');
            let p2Element = document.createElement('p');
            headingElement.textContent = taskField.value;
            p1Element.textContent = `Description: ${descriptionField.value}`;
            p2Element.textContent = `Due Date: ${dateField.value}`;

            let divElement = document.createElement('div');
            divElement.classList = 'flex';

            let startBtn = document.createElement('button');
            let deleteBtn = document.createElement('button');
            startBtn.textContent = 'Start';
            deleteBtn.textContent = 'Delete';
            startBtn.classList = 'green';
            deleteBtn.classList = 'red';

            divElement.appendChild(startBtn);
            divElement.appendChild(deleteBtn);

            startBtn.addEventListener('click', startCourse);        // Move the given course
            deleteBtn.addEventListener('click', function (event) {  // Delete the given course
                let targetArticle = event.target.parentNode.parentNode;
                event.target.parentNode.parentNode.parentNode.removeChild(targetArticle);
            });

            articleElement.appendChild(headingElement);
            articleElement.appendChild(p1Element);
            articleElement.appendChild(p2Element);
            articleElement.appendChild(divElement);

            openDiv.appendChild(articleElement);

            taskField.value = '';
            descriptionField.value = '';
            dateField.value = '';
        }
    }

    function startCourse(event) {
        let courseName = event.target.parentNode.parentNode.children[0];
        let courseDescr = event.target.parentNode.parentNode.children[1];
        let courseDate = event.target.parentNode.parentNode.children[2];

        let articleElement = document.createElement('article');
        let headingElement = document.createElement('h3');
        let p1Element = document.createElement('p');
        let p2Element = document.createElement('p');
        headingElement.textContent = courseName.textContent;
        p1Element.textContent = courseDescr.textContent;
        p2Element.textContent = courseDate.textContent;

        let divElement = document.createElement('div');
        divElement.classList = 'flex';

        let deleteBtn = document.createElement('button');
        let finishBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        finishBtn.textContent = 'Finish';
        deleteBtn.classList = 'red';
        finishBtn.classList = 'orange';

        divElement.appendChild(deleteBtn);
        divElement.appendChild(finishBtn);

        finishBtn.addEventListener('click', finishCourse);      // Finish the given course
        deleteBtn.addEventListener('click', function (event) {  // Delete the given course
            let targetArticle = event.target.parentNode.parentNode;
            event.target.parentNode.parentNode.parentNode.removeChild(targetArticle);
        });

        articleElement.appendChild(headingElement);
        articleElement.appendChild(p1Element);
        articleElement.appendChild(p2Element);
        articleElement.appendChild(divElement);

        progressDiv.appendChild(articleElement);

        let targetArticle = event.target.parentNode.parentNode;
        event.target.parentNode.parentNode.parentNode.removeChild(targetArticle); // Remove course from Open Div
    }

    function finishCourse(event){
        let courseName = event.target.parentNode.parentNode.children[0];
        let courseDescr = event.target.parentNode.parentNode.children[1];
        let courseDate = event.target.parentNode.parentNode.children[2];

        let articleElement = document.createElement('article');
        let headingElement = document.createElement('h3'); 
        let p1Element = document.createElement('p');
        let p2Element = document.createElement('p');
        headingElement.textContent = courseName.textContent;
        p1Element.textContent = courseDescr.textContent;
        p2Element.textContent = courseDate.textContent;

        articleElement.appendChild(headingElement);
        articleElement.appendChild(p1Element);
        articleElement.appendChild(p2Element);

        completeDiv.appendChild(articleElement);

        let targetArticle = event.target.parentNode.parentNode;
        event.target.parentNode.parentNode.parentNode.removeChild(targetArticle); // Remove course from Progress Div
    }
}