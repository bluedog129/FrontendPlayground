console.clear();
// ...rest

function add(a, b, c, ...rest) {
  return a;
}

add(1, 2, 3, 4, 5, 6);

const f1 = ["사과", "바나나"];
const f2 = ["딸기", "포도"];

let arr = f1.concat(f2);
console.log(arr);

arr = [...f2, ...f1, "포도"];
console.log(arr);

const somy = {
  name: "소미",
  age: 20,
  home: { address: "서울", phone: "010-1234-5678" },
};

const update = {
  ...somy,
  job: "singer",
};

console.log(update);
console.clear();

// 구조분해 할당
const f3 = ["사과", "키위"];
const f4 = ["딸기", "바나나"];

const [first, second] = f3;

const point = [100, 200];
const [x, y = 0] = point;
console.log(x, y);

function createObj() {
  return ["사과", "바나나"];
}
const [title, display] = createObj();
console.log(title, display);

const somyInfo = {
  name: "somypage",
  age: 20,
  home: { address: "서울", phone: "010-1234-5678" },
};

const { name, age, home: home2 } = somyInfo;
function print({ name, age, home }) {
  console.log(name, age, home);
}

print(somyInfo);
console.clear();

const prop = {
  name: "somypage",
  age: 20,
  styles: { color: "서울", phone: "010-1234-5678" },
};

function change({ styles: { color } }) {
  console.log(color);
}

change(prop);
