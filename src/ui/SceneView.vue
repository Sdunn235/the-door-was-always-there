<script>
import CiteButton from './CiteButton.vue';
import { isPlaceholder, displayText } from './apaParts.js';

// One scene: heading, paragraphs, optional evidence cards, citations, and choices.
// Props down (the scene to show), events up ("choose" with the target scene id).
export default {
    components: { CiteButton },

    props: {
        scene: { type: Object, required: true },
        sceneId: { type: String, required: true },
        sources: { type: Object, required: true },
    },

    emits: ['choose'],

    methods: {
        isPlaceholder: isPlaceholder,
        displayText: displayText,
        // Move keyboard and screen-reader focus to the new scene's heading.
        focusHeading: function () {
            this.$nextTick(function () {
                if (this.$refs.heading) {
                    this.$refs.heading.focus();
                }
            });
        },
    },

    watch: {
        sceneId: function () {
            this.focusHeading();
        },
    },
};
</script>

<template>
    <article class="scene" :class="{ 'scene-side': scene.side }">
        <h2 ref="heading" tabindex="-1" data-test="scene-title">{{ scene.title }}</h2>

        <p v-for="(line, i) in scene.text" :key="'t' + i" :class="{ placeholder: isPlaceholder(line) }">
            <span v-if="isPlaceholder(line)" class="ph-tag">Draft</span>{{ displayText(line) }}
        </p>

        <p v-if="scene.cites && scene.cites.length" class="scene-cites">
            Sources:
            <CiteButton v-for="id in scene.cites" :key="id" :source-id="id" :sources="sources" />
        </p>

        <div v-if="scene.cards" class="cards">
            <section v-for="(card, i) in scene.cards" :key="'c' + i" class="card"
                :class="{ 'card-missing': card.missing }">
                <h3>{{ card.heading }}</h3>
                <p :class="{ placeholder: isPlaceholder(card.text) }">
                    <span v-if="isPlaceholder(card.text)" class="ph-tag">Draft</span>{{ displayText(card.text) }}
                </p>
                <p v-if="card.cites" class="card-cites">
                    <CiteButton v-for="id in card.cites" :key="id" :source-id="id" :sources="sources" />
                </p>
            </section>
        </div>

        <ul class="choices" aria-label="What do you do?">
            <li v-for="choice in scene.choices" :key="choice.to + choice.label">
                <button type="button" class="choice" data-test="choice" @click="$emit('choose', choice.to)">
                    {{ choice.label }}
                </button>
            </li>
        </ul>
    </article>
</template>
