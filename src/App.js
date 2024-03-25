import './App.css';
import Item from './components/Item.jsx'
import data from './mock.js'
import React from 'react';

const App = () => {
  return (
    <>
      <h1>Fridge Tracker</h1>
      {data.map(datum => <Item key={datum.id} datum={datum} />)}
    </>
  );
}

export default App;
