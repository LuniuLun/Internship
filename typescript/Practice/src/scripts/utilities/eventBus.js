import BaseInstance from './baseInstance'

class EventBus extends BaseInstance {
  constructor() {
    super()
    this.events = {}
  }

  /**
   * Registers an event listener for the specified event.
   * @param {string} event - The name of the event.
   * @param {Function} listener - The callback function to execute when the event is emitted.
   */
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(listener)
  }

  /**
   * Emits an event, invoking all registered listeners with the provided data.
   * @param {string} event - The name of the event.
   * @param {any} data - The data to pass to the event listeners.
   */
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach((listener) => listener(data))
    }
  }
}

export default EventBus
