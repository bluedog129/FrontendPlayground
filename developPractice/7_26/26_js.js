function getBanana() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("바나나");
    }, 1000);
  });
}

function getApple() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("사과");
    }, 1000);
  });
}

function getOrange() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("오렌지");
    }, 1000);
  });
}

getBanana()
  .then((banana) => getApple().then((apple) => [banana, apple]))
  .then(console.log);

Promise.all([getBanana(), getApple()]).then((fruit) => console.log(fruit));
