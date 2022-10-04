import './App.css';
import React from 'react';
import { ListView, GrilleView } from './components';
import useListener from './hooks/listener';

function App() {
  useListener()

  return (
    <div className="App">
        <ListView />
        <GrilleView />
    </div>
  );
}

export default App;
