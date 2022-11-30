import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/ts/main.tsx',
            ],
            refresh: true,
        }),
        nodeResolve({
            exportConditions: ['development']
        }),
    ],

});
