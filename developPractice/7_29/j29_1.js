function getBanana() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("banana");
    }, 1000);
  });
}

function getApple() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("apple");
    }, 2000);
  });
}

async function fetchFruite() {
  const banana = await getBanana();
  const apple = await getApple();
  console.log(banana);
  console.log(apple);
  return [banana, apple];
}

fetchFruite().then((data) => console.log(data));
