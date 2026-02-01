# remark-plugin-autonbsp

[remark](https://github.com/remarkjs/remark) plugin that automatically replaces whitespace with non-breaking spaces (`\u00A0` or `&nbsp;`) in text nodes within Markdown.

It uses [@dinvader/autonbsp](https://www.npmjs.com/package/@dinvader/autonbsp) under the hood and provides the same config and functionality but ensures content and markup safety.

For examples and edge cases [see tests](src/index.test.ts).

## Installation

Install with npm or any other package manager:

```sh
npm install remark-plugin-autonbsp
```

```sh
yarn add remark-plugin-autonbsp
```

## Usage

Basic example:

```ts
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import { remarkPluginAutoNBSP } from 'remark-plugin-autonbsp';

const content = `# A long example title

First paragraph with a cat in a box. The weight is 2 500 g and the volume 2 L.
`;

remark()
    .use(remarkParse)
    .use(remarkPluginAutoNBSP, {
        mode: 'html',
        afterDigits: true,
        betweenDigits: true,
        prepositions: ['a', 'in', 'the', 'with'],
    })
    .process(content)
    .then((result) => console.log(result.toString()));
```

Will output:

```md
# A&nbsp;long example title

First paragraph with&nbsp;a&nbsp;cat in&nbsp;a&nbsp;box. The&nbsp;weight is 2&nbsp;500&nbsp;g and the&nbsp;volume 2&nbsp;L.
```

You can use configuration presets exported from @dinvader/autonbsp for English and Russian languages.

```ts
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import { remarkPluginAutoNBSP } from 'remark-plugin-autonbsp';
import nbspEn from '@dinvader/autonbsp/presets/en';

const content = `# A long example title

First paragraph with a cat in a box. The weight is 2 500 g and the volume 2 L.
`;

remark()
    .use(remarkParse)
    .use(remarkPluginAutoNBSP, nbspEn)
    .process(content)
    .then((result) => console.log(result.toString()));
```

### Usage with Astro

Import and register plugin in `markdown.remarkPlugins` field inside `astro.config.mjs`.

```js
import { defineConfig } from 'astro/config';
import remarkPluginAutoNBSP from 'remark-plugin-autonbsp';

export default defineConfig({
    markdown: {
        remarkPlugins: [
            [
                remarkPluginAutoNBSP,
                {
                    afterDigits: true,
                    betweenDigits: true,
                    prepositions: ['a', 'in', 'the', 'with'],
                },
            ],
        ],
    },
});
```

### Usage with Docusaurus

Register plugin in `docusaurus.config.ts` file inside `docs` and/or `blog` config:

```ts
import type { Config } from '@docusaurus/types';
import remarkPluginAutoNBSP from 'remark-plugin-autonbsp';

const remarkNBSPConfig = {
    afterDigits: true,
    betweenDigits: true,
    prepositions: ['a', 'in', 'the', 'with'],
};

const config: Config = {
    presets: [
        [
            'classic',
            {
                docs: {
                    remarkPlugins: [[remarkPluginAutoNBSP, remarkNBSPConfig]],
                },
                blog: {
                    remarkPlugins: [[remarkPluginAutoNBSP, remarkNBSPConfig]],
                },
            },
        ],
    ],
};
```

## Configuration options

Configuration options are exactly the same as [@dinvader/autonbsp configuration options](https://github.com/denisinvader/autonbsp#configuration-options).

### `mode?: 'utf' | 'html'`

Defines the replacement used for matched whitespace.

- `'utf'` replaces whitespace with the Unicode non-breaking space character `'\u00A0'` or ` `.
- `'html'` replaces whitespace with the HTML entity string `'&nbsp;'`.

Default value is `'utf'`.

### `betweenDigits?: boolean`

Replace runs of whitespace that occur between two adjacent digits.

Examples:

- `"123 456"` → `"123\u00A0456"`
- `"1\t  2"` → `"1\u00A02"`

`false` by default.

### `afterDigits?: boolean | 'before-letter'`

Replace runs of whitespace that occur immediately after a digit.

- `true` replaces whitespace when followed by any non-digit character.
- `'before-letter'` replaces whitespace only when followed by a Unicode letter.

Examples:

- `"2 pieces"` → `"2\u00A0pieces"`
- `"5 %"` → `"5\u00A0%"`
- `"5 %"` → `"5 %"` with `'before-letter'` option

`false` by default.

### `prepositions?: string | string[];`

Replace runs of whitespace that occur after specified whole-word prepositions.

Prepositions may be provided as:

- an array of strings (e.g. `['a', 'in', 'for']`)
- a pipe-separated regular expression pattern (e.g. `'a|in|for'`)

Matching is case-insensitive and respects word boundaries.

## License

[MIT](LICENSE) © [Mikhail Panichev](https://mpanichev.ru)
