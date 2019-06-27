import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
//import App from './App';
import Main from './components/Main'
import { BrowserRouter } from 'react-router-dom'


//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<BrowserRouter><Main /></BrowserRouter>, document.getElementById('root'));
