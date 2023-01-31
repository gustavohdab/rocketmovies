const bcrypt = require('bcryptjs');
const sqliteConnection = require('../database/sqlite');
const AppError = require('../utils/AppError');
const UserRepository = require('../repositories/UserRepository');
const UserCreateService = require('../services/UserCreateService');

class UsersController {
  async create(req, res) {
    try {
      const { name, email, password } = req.body;

      const userRepository = new UserRepository();
      const userCreateService = new UserCreateService(userRepository);
      await userCreateService.execute({ name, email, password });

      return res.status(201).json({ message: 'User created' });
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }

  async update(req, res) {
    try {
      const { name, email, password, old_password } = req.body;
      const user_id = req.user.id;

      const db = await sqliteConnection();

      const user = await db.get(`SELECT * FROM users WHERE id = ?`, [user_id]);

      if (!user) throw new AppError('User not found', 404);

      if (await db.get(`SELECT * FROM users WHERE email = ? AND id != ?`, [email, user_id])) throw new AppError('User already exist', 400);

      user.name = name || user.name;
      user.email = email || user.email;

      if (password && old_password) {
        if (!await bcrypt.compare(old_password, user.password)) throw new AppError('Old password does not match', 400);
        user.password = await bcrypt.hash(password, 8);
      } else if (password && !old_password) {
        throw new AppError('Old password is required', 400);
      }

      await db.run(`UPDATE users SET 
      name = ?, 
      email = ?, 
      password = ?,
      updated_at = CURRENT_TIMESTAMP 
      WHERE id = ? `, [user.name, user.email, user.password || null, user_id]
      );

      return res.status(200).json({ message: 'User updated' });
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }
}

module.exports = UsersController;