# 코드의 구조
전체 격자 수 계산:

total = brown + yellow: 카펫의 전체 격자 수를 계산합니다.

세로 길이 탐색:

h를 3부터 시작하여 (total / h)까지 증가시킵니다.
3부터 시작하는 이유는 최소한의 카펫의 크기는 3x3 이상이어야 하기 때문입니다.

가로 길이 계산:

h가 total의 약수일 때, w = total / h로 가로 길이를 계산합니다.
노란색 격자의 영역 확인:

(w - 2) * (h - 2)가 yellow와 같은지 확인합니다.
맞다면 w와 h를 answer 벡터에 넣고 반환합니다.
<br><br><br>

# 시간 복잡도
세로 길이 탐색:

루프는 h = 3부터 h <= sqrt(total)까지 실행됩니다.
이 경우, h의 최대값은 약 sqrt(total)입니다.
total은 brown + yellow로, 두 값의 합이므로 전체 시간 복잡도는 O(sqrt(brown + yellow))입니다.

가로 길이 계산:

h가 total의 약수인지 확인하는 연산은 상수 시간 O(1)입니다.

시간 복잡도: O(sqrt(brown + yellow))