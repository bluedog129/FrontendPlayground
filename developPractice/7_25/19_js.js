// Map
const nums = [1, 2, 3, 4, 5];
let result7 = nums.map((num) => num * 2);
console.log(result7);

// flatmap
const arr = ["it's Su nny in", "", "California"];
let result8 = arr.flatMap((x) => x.split(" "));
console.log(result8);

// filter
let result9 = nums.filter((num) => num % 2 === 0);
console.log(result9);

// reduce
let result10 = nums.reduce((acc, cur) => acc + cur, 0);
console.log(result10);

// sort 
let result11 = nums.sort((a, b) => a - b);
console.log(result11);

// set
let set = new Set();
set.add(1);
set.add(2);
set.add(3);
set.add(1);
console.log(set);
