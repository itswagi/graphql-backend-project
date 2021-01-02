import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client'

import { BooksList } from './features/books/BooksList'
import { PublishersList } from './features/publishers/PublishersList'
import { CheckedOutList } from './features/checkedouts/CheckedOutList'
import { NavBar } from './features/NavBar/NavBar'
import { Search } from './features/search/search'
import { Login } from './features/Login/Login'

const token = localStorage.getItem('token');
const link = createHttpLink({
  uri: 'http://localhost:4001/graphql',
  credentials: 'same-origin'
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
  credentials: 'include',
  headers: {
    authorization: token ? `Bearer ${token}` : "",
  }
})
// const login = gql`
//   mutation{
//       login(email: "abc", password: "12345"){
//           token
//       }
// }
// `
// client.mutate({ mutation: login}).then( result => console.log(result)).catch(err => console.log(err))
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
                    <BooksList />
                    <PublishersList />
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

export default App;
