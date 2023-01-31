const AppError = require('../utils/AppError');
const bcrypt = require('bcryptjs');

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }) {

    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('Email already in use', 400);
    }

    const passwordHash = await bcrypt.hash(password, 8);

    const createdUser = await this.userRepository.create({ name, email, password: passwordHash });

    return createdUser;
  }
}

module.exports = UserCreateService;