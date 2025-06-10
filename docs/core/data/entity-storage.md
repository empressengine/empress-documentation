---
sidebar_position: 3
---

# Entity Storage

## Описание
Модуль `EntityStorage` представляет собой центральное хранилище сущностей в ECS фреймворке. Он отвечает за управление жизненным циклом сущностей, их хранение и фильтрацию по компонентам.

## Назначение
- Централизованное хранение всех сущностей в приложении
- Обеспечение уникальности UUID сущностей
- Управление активными и неактивными сущностями
- Фильтрация сущностей по наличию или отсутствию компонентов
- Предоставление доступа к сущностям через UUID

## Архитектура
Модуль состоит из следующих основных частей:
1. **Класс EntityStorage** - основная реализация хранилища сущностей
2. **Интерфейс IEntityStorage** - контракт для хранилища сущностей
3. **Утилита compileFilter** - функция для создания фильтров по компонентам

### Диаграмма зависимостей
```
EntityStorage
  ├── IEntityStorage (интерфейс)
  ├── ComponentFilter (из модуля Entity)
  ├── Filtered (из модуля Filtered)
  └── ComponentsRaritySorter (из модуля Component)
```

## Использование

### Создание хранилища
```typescript
import { EntityStorage } from '@data/entity-storage';

// Создаем экземпляр хранилища
const storage = new EntityStorage();
```

### Управление сущностями
```typescript
// Добавление сущности
storage.addEntity(entity);

// Получение сущности по UUID
const entity = storage.getEntity(uuid);

// Удаление сущности
const removed = storage.removeEntity(uuid);
```

### Получение списков сущностей
```typescript
// Все сущности
const all = storage.getAllEntities();

// Только активные
const active = storage.getActiveEntities();

// Только неактивные
const inactive = storage.getInactiveEntities();
```

### Фильтрация по компонентам
```typescript
// Фильтруем только активные сущности
const filtered = storage.filter({
    includes: [PositionComponent, HealthComponent], // обязательные компоненты
    excludes: [DisabledComponent] // исключаемые компоненты
});

// Фильтруем все сущности, включая неактивные
const allFiltered = storage.filter({
    includes: [PositionComponent]
}, true);
```

## API

### Интерфейс IEntityStorage

#### Методы
- `addEntity(entity: IEntity): void` - добавление сущности
- `removeEntity(uuid: string): IEntity | undefined` - удаление сущности
- `getEntity(uuid: string): IEntity | undefined` - получение сущности
- `getAllEntities(): IEntity[]` - получение всех сущностей
- `getActiveEntities(): IEntity[]` - получение активных сущностей
- `getInactiveEntities(): IEntity[]` - получение неактивных сущностей
- `filter(filter: ComponentFilter, withDisabled?: boolean): Filtered` - фильтрация сущностей

### Утилита compileFilter

#### Параметры
- `includes: ComponentType<any>[]` - массив обязательных компонентов
- `excludes?: ComponentType<any>[]` - массив исключаемых компонентов

#### Возвращаемое значение
- `(entity: IEntity) => boolean` - функция для проверки сущности

## FAQ

### Как обеспечивается уникальность UUID сущностей?
При добавлении сущности в хранилище проверяется наличие сущности с таким же UUID. Если такая сущность уже существует, выбрасывается ошибка.

### Что происходит при удалении несуществующей сущности?
Метод `removeEntity` вернет `undefined`, не выбрасывая ошибку.

### В чем разница между getAllEntities и getActiveEntities?
- `getAllEntities` возвращает все сущности, независимо от их состояния
- `getActiveEntities` возвращает только сущности с `active === true`

### Как работает фильтрация с withDisabled?
- При `withDisabled === false` (по умолчанию) фильтруются только активные сущности
- При `withDisabled === true` фильтруются все сущности, включая неактивные

### Можно ли изменить сущность после её добавления в хранилище?
Да, сущность можно модифицировать через полученную ссылку, так как хранилище хранит ссылки на сущности.

