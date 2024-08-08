const $itemInput = document.getElementById("itemInput");
const $addBtn = document.getElementById("addBtn");
const $items = document.getElementById("items");

let id = 0;
let shopList = JSON.parse(localStorage.getItem("shopList")) || [];

// 현재 shopList에서 가장 큰 id 값을 찾아 id를 설정합니다.
if (shopList.length > 0) {
  id = Math.max(...shopList.map((item) => item.id)) + 1;
}

$itemInput.focus();

const saveToLocalStarage = () => {
  localStorage.setItem("shopList", JSON.stringify(shopList));
};

const createItem = (text, itemId) => {
  const $li = document.createElement("li");
  $li.setAttribute("class", "item");
  $li.setAttribute("data-num", itemId);
  $li.innerHTML = `
        <span>${text}</span>
        <i class="deleteBtn fa-solid fa-trash-can" data-id="${itemId}"></i>
  `;
  return $li;
};

const onAdd = () => {
  const text = $itemInput.value;
  if (text === "") {
    $itemInput.focus();
    return;
  }

  const newItem = {
    id: id++,
    text: text,
  };
  shopList.push(newItem);
  saveToLocalStarage();

  const item = createItem(newItem.text, newItem.id);
  $items.appendChild(item);
  item.scrollIntoView();

  $itemInput.value = "";
  $itemInput.focus();
};

$addBtn.addEventListener("click", () => {
  onAdd();
});

$itemInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") onAdd();
});

$items.addEventListener("click", (e) => {
  const id = parseInt(e.target.dataset.id, 10);
  if (!isNaN(id)) {
    shopList = shopList.filter((item) => item.id !== id);
    saveToLocalStarage();

    const deleteItem = document.querySelector(`.item[data-num="${id}"]`);
    if (deleteItem) {
      deleteItem.remove();
    } else {
      console.error(`Element with data-num="${id}" not found.`);
    }
  }
});

const loadItems = () => {
  $items.innerHTML = "";
  shopList.forEach((item) => {
    const newItem = createItem(item.text, item.id);
    $items.appendChild(newItem);
  });
};

loadItems();
