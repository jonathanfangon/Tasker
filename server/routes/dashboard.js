const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

//gets all todos and name
router.get('/', authorization, async (req, res) => {
    try {
        //req.user has the payload
        // res.json(req.user);

        // get todo name and description for a specified user id
        const user = await pool.query(
          "SELECT u.user_name, t.todo_id, t.description, t.todo_date FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_id = $1",
          [req.user]
        );

        res.json(user.rows);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

//create a todo, using authorization middleware
router.post("/todos", authorization, async (req, res) => {
    try {
      const { description, todo_date } = req.body;
      if(description === '') {
        return res.status(422).json('Invalid input for todo description');
      }
      const newTodo = await pool.query(
        "INSERT INTO todos (user_id, description, todo_date) VALUES ($1, $2, $3) RETURNING *",
        [req.user, description, todo_date]
      );
  
      console.log(`Added task: ${req.body.description}!`);
      res.json(newTodo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //update a todo (not working)
  router.put("/todos/:id", authorization, async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const updateTodo = await pool.query(
        "UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *",
        [description, id, req.user]
      );
  
      if (updateTodo.rows.length === 0) {
        return res.json("This todo is not yours");
      }
  
      res.json("Todo was updated");
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //delete a todo
  router.delete("/todos/:id", authorization, async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await pool.query(
        "DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *",
        [id, req.user]
      );
  
      if (deleteTodo.rows.length === 0) {
        return res.json("This todo is not yours");
      }
      
      console.log(`Task Deleted!`);
      res.json("Todo was deleted");
    } catch (err) {
      console.error(err.message);
    }
  });

module.exports = router;