---
sidebar_position: 4
---

# Filtered

## Описание
Модуль `Filtered` предоставляет функциональность для работы с отфильтрованными сущностями в ECS фреймворке. Основное назначение - хранение и итерация по сущностям, которые прошли фильтрацию по определенным критериям компонентов.

## Назначение
- Хранение списка отфильтрованных сущностей
- Предоставление методов для синхронной и асинхронной итерации
- Поддержка как последовательной, так и параллельной обработки сущностей
- Обеспечение доступа к количеству и списку отфильтрованных сущностей

## Архитектура
Модуль состоит из следующих основных частей:
1. **Класс Filtered** - основной класс для работы с отфильтрованными сущностями
2. **Тип EntityIterationCallback** - тип функции обратного вызова для итерации по сущностям

### Диаграмма зависимостей
```
Filtered
  ├── EntityIterationCallback
  └── IEntity (из модуля Entity)
```

## Использование

### Создание объекта Filtered
```typescript
import { Filtered } from '@data/filtered';

// Создаем объект с массивом сущностей
const filtered = new Filtered([entity1, entity2, entity3]);
```

### Синхронная итерация
```typescript
// Используем forEach для синхронного перебора
filtered.forEach((entity, index) => {
    console.log(`Обработка сущности ${index}: ${entity.name}`);
});
```

### Асинхронная последовательная итерация
```typescript
// Последовательная обработка с ожиданием
await filtered.sequential(async (entity, index) => {
    await someAsyncOperation(entity);
    console.log(`Сущность ${index} обработана`);
});
```

### Асинхронная параллельная итерация
```typescript
// Параллельная обработка всех сущностей
await filtered.parallel(async (entity) => {
    await someAsyncOperation(entity);
});
```

## API

### Класс Filtered

#### Свойства
- `count: number` - количество сущностей в коллекции
- `items: IEntity[]` - массив всех отфильтрованных сущностей

#### Методы
- `forEach(callback: EntityIterationCallback): void` - синхронная итерация
- `sequential(callback: EntityIterationCallback): Promise<void>` - асинхронная последовательная итерация
- `parallel(callback: EntityIterationCallback): Promise<void>` - асинхронная параллельная итерация

### Тип EntityIterationCallback
```typescript
type EntityIterationCallback = (entity: IEntity, index?: number) => void | Promise<void>;
```

## FAQ

### В чем разница между методами forEach, sequential и parallel?
- `forEach` - синхронный метод, блокирует выполнение до завершения всех итераций
- `sequential` - асинхронный метод, обрабатывает сущности по очереди
- `parallel` - асинхронный метод, обрабатывает все сущности одновременно

### Когда использовать parallel, а когда sequential?
- `parallel` - когда операции независимы и могут выполняться параллельно
- `sequential` - когда важен порядок обработки или требуется избежать конкурентного доступа

### Предоставляет ли Filtered функционал фильтрации?
Нет, Filtered только хранит уже отфильтрованные сущности. Фильтрация выполняется в модуле EntityStorage.

### Сохраняется ли порядок сущностей при итерации?
Да, все методы итерации сохраняют порядок сущностей, в котором они были добавлены в коллекцию.

