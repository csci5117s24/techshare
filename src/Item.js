const Item = ({ datum }) => {
  return (
    <div className="item">
      <p>name: {datum.name}</p>
      <p>quantity: {datum.quantity}</p>
      <p>expireDate: {datum.expireDate}</p>
    </div>
  )
}

export default Item;