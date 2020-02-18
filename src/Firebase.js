import * as firebase from 'firebase/app';
import 'firebase/firestore';


class Firebase {

  constructor() {
    this.init();
  }

  init = () => {
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

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      console.log('Firebase is initialized');
    }

    this.db = firebase.firestore();
  }

  signIn = roomName => {
    let roomsRef = this.db.collection('rooms');
    roomsRef.where('roomName', '==', roomName)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          roomsRef.add({
            'roomName': roomName
          })
            .then(doc => {
              console.log('Creating room is succeeded');
              localStorage.setItem('roomId', doc.id);
            })
        }
        else {
          snapshot.forEach(doc => {
            localStorage.setItem('roomId', doc.id);
            console.log('Joined the room');
          });
        }
      })
  }

  sendMessage = message => {
    const roomId = localStorage.getItem('roomId');
    const username = localStorage.getItem('userName');
    let messageRef = this.db.collection('rooms').doc(roomId).collection('messages');
    messageRef.add({
      'message': message,
      'userName': username
    });
  }
}

export default new Firebase();
