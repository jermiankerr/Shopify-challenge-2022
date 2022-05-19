import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "./index.module.css";

export default function Home() {

  const [chatInput, setChatInput] = useState('');
  const [result, setResult] = useState('');
  const [dialouge, setDialouge] = useState('');

 
  async function onSubmit(event) {
    event.preventDefault();//prevent form from submitting on its own

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ chat: chatInput })

    })

    const data = await response.json();
    console.log(data);
    setResult(data.result);
    setChatInput('')


  };

  
/*
  const chat = (chatInput, result);
  if(chatInput&&result){
    setDialouge(chat);
    setResult('');
  }
  */
  
  
  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Your Virtual friend</h3>
        <p>An Open Ai powered virtual friend, to get started ask a question or just say something, then click start a convo and the AI will respond.</p>
        
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="chat"
            placeholder="whats on your mind"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
          />
          <input type="submit" value="Start a convo" />
        </form>

        <div className={styles.chatInput}>{chatInput}</div>
        <div className={styles.result}>{result}</div>


        {/*dialouge.map((data) => {
          return(
            <p key={data.id}> {data.title} </p>
          )
        })*/}
      
      </main>
    </div>
  );
}