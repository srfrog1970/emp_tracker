class Department {
  constructor(dept_id, name) {
    this.dept_id = dept_id;
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

module.exports = Department;
