'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoomSchema extends Schema {
  up () {
    this.create('rooms', (table) => {
      table.increments()
      table.integer('cinema_id').unsigned()
      table.foreign('cinema_id').references('cinemas.id').onDelete('CASCADE');
      table.integer('rooms_rows')
      table.integer('rooms_seats')
      table.integer('rooms_number')
    })
  }

  down () {
    this.drop('rooms')
  }
}

module.exports = RoomSchema
