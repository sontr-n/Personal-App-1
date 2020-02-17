import React from 'react';
// import './App.css';
// import Chat from './Chat.js'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './components/Join.js';
import Chat from './components/Chat.js';

const App = () => {
  return (
    <Router>
      <Route path='/' exact component={Join} />
      <Route path='/chat' component={Chat} />
    </Router>
  )
}

export default App;
