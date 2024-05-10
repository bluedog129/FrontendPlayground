# 시간 복잡도

### 해시맵 생성 부분

```
let phoneMap = {};
phone_book.forEach(number => {
    phoneMap[number] = true;
});
```

여기서 phone_book의 각 요소에 대해 해시맵 phoneMap에 키-값 쌍을 삽입하는 작업을 합니다. 이 부분의 시간복잡도는 O(N)입니다. 여기서 N은 phone_book의 길이, 즉 전화번호의 수입니다.

### 접두사 확인 부분

```
for (let i = 0; i < phone_book.length; i++) {
    let phoneNumber = phone_book[i];
    let prefix = "";
    for (let j = 0; j < phoneNumber.length; j++) {
        prefix += phoneNumber[j];
        if (prefix in phoneMap && j + 1 < phoneNumber.length)
            return false;
    }
}
```

이 부분에서 각 전화번호를 순회하면서 가능한 모든 접두사를 만들고, 해당 접두사가 phoneMap에 존재하는지 확인합니다. 각 전화번호에 대해 그 길이만큼의 접두사를 생성하므로, 이중 반복문의 내부 실행 횟수는 각 전화번호의 길이의 합이 됩니다. 만약 모든 전화번호의 평균 길이를 M이라고 가정하면, 이 부분의 시간복잡도는 O(N \* M)이 됩니다. 각 접두사가 해시맵에 있는지 확인하는 작업은 평균적으로 O(1)의 시간복잡도를 가집니다.

따라서 전체 코드의 시간복잡도는 해시맵 생성 부분의 O(N)과 접두사 확인 부분의 O(N _ M)을 합한 O(N + N _ M)입니다. 이를 간단히 표현하면 O(N \* M)으로 볼 수 있습니다. 여기서 N은 전화번호의 수, M은 전화번호의 평균 길이를 의미합니다.
