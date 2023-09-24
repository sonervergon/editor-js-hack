"use client";

import type EditorJS from "@editorjs/editorjs";
import React from "react";

const CONTENT_CONTINER_ID = "page-content";
const LOCAL_STORAGE_KEY = "editor-data";

export const PageContent = () => {
  const instance = React.useRef<EditorJS>();
  const initialized = React.useRef<boolean>(false);
  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const init = async () => {
      const EditorJS = await import("@editorjs/editorjs");
      const List = await import("@editorjs/nested-list");
      const Header = await import("editorjs-header-with-alignment");
      const Paragraph = await import("editorjs-paragraph-with-alignment");
      const DragDrop = await import("editorjs-drag-drop");
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      const initialData = savedData ? JSON.parse(savedData) : undefined;
      const editor = new EditorJS.default({
        holder: CONTENT_CONTINER_ID,
        tools: {
          header: {
            class: Header.default,
            config: {
              placeholder: "Enter a header",
              levels: [2, 3, 4, 5, 6],
              defaultLevel: 3,
            },
          },
          paragraph: {
            class: Paragraph.default,
            inlineToolbar: true,
          },
          list: {
            class: List.default,
            inlineToolbar: true,
          },
        },
        data: initialData,
        onChange: async (api) => {
          const output = await api.saver.save();
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(output));
        },
        onReady: () => {
          new DragDrop.default(editor);
        },
      });
      instance.current = editor;
    };

    if (!instance.current && !initialized.current) {
      initialized.current = true;
      init();
    }
    return () => {
      if (instance.current) instance.current.destroy();
    };
  }, []);

  return (
    <div className="relative page-content z-50" id={CONTENT_CONTINER_ID} />
  );
};
