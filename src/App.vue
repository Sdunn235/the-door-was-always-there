<script>
import { story } from './content/story.js';
import { startGame, currentScene, choose, progress } from './engine/play.js';
import { isPlaceholder, displayText } from './ui/apaParts.js';
import SceneView from './ui/SceneView.vue';
import InfoViews from './ui/InfoViews.vue';
import DoorArt from './ui/DoorArt.vue';

// The app shell. It owns the game state and decides which screen shows.
// Screens: 'title' | 'play' | 'references' | 'resources' | 'credits'.
// Game state lives only in memory: nothing is saved, nothing is sent anywhere.
export default {
    components: { SceneView, InfoViews, DoorArt },

    data: function () {
        return {
            story: story,
            screen: 'title',
            game: null, // set when the player starts; kept while they visit References etc.
        };
    },

    computed: {
        scene: function () {
            return this.game ? currentScene(this.story, this.game) : null;
        },
        doorOpen: function () {
            return this.game ? progress(this.story, this.game) : 0;
        },
        isInfoScreen: function () {
            return ['references', 'resources', 'credits'].indexOf(this.screen) !== -1;
        },
    },

    methods: {
        isPlaceholder: isPlaceholder,
        displayText: displayText,
        start: function () {
            this.game = startGame(this.story);
            this.screen = 'play';
        },
        onChoose: function (target) {
            this.game = choose(this.story, this.game, target);
        },
        show: function (screen) {
            this.screen = screen;
        },
        // From an info page, go back to the game if one is running, else the title.
        back: function () {
            this.screen = this.game ? 'play' : 'title';
        },
        quit: function () {
            this.game = null;
            this.screen = 'title';
        },
    },
};
</script>

<template>
    <a class="skip-link" href="#main">Skip to content</a>

    <header class="toolbar no-print">
        <span class="brand">{{ story.title }}</span>
        <nav aria-label="Game menu">
            <button v-if="isInfoScreen" type="button" data-test="nav-back" @click="back">
                {{ game ? 'Back to the case' : 'Back to title' }}
            </button>
            <button type="button" data-test="nav-resources" :aria-current="screen === 'resources' ? 'page' : null"
                @click="show('resources')">Resources</button>
            <button type="button" data-test="nav-references" :aria-current="screen === 'references' ? 'page' : null"
                @click="show('references')">References</button>
            <button type="button" data-test="nav-credits" :aria-current="screen === 'credits' ? 'page' : null"
                @click="show('credits')">Credits</button>
            <button v-if="game" type="button" data-test="nav-quit" @click="quit">Quit</button>
        </nav>
    </header>

    <main id="main" class="page">
        <section v-if="screen === 'title'" class="title-screen">
            <DoorArt :open="0.15" />
            <div>
                <p class="eyebrow">A case-file story · Persuasive proposal</p>
                <h1>{{ story.title }}</h1>
                <p class="byline" :class="{ placeholder: isPlaceholder(story.author) }">{{ story.author }}</p>
                <p>A peer mentor at a Milwaukee-area college notices that a student has gone quiet. Follow the
                    evidence, talk with him, and make the case for a better path to help.</p>
                <p><button type="button" class="primary" data-test="start" @click="start">Start</button></p>
            </div>
        </section>

        <div v-else-if="screen === 'play'" class="play">
            <SceneView :scene="scene" :scene-id="game.sceneId" :sources="story.sources" @choose="onChoose" />
            <aside class="side" aria-label="Case notes">
                <DoorArt :open="doorOpen" />
                <h2 class="notes-title">Case notes</h2>
                <p v-if="!game.notes.length" class="muted">Nothing written down yet.</p>
                <ol v-else class="notes" data-test="notes">
                    <li v-for="(note, i) in game.notes" :key="i" :class="{ placeholder: isPlaceholder(note) }">{{ displayText(note) }}
                    </li>
                </ol>
            </aside>
        </div>

        <InfoViews v-else :page="screen" :sources="story.sources" :resources="story.resources"
            :author="story.author" />
    </main>

    <footer class="footer no-print">
        <p>Fictional story. Need to talk? Call or text <strong>988</strong>, any time.</p>
    </footer>
</template>

<style>
/* ---------- tokens: the "case file" palette (all text pairs meet 4.5:1 contrast) ---------- */
:root {
    --paper: #f6f0e1;
    --folder: #e4d3a8;
    --ink: #1f1b14;
    --muted: #5a5244;
    --accent: #8a2c1d;
    /* stamp red */
    --link: #1d4f91;
    --line: #b9a67a;
    --card: #fffdf6;
    --focus: #1d4f91;
    --mono: ui-monospace, 'Cascadia Mono', Consolas, 'Courier New', monospace;
}

* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    font-size: 1.125rem;
    line-height: 1.6;
    background: var(--folder);
    color: var(--ink);
}

a {
    color: var(--link);
    overflow-wrap: anywhere;
}

h1,
h2,
h3 {
    font-family: var(--mono);
    line-height: 1.25;
}

button {
    min-height: 44px;
    padding: 0.5rem 1rem;
    font: inherit;
    color: var(--ink);
    background: var(--card);
    border: 2px solid var(--muted);
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background: #fff;
    border-color: var(--ink);
}

:focus-visible {
    outline: 3px solid var(--focus);
    outline-offset: 2px;
}

.skip-link {
    position: absolute;
    left: -999px;
}

.skip-link:focus {
    left: 1rem;
    top: 1rem;
    z-index: 10;
    background: var(--card);
    padding: 0.5rem 1rem;
}

/* ---------- layout ---------- */
.toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    background: var(--ink);
    color: var(--paper);
}

