import React, { useState, useEffect } from 'react';

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

import * as firebase from 'firebase/app';
import 'firebase/firestore';


const Chat = ({ username, roomName, roomId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState({ loading: false });
  const db = firebase.firestore();

  useEffect(() => {
    const updateMessage = () => {
      console.log('update');
      setLoading(true);
      if (roomId !== '') {
        db.collection('rooms').doc(roomId).collection('messages')
          .onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
              if (change.type === 'added') {
                let doc = change.doc;
                let mess = { text: doc.data().message, user: doc.data().username };
                setMessages(messages => [...messages, mess]);
              }
            });
          });
        setLoading(false);
      }
    }

    updateMessage();
  }, [roomId])


  const fireSendMessage = (message) => {
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
        <Messages messages={messages} username={username} />
        <Input message={message} handleChange={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer />
    </div>
  )
}

export default Chat;