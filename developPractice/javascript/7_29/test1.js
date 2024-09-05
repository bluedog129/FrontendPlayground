const $sec = document.querySelector(".sec");
const $bar = document.createElement("span");
$bar.classList.add("bar");
$sec.appendChild($bar);

const $btnsCon = document.querySelector(".btnsCon");
const $listCon = document.querySelector(".listCon");
$btnsCon.children[0].classList.add("on");
$listCon.children[0].classList.add("on");

$btnsCon.addEventListener("click", (e) => {
  // li 에 on 붙여져 있는 요소 찾아서 제거
  const $currentOnBtn = $btnsCon.querySelector(".on");

  if ($currentOnBtn) {
    $currentOnBtn.classList.remove("on");
  }

  // 클릭 대상과 가장 근접한 li를 찾아 클래스 적용
  const $li = e.target.closest("li");
  if (!$li) return;
  $li.classList.add("on");

  // 클릭한 요소의 넚이를 bar의 넓이에 반영
  // 클릭한 요소가 부모로부터 외쪽 변이 얼마나 떨어져 있는지 거리를 left 요소에 반영

  const newWidth = e.target.offsetWidth;
  const newLeft = e.target.offsetLeft;
  $bar.style.cssText = `width:${newWidth}px; transform: translateX(${newLeft}px);`;

  // .listCon의 li 요소에 on 클래스 적용
  const index = Array.from($btnsCon.children).indexOf($li);
  if (index !== -1 && index < $listCon.children.length) {
    const $currentOnContent = $listCon.querySelector(".on");
    if ($currentOnContent) {
      $currentOnContent.classList.remove("on");
    }
    $listCon.children[index].classList.add("on");
  }
});
