import { Editor, Node } from "@tiptap/core";
import { JSONContent, ReactRenderer } from "@tiptap/react";
import Suggestion, { SuggestionProps } from "@tiptap/suggestion";
import { PluginKey } from "prosemirror-state";
import tippy, { GetReferenceClientRect, Instance, Props } from "tippy.js";
import { EditorFormat, TipTapEditorFormat } from "../const";
import { TypeList } from "./TypeList";

export type TypeSuggestionOptions = Record<string, never>;

export const TypeSuggestionPluginKey = new PluginKey("type-suggestion");

const SUGGESTION_CHAR = "/";

function isNotEmptyLine(editor: Editor) {
  const chunks =
    editor.view.state.selection.$head.parent.textContent.split(SUGGESTION_CHAR);
  // if we have more than 2 chunks, it means that we will have at least a '/ 'char on the line, else whe checks that the  first chunks is not empty.
  return chunks.length > 2 || chunks[0].trim().length;
}

export const TypeSuggestion = Node.create<TypeSuggestionOptions>({
  name: "type-suggestion",

  group: "inline",

  inline: true,

  selectable: false,

  atom: true,

  addProseMirrorPlugins() {
    return [
      Suggestion<EditorFormat>({
        char: SUGGESTION_CHAR,
        pluginKey: TypeSuggestionPluginKey,
        command: ({ editor, range, props }) => {
          const selectedType: JSONContent =
            TipTapEditorFormat[props] ?? TipTapEditorFormat.Text;

          if (isNotEmptyLine(editor)) {
            // Add selected type after the current selection
            editor
              .chain()
              .insertContentAt(range, selectedType)
              .focus(range.to)
              .run();
          } else {
            // Replace the current selection with the selected type
            editor
              .chain()
              .deleteRange(range)
              .insertContent(selectedType)
              .focus(range.to)
              .run();
          }
          window.getSelection()?.collapseToEnd();
        },
        allow: ({ state, range }) => {
          const $from = state.doc.resolve(range.from);
          const type = state.schema.nodes[this.name];
          return !!$from.parent.type.contentMatch.matchType(type);
        },
        editor: this.editor,
        items: ({ query }: { query: string; editor: Editor }) => {
          return Object.values(EditorFormat).filter((item) =>
            item.toLowerCase().startsWith(query.toLowerCase())
          );
        },
        render: () => {
          let component: ReactRenderer<unknown, SuggestionProps>;
          let popup: Instance<Props>[];

          return {
            onStart: (props) => {
              component = new ReactRenderer(TypeList, {
                props,
                editor: props.editor,
              });

              if (!props.clientRect) {
                return;
              }

              popup = tippy("body", {
                getReferenceClientRect:
                  props.clientRect as GetReferenceClientRect,
                appendTo: () => document.body,
                content: component.element,
                showOnCreate: true,
                interactive: true,
                trigger: "manual",
                placement: "bottom-start",
              });
            },

            onUpdate(props) {
              component.updateProps(props);

              if (!props.clientRect) {
                return;
              }

              popup[0].setProps({
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                getReferenceClientRect: props.clientRect,
              });
            },

            onKeyDown(props) {
              if (props.event.key === "Escape") {
                popup[0].hide();

                return true;
              }

              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              return component.ref?.onKeyDown(props);
            },

            onExit() {
              popup[0].destroy();
              component.destroy();
            },
          };
        },
      }),
    ];
  },
});
