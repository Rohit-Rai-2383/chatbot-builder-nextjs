// components/Mention.ts
import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";

import { Extension } from "@tiptap/core";

export const EnterHandler = (handler: Function) => {
  return Extension.create({
    addKeyboardShortcuts() {
      return {
        Enter: () => {
          handler();
          return true;
        },
      };
    },
  });
};
