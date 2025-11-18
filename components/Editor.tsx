
'use client';
import React,{forwardRef,useImperativeHandle,useEffect} from 'react';
import {EditorContent,useEditor} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Mention from '@tiptap/extension-mention';

const suggestions=['Alice','Bob','Charlie'];

export const Editor=forwardRef((props,ref)=>{
  const editor=useEditor({
    extensions:[
      StarterKit,
      Mention.configure({
        suggestion:{
          items:({query})=>suggestions.filter(i=>i.toLowerCase().startsWith(query.toLowerCase()))
        }
      })
    ],
    editorProps:{attributes:{class:'editor'}}
  });

  useImperativeHandle(ref,()=>({
    getText:()=>editor?.getText()||'',
    clear:()=>editor?.commands.clearContent()
  }));

  useEffect(()=>()=>editor?.destroy(),[]);

  return <EditorContent editor={editor}/>;
});
