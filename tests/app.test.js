// The screens, mounted in a fake browser (jsdom): start, play through, citations, info pages.
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '../src/App.vue';
import { story } from '../src/content/story.js';

// Click the choice that leads to `to` in the current scene.
async function pick(wrapper, to) {
    const scene = story.scenes[wrapper.vm.game.sceneId];
    const index = scene.choices.findIndex(function (c) {
        return c.to === to;
    });
    await wrapper.findAll('[data-test="choice"]')[index].trigger('click');
}

describe('app', function () {
    it('shows the title screen, then the first scene on Start', async function () {
        const wrapper = mount(App);
        expect(wrapper.text()).toContain(story.title);
        await wrapper.get('[data-test="start"]').trigger('click');
        expect(wrapper.get('[data-test="scene-title"]').text()).toBe(story.scenes[story.start].title);
    });

    it('can be played from start to close along the main path', async function () {
        const wrapper = mount(App);
        await wrapper.get('[data-test="start"]').trigger('click');
        const path = ['case', 'classmate', 'flyer', 'board', 'talk', 'listen', 'door', 'proposal', 'objection',
            'refutation', 'close'];
        for (const to of path) {
            await pick(wrapper, to);
        }
        expect(wrapper.get('[data-test="scene-title"]').text()).toBe(story.scenes.close.title);
    });

    it('a citation button opens the full reference', async function () {
        const wrapper = mount(App);
        await wrapper.get('[data-test="start"]').trigger('click');
        for (const to of ['case', 'classmate', 'flyer']) {
            await pick(wrapper, to);
        }
        const btn = wrapper.get('[data-test="cite"]');
        expect(btn.attributes('aria-expanded')).toBe('false');
        await btn.trigger('click');
        expect(btn.attributes('aria-expanded')).toBe('true');
        expect(wrapper.get('[data-test="cite-ref"]').text()).toContain('American Journal of Men');
    });

    it('lists every reference, alphabetically', async function () {
        const wrapper = mount(App);
        await wrapper.get('[data-test="nav-references"]').trigger('click');
        const items = wrapper.findAll('[data-test="references"] li').map(function (li) {
            return li.text();
        });
        expect(items.length).toBe(Object.keys(story.sources).length);
        expect(items).toEqual(items.slice().sort(function (a, b) {
            return a.localeCompare(b);
        }));
    });

    it('Resources and Credits open from the toolbar, and Back returns to the game', async function () {
        const wrapper = mount(App);
        await wrapper.get('[data-test="start"]').trigger('click');
        await wrapper.get('[data-test="nav-resources"]').trigger('click');
        expect(wrapper.get('[data-test="resources"]').text()).toContain('988');
        await wrapper.get('[data-test="nav-credits"]').trigger('click');
        expect(wrapper.get('[data-test="credits"]').text()).toContain('MIT');
        await wrapper.get('[data-test="nav-back"]').trigger('click');
        expect(wrapper.find('[data-test="scene-title"]').exists()).toBe(true);
    });
});
