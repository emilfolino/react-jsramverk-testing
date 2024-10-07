import { useState, useEffect, useRef } from 'react';
import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:8337";

function TextEditor() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const socket = useRef(null);

    useEffect(() => {
      socket.current = io(SERVER_URL);

      socket.current.on("content", (data) => {
        setContent(data);
      });

      return () => {
        socket.current.disconnect();
      }
    }, []);

    function clear(e) {
        e.preventDefault();

        setTitle("");
        setContent("");
    }

    function handleContentChange(e) {
      const value = e.target.value;

      socket.current.emit("content", value);
    }

    return (
      <>
        <label htmlFor="title-field">Titel</label>
        <input type="text" id="title-field" name="title-field" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label htmlFor="content-field">Innehåll</label>
        <textarea id="content-field" value={content} onChange={handleContentChange}></textarea>

        <button id="print-message" onClick={clear}>Rensa</button>

        <div id="output-container">
            <h1>{title}</h1>
            <p>{content}</p>
        </div>
      </>
    );
  }
  
  export default TextEditor;