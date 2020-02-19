import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import './Messages.css';

import Message from './Message/Message';



const Messages = ({ messages, username }) => {
  return (
    // <h1>{messages}</h1>
    <ScrollToBottom class='messages'>
      {messages.map((message, idx) => <div key={idx}><Message message={message} username={username} /></div>)}
    </ScrollToBottom>
  )

}

export default Messages;