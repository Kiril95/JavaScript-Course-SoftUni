class ArtGallery {
    constructor(creator) {
        this.creator = creator;
        this.possibleArticles = { "picture": 200, "photo": 50, "item": 250 };
        this.listOfArticles = [];
        this.guests = [];
    }

    addArticle(articleModel, articleName, quantity) {
        articleModel = articleModel.toLowerCase();
        let currentArticle = this.listOfArticles.find(x => x.articleName === articleName);
        let targetModel = this.possibleArticles[articleModel];
        let isFound = false;

        if (!targetModel) {
            throw new Error('This article model is not included in this gallery!');
        }

        if (currentArticle) {
            if (currentArticle.articleName == articleName && currentArticle.articleModel == articleModel) {
                currentArticle.quantity += Number(quantity);
                isFound = true;
            }
        }

        if (isFound == false) {
            let article = { articleModel, articleName, quantity: Number(quantity) };
            this.listOfArticles.push(article);
        }

        return `Successfully added article ${articleName} with a new quantity- ${quantity}.`;
    }

    inviteGuest(guestName, personality) {
        let table = { "Vip": 500, "Middle": 250 };

        if (this.guests.find(x => x.guestName == guestName)) {
            throw new Error(`${guestName} has already been invited.`);
        }

        personality = !table[personality] ? 50 : table[personality]; // Important check

        let guest = { guestName, points: personality, purchaseArticle: 0 };
        this.guests.push(guest);

        return `You have successfully invited ${guestName}!`;
    }

    buyArticle(articleModel, articleName, guestName) {
        let currentArticle = this.listOfArticles.find(x => x.articleName == articleName);
        let currentGuest = this.guests.find(x => x.guestName == guestName);

        if (currentArticle.articleName != articleName || currentArticle.articleModel != articleModel) {
            throw new Error("This article is not found.");
        }
        if (currentArticle.quantity <= 0) {
            return `The ${articleName} is not available.`;
        }
        if (!currentGuest) {
            return 'This guest is not invited.';
        }

        if (currentGuest.points < this.possibleArticles[currentArticle.articleModel]) {
            return 'You need to more points to purchase the article.';

        }

        currentGuest.points -= this.possibleArticles[currentArticle.articleModel];
        currentArticle.quantity--;
        currentGuest.purchaseArticle++;

        return `${guestName} successfully purchased the article worth ${this.possibleArticles[currentArticle.articleModel]} points.`;
    }

    showGalleryInfo(criteria) {
        let message = '';

        if (criteria == 'article') {
            message += 'Articles information:\n'
            let articles = this.listOfArticles.map(x => `${x.articleModel} - ${x.articleName} - ${x.quantity}`).join('\n');

            return message += articles;
        } else {
            message += 'Guests information:\n'
            let guests = this.guests.map(x => `${x.guestName} - ${x.purchaseArticle}`).join('\n');

            return message += guests;
        }
    }
}
const artGallery = new ArtGallery('Curtis Mayfield');
artGallery.addArticle('picture', 'Mona Liza', 3);
artGallery.addArticle('Item', 'Ancient vase', 2);
artGallery.addArticle('picture', 'Mona Liza', 1);
artGallery.inviteGuest('John', 'Vip');
artGallery.inviteGuest('Peter', 'Middle');
artGallery.buyArticle('picture', 'Mona Liza', 'John');
artGallery.buyArticle('item', 'Ancient vase', 'Peter');
console.log(artGallery.showGalleryInfo('article'));
console.log(artGallery.showGalleryInfo('guest'));