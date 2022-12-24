import React, { Fragment, useState } from "react";

const InputTodo = ({ setTodosChange }) => {
  const [description, setDescription] = useState("");
  const [todo_date, setTodoDate] = useState(new Date());

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);

      const body = { description, todo_date };
      const response = await fetch("http://localhost:3000/dashboard/todos", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      //parse response
      const parseResponse = await response.json();

      console.log(parseResponse);

      setTodosChange(true);
      setDescription("");
      setTodoDate(new Date());
      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <h2 className="text-center my-5">Input Todo</h2>
      <form className="d-flex" onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="Description"
          className="form-control"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          type="date"
          placeholder="due date"
          className="form-control"
          value={todo_date}
          onChange={e => setTodoDate(e.target.value)}
        />
        <button className="btn btn-success ">Add</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;