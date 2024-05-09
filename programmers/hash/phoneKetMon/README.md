# 문제 풀이


# 시간 복잡도
reduce 메서드 사용:<br>
배열 nums의 각 원소를 한 번씩 순회하면서, phoneMonObject 객체에 종류별 개수를 쌓습니다.
nums의 길이를 n이라 할 때, 이 부분의 시간 복잡도는 O(n)입니다.

Object.keys(phoneMonObject).length 계산:<br>
phoneMonObject 객체의 키들을 추출하여 배열로 반환하는 작업은 객체의 크기에 비례하는 시간이 걸립니다. 이 객체의 최대 크기는 nums 배열의 모든 원소가 다른 경우, 즉 n개의 유니크한 종류가 있을 때입니다.
그러나 일반적으로 이 크기는 n보다 작거나 같으므로, 이 부분의 시간 복잡도 역시 O(n)입니다.

Math.min 계산:<br>
두 숫자를 비교하는 것은 상수 시간, 즉 O(1)의 시간 복잡도를 갖습니다.

종합하면, solution 함수의 전체 시간 복잡도는 O(n) + O(n) + O(1) = O(n)입니다. 

# 알게된 지식
### reduce 메서드
reduce 메서드는 JavaScript는 배열에 적용되는 내장 메서드로서 배열의 각 요소를 순차적으로 처리하여 하나의 결과값을 만들어내기 위해 사용됩니다. 이 메서드는 배열의 각 요소에 대해 콜백 함수를 실행하고, 이 콜백 함수의 반환값을 다음 요소의 콜백 함수 실행에 전달하여 누적합니다. 콜백 함수는 네 개의 매개변수를 가질 수 있으며, 일반적으로 사용되는 두 개는 다음과 같습니다.

acc (accumulator): 누적된 결과값을 저장하는 변수입니다. 이 값은 각 콜백 함수 호출 시 업데이트 되며, 최종적으로 reduce 함수의 결과로 반환됩니다.<br>
currentValue: 현재 처리중인 배열의 요소입니다.<br>

reduce 메서드는 선택적으로 두 번째 인자로 초기값을 받을 수 있는데, 이 값은 acc의 초기값으로 사용됩니다. <br>초기값을 제공하지 않을 경우, 배열의 첫 번째 요소가 초기값으로 사용되며 콜백은 두 번째 요소부터 시작합니다.<br>

```
const phoneMonObject = nums.reduce((acc, species) => {
  acc[species] = acc[species] ? acc[species] + 1 : 1;
  return acc;
}, {});
```

위 코드에서 reduce 함수는 nums 배열을 사용하여 phoneMonObject를 생성합니다.<br>
acc (accumulator): 각 종(species)의 출현 횟수를 저장하는 객체입니다. 이 객체는 초기값 {}로 시작합니다. {}는 빈 객체를 의미하며, 여기에 각 종의 이름을 키로, 출현 횟수를 값으로 저장합니다.<br>
species: 배열 nums의 현재 요소를 나타냅니다.<br>

### Object.keys() 함수, .length
```
const speciesCount = Object.keys(phoneMonObject).length;
```
Object.keys() 함수: <br>이 함수는 객체의 모든 열거 가능한 속성(키)을 배열로 반환합니다. 즉, 객체에서 키로 사용된 모든 이름들을 배열 형태로 모아서 제공합니다. 이 메서드는 주어진 객체의 직접적인 속성 이름들만을 포함합니다.

phoneMonObject: <br>이 객체는 reduce 메서드를 통해 생성된 것으로, 배열 nums의 각 요소를 종(species)으로 하여 그 종이 몇 번 등장했는지를 계수하는 해시맵 형태입니다. 즉, 키는 nums 배열의 요소들이고 값은 해당 요소가 배열에 등장한 횟수입니다.

Object.keys(phoneMonObject): <br>이 호출은 phoneMonObject에서 사용된 모든 키를 배열로 반환합니다. 예를 들어, phoneMonObject가 {3: 3, 2: 2, 4: 1}의 형태라면, 반환되는 배열은 ['3', '2', '4']가 됩니다.

.length: <br>배열의 length 속성은 배열의 길이, 즉 배열에 포함된 요소의 수를 반환합니다. Object.keys(phoneMonObject)에 의해 반환된 배열의 길이는 phoneMonObject 객체의 키의 개수와 같습니다. 이는 nums 배열에 있는 유니크한 종의 수를 나타냅니다.

결론적으로, speciesCount 변수는 nums 배열 내에 있는 서로 다른 종의 개수를 저장합니다.