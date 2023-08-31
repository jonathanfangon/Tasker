import React, { Fragment, useState, useEffect } from 'react';
import EditTodo from './EditTodo';

const ListTodos = ({ allTodos, setTodosChange }) => {
  const [todos, setTodos] = useState([]); //useState to set todos to

  //delete todo function
  async function deleteTodo(id) {
    try {
      await fetch(`http://localhost:3000/dashboard/todos/${id}`, {
        method: 'DELETE',
        headers: { token: localStorage.token },
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  //lists all todos from the database
  useEffect(() => {
    setTodos(allTodos);
  }, [allTodos]);

  //if the due date of a task is today, todo_date will be changed to 'Today'
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;

  return (
    <Fragment>
      {' '}
      <table className='table mt-5'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Due Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.length !== 0 &&
            todos[0].todo_id !== null &&
            todos.map((todo) => (
              <tr key={todo.todo_id}>
                <td id='descriptions' style={{ color: 'black' }}>
                  {todo.description}
                </td>
                <td id='descriptions' style={{ color: 'black' }}>
                  {todo.todo_date.slice(0, 10) === today
                    ? 'Today'
                    : todo.todo_date.slice(0, 10)}
                </td>
                <td>
                  <EditTodo todo={todo} setTodosChange={setTodosChange} />
                </td>
                <td>
                  <button
                    className='btn btn-danger'
                    onClick={() => deleteTodo(todo.todo_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
