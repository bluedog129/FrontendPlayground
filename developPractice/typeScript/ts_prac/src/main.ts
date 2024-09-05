// 인터페이스
// 클래스 - 생성(구문) 시그니처(constructor signature)를 가지고 있음

interface UserI {
  name: string
  getName(): string
}

interface UserC {
  new (n: string): UserI
}

class User implements UserI {
  public name
  constructor(name: string) {
    this.name = name
  }
  getName() {
    return this.name
  }
}

const user = new User('Heropy')
user.getName()

function hello(userClass: UserC, msg: string) {
  const user = new userClass('Heropy')
  return `Hello, ${user.getName()}, ${msg}`
}

// hello(User, 'Welcome!')

console.log(hello(User, 'Welcome!'))
