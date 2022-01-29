function solution(command) {
    if (command === 'upvote') {
        return this.upvotes++;
    } else if (command === 'downvote') {
        return this.downvotes++;
    } else {
        let totalVotes = this.upvotes + this.downvotes;
        let score = this.upvotes - this.downvotes;
        let inflation = Math.ceil(Math.max(this.downvotes, this.upvotes) * 0.25);
        let inflatedUpvotes = totalVotes > 50 ? this.upvotes + inflation : this.upvotes;
        let inflatedDownvotes = totalVotes > 50 ? this.downvotes + inflation : this.downvotes;

        let rating = 'new';

        if (totalVotes < 10) {
            rating = 'new';
        } else if (this.upvotes > totalVotes * 0.66) {
            rating = 'hot';
        } else if (score >= 0 && totalVotes > 100) {
            rating = 'controversial';
        } else if (score < 0) {
            rating = 'unpopular';
        }

        return [inflatedUpvotes, inflatedDownvotes, score, rating];
    }
}

let post = {
    id: '3',
    author: 'emil',
    content: 'wazaaaaa',
    upvotes: 100,
    downvotes: 100
};
solution.call(post, 'upvote');
solution.call(post, 'downvote');
let score = solution.call(post, 'score'); // [127, 127, 0, 'controversial']
solution.call(post, 'downvote');          // (executed 50 times)
score = solution.call(post, 'score');    