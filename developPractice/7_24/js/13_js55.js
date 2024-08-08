// class Tiger {
//   constructor(color) {
//     this.color = color;
//   }

//   eat() {
//     console.log("냠냠");
//   }
//   sleep() {
//     console.log("쿨쿨");
//   }
// }

class Cat {
  constructor(color) {
    this.color = color;
  }

  eat() {
    console.log("냠냠");
  }
  sleep() {
    console.log("쿨쿨");
  }
  play() {
    console.log("놀기");
  }
  glumin() {
    console.log("그루밍");
  }
}

class Animal {
  constructor(color) {
    this.color = color;
  }

  eat() {
    console.log("뇸뇸");
  }
  sleep() {
    console.log("쿨쿨");
  }
}

class Tiger extends Animal {
  constructor(color) {
    super(color);
  }
}

const tigerAnimal = new Tiger("orange");
tigerAnimal.eat();
console.log(tigerAnimal.color);

class Dog extends Animal {
  constructor(color) {
    super(color);
    this.owner = "owner sam";
  }

  play() {
    console.log("놀기");
  }
  eat() {
    super.eat();
  }
}

const dogAnimal = new Dog("black");
dogAnimal.play();
dogAnimal.eat();
dogAnimal.sleep();
console.log(dogAnimal.color);
console.log(dogAnimal.owner);
