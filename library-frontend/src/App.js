import React from 'react';
import './App.css';

import { BooksList } from './features/books/BooksList'
import { PublishersList } from './features/publishers/PublishersList'

function App() {
  return (
    <div className="App">
        <BooksList />
        <PublishersList />
    </div>
  );
}

export default App;
