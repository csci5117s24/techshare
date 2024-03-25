import './App.css';
import Item from './components/Item.jsx'
import data from './mock.js'
import React, { useState } from 'react';

const App = () => {
  const [name, setName] = useState("");
  const [quant, setQuant] = useState("");
  const [expDate, setExpDate]= useState("");

  const [itemData, setItemData] = useState(data);
  
  function newData(){
    let arrayLen = itemData.length;
    const newItem = {id:arrayLen+1, name:name, quantity:quant, expireDate:expDate};
    setItemData([...itemData, newItem]);
  }

  return (
    <>
      <h1>Fridge Tracker</h1>
      {itemData.map(datum => <Item key={datum.id} datum={datum} />)}


      <div>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name"></input>
          <input value={quant} onChange={e=>setQuant(e.target.value)} placeholder="Quantity"></input>
          <input value={expDate} onChange={e=>setExpDate(e.target.value)} placeholder="Expiry: MM/DD/YYYY"></input>
          <button onClick={newData}>Add Item</button>
      </div>
    </>
  );
}

export default App;
