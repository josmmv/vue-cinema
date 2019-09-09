'use strict'

const Cinema = use('App/Models/Cinema')
const MovieShowing = use('App/Models/MovieShowing')
const moment = require('moment')

class MovieController {
  async byCinema({ params }) {
    const cinema = await Cinema.find(params.id)
    await cinema.loadMany({
      movie_showings: movie_showing => {
        movie_showing
        .select('id', 'movie_id', 'room_id')
        .where('movie_show_date', moment(new Date()).format("YYYY-MM-DD"))
        .with('movie_showing_times', movie_showing_time => {
          movie_showing_time.where('hour_to_show', '>=', new Date().getHours())
        })
        .with('movie', movie => {
          movie.with('genres', genre => {
            genre.select('genre_name')
          })
        })
        .with('room')
      }
    })
    return cinema
  }

  async byMovie({ params }) {
    const movie = await MovieShowing.findBy('movie_id', params.id)
    await movie.loadMany({
      movie_showing_times: movie_showing_time => {
        movie_showing_time
        .where('hour_to_show', '>=', new Date().getHours())
        .with('bookings', booking => {
          booking.with('seats')
        })
      },
      movie: movie => {
        movie.with('genres', genre => {
          genre.select('genre_name')
        })
      },
      room: null
    })
    return movie
  }
}

module.exports = MovieController
