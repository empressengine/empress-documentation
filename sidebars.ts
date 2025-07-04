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
        {
          type: 'doc',
          id: 'core/what-is-empress',
          label: 'Что такое Empress Core?',
        },
        'core/comparison',
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
    {
      type: 'category',
      label: 'Рендеринг: интеграция с Pixi',
      items: [
        {
          type: 'doc',
          id: 'pixi/pixi-integration',
          label: 'Интеграция Empress с Pixi',
        },
      ],
    },
    {
      type: 'doc',
      id: 'empress-store',
      label: 'Empress Store',
    },
    {
      type: 'doc',
      id: 'empress-fsm',
      label: 'Empress FSM',
    }
  ],
};

export default sidebars;
