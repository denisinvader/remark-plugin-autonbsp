import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        dts({
            tsconfigPath: resolve(__dirname, 'tsconfig.app.json'),
            exclude: '**/*.test.*',
        }),
    ],
    build: {
        lib: {
            entry: [resolve(__dirname, 'src/index.ts')],
            formats: ['es'],
            name: 'remark-plugin-autonbsp',
        },
        rollupOptions: {
            external: ['@dinvader/autonbsp', 'unist-util-visit'],
            output: {
                preserveModules: true,
            },
        },
    },
});
