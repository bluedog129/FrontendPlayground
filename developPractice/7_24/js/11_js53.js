class Fruite {
  #name;
  #color;
  static MAX = 4;
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }

  display = () => {
    console.log(`이 과일은 ${this.name}이고, 색깔은 ${this.color}입니다.`);
  };
}

const banana = new Fruite("바나나", "노란색");
banana.display();
console.log(Fruite.MAX);
console.log(banana.MAX);
console.log(banana);
