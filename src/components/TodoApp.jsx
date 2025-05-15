import { useState } from 'react';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // Štýly pre komponent
  const containerStyle = {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    borderRadius: '5px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fff',
    textAlign: 'center'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#234',
    fontSize: '32px'
  };

  const formStyle = {
    display: 'flex',
    marginBottom: '20px',
    width: '100%'
  };

  const inputStyle = {
    flexGrow: 1,
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px 0 0 4px',
    fontSize: '16px'
  };

  const addButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '0 4px 4px 0',
    cursor: 'pointer',
    fontSize: '16px'
  };

  const todoListStyle = {
    listStyle: 'none',
    padding: 0,
    width: '100%'
  };

  const todoItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    marginBottom: '8px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
    justifyContent: 'space-between'
  };

  const todoTextStyle = {
    flexGrow: 1,
    textAlign: 'left',
    margin: '0 10px'
  };

  const todoCompletedStyle = {
    textDecoration: 'line-through',
    color: '#888'
  };

  const buttonStyle = {
    padding: '8px 12px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '0 5px'
  };

  const editButtonStyle = {
    backgroundColor: '#2196F3'
  };

  const saveButtonStyle = {
    backgroundColor: '#4CAF50'
  };

  const checkboxStyle = {
    width: '20px',
    height: '20px',
    marginRight: '10px',
    cursor: 'pointer'
  };

  const todoCountStyle = {
    marginTop: '15px',
    fontSize: '14px',
    color: '#666',
    textAlign: 'left'
  };

  const editInputStyle = {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    flexGrow: 1,
    marginRight: '10px',
    fontSize: '16px'
  };

  // Pridanie novej úlohy
  const addTodo = () => {
    if (input.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: input,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInput('');
    }
  };

  // Označenie úlohy ako hotová/nehotová
  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Vymazanie úlohy
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Zapnutie režimu editácie
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  // Uloženie editovanej úlohy
  const saveEdit = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: editText } : todo
      )
    );
    setEditingId(null);
  };

  // Spracovanie stlačenia Enter
  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      if (id) {
        saveEdit(id);
      } else {
        addTodo();
      }
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Todo List</h1>
      
      {/* Formulár na pridanie úlohy */}
      <div style={formStyle}>
        <input
          type="text"
          style={inputStyle}
          placeholder="Pridajte novú úlohu..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <button
          style={addButtonStyle}
          onClick={addTodo}
        >
          Pridať
        </button>
      </div>
      
      {/* Zoznam úloh */}
      <ul style={todoListStyle}>
        {todos.map(todo => (
          <li key={todo.id} style={todoItemStyle}>
            {editingId === todo.id ? (
              <div style={{ display: 'flex', width: '100%' }}>
                <input
                  type="text"
                  style={editInputStyle}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, todo.id)}
                  autoFocus
                />
                <button
                  style={{...buttonStyle, ...saveButtonStyle}}
                  onClick={() => saveEdit(todo.id)}
                >
                  Uložiť
                </button>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                  <input
                    type="checkbox"
                    style={checkboxStyle}
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                  />
                  <span style={todo.completed ? {...todoTextStyle, ...todoCompletedStyle} : todoTextStyle}>
                    {todo.text}
                  </span>
                </div>
                <div>
                  <button
                    style={{...buttonStyle, ...editButtonStyle}}
                    onClick={() => startEdit(todo)}
                  >
                    Upraviť
                  </button>
                  <button
                    style={buttonStyle}
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Vymazať
                  </button>
                  <h1>sad</h1>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      
      {/* Zobrazenie počtu úloh */}
      {todos.length > 0 && (
        <div style={todoCountStyle}>
          Celkovo: {todos.length} úloh, 
          Hotových: {todos.filter(todo => todo.completed).length}
        </div>
      )}
    </div>
  );
}