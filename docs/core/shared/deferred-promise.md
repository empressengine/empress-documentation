---
sidebar_position: 2
---

# Deferred Promise

## Описание

Утилита для создания Promise с внешним управлением его состоянием. Позволяет разделить создание Promise и его разрешение/отклонение, что особенно полезно при работе с асинхронными операциями в разных частях приложения.

## Назначение

Модуль решает следующие задачи:
- Управление состоянием Promise извне
- Работа с группами Promise
- Синхронизация асинхронных операций

## Использование

### Базовый пример
```typescript
// Создаём отложенный Promise
const deferred = new DeferredPromise<string>();

// Подписываемся на его разрешение
deferred.promise.then(result => {
    console.log('Получен результат:', result);
});

// Где-то в другом месте разрешаем Promise
deferred.resolve('Готово!');
```

### Работа с группами Promise
```typescript
// Создаём массив Promise
const deferreds = [
    new DeferredPromise<number>(),
    new DeferredPromise<number>(),
    new DeferredPromise<number>()
];

// Разрешаем все Promise одним значением
DeferredPromise.resolveAll(deferreds, 42);

// Или ждём завершения всех
const results = await DeferredPromise.all(deferreds);
```

### Гонка Promise
```typescript
const racers = [
    new DeferredPromise<string>(),
    new DeferredPromise<string>()
];

// Получаем результат первого разрешённого Promise
const winner = await DeferredPromise.race(racers);
```

## API

### Класс DeferredPromise

#### Свойства
- `promise: Promise<T>` - управляемый Promise
- `resolve: (value: T) => void` - функция для разрешения Promise
- `reject: (reason?: any) => void` - функция для отклонения Promise

#### Статические методы
- `resolveAll<K>(deferred: DeferredPromise<any>[], data: K): void` - разрешает все Promise одним значением
- `rejectAll(deferred: DeferredPromise<any>[], reason?: any): void` - отклоняет все Promise с одной причиной
- `all(deferred: DeferredPromise<any>[]): Promise<any[]>` - ждёт разрешения всех Promise
- `allSettled(deferred: DeferredPromise<any>[]): Promise<any[]>` - ждёт завершения всех Promise
- `race(deferred: DeferredPromise<any>[]): Promise<any>` - возвращает первый разрешённый Promise

## Примеры использования

### Реализация таймера
```typescript
function createTimer(ms: number): DeferredPromise<void> {
    const timer = new DeferredPromise<void>();
    setTimeout(() => timer.resolve(), ms);
    return timer;
}

// Использование
const timer = createTimer(1000);
await timer.promise; // Ждём 1 секунду
```

### Загрузка ресурсов
```typescript
class ResourceLoader {
    private loadingStates = new Map<string, DeferredPromise<Resource>>();

    public load(url: string): Promise<Resource> {
        // Проверяем, не загружается ли уже ресурс
        const existing = this.loadingStates.get(url);
        if (existing) {
            return existing.promise;
        }

        // Создаём новый DeferredPromise для этой загрузки
        const deferred = new DeferredPromise<Resource>();
        this.loadingStates.set(url, deferred);

        // Начинаем загрузку
        fetch(url)
            .then(response => response.json())
            .then(data => {
                deferred.resolve(new Resource(data));
                this.loadingStates.delete(url);
            })
            .catch(error => {
                deferred.reject(error);
                this.loadingStates.delete(url);
            });

        return deferred.promise;
    }
}
```

## Частые вопросы

### Когда использовать DeferredPromise?

DeferredPromise особенно полезен в следующих случаях:
- Когда нужно управлять состоянием Promise из разных мест
- Для синхронизации асинхронных операций
- При работе с группами Promise

### В чём отличие от обычного Promise?

Обычный Promise требует передачи функций resolve/reject в конструктор, что делает невозможным управление им извне. DeferredPromise предоставляет эти функции как публичные методы.

### Как обрабатывать ошибки?

Используйте метод `reject` для отклонения Promise:
```typescript
const deferred = new DeferredPromise<string>();
try {
    // Что-то пошло не так
    deferred.reject(new Error('Ошибка!'));
} catch (error) {
    deferred.reject(error);
}
```

