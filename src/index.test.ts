import { test } from 'node:test';
import { equal } from 'assert/strict';
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import { remarkPluginAutoNBSP, type AutoNBSPConfig } from '.';

test('touches only plain text and does not break markup', async () => {
    const _ = '\u00A0';
    const config: AutoNBSPConfig = {
        betweenDigits: true,
        afterDigits: true,
        prepositions: ['a', 'an', 'the', 'at', 'by', 'for', 'from', 'in', 'of', 'on', 'to', 'with'],
    };

    const INPUT = `# A long example title

First paragraph *with a* cat in a box. The weight is 5 **kg** and the __volume 2__ L.

Second in paragraph 102 083 kg ends here a

Third paragraph includes a "quote in text" and a code snippet \`npm install in folder\`.

Punctuation at the end works like a.

<!-- a comment should 2 be left untouched at all -->

<div class="fade in fast 8 kg a class 1 2 3 ">Test in a block</div>

Fenced code block with 1 5 kg in a box:

\`\`\`js
const value = "with 1 5 kg in a box";
console.log(value);
\`\`\`

Final paragraph ends with a hanging preposition: in
This depends on
`;

    const OUTPUT = `# A${_}long example title

First paragraph *with${_}a* cat in${_}a${_}box. The${_}weight is 5 **kg** and the${_}**volume 2** L.

Second in${_}paragraph 102${_}083${_}kg ends here a

Third paragraph includes a${_}"quote in${_}text" and a${_}code snippet \`npm install in folder\`.

Punctuation at${_}the${_}end works like a.

<!-- a comment should 2 be left untouched at all -->

<div class="fade in fast 8 kg a class 1 2 3 ">Test in a block</div>

Fenced code block with${_}1${_}5${_}kg in${_}a${_}box:

\`\`\`js
const value = "with 1 5 kg in a box";
console.log(value);
\`\`\`

Final paragraph ends with${_}a${_}hanging preposition: in${_}This depends on
`;

    equal(String(await remark().use(remarkParse).use(remarkPluginAutoNBSP, config).process(INPUT)), OUTPUT);
});
