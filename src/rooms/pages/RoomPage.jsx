import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useRoomStore } from '../../hooks';
import { ListOfUsers } from '../components/ListOfUsers';

export const RoomPage = () => {

  const {room_id, type} = useRoomStore();

  const {user} = useSelector( state => state.auth );
 
  const [welcomeMessage, setWelcomeMessage] = useState('')
  const [listUsers, setListUsers] = useState([])

  const { readyState, sendJsonMessage } = useWebSocket(`ws://127.0.0.1:8000/${room_id}/`, {
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
      console.log(data, data.type)
      switch (data.type) {
        case 'room_created':
          console.log('case room_created')
          setWelcomeMessage(data.message)
        case 'user_joined':
          console.log('case user_joined')
          setWelcomeMessage(data.message)
        case 'list_of_users':
          console.log('case list_of_users')
          setListUsers(data.users)
        case 'user_leave':
          console.log('case user_leave')
        case 'start_game':
          console.log('case start_game')
        default:
          console.error('Unknown message type!');
          break;
      }
    }
  });

  useEffect(() => {
    sendJsonMessage({type: type})
    console.log('use efectss', type)
  }, [])
  

  const connectionStatus = {
      [ReadyState.CONNECTING]: 'Connecting',
      [ReadyState.OPEN]: 'Open',
      [ReadyState.CLOSING]: 'Closing',
      [ReadyState.CLOSED]: 'Closed',
      [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

  return (
      <div className='room__container'>
        <span className='room__header'>{welcomeMessage} {user.email}</span>
        <ListOfUsers users={listUsers} />
        <button>Start Game</button>
      </div>
  )
}
