let apple = {
  0: "test1",
  name: "사과",
  ["helloo bye"]: "안녕",
  "age-num": "2살",
};

// key - 숫자, 문자, 문자열 'test-test', ['문자열'] 가능
// value - 모든 타입 가능

// 객체를 만드는 방법
// 1. 객체 리터럴로 만들기
// 2. 클래스 객체로 만들기 new Obj()
// 3. Object.create()로 만들기
let sample = {};

console.log(apple.name);
console.log(apple["helloo bye"]);

// 객체에 속성 추가
apple.emoji = "🍎";
console.log(apple.emoji);

delete apple.emoji;
console.log(apple.emoji);

const obj1 = {
  name: "개냥이",
  age: 2,
};

console.log(obj1.name);

function getValue(object, key) {
  return object[key];
}

console.log(getValue(obj1, "name"));

const x = 10;
const y = 20;
const coord = { x: x, y: y };
const coord2 = { x, y };
console.log(coord);
console.log(coord2);

function makeObj(name, age) {
  return {
    name,
    age,
  };
}

console.clear();
const person = makeObj("sam", 5);
console.log(person);

const apple2 = {
  name: "엄청난 사과",
  display: function () {
    console.log(`이 사과는 ${this.name}입니다.`);
  },
  display_arrow: () => {
    console.log(`이 사과는 ${this.name}입니다.`);
  },
};
this.name = "전역";
console.log(this);
apple2.display();
apple2.display_arrow();
console.clear();

function Fruite(name, color) {
  this.name = name;
  this.color = color;
  this.show = function () {
    console.log(`이 과일은 ${this.name}이고, 색깔은 ${this.color}입니다.`);
  };
}

const orange = new Fruite("오렌지", "주황색");
const banana = new Fruite("바나나", "노란색");
orange.show();
banana.show();
