import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.css';

import { BooksList } from './features/books/BooksList'
import { PublishersList } from './features/publishers/PublishersList'
import { CheckedOutList } from './features/checkedouts/CheckedOutList'
import { NavBar } from './features/NavBar/NavBar'
import { Search } from './features/search/search'

function App() {
  return (
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
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    </Router>
    
  );
}

export default App;
