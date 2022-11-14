import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useForm, useRoomStore } from '../../hooks';

const searchRoomFields = {
  inputRoomId: '',
}

export const IndexPage = () => {

  
  const {inputRoomId, onInputChange: onRoomIdChange} = useForm(searchRoomFields);
  
  const [socketUrl, setSocketUrl] = useState('ws://127.0.0.1:8000/');
  const [showJoinInput, setShowJoinInput] = useState(false)
  const {user} = useSelector( state => state.auth );
  const {handleCreateRoom} = useRoomStore();

  let navigate = useNavigate();

  const { readyState, sendJsonMessage } = useWebSocket(localStorage.getItem('token') ? socketUrl: null, {
    queryParams: {
      token: localStorage.getItem('token') ? localStorage.getItem('token') : "",
    },
    onOpen: () => {
      console.log("Connected!")
    },
    onClose: () => {
      console.log("Disconnected!")
    },
    onMessage: (e) => {
      const data = JSON.parse(e.data)
      console.log(data, data.type, data.roomId)
      switch (data.type) {
        case 'create_room':
          console.log('case create');
          handleCreateRoom({room_id: data.roomId, type: 'create_room'});
          return navigate(`/${data.roomId}`);
        case 'join_room':
          console.log('case join_room');
          handleCreateRoom({room_id: inputRoomId, type: 'join_room'});
          return navigate(`/${inputRoomId}`);
        case 'join_room_failed':
          console.log('case join_room_failed')
        default:
          console.error('Unknown message type!');
          break;
      }
    }
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  const handleRoomCreate = () => {
    sendJsonMessage({ type: "create_room" });
  }

  const handleJoinRoom = (e) => {
    e.preventDefault()
    setShowJoinInput(!showJoinInput)
  }

  const handleSearchRoom = (e) => {
    e.preventDefault();
    console.log(inputRoomId)
    sendJsonMessage({ type: "join_room", room_id:inputRoomId });
  }

  return (
    <>
      <div className="index__container">
        <h1 className="index__header">
          <p>Welcome {user.name}</p>
        </h1>
        <button className="index__button" onClick={handleRoomCreate}>
          <p>Create Room</p>
        </button>
        <form onSubmit={handleSearchRoom} className="index__form">
          <button onClick={handleJoinRoom} className="index__button">
            <p>Search Room</p>
          </button>
          {
            showJoinInput && <div><input type="text" name="inputRoomId" value={inputRoomId} onChange={onRoomIdChange} /> <button type='submit' className="index__button"><p>Join Room</p></button></div>
          }
        </form>
      </div>
    </>
  )
}
