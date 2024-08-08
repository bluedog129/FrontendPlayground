const $currencyOne = document.getElementById("currency-one");
const $amountOne = document.getElementById("amount-one");
const $currencyTwo = document.getElementById("currency-two");
const $amountTwo = document.getElementById("amount-two");
const $rate = document.getElementById("rate");
const $swap = document.getElementById("swap");

const API_KEY = "YOUR_API_KEY";
const API_URL = `https://open.exchangerate-api.com/v6/latest`;

// 국가 리스트 가져오기 및 select 옵션 추가
async function getCurrencies() {
  const response = await fetch(`${API_URL}?apikey=${API_KEY}`);
  const data = await response.json();
  const currencies = Object.keys(data.rates);

  currencies.forEach((currency) => {
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");
    option1.value = currency;
    option1.text = currency;
    option2.value = currency;
    option2.text = currency;
    $currencyOne.add(option1);
    $currencyTwo.add(option2);
  });

  // 요구한 기본값으로 설정
  $currencyOne.value = "USD";
  $currencyTwo.value = "KRW";

  calculate();
}

// 환율 계산
async function calculate() {
  const currOne = $currencyOne.value;
  const currTwo = $currencyTwo.value;

  const response = await fetch(`${API_URL}?apikey=${API_KEY}&base=${currOne}`);
  const data = await response.json();

  const exchangeRate = data.rates[currTwo];

  $rate.innerText = `1 ${currOne} = ${exchangeRate} ${currTwo}`;
  $amountTwo.value = ($amountOne.value * exchangeRate).toFixed(2);
}

// 이벤트 리스너
$currencyOne.addEventListener("change", calculate);
$currencyTwo.addEventListener("change", calculate);
$amountOne.addEventListener("input", calculate);
$amountTwo.addEventListener("input", () => {
  const exchangeRate = parseFloat($rate.innerText.split("=")[1]);
  $amountOne.value = ($amountTwo.value / exchangeRate).toFixed(2);
});

$swap.addEventListener("click", () => {
  const temp = $currencyOne.value;
  $currencyOne.value = $currencyTwo.value;
  $currencyTwo.value = temp;
  calculate();
});

getCurrencies();
