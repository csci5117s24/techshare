# Testing

## Outline
 - [Introduction](#introduction)
 - [Installation](#installation)
    - [Install NodeJS and NPM](#install-nodejs-and-npm)
    - [Install VITEST](#install-testing-packages)
 - [Setup](#setup)
 - [Simple Test Cases](#simple-test-cases)
 - [React Component Testing](#react-component-testing)

 ### Introduction
 Software Testing is primarily aimed to ensure that the software system behaves as expected. It helps to ensure that the changes to the code base doesn't break existing functionality. Further, it helps improve developer efficiency especially in team settings by ensuring commits from one team member doesn't break the functionality implemented by other developers. There are various types of testing. Some of them are included below
 1. **Unit Testing:** Testing individual software components at a function or class level. This typically involves ensuring expected outputs for various test inputs.
 2. **Integration Testing:** Testing if different software components interact well with each other so that they work together as expected. 
 3. **Functional Testing:** It focuses on the business requirements of an application and ensure the output of an action is expected.
 4. **Regression Testing:** These tests focus on ensuring the new changes doesn't break previous developed and tested software.
 5. **End-to-End Testing:** Testing at application level that simulate real world scenarios.

 This article introduces [VITEST](https://vitest.dev/) which is a powerful Javascript testing framework and we will also learn how to use VITEST to test react applications.

 ### Installation
 #### Install NodeJS and NPM
The first step is to install NodeJS and Node Package Manager (NPM) based on your operating System from [here](https://nodejs.org/en/download). NodeJS is a runtime environment to execute our Javascript code outside the browser. NPM is the default package manager for NodeJS. It allows developers to easily share and install Javascript libraries.

#### Install testing packages
The second step is to install the [VITEST](https://vitest.dev/) our main testing framework. Also we will need to install [jsdom](https://github.com/jsdom/jsdom) which emulates a web browser. We use npm that comes with NodeJS installation for this.
```
npm install --save-dev vitest jsdom
```
To render react components for testing we need to install [react-testing-library](https://github.com/testing-library/react-testing-library). Further [jest-dom](https://github.com/testing-library/jest-dom) package makes testing much easier by providing an easy to use api for asserting various things about the state of the DOM. We can install these by 

```
npm install --save-dev @testing-library/react @testing-library/jest-dom
```
**Note:** --save-dev tells npm to place these installed packages in the devDependencies section of the package.json 

### Setup

 ### Simple Test Cases


 ### React Component Testing


## reference
 - [https://vitest.dev/](https://vitest.dev/)