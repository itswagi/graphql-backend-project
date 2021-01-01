import React from 'react';
import './App.css';

import { BooksList } from './features/books/BooksList'
import { PublishersList } from './features/publishers/PublishersList'
import { CheckedOutList } from './features/checkedouts/CheckedOutList'
import { NavBar } from './features/NavBar/NavBar'


function App() {
  return (
    <div className="App">
        <NavBar />
        <div className="content">
          <BooksList />
          <PublishersList />
          <CheckedOutList />
        </div>
        
    </div>
  );
}

export default App;
