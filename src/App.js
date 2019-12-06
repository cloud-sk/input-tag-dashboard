import React from 'react';
import UserInput from './components/UserInput'
import './App.css';

function App() {
  return (
    <div className="App">
      <UserInput  tags={['John','Jack', 'Peter', 'Sara']} />
    </div>
  );
}

export default App;
