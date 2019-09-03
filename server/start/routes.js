'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => { 
  Route.post('login', 'AuthController.login')
  Route.post('register', 'AuthController.register')
  Route.put('profile', 'AuthController.profile').middleware(['auth:jwt'])

  Route.get('cinema:id', 'CinemaController.showCinema')
  Route.get('cinema', 'CinemaController.indexCinemas')
  Route.get('genres', 'CinemaController.indexGenres')

  Route.get('movies/:id/byCinema', 'MovieController.byCinema')
  Route.get('movies/:id/byMovie', 'MovieController.byMovie')

  Route.post('booking', 'BookingController.create').middleware(['auth:jwt'])
  Route.get('bookings/last', 'BookingController.last').middleware(['auth:jwt'])
  Route.get('bookings/all', 'BookingController.all').middleware(['auth:jwt'])
}).prefix('api')
