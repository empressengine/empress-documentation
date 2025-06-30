# Сравнение с другими решениями

## Empress Core vs bitecs vs ecsy


| Характеристика | Empress Core | bitecs | ecsy |
|----------------|--------------|---------|------|
| Язык | TypeScript (TS-first) | TypeScript/JavaScript | JavaScript + типизация вручную |
| Подход | Data Oriented + OOP Style + DI | Чисто Data Oriented, низкоуровневый | OOP, высокоуровневый |
| Типизация | ✅ Полная TS-типизация | ⚠️ Частичная, много ручного кода | ❌ Почти нет встроенной типизации |
| Производительность | 🚀 Хорошая, с кэшами и асинхронностью | 🚀🚀 Очень высокая (bitwise data + AoS/SoA) | 🐢 Средняя, ориентирована на удобство |
| Гибкость | ✅ Высокая (DI, сигналы, async, жизненный цикл, группы Систем) | ⚠️ Низкая, всё вручную | ✅ Средняя (удобные API, но не масштабная) |
| Асинхронность | ✅ Поддержка async-систем и очередей | ❌ Нет | ❌ Нет |
| DI / Signal system | ✅ Встроены | ❌ Нет | ❌ Нет |
| Жизненный цикл | ✅ Поддерживается (onInit, onDestroy) | ❌ Нет | ✅ Частично |
| Документация | 📘 Подробная | 📄 Минимальная | 📘 Хорошая |
| Идеально для | Средних/больших проектов, чистая архитектура | Массивные симуляции, WebGL/3D | Прототипы, обучение, простые игры |
| Кривая обучения | ⛰️ Средняя | 🧠 Сложная | 👶 Низкая |

 
## Комментарии по каждому

### Empress Core
Прекрасно подойдёт для создания гибких и масштабируемых игр, в которых требуется поддержка асинхронных операций, сигналы и инъекция зависимостей. Ориентирован в первую очередь на удобную работу с архитектурой.
И при этом является достаточно производительным, чтобы без пробелм реализовывать любые игровые механики.

### bitecs
Невероятно быстрый и максимально data-oriented, почти как на C или Rust. Отличный выбор для создания игр в которых требуется рендеринг тысяч объектов. Но требует глубокого понимания низкоуровневого кода и управления памятью.

### ecsy
Простой в использовании, удобен для обучения, является частью A-Frame (VR). Однако не предназначен для сложных или масштабируемых проектов, где важна гибкость и производительность.

## Примеры кода

### Empress Core

#### Создание Компонентов
```typescript
export class Position {
  constructor(public x = 0, public y = 0) {}
}

export class Velocity {
  constructor(public x = 0, public y = 0) {}
}
```

#### Создание Сущности
```typescript
const player = new Entity('player');

// Добавление Компонентов
player.addComponent(new Position(0, 0));
player.addComponent(new Velocity(1, 1));
```

#### Создание Систем
```typescript
export class MovementSystem extends System<IUpdateLoopData> {
  execute(data: IUpdateLoopData): void {
    const entities = this.filter({
      includes: [Position, Velocity]
    });

    entities.forEach(entity => {
      const pos = entity.getComponent(Position);
      const vel = entity.getComponent(Velocity);
      pos.x += vel.x * data.deltaTime;
      pos.y += vel.y * data.deltaTime;
    });
  }
}
```

#### Создание Груп Выполнения
```typescript
class MovementGroup extends SystemGroup<IUpdateLoopData> {
   public setup(chain: SystemChain, data: IUpdateLoopData): void {
    chain.add(MovementSystem, data);
   }
}
```

#### Инициализация игры и модулей фреймворка
```typescript
// Создание и инициализация модулей ядра
const empress = new EnpressCore();
empress.init();

// Регистрация Сущностей в игре
const entityStorage = ServiceContainer.instance.get(EntityStorage);
entityStorage.add(player);

// Подпиика на события Сигналов для исполнения логики Систем в группах
const baseSignals: ISignalConfig[] = [
    {
        signal: OnUpdateSignal,
        groups: [MovementGroup]
    },
];
empress.listen(baseSignals);

// Запуск игры
empress.start();
```

###  bitecs

#### Создание Компонентов
```typescript
const Position = defineComponent({ x: Types.f32, y: Types.f32 });
const Velocity = defineComponent({ x: Types.f32, y: Types.f32 });
```

#### Создание мира
```typescript
const world = createWorld();
```

#### Создание Сущности
```typescript
const player = addEntity(world);
addComponent(world, Position, player);
addComponent(world, Velocity, player);
```

#### Инициализация значений
```typescript
Position.x[player] = 100;
Position.y[player] = 100;
Velocity.x[player] = 50;
Velocity.y[player] = 0;
```

#### Создание Систем
```typescript
const moveQuery = defineQuery([Position, Velocity]);
function movementSystem(world, deltaTime: number) {
  const entities = moveQuery(world);
  for (let eid of entities) {
    Position.x[eid] += Velocity.x[eid] * deltaTime;
    Position.y[eid] += Velocity.y[eid] * deltaTime;
  }
  return world;
}
```

### ecsy

#### Создание Компонентов
```typescript
class Position extends Component {}
Position.schema = { x: { type: Types.Number }, y: { type: Types.Number } };

class Velocity extends Component {}
Velocity.schema = { x: { type: Types.Number }, y: { type: Types.Number } };
```

#### Создание Систем
```typescript
class MovementSystem extends System {
  execute(deltaTime: number) {
    this.queries.moving.results.forEach(entity => {
      const pos = entity.getComponent(Position);
      const vel = entity.getComponent(Velocity);
      pos.x += vel.x * deltaTime;
      pos.y += vel.y * deltaTime;
      entity.getMutableComponent(Position).x = pos.x;
      entity.getMutableComponent(Position).y = pos.y;
    });
  }
}

MovementSystem.queries = {
  moving: { components: [Position, Velocity] }
};
```

#### Инициализация мира
```typescript
const world = new World();
world
  .registerComponent(Position)
  .registerComponent(Velocity)
  .registerSystem(MovementSystem);
```

#### Создание Сущности
```typescript
const player = world.createEntity();
player.addComponent(Position, { x: 100, y: 100 });
player.addComponent(Velocity, { x: 50, y: 0 });
```

#### Цикл игры
```typescript
function gameLoop() {
  const dt = 1 / 60; // 60 FPS
  world.execute(dt);
}
```
