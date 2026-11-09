<script>
// The door: drawn in SVG for this project (no outside art).
// It opens a little more as the case moves forward: the services were
// always there, and the story is about finding the path to them.
export default {
    props: {
        open: { type: Number, default: 0 }, // 0 = shut, 1 = fully open
    },

    computed: {
        // The door panel squeezes toward its hinge as it opens (a simple fake-3D swing).
        panelWidth: function () {
            return 60 - 44 * Math.min(1, Math.max(0, this.open));
        },
        label: function () {
            const pct = Math.round(this.open * 100);
            return 'A door, ' + (pct === 0 ? 'closed' : pct + ' percent open') + '.';
        },
    },
};
</script>

<template>
    <svg class="door" viewBox="0 0 100 140" role="img" :aria-label="label" data-test="door">
        <!-- frame and the light behind the door -->
        <rect x="18" y="10" width="64" height="124" class="door-frame" />
        <rect x="20" y="12" width="60" height="122" class="door-light" />
        <!-- the door panel, hinged on the left -->
        <g class="door-panel">
            <rect x="20" y="12" :width="panelWidth" height="122" />
            <circle :cx="20 + panelWidth - 7" cy="76" r="3" class="door-knob" />
        </g>
        <rect x="8" y="132" width="84" height="6" class="door-step" />
    </svg>
</template>
