import { syntaxTree } from "@codemirror/language";
import { EditorState, StateField } from "@codemirror/state";
import {
  Decoration,
  EditorView,
  WidgetType,
  type DecorationSet,
} from "@codemirror/view";

/**
 * Widget displayed when a Markdown link is collapsed.
 *
 * Example:
 *
 * [Portfolio](https://example.com)
 *
 * becomes visually:
 *
 * Portfolio
 */
class MarkdownLinkWidget extends WidgetType {
  constructor(
    private readonly label: string,
    private readonly url: string,
  ) {
    super();
  }

  toDOM() {
    const wrapper = document.createElement("span");

    wrapper.className = "cm-markdown-link-wrapper";

    const link = document.createElement("a");

    link.textContent = this.label;
    link.href = this.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    link.className = "cm-markdown-link";

    // Prevent CodeMirror from treating the click
    // as an editor/custor interaction.
    link.addEventListener("mousedown", (event) => {
      event.preventDefault();
      event.stopPropagation();
    });

    // Open link in a new tab
    link.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      window.open(this.url, "_blank", "noopener,noreferrer");
    });

    /*
      here, starts the url preview setup
    */

    const preview = document.createElement("span");

    preview.className = "cm-link-preview";

    const favicon = document.createElement("img");

    favicon.className = "cm-link-preview-favicon";
    favicon.alt = "";
    favicon.width = 20;
    favicon.height = 20;

    try {
      const url = new URL(this.url);

      const faviconPaths = [
        "/favicon.ico",
        "/icon.png",
        "/icon.svg",
        "/favicon.png",
      ];

      let faviconIndex = 0;

      const loadNextFavicon = () => {
        if (faviconIndex >= faviconPaths.length) {
          favicon.src = "/favicon-fallback.svg";
          return;
        }

        favicon.src = `${url.origin}${faviconPaths[faviconIndex]}`;

        faviconIndex++;
      };

      favicon.addEventListener("error", loadNextFavicon);

      loadNextFavicon();
    } catch {
      favicon.src = "/favicon-fallback.svg";
    }

    const urlText = document.createElement("span");

    urlText.className = "cm-link-preview-url";
    urlText.textContent = this.url;

    preview.appendChild(favicon);
    preview.appendChild(urlText);

    wrapper.appendChild(link);
    wrapper.appendChild(preview);

    return wrapper;
  }

  ignoreEvent() {
    // Allow clicks on the <a> element.
    return false;
  }
}

/**
 * Find the Markdown link information from a Link syntax node.
 *
 * Example:
 *
 * [Portfolio](https://example.com)
 *
 * returns:
 *
 * {
 *   label: "Portfolio",
 *   url: "https://example.com"
 * }
 */
function getMarkdownLink(state: EditorState, from: number, to: number) {
  const text = state.sliceDoc(from, to);

  const match = text.match(/^\[([\s\S]*?)\]\((https?:\/\/[^)\s]+)\)$/);

  if (!match) {
    return null;
  }

  return {
    label: match[1],
    url: match[2],
  };
}

/**
 * Check whether the cursor is currently inside a Markdown link.
 */
function isCursorInsideLink(state: EditorState, from: number, to: number) {
  return state.selection.ranges.some((range) => {
    const cursor = range.head;

    return cursor >= from && cursor <= to;
  });
}

/**
 * Build the decorations for all Markdown links.
 */
function buildDecorations(state: EditorState): DecorationSet {
  const decorations: {
    from: number;
    to: number;
    decoration: Decoration;
  }[] = [];

  syntaxTree(state).iterate({
    enter(node) {
      if (node.name !== "Link") {
        return;
      }

      const { from, to } = node;

      const link = getMarkdownLink(state, from, to);

      if (!link) {
        return;
      }

      /**
       * Don't collapse the link while the cursor is inside it.
       *
       * This allows the user to edit:
       *
       * [Portfolio](https://example.com)
       *
       * normally.
       */
      if (isCursorInsideLink(state, from, to)) {
        return;
      }

      /**
       * Replace the entire Markdown link with a widget.
       *
       * The actual document value is NOT changed.
       *
       * Document:
       *
       * [Portfolio](https://example.com)
       *
       * Visual representation:
       *
       * Portfolio
       */
      decorations.push({
        from,
        to,
        decoration: Decoration.replace({
          widget: new MarkdownLinkWidget(link.label, link.url),
          inclusive: false,
        }),
      });
    },
  });

  /**
   * CodeMirror requires decorations to be sorted by
   * their document position.
   */
  decorations.sort((a, b) => a.from - b.from);

  return Decoration.set(
    decorations.map((item) => item.decoration.range(item.from, item.to)),
  );
}

/**
 * CodeMirror state field responsible for maintaining
 * the Markdown link decorations.
 */
export const markdownLinks = StateField.define<DecorationSet>({
  create(state) {
    return buildDecorations(state);
  },

  update(decorations, transaction) {
    /**
     * Rebuild decorations whenever:
     *
     * - The document changes
     * - The selection/cursor changes
     *
     * The second part is important because we want:
     *
     * cursor outside link
     *     ↓
     * collapsed link
     *
     * cursor inside link
     *     ↓
     * original Markdown
     */
    if (transaction.docChanged || transaction.selection) {
      return buildDecorations(transaction.state);
    }

    return decorations.map(transaction.changes);
  },

  provide(field) {
    return EditorView.decorations.from(field);
  },
});

/**
 * Styling for collapsed Markdown links.
 *
 * This is exported separately so it can be added to the
 * CodeMirror extensions alongside markdownLinks.
 */
export const markdownLinkTheme = EditorView.baseTheme({
  ".cm-markdown-link-wrapper": {
    position: "relative",
    display: "inline",
  },
  ".cm-markdown-link": {
    color: "#fe7178",
    cursor: "pointer",
    textDecoration: "none",
    transition: "color 0.15s ease",
  },
  ".cm-markdown-link:hover": {
    color: "#feb6b9",
    // textDecoration: "underline",
  },
  ".cm-markdown-link:visited": {
    color: "#a855f7",
  },
  ".cm-markdown-link:active": {
    color: "#3b82f6",
  },
  ".cm-markdown-link:focus-visible": {
    outline: "2px solid #60a5fa",
    outlineOffset: "2px",
    borderRadius: "2px",
  },
  /* Link preview */
  ".cm-link-preview": {
    position: "absolute",
    left: "0",
    top: "calc(100% + 8px)",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    minWidth: "280px",
    maxWidth: "500px",
    padding: "8px 12px",
    backgroundColor: "#181818",
    border: "1px solid #333",
    borderRadius: "8px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.35)",
    opacity: "0",
    visibility: "hidden",
    pointerEvents: "none",
    transition: "opacity 0.15s ease",
    zIndex: "1000",
  },
  ".cm-markdown-link-wrapper:hover .cm-link-preview": {
    opacity: "1",
    visibility: "visible",
  },
  ".cm-link-preview-favicon": {
    width: "20px",
    height: "20px",
    flexShrink: "0",
    objectFit: "contain",
    borderRadius: "4px",
  },
  ".cm-link-preview-url": {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    color: "#d4d4d4",
    fontSize: "13px",
  },
});
