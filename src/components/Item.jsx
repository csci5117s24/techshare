import React from "react";

const Item = ({ datum }) => {
  return (
    <li className="item">
      <p>name: {datum.name}</p>
      <p>quantity: {datum.quantity}</p>
      <p>expireDate: {datum.expireDate}</p>
    </li>
  )
}

export default Item;
