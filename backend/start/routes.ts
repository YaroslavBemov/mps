/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

// Product
Route.group(() => {
  Route.group(() => {
    Route.resource('products', 'ProductsController').apiOnly()
  }).prefix('v1')
}).prefix('api')

// Department
Route.group(() => {
  Route.group(() => {
    Route.resource('departments', 'DepartmentsController').apiOnly()
  }).prefix('v1')
}).prefix('api')

// Sector
Route.group(() => {
  Route.group(() => {
    Route.resource('sectors', 'SectorsController').apiOnly()
  }).prefix('v1')
}).prefix('api')

// Worker
Route.group(() => {
  Route.group(() => {
    Route.resource('workers', 'WorkersController').apiOnly()
  }).prefix('v1')
}).prefix('api')

// Status
Route.group(() => {
  Route.group(() => {
    Route.resource('statuses', 'StatusesController').apiOnly()
  }).prefix('v1')
}).prefix('api')

// Base MTP
Route.group(() => {
  Route.group(() => {
    Route.resource('base-mtps', 'BaseMtpsController').apiOnly()
  }).prefix('v1')
}).prefix('api')

// Base Procedure
Route.group(() => {
  Route.group(() => {
    Route.resource('base-procedures', 'BaseProceduresController').apiOnly()
  }).prefix('v1')
}).prefix('api')

// Order
Route.group(() => {
  Route.group(() => {
    Route.resource('orders', 'OrdersController').apiOnly()
  }).prefix('v1')
}).prefix('api')

// MTP
Route.group(() => {
  Route.group(() => {
    Route.resource('mtps', 'MtpsController').apiOnly()
  }).prefix('v1')
}).prefix('api')

// Procedure
Route.group(() => {
  Route.group(() => {
    Route.resource('procedures', 'ProceduresController').apiOnly()
  }).prefix('v1')
}).prefix('api')
