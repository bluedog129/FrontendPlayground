// 정직원, 파트타임직원의 정보를 출력하는 class
// 직원들의 정보 - 이름, 부서, 한 주에 몇 시간 일하는지 (35, 20)
// 정직원 30000
// 파트타임직원 25000

class Employee {
  #salaryPerHour;
  constructor(name, department, hoursPerDay) {
    this.name = name;
    this.department = department;
    this.hoursPerDay = hoursPerDay;
  }
  getInfo() {
    return `이름: ${this.name}, 부서: ${this.department}, 하루 동안 일하는 시간: ${this.hoursPerDay}`;
  }
  getSalaryPerMonth() {
    const monthlySalary = this.#salaryPerHour * this.hoursPerDay * 5 * 4;
    return `월급 : ${monthlySalary.toLocaleString("ko-KR")}₩`;
  }
  setSalaryPerHour(salaryPerHour) {
    this.#salaryPerHour = salaryPerHour;
  }
}

class FullTimeEmployee extends Employee {
  constructor(name, department, hoursPerDay) {
    super(name, department, hoursPerDay);
    this.setSalaryPerHour(30000);
  }
  getInfo() {
    return `직원 정보 : ${super.getInfo()}`;
  }
  getSalaryPerMonth() {
    return super.getSalaryPerMonth();
  }
}

class PartTimeEmployee extends Employee {
  constructor(name, department, hoursPerDay) {
    super(name, department, hoursPerDay);
    this.setSalaryPerHour(25000);
  }
  getInfo() {
    return `직원 정보 : ${super.getInfo()}`;
  }
  getSalaryPerMonth() {
    return super.getSalaryPerMonth();
  }
}

const fullTimeEmployee = new FullTimeEmployee("Alice", "Engineering", 8);
console.log(fullTimeEmployee.getInfo());
console.log(fullTimeEmployee.getSalaryPerMonth());

const partTimeEmployee = new PartTimeEmployee("Bob", "Marketing", 4);
console.log(partTimeEmployee.getInfo());
console.log(partTimeEmployee.getSalaryPerMonth());
