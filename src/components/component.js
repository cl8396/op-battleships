class Component {
  constructor(container) {
    // Check container is a valid DOM element
    if (!(container instanceof Element)) {
      throw new Error('Invalid container element');
    }
    this.container = container;
    this.element = this.#createElement();
  }

  #createElement() {
    let element = document.createElement('div');
    return element;
  }

  render() {
    this.container.appendChild(this.element);
  }

  show() {
    if (!this.container.contains(this.element)) {
      this.render();
    }
  }

  hide() {
    if (this.container.contains(this.element)) {
      this.container.removeChild(this.element);
    }
  }
}

export default Component;
