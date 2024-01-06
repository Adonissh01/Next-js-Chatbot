"use client";
import React, { useState, useEffect, useRef } from "react";
import Chats from "../Chats/Chat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons"; // Import close icon
import { faX,faMessage, faRobot } from "@fortawesome/free-solid-svg-icons";
import { analyzeNextSteps } from "../HelperFunctions/analyzeNextSteps";
import styles from "./Chatbot.module.css";
import chatbotimg from "../../../../public/chatbot.png";
import Image from "next/image";
//translation

import { useTranslation } from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations"
import { useRouter } from "next/navigation";
import { Inter } from 'next/font/google'
 
const inter = Inter({ subsets: ['latin'],weight:"600" })



interface ResponseBotObject {
  purpose: string;
  message: string;
  options?: string[];
  sender: string;
}

const Chatbot: React.FC = () => {
  const {t} = useTranslation();
  const router = useRouter();
  const [viewCB,setViewCB] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [userResponse, setUserResponse] = useState<string>("");
  const [step, setStep] = useState<number>(0);
  const [botResponse, setBotResponse] = useState<ResponseBotObject>({
    purpose: "",
    message: "",
    sender: "bot",
  });
  const [sendUserResponse, setSendUserResponse] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(true); // State to track whether the chatbot is open or closed

  const chatbotRef = useRef<HTMLDivElement>(null); // Reference to the chatbot div

  useEffect(() => {
    // Event listener to close chatbot when clicked outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatbotRef.current &&
        !chatbotRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);
  const toggleChatbot = () => {
    setIsVisible((prev) => !prev);
  };
  if (!isVisible) {
    return (
        
          
      <button onClick={toggleChatbot} className={styles.toggleButton}>
        <FontAwesomeIcon icon={faMessage} style={{fontSize:"40px"}}/>
  
      </button>
      
      
    );
  }


  const setNextStep = (response: string) => {
    setStep((prevState) => prevState + 1);
    setSendUserResponse(response);
    let res = analyzeNextSteps(step, response);
    setBotResponse({ ...res, sender: "bot" });
    setUserResponse("");
  };

  const optionClick = (e: React.MouseEvent<HTMLElement>) => {
    let option = e.currentTarget.dataset.id;
    
    if (option ) {
      if (option === "UI UX designer") {
        router.push("/careers");  // Navigate to the careers page
      }
      if(option === "Smart Locker"){
        router.push("/services")
      } else {
        setNextStep(option);
      }
    }
    if (option ) {
      if (option === "UI UX designer") {
        router.push("/careers");  // Navigate to the careers page
      }
      if(option === "Smart Locker"){
        router.push("/services")
      } 
      if(option === "Contact us"){
        router.push("/contactus")
      }else {
        setNextStep(option);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserResponse(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(userResponse=="" || !userResponse){
      return;
      
    }else  if (userResponse ) {
      if (userResponse.toLowerCase() === "ui ux designer") {
        router.push("/careers");  // Navigate to the careers page
      }
      if(userResponse.toLowerCase() === "smart locker"){
        router.push("/services")
      }
      if(userResponse.toLowerCase() === "contactus" || userResponse.toLowerCase() === "contact us"){
        router.push("/contactus")
      } else {
        setNextStep(userResponse);
      }
    }
    else{
    
    setNextStep(userResponse);
    }
  };

  const closeChatbot = () => {
    setIsOpen(false);
  };

  return (
    <div
      ref={chatbotRef}
      className={isVisible ? styles.chatContainer : styles.hiddenChatContainer}
    >
      {isVisible && (
        <>
        <div className={styles.chatbotTop}>
          <div className={styles.chatbotTopLeft}>
            <FontAwesomeIcon icon={faRobot} />
            <text className={inter.className}>SVG Chatbot</text>
            </div>
            <button className={styles.closeButton} onClick={toggleChatbot}>
              <FontAwesomeIcon icon={faX} />
            </button>
          </div>
          <Chats
            userResponse={userResponse}
            botResponse={botResponse}
            sendUserResponse={sendUserResponse}
            optionClick={optionClick}
          />
          <form
            onSubmit={(e) => handleSubmit(e)}
            className={styles.formContainer}
          >
            <input
              onChange={(e) => handleInputChange(e)}
              value={userResponse}
              placeholder={t("yourname")}
            ></input>
            <button type="submit" className={styles.submitbutton}>
              <FontAwesomeIcon
                icon={faPaperPlane}
                
              />
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Chatbot;

