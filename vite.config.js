import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Two build shapes from one config:
//   npm run build         -> dist/         normal multi-file site (for optional hosting later)
//   npm run build:single  -> dist-single/  ONE self-contained .html the teacher can double-click.
//                                          Browsers refuse to load separate module scripts from
//                                          file://, so the single-file build inlines all JS, CSS
//                                          and images into the page itself.
export default defineConfig(({ mode }) => {
    const single = mode === 'single';

    return {
        // Relative asset paths, so the build works from any folder or sub-path.
        base: './',

        plugins: single ? [vue(), viteSingleFile()] : [vue()],

        // '@' means 'src/', same alias as TheForgeApp.
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },

        build: {
            outDir: single ? 'dist-single' : 'dist',
            emptyOutDir: true,
        },

        // Vitest reads this block. jsdom gives tests a fake browser page.
        test: {
            environment: 'jsdom',
            include: ['tests/**/*.test.js'],
        },
    };
});
