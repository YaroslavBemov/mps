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

Route.group(() => {
  Route.group(() => {
    // Product
    Route.resource('products', 'ProductsController').apiOnly()
    // Department
    Route.resource('departments', 'DepartmentsController').apiOnly()
    // Sector
    Route.resource('sectors', 'SectorsController').apiOnly()
    // Worker
    Route.resource('workers', 'WorkersController').apiOnly()
    // Status
    Route.resource('statuses', 'StatusesController').apiOnly()
    // Base MTP
    Route.resource('base-mtps', 'BaseMtpsController').apiOnly()
    // Base Procedure
    Route.resource('base-procedures', 'BaseProceduresController').apiOnly()
    // Order
    Route.resource('orders', 'OrdersController').apiOnly()
    // MTP
    Route.resource('mtps', 'MtpsController').apiOnly()
    // Procedure
    Route.resource('procedures', 'ProceduresController').apiOnly()
    // Process
    Route.resource('processes', 'ProcessesController').apiOnly()
  }).prefix('api/v1')
}).middleware('auth')

Route.group(() => {
  Route.post('reg', 'AuthController.reg')
  Route.post('test', 'AuthController.test')
  Route.post('login', 'AuthController.login')
  Route.post('logout', 'AuthController.logout').middleware('auth')
  Route.post('refresh', 'AuthController.refresh').middleware('auth')
}).prefix('api/v1')
