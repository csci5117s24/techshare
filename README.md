# Testing

## Outline
- [Testing](#testing)
  - [Outline](#outline)
    - [Introduction](#introduction)
    - [Installation](#installation)
      - [Install NodeJS and NPM](#install-nodejs-and-npm)
      - [Install testing packages](#install-testing-packages)
    - [Setup](#setup)
    - [Unit Testing](#unit-testing)
    - [React Component Testing](#react-component-testing)
    - [Integration Testing](#integration-testing)
    - [Regression Testing](#regression-testing)
  - [References](#references)
 ### Introduction
 Software Testing is primarily aimed to ensure that the software system behaves as expected. It helps to ensure that the changes to the code base doesn't break existing functionality. Further, it helps improve developer efficiency especially in team settings by ensuring commits from one team member doesn't break the functionality implemented by other developers. There are various types of testing. Some of them are included below
 1. **Unit Testing:** Testing individual software components at a function or class level. This typically involves ensuring expected outputs for various test inputs.
 2. **Functional Testing:** It focuses on the business requirements of an application and ensure the output of an action is as expected.
 4. **Integration Testing:** Testing if different software components interact well with each other so that they work together as expected. 
 3. **Regression Testing:** These tests focus on ensuring the new changes doesn't break previous developed and tested software.
 if we do `npm run test` again, we can see everything works fine and we've passed the regression test!

 This article introduces [Vitest](https://vitest.dev/) which is a powerful Javascript testing framework and we will also learn how to use Vitest to test react applications.

 ### Installation
 #### Install NodeJS and NPM
The first step is to install NodeJS and Node Package Manager (NPM) based on your operating System from [here](https://nodejs.org/en/download). NodeJS is a runtime environment to execute our Javascript code outside the browser. NPM is the default package manager for NodeJS. It allows developers to easily share and install Javascript libraries.

#### Install testing packages
The second step is to install the [Vitest](https://vitest.dev/) our main testing framework. Also we will need to install [jsdom](https://github.com/jsdom/jsdom) which emulates a web browser. We use npm that comes with NodeJS installation for this.
``` shell
npm install --save-dev vitest jsdom
```
To render react components for testing we need to install [react-testing-library](https://github.com/testing-library/react-testing-library). Further [jest-dom](https://github.com/testing-library/jest-dom) package makes testing much easier by providing an easy to use api for asserting various things about the state of the DOM. We can install these by 

``` shell
npm install --save-dev @testing-library/react @testing-library/jest-dom
```
**Note:** --save-dev tells npm to place these installed packages in the devDependencies section of the package.json 

### Setup
To run the tests we need to add the following to the package.json file
``` json
{
  "scripts": {
    // ...
    "test": "vitest run"
  }
  // ...
}
```
To reset the jsdom that is emulating the browser after each test create `testSetup.js` file in the root of the project with the following content

``` js
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

afterEach(() => {
  cleanup()
})

```

One last thing in our setup is to configure vitest to use testSetup.js. Add the following content to the `vite.config.js` file in the project root folder.

``` js
export default defineConfig({
  // ...
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './testSetup.js', 
  }
})
```

### Unit Testing
 ``` js
  // sum.js
  const sum = (a, b) => a + b

  export default sum
 ```
 ``` js
  // sum.test.js
  import sum from "./sum"

  test('sum test', () => {
    const result = sum(1, 2)
    expect(result).toBe(3)
  })

  test('sum test', () => {
    const result = sum(-1, 2)
    expect(result).toBe(1)
  })
 ```

### React Component Testing
 ``` js
  // Item.jsx
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
 ```
 ``` js
  // Item.test.jsx
  import { render, screen } from "@testing-library/react";
  import Item from "./Item";

  test('render content', () => {
    const datum = {
      name: "milk",
      quantity: 6,
      expireDate: '05/01/2024'
    }

    render(<Item datum={datum} />)

    const element = screen.getByText('name: milk')
    expect(element).toBeDefined()
  })
 ```

 ### Integration Testing
 ``` js
  // App.jsx
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

 ```
 ``` js
  // App.test.jsx
  import { act, fireEvent, render, screen } from "@testing-library/react"
  import { expect } from "vitest"
  import App from "./App"

  test('App test', () => {
    const result = render(<App />);

    const addButton = screen.getByText('Add Item')
    expect(addButton).toBeDefined();
    const nameInput = screen.getByPlaceholderText('Name')
    const quantityInput = screen.getByPlaceholderText('Quantity')
    const expInput = screen.getByPlaceholderText('Expiry: MM/DD/YYYY')
    expect(nameInput).toBeDefined()
    expect(quantityInput).toBeDefined()
    expect(expInput).toBeDefined()
    const itemsBefore = screen.getAllByRole('listitem')

    fireEvent.change(nameInput, { target: { value: 'Test Item'}})
    fireEvent.change(quantityInput, { target: { value: '1'}})
    fireEvent.change(expInput, { target: { value: '01/01/2024'}})

    fireEvent.click(addButton)

    const itemsAfter = screen.getAllByRole('listitem')
    expect(itemsAfter.length).toBe(itemsBefore.length + 1)
    const newItem = screen.getByText('name: Test Item')
    expect(newItem).toBeDefined()
  })

 ```
### Regression Testing
 ``` js
  // AddItem.jsx
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

 ```

 ``` js
  // App.jsx
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
 ```


## References
 - [https://vitest.dev/](https://vitest.dev/)