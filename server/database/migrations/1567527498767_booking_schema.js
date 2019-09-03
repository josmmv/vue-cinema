'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BookingSchema extends Schema {
  up () {
    this.create('bookings', (table) => {
      table.increments()
      table.integer('customer_id').unsigned().references('customers.id').onDelete('CASCADE')
      table.integer('movie_showing_time_id').unsigned().references('movie_showing_times.id').onDelete('CASCADE')
      table.dateTime('booking_made_date')
      table.integer('booking_seat_count')
    })
  }

  down () {
    this.drop('bookings')
  }
}

module.exports = BookingSchema
