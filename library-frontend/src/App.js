import React from 'react';
import './App.css';

import { BooksList } from './features/books/BooksList'
import { PublishersList } from './features/publishers/PublishersList'
import { CheckedOutList } from './features/checkedouts/CheckedOutList'

function App() {
  return (
    <div className="App">
        <BooksList />
        <PublishersList />
        <CheckedOutList />
    </div>
  );
}

export default App;
