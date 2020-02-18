import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../useForm';
import './Join.css';
import firebase from '../Firebase';

const Join = () => {
  const [values, handleChange] = useForm({ username: '', room: '' });

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Let's Chat</h1>
        <div>
          <input name="username" placeholder="Name" className="joinInput" type="text" onChange={handleChange} ></input>
        </div>
        <div>
          <input name="roomName" placeholder="Room" className="joinInput mt-20" type="text" onChange={handleChange} ></input>
        </div>
        <Link to={`/chat`}>
          <button onClick={e => {
              if (!values.username || !values.roomName)
                e.preventDefault();
              else {
                if (!localStorage.getItem('username')) localStorage.setItem('username', values.username);
                firebase.signIn(values.roomName);
              }
            }
          } className="button mt-20" type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  )
}

export default Join;

