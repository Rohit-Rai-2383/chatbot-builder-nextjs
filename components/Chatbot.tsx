"use client";
import React, { useEffect, useRef, useState } from "react";
import { Toolbar } from "./Toolbar";

import SettingsModal from "./SettingsModal";
import TextEditor from "./Editor";
// import {PaperPlane} from 'lucide-react';

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(false);
  const [messages, setMessages] = useState([]);
  const editor = useRef(null);
  const [textValue, setTextValue] = useState("");

  const send = () => {
    const t = textValue;
    if (!t.trim()) return;
    setMessages((m) => [...m, { role: "user", content: t }]);
    setMessages((m) => [...m, { role: "bot", content: "Static reply" }]);
    editor.current?.clear();
  };

  useEffect(() => {
    if (!textValue.trim()) return;
    console.log(`Debug - textValue`, textValue);
    send();
  }, [textValue]);

  return (
    <>
      <div className="chatbot-launcher" onClick={() => setOpen((o) => !o)}>
        💬
      </div>
      {open && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <span>Chatbot</span>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setSettings(true)}>⚙</button>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>
          </div>
          <div className="chatbot-body">
            {messages.map((m, i) => (
              <div
                key={i}
                className={"chat-msg " + (m.role === "user" ? "user" : "bot")}
              >
                {m.content}
              </div>
            ))}
          </div>
          <div className="chatbot-footer">
            <TextEditor setTextValue={setTextValue} />
            <div
              className="toolbar-row"
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              {/* <Toolbar /> */}
              <button className="send-btn ml-auto" onClick={send}>
                rohit
              </button>
            </div>
          </div>
        </div>
      )}
      <SettingsModal open={settings} onClose={() => setSettings(false)} />
    </>
  );
}
