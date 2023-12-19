// src/components/TodoApp.tsx

import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editing, setEditing] = useState<number | null>(null);
  const [newText, setNewText] = useState('');

  const addTodo = (text: string) => {
    setTodos([...todos, { id: todos.length + 1, text, completed: false }]);
  };

  const toggleTodo = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const startEditing = (id: number) => {
    setEditing(id);
    const todoToEdit = todos.find(todo => todo.id === id);
    setNewText(todoToEdit?.text || '');
  };

  const finishEditing = () => {
    setEditing(null);
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === editing ? { ...todo, text: newText } : todo
      )
    );
  };

  return (
    <div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {editing === todo.id ? (
              <>
                <input
                  type="text"
                  value={newText}
                  onChange={e => setNewText(e.target.value)}
                />
                <button onClick={finishEditing}>Save</button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                {todo.text}
                <button onClick={() => startEditing(todo.id)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <button onClick={() => addTodo('New Todo')}>Add Todo</button>
    </div>
  );
};

export default TodoApp;
