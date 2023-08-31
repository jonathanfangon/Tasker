import React, { Fragment, useState, useRef } from 'react';

const EditTodo = ({ todo, setTodosChange }) => {
  const [description, setDescription] = useState(todo.description);

  const modalRef = useRef(null);

  const openModal = () => {
    if (modalRef.current) {
      const modal = new bootstrap.Modal(modalRef.current);
      modal.show();
    }
  };

  const editText = async (id) => {
    try {
      const body = { description };
      const myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('token', localStorage.token);

      await fetch(`http://localhost:3000/dashboard/todos/${id}`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      setTodosChange(true);
      // Close the modal after saving changes
      if (modal.current) {
        modal.current.hide();
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      {/* <!-- Button trigger modal --> */}
      <button type='button' className='btn btn-primary' onClick={openModal}>
        Edit
      </button>

      {/* <!-- Modal --> */}
      <div
        className='modal fade'
        id='exampleModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
        ref={modalRef}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='exampleModalLabel'>
                Edit Todo
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <input
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={() => editText(todo.todo_id)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;
