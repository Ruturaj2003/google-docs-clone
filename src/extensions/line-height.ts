import { Extension } from "@tiptap/react";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    lineHeight: {
      setLineHeight: (lineHeight: string) => ReturnType;
      unsetLineHeight: () => ReturnType;
    };
  }
}

export const LineHeightExetension = Extension.create({
  name: "lineHeight",
  addOptions() {
    return {
      types: ["paragraph", "heading"],
      defaultLineHeight: "normal",
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: this.options.defaultLineHeight,
            renderHTML: (attributes) => {
              if (!attributes.lineHeight) return {};
              return {
                style: `line-height: ${attributes.lineHeight}`,
              };
            },

            parseHTML: (element) => {
              return element.style.lineHeight || this.options.defaultLineHeight;
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      // Command to set a custom line height on selected blocks
      setLineHeight:
        (lineHeight: string) =>
        ({ tr, state, dispatch }) => {
          const { selection } = state;

          // Ensure the transaction is synced with the current selection
          tr = tr.setSelection(selection);

          const { from, to } = selection;

          // Traverse all nodes between the selection range
          state.doc.nodesBetween(from, to, (node, pos) => {
            // Only apply to nodes of the specified types (e.g., paragraph, heading)
            if (this.options.types.includes(node.type.name)) {
              // Update the node's attributes to include the new lineHeight
              tr = tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                lineHeight,
              });
            }
          });

          // If dispatch function exists, apply the transaction to update the document
          if (dispatch) dispatch(tr);

          return true; // Signal that the command was successfully handled
        },

      // Command to reset line height back to the default value
      unsetLineHeight:
        () =>
        ({ tr, state, dispatch }) => {
          const { selection } = state;

          // Keep transaction aligned with current selection
          tr = tr.setSelection(selection);

          const { from, to } = selection;

          // Iterate over selected nodes
          state.doc.nodesBetween(from, to, (node, pos) => {
            // Apply only to supported node types
            if (this.options.types.includes(node.type.name)) {
              // Reset lineHeight to default while preserving other attributes
              tr = tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                lineHeight: this.options.defaultLineHeight,
              });
            }
          });

          // Apply transaction if dispatch is provided
          if (dispatch) dispatch(tr);

          return true; // Command executed successfully
        },
    };
  },
});
