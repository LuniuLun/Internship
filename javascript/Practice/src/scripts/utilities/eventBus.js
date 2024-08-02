/* eslint-disable no-constructor-return */

class EventBus {
  constructor() {
    // Singleton pattern to ensure only one instance of EventBus exists
    if (!EventBus.instance) {
      this.events = {} // Object to hold event listeners
      EventBus.instance = this
    }
    return EventBus.instance
  }

  /**
   * Registers an event listener for the specified event.
   * @param {string} event - The name of the event.
   * @param {Function} listener - The callback function to execute when the event is emitted.
   */
  on(event, listener) {
    // If the event does not exist, create an empty array for it
    if (!this.events[event]) {
      this.events[event] = []
    }
    // Add the listener to the event's list of listeners
    this.events[event].push(listener)
  }

  /**
   * Emits an event, invoking all registered listeners with the provided data.
   * @param {string} event - The name of the event.
   * @param {any} data - The data to pass to the event listeners.
   */
  emit(event, data) {
    // If the event has listeners, call each one with the provided data
    if (this.events[event]) {
      this.events[event].forEach((listener) => listener(data))
    }
  }
}

export default new EventBus()
