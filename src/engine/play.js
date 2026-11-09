// The game's rules, with no Vue and no DOM: just plain data in, plain data out.
// The same idea as TheForge's PlayerLoop: scene -> choices -> next scene,
// but the story lives in src/content/story.js instead of in code.
//
// State: { sceneId, visited: [ids in first-visit order], notes: [case-note strings] }
// State is never saved anywhere; it lives in memory and is gone when the page closes.

// Begin a new game at the story's start scene.
export function startGame(story) {
    return enter(story, { sceneId: null, visited: [], notes: [] }, story.start);
}

// The scene object the player is looking at now.
export function currentScene(story, state) {
    return story.scenes[state.sceneId];
}

// Follow a choice. Returns a NEW state (the old one is not changed).
export function choose(story, state, targetId) {
    const scene = currentScene(story, state);
    const allowed = scene.choices.some(function (c) {
        return c.to === targetId;
    });
    if (!allowed) {
        throw new Error('"' + targetId + '" is not a choice in scene "' + state.sceneId + '"');
    }
    // "Play again" from the end starts fresh rather than keeping the old notes.
    if (scene.end) {
        return startGame(story);
    }
    return enter(story, state, targetId);
}

// How far along the case is, 0 to 1. Drives how far the door is drawn open.
// Counts the furthest main-path scene reached, so trying a wrong answer (a `side`
// scene) never closes the door again.
export function progress(story, state) {
    const main = Object.keys(story.scenes).filter(function (id) {
        return !story.scenes[id].side;
    });
    let furthest = 0;
    state.visited.forEach(function (id) {
        furthest = Math.max(furthest, main.indexOf(id));
    });
    return main.length > 1 ? furthest / (main.length - 1) : 1;
}

// Move into a scene: remember the visit and add its case note the first time.
function enter(story, state, sceneId) {
    const scene = story.scenes[sceneId];
    if (!scene) {
        throw new Error('No scene called "' + sceneId + '"');
    }
    const firstVisit = state.visited.indexOf(sceneId) === -1;
    return {
        sceneId: sceneId,
        visited: firstVisit ? state.visited.concat(sceneId) : state.visited,
        notes: firstVisit && scene.note ? state.notes.concat(scene.note) : state.notes,
    };
}
