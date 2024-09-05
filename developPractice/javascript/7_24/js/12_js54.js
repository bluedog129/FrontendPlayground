// getter, setter

// get, set

class Student {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  set fullName(name) {
    [this.firstName, this.lastName] = name.split(" ");
  }
}

const student = new Student("Sangmoo", "Jeong");
// console.log(student.fullName());
console.log(student.fullName);
student.fullName = "Samuel Jackson";
console.log(student.fullName);
