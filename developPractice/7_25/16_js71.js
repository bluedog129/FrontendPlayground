let arr1 = [1, 2, 3, 4, 5];
console.log(arr1);

let arr2 = new Array(1, 2, 3, 4, 5);
console.log(arr2);

arr2 = Array.of(5, 6, 7, 8, 9);
console.log(arr2);

let arr3 = Array.from(arr2);
console.log(arr3);

let arr4 = Array.from({
  0: "안",
  1: "녕",
  length: 2,
});
console.log(arr4);
console.clear();

const fruits = ["apple", "banana", "orange"];
console.log(fruits.length);
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

let arr6 = fruits.unshift("mango");
console.log(fruits);
console.log(arr6);

console.clear();

let newarr1 = fruits.slice(0, 3);
console.log(fruits);
console.log(newarr1);

