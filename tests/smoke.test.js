// Phase 0 smoke test: proves the test toolchain (Vitest + jsdom + Vue Test Utils) runs.
// Replaced by the real suites (engine, world, content, citations...) in later phases.
import { describe, it, expect, beforeAll } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '../src/App.vue';

beforeAll(function () {
    // jsdom has no real canvas. Return null so the app skips drawing quietly
    // instead of jsdom printing a "not implemented" error.
    HTMLCanvasElement.prototype.getContext = function () {
        return null;
    };
});

describe('Phase 0 delivery test page', function () {
    it('mounts and shows the starting position', function () {
        const wrapper = mount(App);
        expect(wrapper.get('[data-test="position"]').text()).toContain('tile 1 of 4');
    });

    it('moves the circle when the button is pressed', async function () {
        const wrapper = mount(App);
        await wrapper.get('[data-test="step"]').trigger('click');
        expect(wrapper.get('[data-test="position"]').text()).toContain('tile 2 of 4');
    });

    it('describes the canvas for screen readers', function () {
        const wrapper = mount(App);
        expect(wrapper.get('canvas').attributes('aria-label')).toContain('floor tile 1');
    });
});
