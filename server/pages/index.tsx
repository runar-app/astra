import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { SendButton } from "../components/SendButton";
import { useRouter } from "next/router";
import { ChatRequest, Message } from "@/../common/Chat";

interface InitMessage {
  en: Message;
  ru: Message;
}

const initMessage: InitMessage = {
  ru: {
    content:
      "Приветствую тебя! Готов помочь, сколько бы сил и мужества этого не стоило! Меня зовут Астра. Как твоё имя?",
    role: "assistant",
  },
  en: {
    content:
      "Greetings! Ready to help, no matter how much strength and courage it costs! My name is Astra. What is your name?",
    role: "assistant",
  },
};

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const lang = router.query.lang === "ru" ? "ru" : "en";
  const initLangMessage = initMessage[lang];

  useEffect(() => {
    if (!router.query.lang) {
      return;
    }

    try {
      const prevHistoryStorage = localStorage.getItem("chatHistory");
      const historyMessages = JSON.parse(prevHistoryStorage || "[]");
      if (historyMessages.length > 2) {
        setMessages(historyMessages);
        return;
      }
    } catch (e) {
      console.log("Error on parse history");
      console.log(e);
    }

    setMessages([initLangMessage]);
  }, [router.query.lang]);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const scrollDown = () => {
      const messageListNode = document.getElementById("messageList");
      if (!messageListNode) {
        return;
      }
      messageListNode.scrollTop = messageListNode?.scrollHeight;
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
      { content: "Что-то сломалось. Попробуй задать вопрос позже", role: "assistant" },
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
    setMessages((prevMessages) => [...prevMessages, { content: userInput, role: "user" }]);

    const history: Message[] = messages.map((message) => {
      const author = message.role === "assistant" ? "user" : "assistant";
      const content = `${message.content || ""}`.trim();
      return { role: author, content: content };
    });

    const requestData: ChatRequest = { userMessage: userInput, history, language: lang };

    const response = await fetch("/api/chat", {
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

    setMessages((prevMessages) => [...prevMessages, { content: data.text, role: "assistant" }]);
    setLoading(false);
    textAreaRef?.current?.focus();
  };

  useEffect(() => {
    if (!messages || messages.length < 2) {
      return;
    }
    const history = JSON.stringify(messages);
    localStorage.setItem("chatHistory", history);
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
      <div className={styles.messagelist} id="messageList">
        {messages.length > 2 && (
          <div
            className="clearControls"
            onClick={() => {
              setMessages([initLangMessage]);
              localStorage.setItem("chatHistory", "[]");
            }}
          >
            <button className="clearHistoryButton">Clear history</button>
          </div>
        )}

        {messages.map((message, index) => {
          return (
            // The latest message sent by the user will be animated while waiting for a response
            <div
              key={index}
              className={
                message.role === "user" && loading && index === messages.length - 1
                  ? styles.usermessagewaiting
                  : message.role === "assistant"
                  ? styles.apimessage
                  : styles.usermessage
              }
            >
              {/* Display the correct icon depending on the message type */}
              {message.role === "assistant" ? (
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
              <div className={styles.markdownanswer}>{message.content}</div>
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
