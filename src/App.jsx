import './App.css';
import AddItem from './components/AddItem.jsx';
import Item from './components/Item.jsx'
import data from './mock.js'
import React, { useState } from 'react';

const App = () => {
  const [itemData, setItemData] = useState(data);

  return (
    <>
      <h1>Fridge Tracker</h1>
      <ul>
        {itemData.map(datum => <Item key={datum.id} datum={datum} />)}
      </ul>

      <AddItem setItemData={setItemData} itemData={itemData}/>

    </>
  );
}

export default App;
