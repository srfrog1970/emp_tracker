class Role {
  constructor(role_id, title, salary, dept_id) {
    this.role_id = role_id;
    this.title = title;
    this.salary = salary;
    this.dept_id = dept_id;
  }

  getTitle() {
    return this.title;
  }
}

module.exports = Role;
