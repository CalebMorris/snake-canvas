class InputController {
  /**
   * element {DOM-Element} - Canvas element
   * keyHandlers {Object {inputEventType : Callback}} - Key handling callbacks
   */
  constructor(element, inputHandlers) {
    this.element = element;
    this.inputHandlers = inputHandlers;

    this.eventListenerRefs = {};

    Object.keys(inputHandlers).forEach((key) => {
      this.eventListenerRefs[key] = (event) => {
        if (event && inputHandlers && inputHandlers[key]) {
          inputHandlers[key](event);
        }
      };
    });

    this.attachListeners();
  }

  attachListeners() {
    Object.keys(this.eventListenerRefs).forEach((key) => {
      window.addEventListener(key, this.eventListenerRefs[key], true);
    });
  }

  detachListeners() {
    Object.keys(this.eventListenerRefs).forEach((key) => {
      window.removeEventListener(key, this.eventListenerRefs[key]);
    });
  }
}

export default InputController;
