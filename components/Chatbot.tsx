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

  const send = (text?: string) => {
    // prefer explicit text parameter, otherwise try the editor instance text, finally fallback to local state
    console.log(`Debug - editorss`, editor);
    const editorText = editor.current?.getText
      ? editor.current.getText()
      : undefined;
    const t = text ? text : editorText ?? textValue;
    console.log(`Debug - t`, t, text ? text : textValue);
    if (!t || !t.trim()) return;
    // add user and bot messages together to avoid ordering/state issues
    setMessages((m) => [
      ...m,
      { role: "user", content: t },
      { role: "bot", content: "Static reply" },
    ]);

    // clear tiptap editor content if available, otherwise try generic clear()
    if (editor.current?.commands?.setContent) {
      editor.current.commands.setContent("");
    } else if (typeof editor.current?.clear === "function") {
      editor.current.clear();
    }

    // keep local text state in sync
    setTextValue("");
  };

  // useEffect(() => {
  //   if (!textValue.trim()) return;
  //   console.log(`Debug - textValue`, textValue);
  //   send();
  // }, [textValue]);

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
            <TextEditor
              ref={editor}
              setTextValue={setTextValue}
              sendMessage={send}
            />
            <div
              className="toolbar-row"
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              {/* <Toolbar /> */}
              <button
                className="send-btn ml-auto"
                onClick={() => {
                  send();
                }}
              >
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