.toolbar .brand {
    font-family: var(--mono);
    font-weight: bold;
}

.toolbar nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.toolbar button[aria-current='page'] {
    background: var(--folder);
    border-color: var(--paper);
}

.page {
    max-width: 68rem;
    margin: 1.5rem auto;
    padding: 1.5rem;
    background: var(--paper);
    border: 1px solid var(--line);
    box-shadow: 0 2px 0 var(--line);
}

.footer {
    text-align: center;
    font-size: 0.95rem;
    padding: 0 1rem 1.5rem;
}

.title-screen {
    display: grid;
    grid-template-columns: minmax(8rem, 14rem) 1fr;
    gap: 2rem;
    align-items: center;
}

.title-screen h1 {
    font-size: 2.25rem;
    margin: 0.25rem 0;
}

.eyebrow {
    font-family: var(--mono);
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.9rem;
    margin: 0;
}

.byline {
    color: var(--muted);
    margin-top: 0;
}

.primary {
    background: var(--accent);
    color: #fff;
    border-color: var(--accent);
    font-weight: bold;
    padding: 0.6rem 2rem;
}

.primary:hover {
    background: #6e2216;
}

.play {
    display: grid;
    grid-template-columns: 1fr 15rem;
    gap: 2rem;
}

.side {
    border-left: 2px dashed var(--line);
    padding-left: 1.5rem;
}

.notes-title {
    font-size: 1.1rem;
}

.notes {
    padding-left: 1.25rem;
    font-size: 1rem;
}

.muted {
    color: var(--muted);
}

@media (max-width: 48rem) {

    .play,
    .title-screen {
        grid-template-columns: 1fr;
    }

    .side {
        border-left: 0;
        border-top: 2px dashed var(--line);
        padding: 1rem 0 0;
    }

    .door {
        max-width: 8rem;
    }
}

/* ---------- scene ---------- */
.scene h2 {
    font-size: 1.6rem;
    margin-top: 0;
    border-bottom: 2px solid var(--ink);
    padding-bottom: 0.25rem;
}

.scene h2:focus {
    outline: none;
}

.scene h2:focus-visible {
    outline: 3px solid var(--focus);
}

.cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
    gap: 1rem;
    margin: 1rem 0;
}

.card {
    background: var(--card);
    border: 1px solid var(--line);
    border-top: 4px solid var(--ink);
    padding: 0.75rem 1rem;
}

.card h3 {
    margin: 0 0 0.5rem;
    font-size: 1.05rem;
}

.card p {
    margin: 0.25rem 0;
}

.card-missing {
    border: 2px dashed var(--accent);
    border-top-width: 4px;
    background: transparent;
}

.card-missing h3 {
    color: var(--accent);
}

.choices {
    list-style: none;
    padding: 0;
    margin: 1.5rem 0 0;
    display: grid;
    gap: 0.5rem;
}

.choice {
    width: 100%;
    text-align: left;
}

.choice::before {
    content: '→ ';
    color: var(--accent);
}

/* ---------- citations ---------- */
.scene-cites,
.card-cites {
    font-size: 0.95rem;
    color: var(--muted);
}

.cite-btn {
    min-height: 32px;
    padding: 0.1rem 0.4rem;
    margin: 0.1rem 0.2rem;
    font-size: 0.95rem;
    color: var(--link);
    background: transparent;
    border: 1px dashed var(--link);
}

.cite-ref {
    display: block;
    margin: 0.4rem 0;
    padding: 0.5rem 0.75rem;
    background: var(--card);
    border-left: 3px solid var(--link);
    color: var(--ink);
}

.cite-ref a {
    display: inline;
    margin-left: 0.25rem;
}

/* ---------- placeholders: impossible to miss ---------- */
.placeholder {
    background: #fff3a8;
    color: #3d3300;
    outline: 2px dashed #8a6d00;
    padding: 0.25rem 0.5rem;
}

.ph-tag {
    display: inline-block;
    margin-right: 0.5rem;
    padding: 0 0.4rem;
    font-family: var(--mono);
    font-size: 0.8rem;
    font-weight: bold;
    background: #8a6d00;
    color: #fff;
    text-transform: uppercase;
}

/* ---------- door ---------- */
.door {
    width: 100%;
    max-width: 12rem;
    display: block;
    margin: 0 auto;
}

.door-frame {
    fill: var(--ink);
}

.door-light {
    fill: #fff1b8;
}

.door-panel rect {
    fill: var(--accent);
}

.door-knob {
    fill: var(--folder);
}

.door-step {
    fill: var(--muted);
}

@media (prefers-reduced-motion: no-preference) {

    .door-panel rect,
    .door-knob {
        transition: width 0.6s ease, cx 0.6s ease;
    }
}

/* ---------- info pages ---------- */
.reference-list {
    list-style: none;
    padding: 0;
    line-height: 2;
    /* APA: double-spaced */
}

.reference-list li {
    padding-left: 2.5em;
    /* APA: hanging indent */
    text-indent: -2.5em;
    margin-bottom: 0.5rem;
}

.resource-list li {
    margin-bottom: 1rem;
}

.credits dt {
    font-weight: bold;
    margin-top: 0.75rem;
}

.credits dd {
    margin-left: 0;
}

/* ---------- print: references page prints as a clean APA list ---------- */
@media print {
    body {
        background: #fff;
    }

    .no-print,
    .skip-link {
        display: none !important;
    }

    .page {
        border: 0;
        box-shadow: none;
        margin: 0;
        padding: 0;
        max-width: none;
    }

    a {
        color: #000;
    }
}
</style>
