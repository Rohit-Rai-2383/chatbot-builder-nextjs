"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export default function SettingsModal({ open, onClose }) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 w-[320px] -translate-x-1/2 
          -translate-y-1/2 bg-white p-5 rounded-xl shadow-xl z-50"
        >
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-semibold">
              AI Settings
            </Dialog.Title>
            <button onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          <label className="block text-sm font-medium mb-1">Model</label>
          <select className="w-full border rounded-md p-2">
            <option>GPT-4o</option>
            <option>GPT-4 Turbo</option>
          </select>

          <button
            onClick={onClose}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md"
          >
            Close
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
