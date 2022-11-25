import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/ts/main.ts',
            ],
            refresh: true,
        }),
    ]
});
