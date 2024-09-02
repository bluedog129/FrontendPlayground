const a: string = 'Hello TypeScript'
let str: string = 'Hello TypeScript'
let num: number = 123
let bool: boolean = true

const obj: { name: string; age: number } = {
  name: 'John',
  age: 25,
}

const arr: Array<number> = []
arr[0] = 10
arr[1] = 123

const hello1: (msg: string) => string = (msg) => {
  return msg
}

const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
console.log(week[0])
console.log(week[6])
console.log(week.findIndex((d) => d === 'Sun'))
console.log(week.findIndex((d) => d === 'Sat'))

enum Week {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}
console.log(Week[0])
console.log(Week[6])
console.log(Week.Sun)
console.log(Week.Sat)

const EnumWeek = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
}

console.log(a)
console.log(str)
console.log(num)
console.log(bool)
console.log(obj)

const hello: (msg: string) => string = (msg) => {
  return `hello ${msg}`
}

const tup: number[] = [1, 2, 3]
tup[3] = 4
tup[4] = 5

// Never 타입
// 어떤 것도 반환하지 않는 함수의 반환 타입으로 사용

const nev: number[] = []
nev.push(1)

const myError = (msg: string): never => {
  throw new Error(msg)
}
try {
  myError('error')
} catch (e) {
  console.log(e)
}

// any 타입
let any3: any = 0
any3 = 'hello'
any3 = true
any3 = {}
any3 = []
any3 = null
any3 = undefined

const b: number = any3
const c: boolean = any3

// unknown 타입
// any와 유사하지만 any보다는 타입 안전성이 높다
// any와 같이 모든 타입을 할당할 수 있지만, 타입을 지정하지 않으면 다른 변수에 할당할 수 없다

let unknown: unknown = 0
unknown = 'hello'
unknown = true
unknown = {}

// const da: number = unknown
// const ee: boolean = unknown

if (typeof unknown === 'number') {
  const f: number = unknown
}

// any vs unknown

let any: any = 'hello'

// Union 타입
// 여러 타입 중 하나일 수 있는 값을 의미
// | 기호로 연결하여 사용
// 타입 가드를 사용하여 타입을 좁힐 수 있다
// 타입 가드: 특정 타입으로 타입을 좁히는 기능

let union: number | string = 0
union = 'hello'
union = 123
// union = false
// union = {}

// Intersection 타입
// 여러 타입을 모두 만족하는 타입을 의미
// & 기호로 연결하여 사용
// 타입을 조합하여 사용

type User = {
  name: string
  age: number
}

type Admin = {
  name: string
  role: string
}

type AdminUser = User & Admin

const User: User = {
  name: 'John',
  age: 25,
}

const Admin: Admin = {
  name: 'Admin',
  role: 'super',
}

const AdminUser: AdminUser = {
  name: 'Admin',
  age: 25,
  role: 'super',
}

// 타입 단언(Type Assertion)
// 타입을 강제로 지정하는 기능
// 변수 as 타입 형식으로 사용
// JSX에서는 as를 사용해야 한다

const btn = document.querySelector('button') as HTMLButtonElement
const btn2 = document.querySelector('button')!
btn.classList.add('active')
btn.id = 'btn'

const json = '{"name": "John", "age": 25}'
const user = JSON.parse(json) as { name: string; age: number }
// console.log(user.email)

let num2!: number
// num2 = 0
// 초기화되지 않은 변수는 사용할 수 없다
console.log(num2)

// 타입 가드(Type Guard)
// 타입을 좁혀나가는 과정을 의미
// typeof, instanceof, in, is 등을 사용하여 타입을 좁힐 수 있다
// 타입 가드를 사용하면 타입을 좁혀나가면서 해당 타입에 맞는 메서드나 속성을 사용할 수 있다
// 스코프 내에서 타입을 좁혀나가면서 사용할 수 있다

const btn3 = document.querySelector('button')
if (btn3 instanceof HTMLButtonElement) {
  btn.classList.add('btn')
  btn.id = 'abc'
}

// 타입 별칭(Type Alias)

type MyTypeName = string | number
type MyArray = MyTypeName[]
type UserA = {
  name: string
  age: number
}
type UserB = {
  isValid: boolean
}
