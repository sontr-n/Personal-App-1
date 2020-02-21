import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from '../Join/Join';
import Chat from '../Chat/Chat';

const App = () => {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomId, setRoomId] = useState('');

  return (
    <Router>
      <Route path='/' exact render={props =>
        <Join {...props} setUsername={setUsername}
          setRoomName={setRoomName}
          setRoomId={setRoomId}
          username={username}
          roomName={roomName} />
      } />
      <Route path='/chat' exact render={props =>
        <Chat {...props} username={username}
          roomName={roomName}
          roomId={roomId}
          setUsername={setUsername}
          setRoomName={setRoomName}
          setRoomId={setRoomId} />
      } />
    </Router>
  )
}

export default App;
