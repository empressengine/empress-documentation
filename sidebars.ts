import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as 
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Введение',
    },
    {
      type: 'category',
      label: 'Ядро: имплементация ECS',
      items: [
        'core/what-is-empress',
        'core/empress-core',
        {
          type: 'category',
          label: 'Flow',
          items: ['core/flow/lifecycle'],
        },
        {
          type: 'category',
          label: 'Execution',
          items: [
            'core/execution/execution-controller',
            'core/execution/signals-controller',
          ],
        },
        {
          type: 'category',
          label: 'Containers',
          items: [
            'core/containers/services-container',
            'core/containers/system-group',
            'core/containers/systems-container',
          ],
        },
        {
          type: 'category',
          label: 'Logic',
          items: ['core/logic/system'],
        },
        {
          type: 'category',
          label: 'Data',
          items: [
            'core/data/component',
            'core/data/entity',
            'core/data/entity-storage',
            'core/data/filtered',
          ],
        },
        {
          type: 'category',
          label: 'Shared',
          items: [
            'core/shared/utils',
            'core/shared/deferred-promise',
            'core/shared/signal',
            'core/shared/timer',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
