---
sidebar_position: 1
---

# System

## Описание
Модуль `System` предоставляет базовый функционал для реализации игровой логики в ECS фреймворке. Системы отвечают за обработку сущностей, отфильтрованных по определенным компонентам. Системы никак не связаны между собой и могут быть запущены независимо друг от друга.

## Назначение
- Реализация игровой логики через обработку отфильтрованных сущностей
- Обеспечение единого интерфейса для всех систем
- Управление жизненным циклом игровых объектов
- Предоставление доступа к зависимостям через DI

## Архитектура
Модуль состоит из следующих основных частей:
1. **Абстрактный класс System** - базовый класс для всех систем
2. **Интерфейс ISystem** - контракт для систем

### Диаграмма зависимостей
```
System
  ├── ISystem (интерфейс)
  ├── ComponentFilter (из модуля Entity)
  └── Filtered (из модуля Filtered)
```

## Использование

### Создание простой системы
```typescript
import { System } from '@logic/system';

export class MovementSystem extends System {
    public async execute() {
        // Фильтруем сущности по компонентам
        const entities = this.filter({
            includes: [PositionComponent, VelocityComponent]
        });

        // Обрабатываем каждую сущность
        entities.forEach(entity => {
            const position = entity.getComponent(PositionComponent);
            const velocity = entity.getComponent(VelocityComponent);

            position.x += velocity.x;
            position.y += velocity.y;
        });
    }
}
```

### Система с внешними данными
```typescript
export class DamageSystem extends System<number> {
    public async execute(damage: number) {
        const entities = this.filter({
            includes: [HealthComponent]
        });

        entities.forEach(entity => {
            const health = entity.getComponent(HealthComponent);
            health.value -= damage;
        });
    }
}
```

### Использование зависимостей
```typescript
export class AudioSystem extends System {

    // Получаем сервис через DI
    @Inject(AbstractAudioService)
    private _audioService!: AbstractAudioService;

    public execute() {
        const entities = this.filter({
            includes: [SoundComponent]
        });

        entities.forEach(entity => {
            const sound = entity.getComponent(SoundComponent);
            this._audioService.play(sound.id);
        });
    }
}
```

## API

### Класс System

#### Свойства
- `groupId: string` - идентификатор группы систем
- `executionId: string` - идентификатор текущего выполнения
- `withDisabled: boolean` - включать ли неактивные сущности

#### Методы
- `execute(data: TData): void | Promise<void>` - точка входа системы
- `filter(filter: ComponentFilter): Filtered` - фильтрация с учетом фильтра группы
- `cleanFilter(filter: ComponentFilter): Filtered` - фильтрация без учета фильтра группы
- `forceStop(): void` - обработка принудительной остановки

## FAQ

### Как создаются экземпляры систем?
Системы автоматически создаются и кэшируются в SystemsContainer. В приложении существует только один экземпляр каждой системы.

### Как системы группируются?
Системы объединяются в SystemGroup, которая определяет порядок их выполнения и может предоставлять дополнительные данные через метод execute.

### Можно ли использовать асинхронные операции?
Да, метод execute может быть асинхронным. SystemGroup правильно обрабатывает как синхронные, так и асинхронные системы.

### Как работает фильтрация сущностей?
- Метод `filter` объединяет фильтр системы с фильтром группы
- Метод `cleanFilter` использует только указанный фильтр
- Параметр `withDisabled` определяет, включать ли неактивные сущности

### Как внедряются зависимости?
Зависимости внедряются через декоратор свойства @Inject, который использует ServiceContainer для получения сервисов по их токенам.

