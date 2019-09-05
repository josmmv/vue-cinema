'use strict'

const Cinema = use('App/Models/Cinema')
const Genre = use('App/Models/Genre')
const moment = require('moment')

class CinemaController {
  async indexCinemas () {
    /**
     * Muéstrame todos los cines...
     */
    const cinemas = await Cinema.query()
    /**
     * ... y adicionalmente cuenta la cantidad de salas que tiene cada uno
     */
    .withCount('rooms as number_of_rooms').fetch()
    return cinemas
  }

  async showCinema ({ params }) {     // params.id = 7
    const cinema = await Cinema.find(params.id) // cine con id 7
    /**
      * COMO TENEMOS UN ÚNICO RESULTADO Y QUEREMOS BUSCAR RELACIONES EN ÉL, USAMOS loadMany()
    */ 
    await cinema.loadMany({
      /**
        * muestrame las películas que se muestren en ese cine...
      */
      movie_showings: movie_showing => {
      /**
        * ...que cumplan que...
      */
        movie_showing
        .select('id', 'movie_id', 'room_id')
        /**
          * ...la fecha en la que se muestran sea la de hoy (funciones del día de hoy)
        */
        .where('movie_show_date', moment(new Date()).format('YYYY-MM-DD'))
        /**
          *  COMO TENEMOS MÚLTIPLES RESULTADOS Y QUEREMOS BUSCAR RELACIONES EN ELLOS, USAMOS with()
        */
        .with('movie_showing_times', movie_showing_time => {
        /**
          * De esas películas muestrame aquellas cuya hora de proyección sea mayor a la actual (porque no me interesa ver las películas cuya función ya terminó).
        */
          movie_showing_time.where('hour_to_show', '>', new Date().getHours())
          /**
            * De esas películas que se van a proyectar hoy y cuya función no ha pasado, muéstrame las reservas que han hecho, y de ellas...
          */
          .with('bookings', bookings => {
            /**
              * ...muéstrame los asientos reservados por cada una.
            */
            bookings.with('seats')
          })
        })
        /**
          * De las películas que se mostrarán hoy en el cine con id 7, muéstrame los nombres de los géneros.
          * Pero como no hay relación directa entre 'genre' y 'movie_showing', buscamos la info completa de cada película en 'movie' y...
        */
        .with('movie', movie => {
          /**
            * ...de ahí sí buscamos los géneros
          */
          movie.with('genres', genres => {
            /**
              * ...pero dame sólo los nombres
            */
            genres.select('genre_name')
          })
        })
        /**
          * De las películas que se mostrarán hoy en el cine con id 7, muéstrame la info de la sala donde se van a mostrar.
        */
        .with('room')
      }
    })
    return {data: cinema}
  }

  async indexGenres() {
    return await Genre.all()
  }
}

module.exports = CinemaController
