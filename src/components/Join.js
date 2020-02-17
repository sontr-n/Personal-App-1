import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../useForm';
import './Join.css';

const Join = () => {
  const [values, handleChange] = useForm({ name: '', password: '' });


  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Let's Chat</h1>
        <div>
          <input name="name" placeholder="Name" className="joinInput" type="text" onChange={handleChange} ></input>
        </div>
        <div>
          <input name="room" placeholder="Room" className="joinInput mt-20" type="text" onChange={handleChange} ></input>
        </div>
        <Link to={`/chat`}>
          <button onClick={e => (!values.name || !values.room) ? e.preventDefault() : null} className="button mt-20" type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  )
}

export default Join;

 