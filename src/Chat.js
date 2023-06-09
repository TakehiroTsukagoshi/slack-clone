import React from 'react'
import { useParams } from 'react-router-dom'
import "./Chat.css"
import StarBorderIcon from '@material-ui/icons/StarBorder';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import db from './firebase';
import { useEffect } from 'react';
import { useState } from 'react';
import Message from './Message';
import ChatInput from './ChatInput';

function Chat() {

  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null)
  const [roomMessages, setRoomMessages] = useState([])


  useEffect(() => {
    if (roomId) {
      db.collection("rooms").doc(roomId).onSnapshot((snapshot) => {
        setRoomDetails(snapshot.data())
      })
    }
    db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp", "asc").onSnapshot((snapshot) => {
      setRoomMessages(snapshot.docs.map((doc) => doc.data()))
    })
  }, [roomId])

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
          <h4 className="chat__channelName">
            <strong># {roomDetails?.name}</strong>
            <StarBorderIcon />
          </h4>
        </div>

        <div className="chat_headerRight">
          <p>
            <InfoOutlinedIcon />Details
          </p>
        </div>
      </div>
      <div className="chat__messages">
        {roomMessages.map(({ message, user, userImage, timestamp }) => (
          <Message 
            message={message}
            user={user}
            userImage={userImage}
            timestamp={timestamp}
          />
        ))}
      </div>
      <div className="chat__footer">
        <ChatInput channelName={roomDetails?.name} channelId={roomId} />
      </div>
    </div>
  )
}

export default Chat