![Empress Pixi Logo](/img/empress_logo_big_pixi.png)


# Интеграция Empress с Pixi

!--- ОБШИРНАЯ ДОКУМЕНТАЦИЯ В ПРОЦЕССЕ НАПИСАНИЯ ---!

Библиотека интеграции Pixi с Empress Core. Поскольку Empress Core является исключительно архитектурным решением, для интеграции с Pixi необходимо создать слой между Empress Core и Pixi. 

Помимо интеграции Pixi с Empress, библиотека предоставляет широкий набор возможностей для работы с визуальным состоянием игры: сцены, фабрики вьюх, контроллеры для tween и spine анимаций, системами частиц, загрузчиками ассетов и другими вспомогательными инструментами.

## Установка

```bash
npm install empress-pixi
```

## Репозиторий

[Empress Pixi на GitHub](https://github.com/empressengine/empress-pixi)

## Использование

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

## Зависимости

- TypeScript 5.6+
- [Empress Core](../core/what-is-empress) 1.0.2
- pixi.js 7.4.2
- @pixi/layers 2.1.0
- @pixi/particle-emitter 5.0.8
- pixi-spine 4.0.4


## Лицензия

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