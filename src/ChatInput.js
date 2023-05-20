import React, { useState } from 'react'
import "./ChatInput.css"
import { useStateValue } from './StateProvider';
import db from './firebase';
import firebase from 'firebase';

function ChatInput({ channelName, channelId }) {

  const [input, setInput] = useState("");
  const [{ user }] = useStateValue();

  const sendMessage = (e) => {
    e.preventDefault();

    if (channelId) {
      db.collection("rooms").doc(channelId).collection("messages").add({
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: user.displayName,
        userImage: user.photoURL,
      })
    }
    setInput("");
  }

  return (
    <div className="chatInput">
      <form>
        <input placeholder={`Message #${channelName?.toLowerCase()}`} value={input} type="text" onChange={(e) => setInput(e.target.value)} />
        <button disabled={!input} type="submit" onClick={sendMessage}>Send</button>
      </form>
    </div>
  )
}

export default ChatInput
