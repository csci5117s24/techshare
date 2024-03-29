import React from "react";
import { useState } from "react";

const AddItem = ({setItemData, itemData}) => {
  const [name, setName] = useState("");
  const [quant, setQuant] = useState("");
  const [expDate, setExpDate]= useState("");
  
  const addNewData = () => {
    setItemData([...itemData, {id: itemData.length + 1, name: name, quantity: quant, expireDate: expDate}])
    setName('')
    setQuant('')
    setExpDate('')
  }
  return (
    <div>
        <input id="name" value={name} onChange={e=>setName(e.target.value)} placeholder="Name"></input>
        <input id="quant" value={quant} onChange={e=>setQuant(e.target.value)} placeholder="Quantity"></input>
        <input id="exp" value={expDate} onChange={e=>setExpDate(e.target.value)} placeholder="Expiry: MM/DD/YYYY"></input>
        <button onClick={addNewData}>Add Item</button>
    </div>
  )

}

export default AddItem