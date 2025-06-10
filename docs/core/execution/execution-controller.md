---
sidebar_position: 1
---

# Execution Controller


## Описание
Модуль `Execution` обеспечивает выполнение Групп Систем в ECS фреймворке. Он состоит из двух основных компонентов:
1. `ExecutionController` - управляет очередями выполнения
2. `ExecutionQueue` - реализует последовательное выполнение Систем

## Назначение
- Управление порядком выполнения Систем
- Контроль жизненного цикла выполнения
- Поддержка асинхронного выполнения
- Управление состоянием выполнения (пауза/возобновление/остановка)

## Архитектура

### Основные компоненты
1. **ExecutionController**
   - Создание и управление очередями
   - Контроль выполнения
   - Мониторинг состояния

2. **ExecutionQueue**
   - Последовательное выполнение Систем
   - Внедрение зависимостей
   - Фильтрация сущностей
   - Управление состоянием

### Диаграмма зависимостей
```
ExecutionController
  ├── ExecutionQueue
  │   ├── System (исполняемые системы)
  │   ├── EntityStorage (хранилище сущностей)
  │   └── ServiceContainer (внедрение зависимостей)
  └── SystemsContainer (кэш систем)
```

## Использование

### Базовая настройка
```typescript
// Создание контроллера
const controller = new ExecutionController(systemsContainer, entityStorage);

// Создание очереди
const queueId = controller.create(
    [PhysicsGroup, RenderGroup],
    gameState,
    'game-loop'
);

// Запуск очереди
await controller.run(queueId);
```

### Управление выполнением
```typescript
// Создание нескольких очередей
const physicsId = controller.create([PhysicsGroup], state, 'physics');
const renderId = controller.create([RenderGroup], state, 'render');

// Управление отдельными очередями
controller.pause(physicsId);
controller.resume(physicsId);
controller.stop(physicsId);

// Массовые операции
controller.pauseAll();
controller.resumeAll();
controller.stopAll();
```

### Мониторинг состояния
```typescript
// Проверка наличия очереди
if (controller.hasQueue(queueId)) {
    // Получение статуса
    const status = controller.getQueueStatus(queueId);
    console.log('Queue paused:', status?.isPaused);
}

// Общая информация
console.log('Active queues:', controller.activeQueues);
console.log('Total queues:', controller.queueSize);
```

### Асинхронное выполнение
```typescript
class LoadingGroup extends SystemGroup {
    public setup() {
        return [
            {
                instance: this.provide(LoadAssetsSystem),
                // Асинхронная система
            }
        ];
    }
}

// Запуск с поддержкой асинхронности
const loadingId = controller.create([LoadingGroup], {}, 'loading');
await controller.run(loadingId, true);

// Запрет асинхронности
const gameId = controller.create([GameGroup], {}, 'game');
await controller.run(gameId, false); // Выбросит ошибку при асинхронных системах
```

## API

### ExecutionController

#### Конструктор
```typescript
constructor(
    systemsContainer: ISystemsContainer,
    entityStorage: EntityStorage
)
```

#### Методы
- `create<T>(groups: GroupType<T>[], data: T, name?: string): string`
- `run(queueId: string, asyncAllowed?: boolean): Promise<void>`
- `stop(executionId: string): void`
- `pause(executionId: string): void`
- `resume(executionId: string): void`
- `stopAll(): void`
- `pauseAll(): void`
- `resumeAll(): void`
- `hasQueue(executionId: string): boolean`
- `getQueueStatus(executionId: string): { isPaused: boolean } | null`

#### Свойства
- `activeQueues: string[]`
- `queueSize: number`

### ExecutionQueue

#### Конструктор
```typescript
constructor(
    id: string,
    systemsContainer: ISystemsContainer,
    entityStorage: EntityStorage,
    name: string
)
```

#### Методы
- `setup<T>(groups: GroupType<T>[], data: T): void`
- `execute(asyncAllowed?: boolean): Promise<void>`
- `stop(): void`
- `pause(): void`
- `resume(): void`

#### Свойства
- `id: string`
- `name: string`

## FAQ

### Как работает порядок выполнения?
1. Системы выполняются в порядке их определения в Группе
2. Группы выполняются в порядке их передачи в `create`
3. Каждая Система получает доступ к EntityStorage и зависимостям

### Что происходит при остановке очереди?
1. Текущая Система принудительно останавливается
2. Очередь удаляется из контроллера
3. Все оставшиеся Системы не выполняются

### Как работает пауза?
1. Очередь помечается как приостановленная
2. Текущая Система завершает выполнение
3. Следующая Система не начнет выполнение до resume

### Поддерживается ли параллельное выполнение?
1. Каждая очередь выполняется последовательно
2. Разные очереди могут выполняться параллельно
3. Асинхронные операции поддерживаются внутри Систем

### Как обрабатываются ошибки?
1. Ошибки в Системах прерывают выполнение очереди
2. Очередь удаляется из контроллера
3. Другие очереди продолжают работу

### Как использовать асинхронные Системы?
1. Система может вернуть Promise
2. Очередь дождется выполнения Promise
3. Параметр asyncAllowed контролирует разрешение асинхронности

