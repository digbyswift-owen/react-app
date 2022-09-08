import React from 'react';
import './App.scss';
import Body from './/Components/Body.jsx';
import {useState} from 'react';


function App() {
  const [name, setName] = useState('');
  return (
    <div className="App">
      <h1>Submit Your Name:</h1>
        <Body name={name} setName={setName}/>
    </div>
  );
}

export default App;
