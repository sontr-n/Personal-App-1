import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

import * as firebase from 'firebase/app';


const firebaseConfig = {
  apiKey: "AIzaSyANMZtsW4YYMO5q-pBH9IDSggpr5CIHPJQ",
  authDomain: "chat-app-1b4a1.firebaseapp.com",
  databaseURL: "https://chat-app-1b4a1.firebaseio.com",
  projectId: "chat-app-1b4a1",
  storageBucket: "chat-app-1b4a1.appspot.com",
  messagingSenderId: "267864067459",
  appId: "1:267864067459:web:24eea21336279b7c3afab6",
  measurementId: "G-V0T8M6W1VK"
};

firebase.initializeApp(firebaseConfig);
console.log('Firebase is initialized');


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
