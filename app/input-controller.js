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

    this.suppressRef = this.suppressKeyDownMovement.bind(this);

    this.attachListeners();
  }

  suppressKeyDownMovement(event) {
    switch (event.keyCode) {
      case 37: case 39: case 38: case 40: // Arrow keys
      case 32: event.preventDefault(); break; // Space
      default: break; // do not block other keys
    }
  }

  attachListeners() {
    Object.keys(this.eventListenerRefs).forEach((key) => {
      window.addEventListener(key, this.eventListenerRefs[key], true);
    });
    window.addEventListener('keydown', this.suppressRef, false);
  }

  detachListeners() {
    Object.keys(this.eventListenerRefs).forEach((key) => {
      window.removeEventListener(key, this.eventListenerRefs[key]);
    });
    window.removeEventListener('keydown', this.suppressRef);
  }
}

export default InputController;
