console.clear();

const bab = { name: "김밥", price: 3000 };
const ramen = { name: "라면", price: 4000 };
const udong = { name: "우동", price: 3500 };

const store1 = [bab, ramen];
console.log("store1--", store1);
const store2 = [ramen, udong];
console.log("store2--", store2);

store2.push(bab);
console.log("store2--", store2);

bab.price = 5000;
console.log("store1--", store1);
console.log("store2--", store2);

const newStore = JSON.parse(JSON.stringify(store1));
console.log("newStore--", newStore);
bab.price = 7000;
console.log("store1--", store1);
console.log("newStore--", newStore);

// 퀴즈1 : 주어진 배열 안의 딸기 아이템을 키위로 교체하는 함수를 만들기
const fruits = ["바나나", "딸기", "사과", "딸기"];
function changeFruit(arr) {
  return arr.map((fruit) => (fruit === "딸기" ? "키위" : fruit));
}
function changeFruit2(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "딸기") {
      arr[i] = "키위";
    }
  }
  return arr;
}

console.log(changeFruit(fruits));
console.log(changeFruit2(fruits));