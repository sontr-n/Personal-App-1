import React, { useState, useEffect } from 'react';

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import Spinner from '../Spinner/Spinner';

const Chat = ({ username, roomName, roomId, setUsername, setRoomName, setRoomId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const db = firebase.firestore();
    setLoading(true);
    const updateMessage = new Promise((resolve, reject) => {
      setMessages([]);
      console.log('update');
      console.log(loading);
      if (roomId !== '') {
        db.collection('rooms').doc(roomId).collection('messages')
          .orderBy('timestamp')
          .onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
              if (change.type === 'added') {
                let doc = change.doc;
                let mess = { text: doc.data().message, user: doc.data().username };
                setMessages(messages => [...messages, mess]);
              }
            });
            resolve();
          });
      }
    })
    updateMessage.then(() => setLoading(false));
    console.log(loading);
  }, [roomId])


  //reload page
  useEffect(() => {
    console.log('test');
    if (localStorage.getItem('roomId') && localStorage.getItem('username') && localStorage.getItem('roomName')) {
      setUsername(localStorage.getItem('username'));
      setRoomName(localStorage.getItem('roomName'));
      setRoomId(localStorage.getItem('roomId'));
    }
  }, [setRoomName, setUsername, setRoomId])




  const fireSendMessage = (message) => {
    const db = firebase.firestore();
    // console.log(messages);
    let messageRef = db.collection('rooms').doc(roomId).collection('messages');
    messageRef.add({
      'message': message,
      'username': username,
      'timestamp': Date.now()
    });
  }

  const sendMessage = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      fireSendMessage(message);
      setMessage('');
    }
    return null;
  }

  return (
    <div className='outerContainer'>
      <div className='container'>
        <InfoBar roomName={roomName} />
        {loading
          ? <Spinner />
          : <Messages messages={messages} username={username} />
        }
        <Input message={message} handleChange={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer />
    </div>
  )
}

export default Chat;