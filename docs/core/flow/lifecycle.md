---
sidebar_position: 1
---

# Lifecycle

Модуль управления жизненным циклом игры. Предоставляет механизмы для контроля игрового цикла, включая старт, обновление, паузу и управление скоростью выполнения.

## Назначение

Модуль решает следующие задачи:
- Управление игровым циклом через хуки жизненного цикла (start и update)
- Выполнение Групп Систем при старте и обновлении через сигналы
- Контроль состояния игры (пауза/возобновление)
- Управление скоростью выполнения
- Регистрация пользовательских колбэков на события жизненного цикла

## Архитектура

Модуль состоит из следующих компонентов:

1. **LifeCycle** - основной класс управления жизненным циклом:
   - Инициализация и запуск игрового цикла
   - Управление паузой и скоростью
   - Регистрация колбэков на события
   - Отправка сигналов жизненного цикла

2. **Сигналы**:
   - `OnStartSignal` - отправляется при старте игры
   - `OnUpdateSignal` - отправляется каждый кадр с данными обновления

## Использование

### Базовая настройка

```typescript
// Создание и инициализация
const lifecycle = new LifeCycle();

// Подписка на события
lifecycle.addStartCallback(() => {
    console.log('Game started!');
});

lifecycle.addUpdateCallback((deltaTime) => {
    console.log(`Frame update: ${deltaTime}s`);
});

// Запуск игры
lifecycle.start();
```

### Связывание с Группами Систем

```typescript
// Создание контроллера сигналов
const signalController = new SignalsController(executionController);

// Связывание групп с сигналами жизненного цикла
signalController.setup([
    {
        signal: OnStartSignal,
        groups: [InitializationGroup]
    },
    {
        signal: OnUpdateSignal,
        groups: [PhysicsGroup, AnimationGroup]
    }
]);
```

### Управление игровым циклом

```typescript
// Пауза/возобновление
lifecycle.pause(true);  // Поставить на паузу
lifecycle.pause(false); // Возобновить

// Управление скоростью
lifecycle.setSpeedMultiplier(2);    // Ускорить в 2 раза
lifecycle.setSpeedMultiplier(0.5);  // Замедлить в 2 раза
lifecycle.setSpeedMultiplier(1);    // Нормальная скорость
```

## API

### LifeCycle

#### Методы

- `start(): void` - запускает игру, инициализирует игровой цикл
- `pause(paused: boolean): void` - управляет паузой
- `setSpeedMultiplier(multiplier: number): void` - устанавливает множитель скорости
- `addStartCallback(callback: () => void): void` - добавляет колбэк на старт
- `addUpdateCallback(callback: (deltaTime: number) => void): void` - добавляет колбэк обновления
- `removeUpdateCallback(callback: (deltaTime: number) => void): void` - удаляет колбэк обновления

### Сигналы

- `OnStartSignal: Signal<void>` - сигнал старта игры
- `OnUpdateSignal: Signal<IUpdateLoopData>` - сигнал обновления кадра

#### Интерфейсы

```typescript
interface IUpdateLoopData {
    deltaTime: number;        // Время между кадрами в секундах
    speedMultiplier: number;  // Текущий множитель скорости
    multipliedDelta: number;  // deltaTime с учетом множителя
}
```

## FAQ

### Когда использовать колбэки, а когда сигналы?

- **Колбэки** подходят для прямой интеграции с другими системами (таймеры, анимации)
- **Сигналы** используются для выполнения Групп Систем через SignalsController

### Как работает множитель скорости?

- `1.0` - нормальная скорость
- `> 1.0` - ускорение (2.0 = в два раза быстрее)
- `< 1.0` - замедление (0.5 = в два раза медленнее)

### Что происходит при паузе?

1. Останавливается вызов колбэков обновления
2. Прекращается отправка OnUpdateSignal
3. Сохраняется последнее время кадра для корректного расчета deltaTime
