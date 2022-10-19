import { JSONContent } from "@tiptap/react";

enum EditorFormat {
  TEXT = "Text",
  HEADING = "Heading",
  BULLET_LIST = "Bullet list",
}

const TipTapEditorFormat: { [key in EditorFormat]: JSONContent } = {
  [EditorFormat.TEXT]: { type: "paragraph" },
  [EditorFormat.HEADING]: { type: "heading", attrs: { level: 1 } },
  [EditorFormat.BULLET_LIST]: {
    type: "bulletList",
    content: [
      {
        type: "listItem",
        content: [
          {
            type: "paragraph",
          },
        ],
      },
    ],
  },
};

export { EditorFormat, TipTapEditorFormat };
