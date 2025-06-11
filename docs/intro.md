---
sidebar_position: 1
---

![Empress Logo](/img/empress_logo_big.png)

# Экосистема Empress

Экосистема Empress реализует модули для разработки браузерных игр на TypeScript.

## [Ядро Empress Core](core/what-is-empress)

Ядро Empress Core предоставляет базовую функциональность для создания игр с использованием Entity Component System (ECS) архитектуры. В самом ядре реализованы основные модули управления игровым циклом, порядком выполенния систем, сигналами и контейнерами для управления зависимостями. 

Empress Core имплементирует смешанный update- и event-driven подходы к выполеннию Систем. Это позволяет выбирать между классическим подходом, когда все Системы выполняются на каждом обновлении, и event-driven подходом, когда Системы выполняются только при определенных событиях.

Также за счет гибридного подхода, есть возможность добавлять любые способы управления выполнением Систем: от подписки на ивенты сокета, до внедрения FSM.

Для избежания нарушения принципов DRY,Empress Core предоставляет возможность внедрять зависимости, так называемые сервисы, внутрь Системы через механизм внедрения зависимостей (Dependency Injection). Механизм внедрения зависимостей достаточно гибок и позволяет определять зависимости как глобальные, так и локальные для каждой Группы Систем.

### Установка

```bash
npm install empress-core
```

### Настройка проекта

Добавьте необходимые настройки TypeScript в `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "useDefineForClassFields": false,
  }
}
```

### Репозиторий

[Empress Core на GitHub](https://github.com/empressengine/empress-core)

### Зависимости

- TypeScript 5.6+

## [Empress Store](empress-store)

Empress Store - это модуль реактивного хранилища данных, который обеспечивает возможность хранения и управления состоянием приложения в реактивном режиме. Особенность Empress Store в том, что он реализует механизм слияния состояний, что позволяет создавать сложные состояния на основе нескольких источников данных. 

Также имплмегтирована поддержка middleware, что позволяет добавлять дополнительные функции к состоянию, например логирование изменений, сохранение состояния в localStorage и т.д.

Данные в Empress Store имутабельны, что обеспечивает предсказуемость и возможность отслеживания изменений. Измненения позволено вносить исключительно через методы Store.

### Установка

```bash
npm install empress-store
```

### Репозиторий

[Empress Store на GitHub](https://github.com/empressengine/empress-store)

### Зависимости

- TypeScript 5.6+

## [Empress FSM](empress-fsm)

Empress FSM предоставляет возможность реализации игровых механик на основе концепции Finite State Machine (FSM) в связке с Empress Store - модулем реактивного хранилища данных. FSM работает не по принципу событий "переключись на стейт Х", а по принципу отслеживания изменения данных в Empress Store.

Реализуются переходы через guards - функции, которые проверяют возможность перехода в определенный стейт, если данные в Empress Store соответствуют определенным условиям.

Также FSM поддерживает стратегии перехода, которые определяют, как будет происходить переход между стейтами. Мы можем дождаться выполнения всех систем в стейте и после уже перейти на следующий стейт, если это необходимо, либо же прервать выполнение Систем в стейте и немедленно перейти на следующий стейт. 

Более того, изменения выстраиваются в очереди, что обеспечивает предсказуемость и защищает от потери промежуточных стейтов.

### Установка

```bash
npm install empress-fsm empress-store empress-core
```

### Репозиторий

[Empress FSM на GitHub](https://github.com/empressengine/empress-fsm)

### Зависимости

- TypeScript 5.6+
- [Empress Store](empress-store) 1.0.0+
- [Empress Core](core/what-is-empress) 1.0.0+

## Empress Pixi

!--- ОБШИРНАЯ ДОКУМЕНТАЦИЯ В ПРОЦЕССЕ НАПИСАНИЯ ---!

Библиотека интеграции Pixi с Empress Core. Поскольку Empress Core является исключительно архитектурным решением, для интеграции с Pixi необходимо создать слой между Empress Core и Pixi. 

Помимо интеграции Pixi с Empress, библиотека предоставляет широкий набор возможностей для работы с визуальным состоянием игры: сцены, фабрики вьюх, контроллеры для tween и spine анимаций, системами частиц, загрузчиками ассетов и другими вспомогательными инструментами.

### Установка

```bash
npm install empress-pixi
```

### Репозиторий

[Empress Pixi на GitHub](https://github.com/empressengine/empress-pixi)

### Использование

```typescript
import { EmpressPixiCore } from 'empress-pixi';

// Создать PixixRender
export class PixiRender {
    public init(): Application {
        return new Application({
            backgroundAlpha: 1,
            powerPreference: 'high-performance',
            resolution: window.devicePixelRatio,
            autoDensity: true,
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }
}

// Получение родительского элемента
const parent = document.querySelector('.game') as HTMLDivElement;

// Инициализация Pixi
const render = new PixiRender();
const pixi = render.init();

// Инициализация Empress
const empress = new EmpressPixiCore();
empress.connectRender(pixi, parent);
empress.init();
```

### Зависимости

- TypeScript 5.6+
- [Empress Core](core/what-is-empress) 1.0.2
- pixi.js 7.4.2
- @pixi/layers 2.1.0
- @pixi/particle-emitter 5.0.8
- pixi-spine 4.0.4


### Лицензия

Empress Pixi распространяется под лицензией MIT.

```text
MIT License

Copyright (c) 2025 Empress Pixi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```