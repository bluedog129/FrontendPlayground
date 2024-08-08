// function a() {
//   for (let i = 0; i < 10000000; i++) {
//     console.log(i);
//   }
//   return 1;
// }

// function b() {
//   return a() + 1;
// }

// function c() {
//   return b() + 1;
// }

// const result = c();
// console.log(result);

// console.clear();

// function execute() {
//   console.log("execute");
//   setTimeout(() => {
//     console.log("execute setTimeout");
//   }, 3000);
//   console.log("execute end");
// }

// execute();

// function runInDelay(callback, seconds) {
//   if (!callback || typeof callback !== "function") {
//     throw new Error("콜백 함수를 전달해주세요.");
//   }
//   if (!seconds || seconds < 0) {
//     throw new Error("지연 시간을 전달해주세요.");
//   }
// }

// runInDelay(() => {
//   console.log("타이머");
// }, 1);

// try {
//   console.log("try");
// } catch (e) {
//   console.log("catch");
// } finally {
//   console.log("finally");
// }

function runInDelay(seconds) {
  return new Promise((resolve, reject) => {
    if (!seconds || seconds < 0) {
      reject(new Error("지연 시간을 전달해주세요."));
    }
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}

runInDelay(1)
  .then(() => {
    console.log("타이머 끝났다");
  })
  .catch(console.error)
  .finally(() => {
    console.log("진짜 끝났다");
  });
