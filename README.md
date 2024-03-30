# Testing

## Outline
- [Testing](#testing)
  - [Outline](#outline)
  - [Introduction](#introduction)
  - [Installation](#installation)
    - [Install NodeJS and NPM](#install-nodejs-and-npm)
    - [Install testing packages](#install-testing-packages)
  - [Setup](#setup)
  - [Examples](#examples)
    - [Unit Testing](#unit-testing)
    - [React Component Testing](#react-component-testing)
    - [Integration Testing](#integration-testing)
    - [Regression Testing](#regression-testing)
    - [Testing Coverage](#test-coverage)
  - [References](#references)
 ## Introduction
 Software Testing is primarily aimed to ensure that the software system behaves as expected. It helps to ensure that the changes to the code base doesn't break existing functionality. Further, it helps improve developer efficiency especially in team settings by ensuring commits from one team member doesn't break the functionality implemented by other developers. There are various types of testing. Some of them are included below
 1. **Unit Testing:** Testing individual software components at a function or class level. This typically involves ensuring expected outputs for various test inputs.
 2. **Functional Testing:** It focuses on the business requirements of an application and ensure the output of an action is as expected.
 3. **Integration Testing:** Testing if different software components interact well with each other so that they work together as expected. 
 4. **Regression Testing:** These tests focus on ensuring the new changes doesn't break previous developed and tested software.
 if we do `npm run test` again, we can see everything works fine and we've passed the regression test!

 Also, we will introduce testing coverage so we could know how many lines our testing has covered.

 This article introduces [Vitest](https://vitest.dev/) which is a powerful Javascript testing framework and we will also learn how to use Vitest to test react applications.

 ## Installation
 ### Install NodeJS and NPM
The first step is to install NodeJS and Node Package Manager (NPM) based on your operating System from [here](https://nodejs.org/en/download). NodeJS is a runtime environment to execute our Javascript code outside the browser. NPM is the default package manager for NodeJS. It allows developers to easily share and install Javascript libraries.

### Install testing packages
The second step is to install the [Vitest](https://vitest.dev/) our main testing framework. Also we will need to install [jsdom](https://github.com/jsdom/jsdom) which emulates a web browser. We use npm that comes with NodeJS installation for this.
``` shell
npm install --save-dev vitest jsdom
```
To render react components for testing we need to install [react-testing-library](https://github.com/testing-library/react-testing-library). Further [jest-dom](https://github.com/testing-library/jest-dom) package makes testing much easier by providing an easy to use api for asserting various things about the state of the DOM. We can install these by 

``` shell
npm install --save-dev @testing-library/react @testing-library/jest-dom @vitest/coverage-v8 @vitejs/plugin-react
```
**Note:** --save-dev tells npm to place these installed packages in the devDependencies section of the package.json 

## Setup
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
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './testSetup.js',
  }
})
```
## Examples
### Unit Testing
Let's say we have a javascript file called sum.js containing a method, sum(), that calculates the sum of two numbers given as inputs (a, b).

 ``` js
  // sum.js
  const sum = (a, b) => a + b

  export default sum
 ```

We can use unit tests to check if the method is working as expected with different types of inputs.

1. Create a new file called *filename*.test.js, in this example it should be "sum.test.js".
2. Import the function to be tested from it's source file.
3. Each test will be consist of a call to test(), which takes in two inputs: the test name and a function to run.
4. The result obtained from the method we are testing can be stored in a const variable. 
5. To check whether this result matches the expected output, we use expect(result).toBe(expectedResult).
   
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

#### Item Component
Assume we have a React component called `Item`. This component takes in a single prop, datum, and its structure is represented by a JSX (JavaScript XML) which contains some HTML code. It renders a list item (\<li\>) with a class name of "item". Inside the list item, there are three paragraphs (\<p\>), each displaying different properties of the datum object passed as props. These properties are name, quantity, and expireDate.

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
To test whether a component, in this case Item, is being rendered correctly, we can write component tests. These will consist of rendering the component given a specific input and looking at the text in the screen for our expected output. The steps to write a basic component test would be:

1. Create a new file called *componentName*.test.jsx, in this example it should be "Item.test.jsx".
2. Import the *render* and *screen* libraries from the react testing library.
3. Import the component from its source code file.
4. Each test will be consist of a call to test(), which takes in two inputs: the test name and a function to run.
5. Define some mock data to pass as input for our component.
6. Render the content of the created component.
7. Using the screen.getText() method, we can obtain the HTML element containing some specific text that we expect should be in the screen.
8. If rendered correctly, the expected text should appeear in the screen. Using expect(element).toBeDefined(), we are ensuring the element is defined. In other words, the expected text is contained in the screen.

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
#### Button Component
``` js
// Button.jsx
import React from "react"
import { useState } from "react"

const Button = () => {
    const [pressed, setPressed] = useState(false)
    
    return (
        <button onClick={() => setPressed(!pressed)}>{pressed ? 'true' : 'false'}</button>
    )
}

export default Button
```

``` js
// Button.test.jsx
import { render, screen } from "@testing-library/react"
import Button from "./Button"
import { act } from "react-dom/test-utils"
import { expect } from "vitest"


test('button test', () => {
  render(<Button />)

  const element = screen.getByRole('button')
  expect(element).toBeDefined()
  expect(element).toHaveTextContent('false')
  act(() => element.click())
  expect(element).toHaveTextContent('true')
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
  import { fireEvent, render, screen } from "@testing-library/react"
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
Now we want to seperate adding item from our App.jsx. We simply create another component called AddItem.jsx and if everything is correct, we should get the same result as before.

By running `npm run test` again, we can see we've passed all the test cases defined before so everything works fine after our refactoring.
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

### Test Coverage

Test Coverage is a measure of what percent of the code is covered through tests. To effectively maintain large projects we need high code coverage.

VITEST needs `@vitest/coverage-v8` package to get test coverage results. It can be installed through 

``` shell
npm install --save-dev @vitest/coverage-v8
```

By adding the coverage script in our `package.json`, we could use `npm run coverage` to see our testing coverage. 

``` json
{
  "scripts": {
    // ...
    "test": "vitest run",
    "coverage": "vitest run --coverage"
  }
  // ...
}
```

Below are the coverage results for this sample react project created for this article. We could see that across all the files `90% `of the lines are covered through some form of tests


``` shell
 $ npm run coverage

 ✓ src/components/sum.test.js (2)
 ✓ src/components/Item.test.jsx (1)
 ✓ src/components/Button.test.jsx (1)
 ✓ src/App.test.jsx (1)

 Test Files  4 passed (4)
      Tests  5 passed (5)
   Start at  15:09:18
   Duration  1.23s (transform 131ms, setup 1.27s, collect 176ms, tests 190ms, environment 1.71s, prepare 301ms)

 % Coverage report from v8
----------------|---------|----------|---------|---------|-------------------
File            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------|---------|----------|---------|---------|-------------------
All files       |      90 |    92.85 |    90.9 |      90 |                   
 src            |   80.35 |    66.66 |      50 |   80.35 |                   
  App.jsx       |     100 |      100 |     100 |     100 |                   
  index.js      |       0 |        0 |       0 |       0 | 1-11              
  mock.js       |     100 |      100 |     100 |     100 |                   
 src/components |     100 |      100 |     100 |     100 |                   
  AddItem.jsx   |     100 |      100 |     100 |     100 |                   
  Button.jsx    |     100 |      100 |     100 |     100 |                   
  Item.jsx      |     100 |      100 |     100 |     100 |                   
  sum.js        |     100 |      100 |     100 |     100 |                   
----------------|---------|----------|---------|---------|-------------------
```


## References
 - [https://vitest.dev/](https://vitest.dev/)
 - [https://fullstackopen.com](https://fullstackopen.com)
 - [https://legacy.reactjs.org/docs/testing.html](https://legacy.reactjs.org/docs/testing.html)
 - [https://testing-library.com/docs/react-testing-library/intro/](https://testing-library.com/docs/react-testing-library/intro/)
