// ***************************************************************
// api-routes.js - routes for displaying and saving data to the db
// ****************************************************************

// Dependencies
// =============================================================
const db = require('../models');
// db.Todo

// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the todos
  app.get('/api/todos', async (req, res) => {
    const results = await db.Todo.findAll({});
    res.json(results);
  });

  // POST route for saving a new todo.
  // We can create a todo using the data on req.body
  app.post('/api/todos', async (req, res) => {
    console.log('Todo Data:');
    console.table(req.body);

    const result = await db.Todo.create({
      text: req.body.text,
      complete: req.body.complete,
    });
    res.json({id: result.insertId});
  });

  // DELETE route for deleting todos.
  // We can access the ID of the todo to delete in
  // req.params.id
  // app.delete('/api/todos/:id', async (req, res) => {
  //   const condition = 'id = ' + req.params.id;

  //   db.Todo.destroy(condition, function(result) {
  //     if (result.affectedRows == 0) {
  //       console.log(condition);
  //       // If no rows were changed, then the ID must not exist, so 404
  //       return res.status(404).end();
  //     } else {
  //       res.status(200).end();
  //     }
  //   });
  // });
  // ===========================================
  app.delete('/api/todos/:id', async (req, res) => {
    const result = await db.Todo.destroy({
      where: {
        id: 'req.params.id',
      },
    });

    res.status(200).end();
  });
  // ===========================================

  // PUT route for updating todos.
  // We can access the updated todo in req.body
  app.put('/api/todos', async (req, res) => {
    // const id = req.body.id;
    const {id, text, complete} = req.body;
    const result = await db.Todo.update(
        // what you are updating
        {
          text,
          complete,
        },
        {
          where: {id},
        });
    res.send(result);
  });
};
