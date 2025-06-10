---
sidebar_position: 2
---

# Entity

## Описание
Модуль Entity является вторым ключевым элементом ECS архитектуры EmpressCore. Он предоставляет механизм для создания и управления игровыми объектами (сущностями), которые могут содержать различные компоненты.

## Назначение
### Решаемые проблемы
- Организация игровых объектов без жесткой иерархии наследования
- Гибкое управление составом и поведением объектов
- Эффективный поиск и фильтрация объектов по их свойствам

### Ключевые кейсы
- Создание игровых объектов с уникальными наборами компонентов
- Управление состоянием объектов через включение/отключение компонентов
- Фильтрация объектов для системной обработки

### Преимущества
- Гибкая композиция объектов через компоненты
- Строгая типизация и контроль компонентов
- Эффективное управление состоянием через включение/отключение
- Уникальная идентификация каждого объекта

### Ограничения
- Один тип компонента может быть добавлен к сущности только один раз
- Сущности не могут содержать логику, только компоненты

## Архитектура
### Основные классы и типы
- `Entity` - основной класс для создания игровых объектов
- `IEntity` - интерфейс, определяющий поведение сущностей
- `ComponentCollection` - класс для управления набором компонентов
- `ComponentFilter` - интерфейс для фильтрации сущностей

### Взаимодействие с другими модулями
- `Component` - используется для хранения данных сущностей
- `System` - обрабатывает сущности на основе их компонентов
- `EntityStorage` - хранит и управляет всеми сущностями в игре

## Использование
### Начало работы
#### Предварительные требования
- TypeScript версии 4.0 или выше
- Понимание принципов ECS
- Модуль Component для создания компонентов

### Основные сценарии
#### Создание и настройка сущности
1. Создание новой сущности с уникальным ID
2. Добавление необходимых компонентов
3. Настройка состояния компонентов

#### Управление компонентами
1. Получение компонентов по типу
2. Включение/отключение компонентов
3. Удаление компонентов

## Примеры
### Простые примеры
#### Создание игрового персонажа
```typescript
// Создаем сущность игрока
const player = new Entity('player-1');

// Добавляем необходимые компоненты
player.addComponent(new Position(0, 0));
player.addComponent(new Health(100));
player.addComponent(new Inventory());

// Получаем и используем компоненты
const position = player.getComponent(Position);
position.x += 10;

const health = player.getComponent(Health);
health.current -= 20;
```

#### Управление состоянием
```typescript
// Создаем сущность с несколькими компонентами
const entity = new Entity('enemy-1');
entity.addComponent(new Position());
entity.addComponent(new Movement());
entity.addComponent(new AI());

// Отключаем AI на время паузы
entity.disableComponent(AI);

// Проверяем наличие компонентов
if (entity.hasComponents([Position, Movement])) {
    // Обрабатываем движение
}

// Включаем AI после паузы
entity.enableComponent(AI);
```

### Продвинутые примеры
#### Фильтрация сущностей
```typescript
// Создаем фильтр для поиска движущихся объектов
const filter: ComponentFilter = {
    includes: [Position, Movement],  // Должны быть оба компонента
    excludes: [Frozen]  // Не должно быть компонента заморозки
};

// Проверяем соответствие сущности фильтру
if (entity.isSatisfiedFilter(filter)) {
    // Обрабатываем движущийся объект
}
```

#### Массовое управление компонентами
```typescript
// Создаем сущность с множеством компонентов
const boss = new Entity('boss-1');
boss.addComponent(new Position());
boss.addComponent(new Health());
boss.addComponent(new Attack());
boss.addComponent(new Defense());
boss.addComponent(new SpecialAbility());

// Отключаем все компоненты во время катсцены
boss.disableAllComponents();

// Включаем все компоненты после катсцены
boss.enableAllComponents();
```

## API
### Классы и типы
#### Entity
```typescript
class Entity implements IEntity {
    readonly uuid: string;           // Уникальный идентификатор
    name: string;                   // Имя сущности
    active: boolean;                // Статус активности
    readonly components: Component[];       // Список активных компонентов
    readonly disabledComponents: Component[]; // Список отключенных компонентов

    constructor(uuid: string, name?: string);
    
    addComponent(component: Component, enabled?: boolean): void;
    getComponent<T extends Component>(ctor: ComponentType<T>): T;
    hasComponents(types: ComponentType<any>[]): boolean;
    removeComponent(ctor: ComponentType<any>): Component;
    enableComponent<T extends Component>(ctor: ComponentType<T>): void;
    disableComponent<T extends Component>(ctor: ComponentType<T>): void;
    disableAllComponents(): void;
    enableAllComponents(): void;
    isSatisfiedFilter(filter: ComponentFilter): boolean;
}
```

#### ComponentFilter
```typescript
interface ComponentFilter {
    includes: ComponentType<any>[];  // Компоненты, которые должны присутствовать
    excludes?: ComponentType<any>[]; // Компоненты, которых не должно быть
}
```

#### ComponentCollection
```typescript
class ComponentCollection {
    readonly items: Component[];     // Список компонентов

    set(component: Component): void;
    get<T extends Component>(type: ComponentType<T>): T | undefined;
    has<T extends Component>(type: ComponentType<T>): boolean;
    delete(type: ComponentType<any>): boolean;
    clear(): void;
}
```

## Частые вопросы
### Как правильно организовать сущности?
Создавайте сущности с минимально необходимым набором компонентов. Добавляйте компоненты по мере необходимости, а не все сразу.

### Когда использовать включение/отключение компонентов?
Используйте эту функциональность для временного изменения поведения объекта без удаления компонентов.

### Что лучше: удалить компонент или отключить его?
Удаляйте компонент, если он больше не понадобится. Отключайте, если планируете включить его позже.

