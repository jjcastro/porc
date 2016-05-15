# [Porc.co](http://porc.co)

Porc is an **expense tracking web app** that gives you complete control over your finances, using intelligent reports and contextual predictions to help you understand the way you use your money.

Porc helps you budget. Create budgets for different spending categories and log your expenses. Porc learns about your spending habits and gives you projections so you know how well you're doing, how much of your budget have you spent, and how much you should spend going forward to meet your goals.

## Features

* A clean, intuitive, and well thought-out design.
* Quick and easy adding of transactions.
* Customizable accounts and categories—you can select icons and colors.
* Predictions: automatically suggests transactions and expenses for the time of day.
* Color-coded tag system.
* Built-in calculator and currency converter.
* Automatic backup.
* Search.
* Multiple accounts including easy transfers.
* Over 160 currencies and exchange rates supported.
* Simple interactive reports.

## Installation

1. Install node dependencies: `npm install`
2. Fetch bower dependencies: `bower install`
3. Process LESS and JS files with gulp: `gulp build`
4. To start the node server `node server.js`
5. Visit the application in your browser: [http://localhost:8080](http://localhost:8080)

## API documentation

### Users and authentication
| Use case        | Node API               | Angular Svc Func |
|-----------------|------------------------|------------------|
| create user     | POST /api/users        | create( { name, username, password } ) |
| authenticate    | POST /api/users/auth   | login( { username, password } ) |

### Me (user info)

| Use case        | Node API               | Angular Svc Func |
|-----------------|------------------------|------------------|
| user info       | GET /api/me            | get() |
| update user     | PUT /api/me            | update( { [name], [username], [password] } ) |
| delete user     | DELETE /api/me         | delete() |

### Transactions

| Use case             | Node API                          | Angular Svc Func |
|----------------------|-----------------------------------|------------------|
| list transactions    | GET /api/transactions             | all() |
| create transaction   | POST /api/transactions            | create() |
| single transaction   | GET /api/transactions/:tran_id    | get(id) |
| update a transaction | PUT /api/transactions/:tran_id    | update(id) |
| delete transaction   | DELETE /api/transactions/:tran_id | delete(id) |


## Roadmap (features and things to come)

* iOS transcation oriented app with smart predictions (time, place, etc).


