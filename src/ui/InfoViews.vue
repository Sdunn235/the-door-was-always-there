<script>
import { apaParts } from './apaParts.js';

// The three reference pages: References (APA list), Resources (where to get help),
// and Credits (who made what). Which one shows is the `page` prop.
export default {
    props: {
        page: { type: String, required: true }, // 'references' | 'resources' | 'credits'
        sources: { type: Object, required: true },
        resources: { type: Array, required: true },
        author: { type: String, required: true },
    },

    methods: {
        printPage: function () {
            window.print();
        },
    },

    computed: {
        // APA reference list: alphabetical by the entry's first word(s).
        references: function () {
            const sources = this.sources;
            return Object.keys(sources).map(function (id) {
                return { id: id, parts: apaParts(sources[id].apa), url: sources[id].url, sortKey: sources[id].apa };
            }).sort(function (a, b) {
                return a.sortKey.localeCompare(b.sortKey);
            });
        },
    },
};
</script>

<template>
    <article class="info">
        <template v-if="page === 'references'">
            <h2>References</h2>
            <ul class="reference-list" data-test="references">
                <li v-for="ref in references" :key="ref.id">
                    <template v-for="(part, i) in ref.parts" :key="i"><em v-if="part.italic">{{ part.text }}</em><template
                            v-else>{{ part.text }}</template></template>
                    <a :href="ref.url" target="_blank" rel="noopener">{{ ref.url }}</a>
                </li>
            </ul>
            <p class="no-print"><button type="button" @click="printPage">Print references</button></p>
        </template>

        <template v-else-if="page === 'resources'">
            <h2>Resources</h2>
            <p>Help is available whether or not it is a crisis. You do not have to be "bad enough" to reach out.</p>
            <ul class="resource-list" data-test="resources">
                <li v-for="res in resources" :key="res.name">
                    <strong>{{ res.name }}</strong><br />
                    {{ res.detail }}<br />
                    <a :href="res.url" target="_blank" rel="noopener">{{ res.url }}</a>
                </li>
            </ul>
            <p>If you are in immediate danger, call 911.</p>
        </template>

        <template v-else>
            <h2>Credits</h2>
            <dl class="credits" data-test="credits">
                <dt>Story, dialogue, and argument</dt>
                <dd>{{ author }}</dd>
                <dt>Code and placeholder templates</dt>
                <dd>{{ author }}, with AI coding assistance (Claude). See CONTRIBUTIONS.md.</dd>
                <dt>Art</dt>
                <dd>The door and the case-file look are drawn in code for this project. No outside images or fonts are used.</dd>
                <dt>Software</dt>
                <dd>Vue.js, © Evan You and Vue contributors, MIT License. Built with Vite (MIT License).</dd>
                <dt>Course</dt>
                <dd>Persuasive proposal for Technical Reporting (801-197), Waukesha County Technical College.</dd>
                <dt>Note</dt>
                <dd>Jordan and every character are fictional. Statistics come from the sources on the References page.</dd>
            </dl>
        </template>
    </article>
</template>
