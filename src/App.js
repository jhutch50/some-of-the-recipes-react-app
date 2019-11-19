import React, { useState, useEffect } from 'react'; //useState is for state management and useEffect is for data loading
import Moment from 'moment'; //for date/time adjustment
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Create from './pages/Create';
import Contribute from './pages/Contribute';

function App() { 
  return (
    <Router>
      <div className="App">
        <header>
          <h1>SOMEofTheRecipes</h1>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create">Create</Link>
            </li>
          </ul>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/create" component={Create}/>
              <Route exact path="/contribute/:id" component={Contribute}/>
            </Switch>
          </div>
        </header>

      </div>
    </Router>
  );
}

export default App;
