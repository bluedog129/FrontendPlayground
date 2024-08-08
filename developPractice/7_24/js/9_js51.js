// function Fruite(name, color) {
//   this.name = name;
//   this.color = color;
//   this.show = function () {
//     console.log(`이 과일은 ${this.name}이고, 색깔은 ${this.color}입니다.`);
//   };
// }

// const orange = new Fruite("오렌지", "주황색");
// const banana = new Fruite("바나나", "노란색");

class Fruite {
  static Max = 4;
  constructor(name, color) {
    this.name;
    this.color;
    this.display = () => {
      console.log(`이 과일은 ${this.name}이고, 색깔은 ${this.color}입니다.`);
    };
  }
  display_arrow = () => {
    console.log(`이 과일은 ${this.name}이고, 색깔은 ${this.color}입니다.`);
  };
}
console.log("lala");
console.log(Fruite.Max);
console.log(Fruite.Max);

const orange = new Fruite("오렌지", "주황색");
const banana = new Fruite("바나나", "노란색");
orange.display();
banana.display();
orange.display_arrow();
banana.display_arrow();
