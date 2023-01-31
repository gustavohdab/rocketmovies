class UserRepositoryInMemory {
  users = [];

  async create({ name, email, password }) {
    const user = {
      id: Math.floor(Math.random() * 1000) + 1,
      name,
      email,
      password,
    }

    this.users.push(user);

    return user;
  }

  async findByEmail(email) {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  async findById(id) {
    const user = this.users.find(user => user.id === id);

    return user;
  }
}

module.exports = UserRepositoryInMemory;