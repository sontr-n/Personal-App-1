import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../useForm';
import './Join.css';

import * as firebase from 'firebase/app';
import 'firebase/firestore';


const Join = ({ setUsername, setRoomName, setRoomId, username, roomName }) => {

  const fireLogin = roomName => {
    const db = firebase.firestore();
    const roomsRef = db.collection('rooms');
    roomsRef.where('roomName', '==', roomName)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          roomsRef.add({
            'roomName': roomName
          })
            .then(doc => {
              console.log('Creating room is succeeded');
              setRoomId(doc.id);
              setRoomName(doc.data().roomName);
            })
        }
        else {
          snapshot.forEach(doc => {
            setRoomId(doc.id);
            setRoomName(doc.data().roomName);
            console.log('Joined the room');
          });
        }
      })
  }

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Let's Chat</h1>
        <div>
          <input name="username" placeholder="Name" className="joinInput" type="text" onChange={setUsername} ></input>
        </div>
        <div>
          <input name="roomName" placeholder="Room" className="joinInput mt-20" type="text" onChange={setRoomName} ></input>
        </div>
        <Link to={`/chat`}>
          <button onClick={e => {
            if (!username || !roomName)
              e.preventDefault();
            else {
              fireLogin(roomName);
            }
          }
          } className="button mt-20" type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  )
}

export default Join;

