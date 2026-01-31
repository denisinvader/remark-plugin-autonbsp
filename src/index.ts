import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';
import { autoNBSP, type AutoNBSPConfig } from '@dinvader/autonbsp';

export const remarkPluginAutoNBSP = (config: AutoNBSPConfig) => (tree: Root) =>
    visit(tree, 'text', (node) => {
        node.value = autoNBSP(node.value, config);
    });

export type { AutoNBSPConfig };

export default remarkPluginAutoNBSP;
