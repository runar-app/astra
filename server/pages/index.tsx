import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { SendButton } from "../components/SendButton";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [history, setHistory] = useState<string[][]>([]);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Приветствую тебя! Готов помочь, сколько бы сил и мужества этого не стоило!",
      type: "apiMessage",
    },
  ]);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const scrollDown = () => {
      console.log("document scroll down");
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      window.scrollTo(0, scrollHeight - clientHeight);
    };
    scrollDown();

    window.addEventListener("resize", scrollDown);
    return () => window.removeEventListener("resize", scrollDown);
  }, [messages]);

  useEffect(() => {
    if (!textAreaRef.current) {
      return;
    }

    textAreaRef.current.focus();
  }, []);

  const handleError = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: "Что-то сломалось. Попробуй задать вопрос позже", type: "apiMessage" },
    ]);
    setLoading(false);
    setUserInput("");
  };

  const handleSubmit = async () => {
    if (userInput.trim() === "") {
      return;
    }
    textAreaRef?.current?.focus();
    setUserInput("");
    setLoading(true);
    setMessages((prevMessages) => [...prevMessages, { message: userInput, type: "userMessage" }]);

    const historyForChatModel = messages.map((message) => {
      const author = message.type === "userMessage" ? "user" : "assistant";
      const content = `${message.message || ""}`.trim();
      return { role: author, content: content };
    });

    const requestData = { question: userInput, history: history, historyForChatModel };

    const response = await fetch("/api/conversation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      handleError();
      return;
    }

    const data = await response.json();

    if (data.result.error === "Unauthorized") {
      handleError();
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { message: data.result.text, type: "apiMessage" },
    ]);
    setLoading(false);
    textAreaRef?.current?.focus();
  };

  useEffect(() => {
    setHistory([messages.map((message) => message.message)]);
  }, [messages]);

  return (
    <>
      <Head>
        <title>Runar Chat</title>
        <meta name="description" content="Google documentation" />
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0" />
        <meta name="theme-color" content="#070809" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.messagelist}>
        {messages.map((message, index) => {
          return (
            // The latest message sent by the user will be animated while waiting for a response
            <div
              key={index}
              className={
                message.type === "userMessage" && loading && index === messages.length - 1
                  ? styles.usermessagewaiting
                  : message.type === "apiMessage"
                  ? styles.apimessage
                  : styles.usermessage
              }
            >
              {/* Display the correct icon depending on the message type */}
              {message.type === "apiMessage" ? (
                <Image
                  src="/parroticon.png"
                  alt="AI"
                  width="30"
                  height="30"
                  className={styles.boticon}
                  priority={true}
                />
              ) : (
                <Image
                  src="/usericon.png"
                  alt="Me"
                  width="30"
                  height="30"
                  className={styles.usericon}
                  priority={true}
                />
              )}
              <div className={styles.markdownanswer}>{message.message}</div>
            </div>
          );
        })}
      </div>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <textarea
          onKeyDown={(e) => {
            if (e.key === "Enter" && userInput) {
              if (!e.shiftKey && userInput && !loading) {
                e.preventDefault();
                handleSubmit();
              }
            } else if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          ref={textAreaRef}
          autoFocus={true}
          id="userInput"
          name="userInput"
          placeholder={loading ? "Waiting for response..." : "Type your question..."}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className={styles.textarea}
        />
        <SendButton loading={loading} onSubmit={handleSubmit} />
      </form>
      <div className="bg"></div>
    </>
  );
}
