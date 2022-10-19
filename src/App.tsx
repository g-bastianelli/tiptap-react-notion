import React from "react";
import reactLogo from "./assets/react.svg";
import tiptapLogo from "./assets/tiptap.svg";
import { DemoEditor } from "./Editor";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/public/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://tiptap.dev" target="_blank" rel="noreferrer">
          <img src={tiptapLogo} className="logo tiptap" alt="Tiptap logo" />
        </a>
      </div>
      <h1>Vite + React + Tiptap</h1>
      <div className="card">
        <DemoEditor />
      </div>
      <p className="read-the-docs">
        Click on the Vite React and Tiptap logos to learn more
      </p>
    </div>
  );
}

export default App;
