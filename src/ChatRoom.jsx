import { addDoc, collection, limit, orderBy, query, serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { auth, db } from './firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function ChatRoom() {
  const dummy = useRef(); //html을 선택하기 위한 객체
  const [formValue, setFormValue] = useState('');

  const messageRef = collection(db, 'messages'); //파이어스토어DB에 messages컬렉션
  const q = query(messageRef, orderBy('createAt'), limit(25));
  const [messages] = useCollectionData(q); //실시간 메세지들을 가져옴.

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser; //인증객체 auth에서 현재유저정보를 가져옴

    await addDoc(messageRef, {
      text: formValue,
      createAt: serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue('');
  };

  //채팅 메세지가 창의 마지막까지 내려 간경우 자동 스크롤
  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <main>
        {messages && messages.map((msg, idx) => <ChatMessage key={idx} message={msg} />)}

        <span ref={dummy}></span>
      </main>
      {/* (하단) 메세지 입력창 */}
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="메세지를 입력하세요~"
        />

        <button type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form>
    </>
  );
}

//채팅 메세지 표시
function ChatMessage({ message }) {
  const { text, uid, photoURL } = message; //메세지 객체 분리
  //uid가 유저와 같으면 내가 쓴 메세지 sent , 다른 사람
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
        <p>{text}</p>
      </div>
    </>
  );
}

export default ChatRoom;
