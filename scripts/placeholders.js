// Lists every [PLACEHOLDER ...] still in the story, with the scene it's in.
// Run: npm run placeholders     (must say 0 before handing the game in)
import { story } from '../src/content/story.js';

const left = [];
function check(where, text) {
    if (typeof text === 'string' && text.indexOf('[PLACEHOLDER') === 0) {
        left.push(where + ': ' + text.slice(0, 90) + (text.length > 90 ? '…' : ''));
    }
}

check('title screen (author)', story.author);
Object.keys(story.scenes).forEach(function (id) {
    const scene = story.scenes[id];
    check(id + ' (note)', scene.note);
    (scene.text || []).forEach(function (t) {
        check(id, t);
    });
    (scene.cards || []).forEach(function (card) {
        check(id + ' > ' + card.heading, card.text);
    });
});

left.forEach(function (line) {
    console.log('  ' + line);
});
console.log('\n' + left.length + ' placeholder(s) left.');
