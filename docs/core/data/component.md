---
sidebar_position: 1
---

# Component

## Описание
Модуль Component является одним из ключевых элементов ECS архитектуры EmpressCore. Он предоставляет механизм для создания и управления компонентами - объектами, которые хранят данные игровых сущностей.

## Назначение
### Решаемые проблемы
- Разделение данных и логики в игровых объектах
- Гибкое управление состоянием сущностей
- Эффективный поиск и фильтрация сущностей по их компонентам

### Ключевые кейсы
- Хранение позиции, скорости, здоровья и других характеристик игровых объектов
- Включение/отключение определенных аспектов сущности
- Фильтрация сущностей для обработки в системах

### Преимущества
- Чистое разделение данных и логики
- Гибкость в композиции сущностей
- Строгая типизация через TypeScript
- Эффективная система фильтрации

### Ограничения
- Компоненты не могут содержать логику
- Один тип компонента может быть добавлен к сущности только один раз

## Архитектура
### Основные классы и типы
- `Component` - базовый тип для всех компонентов
- `ComponentType` - тип конструктора компонента
- `ComponentsRaritySorter` - утилита для отслеживания частоты использования компонентов

### Взаимодействие с другими модулями
- `Entity` - использует компоненты для хранения состояния
- `System` - обрабатывает сущности на основе их компонентов

## Использование
### Начало работы
#### Предварительные требования
- TypeScript версии 4.0 или выше
- Понимание принципов ECS

### Основные сценарии
#### Создание компонента
1. Определите класс компонента
2. Добавьте необходимые свойства
3. Реализуйте конструктор

#### Управление компонентами
1. Добавление компонента к сущности
2. Получение компонента из сущности
3. Включение/отключение компонентов

## Примеры
### Простые примеры
#### Создание компонента позиции
```typescript
// Определяем компонент позиции
export class Position {
    constructor(
        public x: number = 0,
        public y: number = 0
    ) {}
}

// Создаем сущность и добавляем компонент
const entity = new Entity();
entity.addComponent(new Position(10, 20));

// Получаем и используем компонент
const position = entity.getComponent(Position);
console.log(position.x, position.y); // 10, 20
```

#### Включение/отключение компонентов
```typescript
// Создаем сущность с несколькими компонентами
const entity = new Entity();
entity.addComponent(new Position());
entity.addComponent(new Velocity());

// Отключаем компонент скорости
entity.disableComponent(Velocity);

// Включаем его обратно
entity.enableComponent(Velocity);
```

### Продвинутые примеры
#### Использование редкости компонентов
```typescript
// Создаем несколько сущностей с разными компонентами
const entities = [
    new Entity().addComponent(new Position()),
    new Entity().addComponent(new Position()).addComponent(new Health()),
    new Entity().addComponent(new Position())
];

// Проверяем частоту использования
console.log(ComponentsRaritySorter.rarity(Position)); // 3
console.log(ComponentsRaritySorter.rarity(Health));  // 1

// Сортируем компоненты по редкости
const sorted = ComponentsRaritySorter.sortByRarity([Position, Health]);
// sorted: [Health, Position] (от редких к частым)
```

## API
### Классы и типы
#### Component
```typescript
type Component = object & { length?: never; constructor: any };
```
Базовый тип для всех компонентов. Не требует реализации интерфейсов.

#### ComponentType
```typescript
type ComponentType<T extends Component> = new (...args: any[]) => T;
```
Тип конструктора компонента.

#### ComponentsRaritySorter
Класс для отслеживания частоты использования компонентов.

```typescript
class ComponentsRaritySorter {
    static increment(component: ComponentType<any>): void;
    static decrement(component: ComponentType<any>): void;
    static rarity(component: ComponentType<any>): number;
    static sortByRarity(components: ComponentType<any>[]): ComponentType<any>[];
}
```

## Частые вопросы
### Можно ли добавить один и тот же компонент дважды?
Нет, каждый тип компонента может быть добавлен к сущности только один раз.

### Можно ли добавить логику в компонент?
Нет, компоненты должны содержать только данные. Вся логика должна быть реализована в системах.

### Как правильно организовать компоненты?
Создавайте маленькие, узкоспециализированные компоненты, каждый из которых отвечает за один аспект состояния сущности.
