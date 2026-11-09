<script>
import { apaParts } from './apaParts.js';

// An APA in-text citation, e.g. "(Kirwan, 2026)", shown as a button.
// Pressing it opens the full reference right below, with a working link.
export default {
    props: {
        sourceId: { type: String, required: true },
        sources: { type: Object, required: true },
    },

    data: function () {
        return { open: false };
    },

    computed: {
        source: function () {
            return this.sources[this.sourceId];
        },
        parts: function () {
            return apaParts(this.source.apa);
        },
        panelId: function () {
            return 'ref-' + this.sourceId + '-' + this.$.uid;
        },
    },
};
</script>

<template>
    <span class="cite">
        <button type="button" class="cite-btn" :aria-expanded="open ? 'true' : 'false'" :aria-controls="panelId"
            data-test="cite" @click="open = !open">({{ source.inText }})</button>
        <span v-if="open" :id="panelId" class="cite-ref" data-test="cite-ref">
            <template v-for="(part, i) in parts" :key="i"><em v-if="part.italic">{{ part.text }}</em><template
                    v-else>{{ part.text }}</template></template>
            <a :href="source.url" target="_blank" rel="noopener">{{ source.url }}</a>
        </span>
    </span>
</template>
