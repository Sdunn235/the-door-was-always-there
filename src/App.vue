<script>
// PHASE 0 DELIVERY TEST — throwaway page, replaced in Phase 4.
// It proves the two things the real game depends on still work when the
// single-file build is double-clicked with no internet:
//   1. a <canvas> can draw (the walkable hub will live on one)
//   2. normal HTML buttons + Vue reactivity work (dialogue and choices will be HTML)

// Tile colors, same idea as LucentForge's TileMap._TILE_COLORS fallback:
// plain colored squares until licensed art exists.
const TILE = 32;
const COLORS = { floor: '#d9d2c5', wall: '#5b5348', player: '#2f6db5' };

// A tiny 6 x 3 test room: 1 = wall, 0 = floor.
const ROOM = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1],
];

export default {
    // data:    This component's own values.
    //          playerCol = which floor column the test circle stands on
    //          drawn     = true once the canvas has really been painted
    //                      (the offline check reads this from the page)
    data: function () {
        return {
            playerCol: 1,
            drawn: false,
        };
    },

    // computed:    The spoken description of the canvas, for screen readers.
    computed: {
        canvasLabel: function () {
            return 'Test room: a blue circle on floor tile ' + this.playerCol + ' of 4.';
        },
    },

    // methods:     step = move the circle one tile right, wrapping back to the start.
    //              draw = paint the room and the circle on the canvas.
    methods: {
        step: function () {
            this.playerCol = this.playerCol >= 4 ? 1 : this.playerCol + 1;
            this.draw();
        },
        draw: function () {
            const ctx = this.$refs.canvas.getContext('2d');
            if (!ctx) {
                return; // test environments (jsdom) have no real canvas
            }
            ROOM.forEach(function (row, r) {
                row.forEach(function (cell, c) {
                    ctx.fillStyle = cell === 1 ? COLORS.wall : COLORS.floor;
                    ctx.fillRect(c * TILE, r * TILE, TILE, TILE);
                });
            });
            ctx.fillStyle = COLORS.player;
            ctx.beginPath();
            ctx.arc(this.playerCol * TILE + TILE / 2, TILE + TILE / 2, TILE / 2 - 4, 0, Math.PI * 2);
            ctx.fill();
            this.drawn = true;
        },
    },

    // mounted:     The canvas element exists now, so it can be painted.
    mounted: function () {
        this.draw();
    },
};
</script>

<template>
    <main class="phase0">
        <h1>The Door Was Always There</h1>
        <p>Phase 0 delivery test. If you can see the room below and the button moves the circle, the
            single-file build works offline.</p>

        <canvas ref="canvas" width="192" height="96" role="img" :aria-label="canvasLabel"
            :data-drawn="drawn ? 'yes' : 'no'"></canvas>

        <p>
            <button type="button" data-test="step" @click="step">Move circle</button>
        </p>
        <p role="status" data-test="position">Circle is on tile {{ playerCol }} of 4.</p>
    </main>
</template>

<style>
body {
    margin: 0;
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    font-size: 1.125rem;
    line-height: 1.5;
    background: #f7f4ee;
    color: #1f1c18;
}

.phase0 {
    max-width: 40rem;
    margin: 2rem auto;
    padding: 0 1rem;
}

.tag {
    font-size: 0.9rem;
    font-weight: normal;
    color: #5b5348;
}

canvas {
    display: block;
    image-rendering: pixelated;
    border: 2px solid #5b5348;
}

button {
    min-height: 44px;
    padding: 0.5rem 1rem;
    font: inherit;
}

button:focus-visible {
    outline: 3px solid #2f6db5;
    outline-offset: 2px;
}
</style>
