import React, { useState, useEffect } from 'react';
import './TodoApp.css'; 

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  category: string;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editing, setEditing] = useState<number | null>(null);
  const [newText, setNewText] = useState('');
  const [newCategory, setNewCategory] = useState('');

  // 로컬 스토리지에서 Todo 리스트 불러오기
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Todo 리스트가 변경될 때 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, category: string) => {
    setTodos([...todos, { id: todos.length + 1, text, completed: false, category }]);
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
    setNewCategory(todoToEdit?.category || '');
  };

  const finishEditing = () => {
    setEditing(null);
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === editing ? { ...todo, text: newText, category: newCategory } : todo
      )
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      finishEditing();
    }
  };

  return (
    <div className="todo-app"> 
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {editing === todo.id ? (
              <>
                <input
                  type="text"
                  value={newText}
                  onChange={e => setNewText(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <input
                  type="text"
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  onKeyDown={handleKeyDown}
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
                {`${todo.text} (${todo.category})`}
                <button onClick={() => startEditing(todo.id)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <button onClick={() => addTodo('해야 할 일', '카테고리')}>할 일 추가</button>
    </div>
  );
};

export default TodoApp;
