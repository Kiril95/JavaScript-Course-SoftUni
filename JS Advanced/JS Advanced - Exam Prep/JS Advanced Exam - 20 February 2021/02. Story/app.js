class Story {
    constructor(title, creator) {
        this.title = title;
        this.creator = creator;
        this._comments = [];
        this._likes = [];
        this.startId = 0;
    }

    get likes() {
        if (this._likes.length == 0) {
            return `${this.title} has 0 likes`;
        } else if (this._likes.length == 1) {
            return `${this._likes[0]} likes this story!`;
        } else {
            return `${this._likes[0]} and ${this._likes.length - 1} others like this story!`;
        }
    }

    like(username) {
        if (this._likes.find(x => x == username)) {
            throw new Error("You can't like the same story twice!")
        }
        if (this.creator == username) {
            throw new Error("You can't like your own story!")
        }

        this._likes.push(username);
        return `${username} liked ${this.title}!`;
    }

    dislike(username) {
        if(!this._likes.includes(username)){
            throw new Error("You can't dislike this story!");
        }

        let index = this._likes.indexOf(username);
        this._likes.splice(index, 1);

        return `${username} disliked ${this.title}`;
    }

    comment(username, content, id) {
        if (id === undefined || !this._comments.find(x => x.id == id)) {
            let comment = { id: ++this.startId, username, content, replies: [] };
            this._comments.push(comment);

            return `${username} commented on ${this.title}`;
        } else {
            let targetStory = this._comments.find(x => x.id == id);

            let reply = { id: `${targetStory.id}.${targetStory.replies.length + 1}`, username, content };
            targetStory.replies.push(reply);

            return 'You replied successfully';
        }
    }

    toString(sortingType) {
        if (sortingType === "asc") {
            this._comments.sort((x, y) => x.id - y.id);

            this._comments.forEach(comment => {
                if (comment.replies.length > 0) {
                    comment.replies.sort((x, y) => x.id.localeCompare(y.id));
                }
            });
        }

        if (sortingType === "desc") {
            this._comments.sort((x, y) => y.id - x.id);

            this._comments.forEach(comment => {
                if (comment.replies.length > 0) {
                    comment.replies.sort((x, y) => y.id.localeCompare(x.id));
                }
            });
        }

        if (sortingType === "username") {
            this._comments.sort((x, y) => x.username.localeCompare(y.username));

            this._comments.forEach(comment => {
                if (comment.replies.length > 0) {
                    comment.replies.sort((x, y) => x.username.localeCompare(y.username));
                }
            });
        }

        let output = [];
        output.push(`Title: ${this.title}`);
        output.push(`Creator: ${this.creator}`);
        output.push(`Likes: ${this._likes.length}`);
        output.push(`Comments:`);

        for (let comment of this._comments) {
            output.push(`-- ${comment.id}. ${comment.username}: ${comment.content}`);

            if (comment.replies.length !== 0) {
                for (let reply of comment.replies) {
                    output.push(`--- ${reply.id}. ${reply.username}: ${reply.content}`);
                }
            }
        }

        return output.join("\n");
    }
}

let art = new Story("My Story", "Anny");
art.like("John");
console.log(art.likes);
art.dislike("Jon");
console.log(art.likes);
art.comment("Sammy", "Some Content");
console.log(art.comment("Ammy", "New Content"));
art.comment("Zane", "Reply", 1);
art.comment("Jessy", "Nice :)");
console.log(art.comment("SAmmy", "Reply@", 1));
console.log()
console.log(art.toString('username'));
console.log()
art.like("Zane");
console.log(art.toString('desc'));