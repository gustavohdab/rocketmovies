const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class NotesController {
  async index(req, res) {
    try {
      const user_id = req.user.id;

      const tags = await knex('tags')
        .where({ user_id })
        .groupBy('name')

      return res.status(200).json({ tags });
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }
}

module.exports = NotesController;
