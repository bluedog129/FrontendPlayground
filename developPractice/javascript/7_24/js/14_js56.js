class Counter {
  #value;

  constructor(count) {
    if (count < 0 || isNaN(count)) {
      this.#value = 0;
    }
    this.#value = count;
  }
  
  increase() {
    this.#value++;
  }
  get value() {
    return this.#value;
  }
}

const counter = new Counter(-1);

counter.increase();
console.log(counter.value);
counter.increase();
console.log(counter.value);
counter.increase();
console.log(counter.value);
