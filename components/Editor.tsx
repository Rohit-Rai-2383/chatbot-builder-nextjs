"use client";

import { useEditor, EditorContent, Extension } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { EnterHandler } from "../configs/EditorConfigs";
import styles from "../styles/Editor.module.css";
import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { X } from "lucide-react";
const ShiftEnterHandler = Extension.create({
  name: "shiftEnterHandler",
  addKeyboardShortcuts() {
    return {
      "Shift-Enter": ({ editor }) => {
        if (editor) {
          editor.commands.setHardBreak();
        }
        return true;
      },
    };
  },
});
export default function TextEditor({
  setTextValue,
}: {
  setTextValue: (value: string) => void;
}) {
  const atValuesRef = useRef<any[]>([]);
  const inputTextRef = useRef<string>("");
  const inputRef = useRef<string>("");
  const handlerRef = useRef<any>(() => {});
  const editorRef = useRef<any>(null);

  // useEffect(() => {
  //   handlerRef.current = enterKeyHandler;
  // }, [enterKeyHandler]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      ShiftEnterHandler,
      EnterHandler(() => {
        setTextValue(editorRef.current?.getText() || "");
        editor?.commands.clearContent();

        editorRef.current?.commands.setContent("");

        handlerRef.current();
      }),
    ],
    content: inputRef.current,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      const json = editor.getJSON();
      let text = "";
      let extractedMentions: any[] = [];
      function walk(node: any) {
        if (node.type === "mention") {
          text += `@${node.attrs.value}`;
          extractedMentions.push({
            type: node.attrs.type || "account",
            value: { id: node.attrs.id, name: node.attrs.value },
          });
        } else if (node.type === "hardBreak") {
          text += "\n";
        } else if (node.text) {
          text += node.text;
        }
        if (node.content) node.content.forEach(walk);
      }
      walk(json);
    },
  });

  useEffect(() => {
    editorRef.current = editor;
  }, [editor]);

  return (
    <div
      className={`flex   my-3 items-center gap-2 w-full  break-words  flex-col  "bg-[#F6F6F6]"
      } rounded-3xl  h-fit ${styles.editor}`}
    >
      <div className="w-full max-h-[50vh] overflow-y-scroll px-3">
        <EditorContent
          editor={editor}
          className={`prose text-sm  max-w-none   min-w-full border-none  focus:outline-none`}
          placeholder="Ask AI ..."
        />
      </div>
    </div>
  );
}
