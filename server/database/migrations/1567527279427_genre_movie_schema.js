'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GenreMovieSchema extends Schema {
  up () {
    this.create('genre_movies', (table) => {
      table.integer('movie_id').unsigned().references('id').inTable('movies').onDelete('CASCADE')
      table.integer('genre_id').unsigned().references('id').inTable('genres').onDelete('CASCADE')
    })
  }

  down () {
    this.drop('genre_movies')
  }
}

module.exports = GenreMovieSchema
