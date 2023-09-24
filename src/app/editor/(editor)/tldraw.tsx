import {
  Canvas,
  useEditor,
  track,
  useContainer,
  ContextMenu,
  Tldraw,
  useToolbarSchema,
} from "@tldraw/tldraw";
import ImageAsset from "./image.jpg";
import React from "react";
import "./custom-ui.css";

export function TldrawEditorComponent({ showUi }: { showUi: boolean }) {
  return (
    <>
      <div className="bg-transparent h-full">
        <Tldraw persistenceKey="canvas" hideUi>
          <ContextMenu>
            <Canvas />
          </ContextMenu>
          {showUi ? <CustomUi /> : null}
        </Tldraw>
      </div>
    </>
  );
}

const CustomUi = track(() => {
  const editor = useEditor();
  const d = useToolbarSchema();
  console.log(d);

  React.useEffect(() => {
    editor.canMoveCamera = false;
    editor.setCamera(0, 0, 1);
    return () => {
      editor?.selectNone();
    };
  }, [editor]);
  const assetTool = React.useMemo(
    () => d.find((tool) => tool.id === "asset"),
    [d]
  );

  React.useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Delete":
        case "Backspace": {
          editor.deleteShapes(editor.selectedIds);
          break;
        }
        case "v": {
          editor.setSelectedTool("select");
          break;
        }
        case "e": {
          editor.setSelectedTool("eraser");
          break;
        }
        case "x":
        case "p":
        case "b":
        case "d": {
          editor.setSelectedTool("draw");
          break;
        }
      }
    };

    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  });

  return (
    <div className="custom-layout absolute " id="custom-ui">
      <div className="custom-toolbar">
        <button
          className="custom-button"
          data-isactive={editor.currentToolId === "select"}
          onClick={() => editor.setSelectedTool("select")}
        >
          Select
        </button>
        <button
          className="custom-button"
          data-isactive={editor.currentToolId === "draw"}
          onClick={() => editor.setSelectedTool("draw")}
        >
          Pencil
        </button>
        <button
          className="custom-button"
          data-isactive={editor.currentToolId === "asset"}
          onClick={
            // w: number;
            // h: number;
            // name: string;
            // isAnimated: boolean;
            // mimeType: null | string;
            // src: null | string;
            () => {
              assetTool?.toolItem.onSelect("toolbar");
            }
          }
        >
          Image
        </button>
        <button
          className="custom-button"
          data-isactive={editor.currentToolId === "eraser"}
          onClick={() => editor.setSelectedTool("eraser")}
        >
          Eraser
        </button>
      </div>
    </div>
  );
});
