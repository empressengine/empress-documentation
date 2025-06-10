---
sidebar_position: 2
---

# Signals Controller


## Описание
Модуль `SignalsController` обеспечивает связь между Signal (сигналами) и Группами Систем в ECS фреймворке. При срабатывании Signal контроллер автоматически запускает связанные с ним Группы Систем через ExecutionController.

## Назначение
- Управление связями между Signal и Группами Систем
- Автоматический запуск Групп при срабатывании Signal
- Управление жизненным циклом подписок
- Отслеживание и остановка выполнения Групп

## Архитектура

### Основные компоненты
1. **SignalsController** - контроллер связей Signal-Группа
2. **ISignalConfig** - конфигурация связи Signal с Группами
3. **ExecutionController** - контроллер выполнения Групп

### Диаграмма зависимостей
```
SignalsController
  ├── Signal (источник событий)
  ├── SystemGroup (исполняемые группы)
  └── ExecutionController (управление выполнением)
```

## Использование

### Базовая настройка
```typescript
// Создание контроллера
const signalsController = new SignalsController(executionController);

// Настройка связей
signalsController.setup([
    {
        signal: moveSignal,
        groups: [MovementGroup, CollisionGroup]
    },
    {
        signal: attackSignal,
        groups: [CombatGroup]
    }
]);

// Активация подписок
signalsController.subscribe();
```

### Привязка нескольких Групп к Signal
```typescript
// Одни Signal может запускать несколько Групп
signalsController.setup([
    {
        signal: updateSignal,
        groups: [
            PhysicsGroup,
            AnimationGroup,
            RenderGroup
        ]
    }
]);
```

### Остановка и очистка
```typescript
// Отключение всех подписок и остановка Групп
signalsController.unsubscribe();
```

## API

### SignalsController

#### Конструктор
```typescript
constructor(executionController: ExecutionController)
```

#### Методы
- `setup(configs: ISignalConfig[])` - настройка связей Signal-Группа
- `subscribe()` - активация подписок на Signal
- `unsubscribe()` - отключение подписок и остановка Групп

### ISignalConfig
```typescript
interface ISignalConfig {
    signal: ISignal<any>;        // Signal для подписки
    groups: GroupType<any>[];    // Массив Групп для выполнения
}
```

## FAQ

### Когда срабатывают Группы?
Группы запускаются автоматически каждый раз при срабатывании связанного с ними Signal.

### Можно ли привязать одну Группу к разным Signal?
Да, одна и та же Группа может быть привязана к нескольким Signal. Она будет запускаться при срабатывании любого из них.

### В каком порядке выполняются Группы?
Группы, привязанные к одному Signal, запускаются в том порядке, в котором они указаны в конфигурации.

### Что происходит при unsubscribe?
1. Отключаются все подписки на Signal
2. Останавливается выполнение всех активных Групп
3. Очищаются внутренние списки подписок и выполнений

### Как передаются данные от Signal к Группам?
Данные, отправленные через Signal, автоматически передаются в метод `setup` соответствующих Групп при их выполнении.
