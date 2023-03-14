# Full Stack open: completed apps
React, NodeJS, Express, Redux, Testing, MongoDB, GraphQL

> [fullstackopen.com](https://fullstackopen.com/en)

#### **Part 0 Fundamentals of Web apps**
#### **Part 1 Introduction to React**
  - React apps:
    - *anecdotes* 
    - *courseinfo*
    - *unicafe*
  - Topics:
    - Passing data, state and event handlers to the child components
    - Complex state, hooks and re-rendering

#### **Part 2: Communicating with server**
  - React apps:
    - *countries* (using external API)
    - *courseinfo* 
    - *phonebook* 
  - Topics:
    - Rendering collections and forms 
    - Effect-hooks
    - Getting and altering data in server using [json-server](https://github.com/typicode/json-server) (fake REST API)
    - Promises and errors
    - Adding styles

#### **Part 3 Programming a server with NodeJS and Express**
  - Apps:
    - *phonebook* (React app)
    - *phonebook-backend* [app deployed to Heroku](https://tranquil-savannah-80727.herokuapp.com)
  - Topics:
    - Usng express and implementing REST api
    - Setting up middleware
    - Deploying to Heroku
    - Deploying MongoDB ([MongoDB Atlas](https://www.mongodb.com/atlas/database)) and connecting backend to the database.
    - Frontend production build
    - ESlint, validation and notifications

#### **Part 4 Testing Express servers, user administration**
  - Apps:
    - *bloglist* (backend app)
  - Topics:
    - Integration tests for the backend app using [Jest](https://jestjs.io/) and [supertest](https://github.com/visionmedia/supertest)  
    - async/await and eliminating try/catch structure 
    - User administration (creating users, mongoose schema for users)
    - Mongoose populate method (join queries)
    - Token administration 

#### **Part 5 Testing React apps**
  - Apps:
    - *bloglist-frontend*
  - Topics:
    - Handling login with React, token authentication and localstorage (unsing *bloglist* backend app api from part 4) 
    - Handling blogs (create, delete, like button, etc.)
    - Unit testing with Jest and [react-testing-library](https://github.com/testing-library/react-testing-library)
    - End to end testing with [cypress](https://www.cypress.io/)

#### **Part 6 State management with Redux**
  - Apps:
    - *unicafe-redux*
    - *redux-anecdotes*
  - Topics:
    - Implementing reducer and its tests, action creators and uncontrolled forms
    - Using Redux Toolkit
      - communicating with server in a redux app
      - redux thunk and async actions
    - Using redux-store with newer hook api and older `connect` function provided by react-redux

#### **Part 7 React router, custom hooks, styling app with CSS and webpack**
  - Apps:
    - *bloglist-frontend*
    - *routed-anecdotes*
    - *country-hook*
    - *ultimate-hooks*
  - Topics: 
    - Implementing React router. Parameterised routes, `useMatch`, `useParams` and `useNavigate` hooks.
    - Custom hooks
    - CSS Styles and UI libraries
    - Class Components
    - Webpack: bundling minimal React app 
    - *bloglist-frontend* app (*from part5*) refactored with Redux, React Router, UI library

#### **Part 8 GraphQL**
  - Apps:
    - *library-frontend* (React app for GraphQL)
    - *library-backend* (GraphQL and Apollo server app)

  - Topics: 
    - Implementing GraphQL using Apollo Server library
    - GraphQL schema, queries, resolvers, mutations, error handling
    - React and GraphQL, application state
    - Mongoose and Apollo, user log in
    - Using mongoDB transactions: writing to multiple documents