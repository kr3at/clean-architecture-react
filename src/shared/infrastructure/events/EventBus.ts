type EventHandler<T = any> = (event: T) => void;
type EventUnsubscribe = () => void

export class EventBus {
  private listeners: Map<string, Set<EventHandler>>;

  constructor() {
    this.listeners = new Map()
  }

  emit<T>(eventName: string, event: T): void {
    const handlers = this.listeners.get(eventName)
    if (!handlers) return;

    handlers.forEach(handler => {
      try {
        handler(event);
      } catch (error) {
        console.error(`Error handling event ${eventName}:`, error);
      }
    })
  }

  subscribe<T>(eventName: string, handler: EventHandler<T>): EventUnsubscribe {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set())
    }

    const handlers = this.listeners.get(eventName)!;
    handlers.add(handler)

    return () => {
      handlers.delete(handler)
      if (handlers.size === 0) {
        this.listeners.delete(eventName);
      }
    }

  }
}
