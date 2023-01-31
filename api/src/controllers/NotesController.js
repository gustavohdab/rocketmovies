const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class NotesController {
  async create(req, res) {
    try {
      const { title, description, rating, tags } = req.body;
      const user_id = req.user.id;

      if (rating < 0 || rating > 5) {
        throw new AppError('Rating must be between 0 and 5', 400);
      }

      const note_id = await knex('notes').insert({
        title,
        description,
        rating,
        user_id
      });

      const tagsInsert = tags.map(tag => {
        return {
          note_id,
          user_id,
          name: tag
        }
      })

      await knex('tags').insert(tagsInsert);

      return res.status(201).json({ message: 'Note created successfully' });

    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }

  async index(req, res) {
    try {
      const { title, tags, } = req.query;
      const user_id = req.user.id;
      const filterTags = tags.split(',').map(tag => tag.trim());

      let notes;

      if (tags) {

        notes = await knex('tags')
          .select([
            'notes.id',
            'notes.title',
            'notes.user_id',
            'notes.description',
            'notes.rating',
            knex.raw('GROUP_CONCAT(tags.name) as tags')
          ])
          .where('notes.user_id', user_id)
          .whereLike('title', `%${title}%`)
          .whereIn('name', filterTags)
          .innerJoin('notes', 'notes.id', 'tags.note_id')
          .groupBy('notes.id')
          .orderBy('title')

      } else {
        notes = await knex('notes')
          .where({ user_id })
          .whereLike('title', `%${title}%`)
          .orderBy('title')
      }

      const notesWithTags = await Promise.all(notes.map(async note => {
        const tags = await knex('tags').where({ note_id: note.id }).orderBy('name');

        return {
          ...note,
          tags
        }
      }))

      return res.status(200).json(notesWithTags);
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const note = await knex('notes').where({ id }).first();

      const tags = await knex('tags').where({ note_id: id }).orderBy('name');

      return res.status(200).json({ note, tags });
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      await knex('notes').where({ id }).del();

      return res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }
}

module.exports = NotesController;