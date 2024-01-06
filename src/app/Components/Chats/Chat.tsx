import React, { useState, useEffect, useRef } from "react";
import styles from "./Chat.module.css";

interface Props {
  userResponse: string;
  botResponse: {
    purpose: string;
    message: string;
    options?: string[];
    sender: string;
  };
  sendUserResponse: string;
  optionClick: (ev: React.MouseEvent<HTMLElement>) => void;
}

interface MessagesInfo {
  purpose?: string;
  message: string;
  options?: string[];
  sender: string;
}

const Chats: React.FC<Props> = props => {
  const [messages, setMessages] = useState<MessagesInfo[]>([]);
  const dummyRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          purpose: "introduction",
          message: "Hi there. I am the SVG Chatbot. Tell me, what's your name?",
          sender: "bot"
        }
      ]);
    } else {
      let tempArray = [...messages];
      tempArray.push({ message: props.sendUserResponse, sender: "user" });
      setMessages(tempArray);

      setTimeout(() => {
        let temp2 = [...tempArray];
        temp2.push(props.botResponse);
        setMessages(temp2);
      }, 1000);
    }
  }, [props.sendUserResponse, props.botResponse]);

  useEffect(() => {
    if (dummyRef && dummyRef.current && bodyRef && bodyRef.current) {
      bodyRef.current.scrollTo({
        top: dummyRef.current.offsetTop,
        behavior: "smooth"
      });
    }
  }, [messages]);

  return (
    <div className={styles.messageContainer} ref={bodyRef}>
      {messages.map(chat => (
        <div key={chat.message}>
          <div className={`${styles.message} ${styles[chat.sender]}`}>
            <p>{chat.message}</p>
          </div>
          {chat.options ? (
            <div className={styles.options}>
              <div>
                <i className={`${styles.far} ${styles["fa-hand-pointer"]}`}></i>
              </div>
              {chat.options.map(option => (
                <p onClick={e => props.optionClick(e)} data-id={option} key={option}>
                  {option}
                </p>
              ))}
            </div>
          ) : null}
          <div ref={dummyRef} className={styles.dummyDiv}></div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
