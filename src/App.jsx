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
    // let arrayLen = itemData.length;
    // const newItem = {id:arrayLen+1, name:name, quantity:quant, expireDate:expDate};
    // setItemData([...itemData, newItem]);
    setItemData([...data, {id: data.length + 1, name: name, quantity: quant, expireDate: expDate}])
    setName('')
    setQuant('')
    setExpDate('')
  }

  return (
    <>
      <h1>Fridge Tracker</h1>
      <ul>
        {itemData.map(datum => <Item key={datum.id} datum={datum} />)}
      </ul>


      <div>
          <input id="name" value={name} onChange={e=>setName(e.target.value)} placeholder="Name"></input>
          <input id="quant" value={quant} onChange={e=>setQuant(e.target.value)} placeholder="Quantity"></input>
          <input id="exp" value={expDate} onChange={e=>setExpDate(e.target.value)} placeholder="Expiry: MM/DD/YYYY"></input>
          <button onClick={newData}>Add Item</button>
      </div>
    </>
  );
}

export default App;
