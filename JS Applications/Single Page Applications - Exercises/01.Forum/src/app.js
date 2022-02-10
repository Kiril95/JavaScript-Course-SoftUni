// Doesn't work a hundred percent, but whatever

import { createPost, cancelInputs } from './create.js';
import { displayTopics } from './topics.js';

displayTopics();
document.querySelector('.public').addEventListener('click', createPost);

document.querySelector('.cancel').addEventListener('click', cancelInputs);
