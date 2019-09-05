'use strict'

class CinemaController {
  async indexCinemas ({ response }) {
    id,
    cinema_name,
    cinema_screenshot,
    cinema_address,
    cinema_phone,
    cinema_seat_capacity,
    cinema_details,
    meta: {
      number_of_rows
    }
  }

  async showCinema ({ response, params }) {
    id: 7,
    cinema_name,
    cinema_screenshot,
    cinema_address,
    cinema_phone,
    cinema_seat_capacity,
    cinema_details,
    movie_showings: [
      {
        id,
        movie_id,
        room_id,
        movie_showing_times: [
          {
            id,
            movie_showing_id,
            hour_to_show,
            bookings: [
              {
                id,
                customer_id,
                movie_showing_time_id,
                booking_made_date,
                booking_seat_count,
                seats: [
                  {
                    id,
                    seat_row,
                    seat_number,
                    seat_state,
                    booking_id
                  }
                ]
              },
            ]
          }
        ],
        movie: {
          id,
          movie_name,
          movie_director,
          movie_screenshot,
          movie_synopsis,
          created_at,
          updated_at,
          genres: [
            {
              genre_name,
              pivot: {
                  genre_id,
                  movie_id
              }
            },
            {
              genre_name,
              pivot: {
                  genre_id,
                  movie_id
              }
            }
          ]
        },
        room: {
            id,
            cinema_id,
            rooms_rows,
            rooms_seats,
            rooms_number
        }
      }
    ]
  }
}

module.exports = CinemaController
