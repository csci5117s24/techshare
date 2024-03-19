import './App.css';
import Item from './Item.js'
import data from './mock.js'

const App = () => {
  return (
    <>
      <h1>Fridge Tracker</h1>
      {data.map(datum => <Item datum={datum} />)}
    </>
  );
}

export default App;
