function getArticleGenerator(articles) {
    let container = document.querySelector('#content');
    let deepCopy = JSON.parse(JSON.stringify(articles));

    return function() {
        if (deepCopy.length > 0) {
            let articleElement = document.createElement('article');
            articleElement.textContent = deepCopy.shift();
            container.appendChild(articleElement);
        }
    }
}