import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink, concat} from '@apollo/client'

import { BooksList } from './features/books/BooksList'
import { PublishersList } from './features/publishers/PublishersList'
import { CheckedOutList } from './features/checkedouts/CheckedOutList'
import { NavBar } from './features/NavBar/NavBar'
import { Search } from './features/search/search'
import { Login } from './features/Login/Login'

const httpLink = new HttpLink({
  uri: 'http://localhost:4001/graphql',
  credentials: 'same-origin'
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}` || null,
    }
  });

  return forward(operation);
})
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
  // headers: {
  //   authorization: (localStorage.getItem('token') !== null) ? `Bearer ${localStorage.getItem('token')}` : "",
  // }
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <NavBar />
          <div className="content">
            <Switch>
              <Route exact path="/" render={ () => (
                  <>
                    <CheckedOutList />
                  </>
                )}
              />
              <Route exact path="/search" component={Search}/>
              <Route exact path="/login" component={Login}/>
              <Redirect to="/" />
            </Switch>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}


export { client }
export default App;
