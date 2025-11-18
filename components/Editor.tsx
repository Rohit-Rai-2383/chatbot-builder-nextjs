"use client";

import React, { forwardRef, useImperativeHandle, useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const TextEditor = forwardRef(({ setTextValue }: any, ref) => {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          "min-h-[50px] px-2 py-1 rounded-xl bg-white text-sm outline-none prose max-w-none",
      },
    },
    onUpdate: ({ editor }) => {
      setTextValue(editor.getText());
    },
  });

  useImperativeHandle(ref, () => ({
    clear: () => editor?.commands.clearContent(),
  }));

  return (
    <div className="w-full max-h-[20vh] overflow-y-auto">
      <EditorContent editor={editor} />
    </div>
  );
});

export default TextEditor;
