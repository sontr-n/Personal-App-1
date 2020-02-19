import React, { useState, useEffect } from 'react';

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

import * as firebase from 'firebase/app';
import 'firebase/firestore';


const Chat = ({ username, roomName, roomId}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const db = firebase.firestore();

  // useEffect(() => {
  //   const messageRef = db.collection('rooms').doc(roomId).collection('messages');
  //   messageRef.get()
  //     .then(snapshot => {
  //       let newMessages = [];
  //       snapshot.forEach(doc => {
  //         newMessages.push(doc.data());
  //       });
  //       setMessages(newMessages);
  //     });
  // });

  const fireSendMessage = (message) => {
    const roomId = localStorage.getItem('roomId');
    const username = localStorage.getItem('username');
    console.log(message);
    let messageRef = db.collection('rooms').doc(roomId).collection('messages');
    messageRef.add({
      'message': message,
      'username': username
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
        <Input message={message} handleChange={e => setMessage(e.target.value)} sendMessage={sendMessage} />
      </div>
      <TextContainer />
    </div>
  )
}

export default Chat;