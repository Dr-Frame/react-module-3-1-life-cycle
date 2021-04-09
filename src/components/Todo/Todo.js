import React from 'react';

const Todo = ({ text, onToggleCompleted, onDeleteTodo, completed }) => (
  <div>
    <input
      type="checkbox"
      className="TodoList__checkbox"
      checked={completed}
      onChange={onToggleCompleted}
    />
    <p className="TodoList__text">{text}</p>
    <button type="button" className="TodoList__btn" onClick={onDeleteTodo}>
      Удалить
    </button>
  </div>
);

export default Todo;
