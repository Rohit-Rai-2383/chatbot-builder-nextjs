
'use client';
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

export default function SettingsModal({open,onClose}){
  return(
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay"/>
        <Dialog.Content className="dialog-content">
          <Dialog.Title>AI Settings</Dialog.Title>
          <select style={{width:'100%',padding:8,marginTop:10}}>
            <option>GPT-4o</option>
            <option>GPT-4 Turbo</option>
          </select>
          <button onClick={onClose} style={{marginTop:15}}>Close</button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
