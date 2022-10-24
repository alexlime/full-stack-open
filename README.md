# Full Stack open 2022: submitted apps/exercices 

> [fullstackopen.com](https://fullstackopen.com/en)

- [x] **Part 0 Fundamentals of Web apps**
  - Completed diagrams depicting the situations where the user creates a new note on the traditional [web page](https://studies.cs.helsinki.fi/exampleapp/notes) and [single page app](https://studies.cs.helsinki.fi/exampleapp/spa)
  - Main topics:
    - Traditional web apps vs single page apps
    - Basic concepts, e.g., event handlers and callbacks, DOM, forms and HTTP requests, etc.

- [x] **Part 1 Introduction to React**
  - Completed React apps:
    - *anecdotes* 
    - *courseinfo*
    - *unicafe*
  - Main topics:
    - Passing data, state and event handlers to the child components
    - Complex state, hooks and re-rendering

- [x] **Part 2: Communicating with server**
  - Completed React apps:
    - *countries* (using external API)
    - *courseinfo* 
    - *phonebook* 
  - Main topics:
    - Rendering collections and forms 
    - Effect-hooks
    - Getting and altering data in server using [json-server](https://github.com/typicode/json-server) (fake REST API)
    - Promises and errors
    - Adding styles

- [x] **Part 3 Programming a server with NodeJS and Express**
  - Completed apps:
    - *phonebook* (React app)
    - *phonebook-backend* [app deployed to Heroku](https://tranquil-savannah-80727.herokuapp.com)
  - Main topics:
    - Usng express and implementing REST api
    - Setting up middleware
    - Deploying to Heroku
    - Deploying MongoDB ([MongoDB Atlas](https://www.mongodb.com/atlas/database)) and connecting backend to the database.
    - Frontend production build
    - ESlint, validation and notifications

- [x] **Part 4 Testing Express servers, user administration**
  - Completed apps:
    - *bloglist* (backend app)
  - Main topics:
    - Integration tests for the backend app using [Jest](https://jestjs.io/) and [supertest](https://github.com/visionmedia/supertest)  
    - async/await and eliminating try/catch structure 
    - User administration (creating users, mongoose schema for users)
    - Mongoose populate method (join queries)
    - Token administration 

- [x] **Part 5 Testing React apps**
  - Completed apps:
    - *bloglist-frontend*
  - Main topics:
    - Handling login with React, token authentication and localstorage (unsing *bloglist* backend app api from part 4) 
    - Handling blogs (create, delete, like button, etc.)
    - Unit testing with Jest and [react-testing-library](https://github.com/testing-library/react-testing-library)
    - End to end testing with [cypress](https://www.cypress.io/)

- [x] **Part 6 State management with Redux**
  - Completed apps:
    - *unicafe-redux*
    - *redux-anecdotes*
  - Main topics:
    - Implementing reducer and its tests, action creators and uncontrolled forms
    - Using Redux Toolkit
      - communicating with server in a redux app
      - redux thunk and async actions
    - Using redux-store with newer hook api and older `connect` function provided by react-redux

- [ ] **Part 7 React router, custom hooks, styling app with CSS and webpack**
  - Completed apps:
    - ...
    - ...
  - Main topics: 
    - ...