class EventBus {
  private static instance: EventBus
  private events: Record<string, Function[]> = {}

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The static getter that controls access to the singleton instance.
   *
   * This implementation allows you to extend the Singleton class while
   * keeping just one instance of each subclass around.
   */
  public static getInstance(): EventBus {
    if (!this.instance) {
      this.instance = new this()
    }

    return this.instance
  }

  public on(event: string, listener: Function): void {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(listener)
  }

  public emit(event: string, data: any): void {
    if (this.events[event]) {
      this.events[event].forEach((listener) => listener(data))
    }
  }
}

export default EventBus
